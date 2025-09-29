import argparse
import json
from openai import OpenAI
import httpx
import base64
from tqdm import tqdm
import os
import threading
import concurrent.futures


system_prompt = '''
You are an expert judge for evaluating scientific visualization demos.

You are given:

1. A **reference screenshot** that represents the correct output of the demo under a specific input state.
2. A **generated screenshot** from a candidate implementation under the same input state.
3. A **checklist** of verification items describing what scientific properties must be visible and correct in the output image.

---

### Your task

1. Carefully compare the **generated screenshot** with the **reference screenshot**.
2. For each **checklist item**, assign a score from **1 to 5** using the rubric below.
3. Provide a short justification for each score.

---

### Scoring Rubric

* **5 (Perfect / Fully Correct)**

  * Output image matches the reference screenshot precisely for this checklist item.
  * No scientific or visual errors observed.

* **4 (Minor Deviation)**

  * Output image mostly matches, but there are small differences (e.g., slight shift in curve, small scaling error, minor misalignment) that do not change the core scientific correctness.

* **3 (Partial Correctness)**

  * Some parts are correct (e.g., correct general shape, but wrong labels; correct axis scaling, but wrong curve peak).
  * Noticeable deviation from reference that may reduce scientific clarity.

* **2 (Mostly Incorrect)**

  * The item is largely wrong, but a small aspect is still correct (e.g., axis present but mislabeled, trajectory drawn but incorrect path).

* **1 (Completely Incorrect / Missing)**

  * The expected scientific property is entirely absent or completely wrong.
  * Visualization contradicts the reference screenshot.

---

### Output Format (strict JSON)

```json
{
  "checklist_results": [
    {
      "expectation": "{text from checklist item}",
      "score": 4,
      "reason": "Trajectory shape matches but peak position is slightly shifted."
    },
    {
      "expectation": "{text from checklist item}",
      "score": 5,
      "reason": "Axis labels and scaling are identical to reference."
    }
  ]
}
```

Here is the checklist, reference screenshot, and generated screenshot:
'''

# Function to encode the image
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")

def api_call(
    prompt: str,
    image_paths: list,
    model: str = "gemin-2.5-pro",
    base_url: str = "",
    api_key: str = "EMPTY"
) -> str:
    
    client = OpenAI(
        base_url=base_url,
        api_key=api_key,
        http_client = httpx.Client(verify=False)
    )
    content = []
    content.append({"type": "text", "text": prompt})
    for image_path in image_paths:
        image_base64 = encode_image(image_path)
        content.append({"type": "image_url", "image_url": {"url": f"data:image/png;base64,{image_base64}"}})
    messages = [
        {
            "role": "system",
            "content": system_prompt
        },
        {
            "role": "user",
            "content": content
        }
    ]
    # print(messages)
    response = client.chat.completions.create(
        model=model,
        messages=messages
    )
    # print(f"Token usage: {response.usage}")
    return response.choices[0].message.content

def parse_response(response_str):
    try:
        response_str = response_str.strip().replace("```json\n", "").replace("\n```", "")
        response_json = json.loads(response_str)
        return response_json
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return None


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run vllm inference on a dataset.")
    parser.add_argument("--reference_image_dir", type=str, help="Directory containing reference images")
    parser.add_argument("--generated_image_dir", type=str, help="Directory containing generated images")
    parser.add_argument("--checklist_file", type=str, help="Path to the checklist file")
    parser.add_argument("--output_path", type=str, help="Relative path to the output file")
    parser.add_argument("--base_url", type=str, help="Base URL for the API")
    parser.add_argument("--api_key", type=str, help="API key for authentication")
    parser.add_argument("--judge_model", type=str, default="gemini-2.5-pro", help="Model to use for judgment")

    args = parser.parse_args()

    reference_image_dir = args.reference_image_dir
    generated_image_dir = args.generated_image_dir
    checklist_file = args.checklist_file
    output_path = args.output_path
    base_url = args.base_url
    api_key = args.api_key
    # Thread-safe file writing
    write_lock = threading.Lock()
    
    def process_item(item_data):
        item, f_out = item_data
        id = item['id']
        checklists = item['snapshot_checklists']
        results = []
        
        for checklist_item in checklists:
            screenshot_id = checklist_item['screenshot_id']
            checklist = checklist_item['checklist']
            expectation = ''
            for i, expect in enumerate(checklist):
                expectation += f"{i+1}. {expect}\n"
            reference_image_path = f"{reference_image_dir}/{id}_Snapshot-{screenshot_id}.png"
            generated_image_path = f"{generated_image_dir}/{id}-{screenshot_id}.png"
            
            if not (os.path.exists(reference_image_path) and os.path.exists(generated_image_path)):
                print(f"Warning: Missing images for {id} screenshot {screenshot_id}. Skipping.")
                result = {
                    "id": id,
                    "screenshot_id": screenshot_id,
                    "expectation": expectation,
                    "evaluation": None,
                    "overall_score": 0
                }
                results.append(result)
                continue
                
            prompt = f"Checklist: \n{expectation}\n"
            try:
                response = api_call(
                    prompt=prompt,
                    image_paths=[reference_image_path, generated_image_path],
                    base_url=base_url,
                    api_key=api_key
                )
                response_json = parse_response(response)
                if response_json is None:
                    print(f"Warning: Failed to parse response for {id} screenshot {screenshot_id}. Skipping.")
                    continue
                overall_score = sum(item["score"] for item in response_json.get("checklist_results", [])) / len(response_json.get("checklist_results", []))
                print(f"Overall score for {id} screenshot {screenshot_id}: {overall_score}")
                result = {
                    "id": id,
                    "screenshot_id": screenshot_id,
                    "expectation": expectation,
                    "evaluation": response_json,
                    "overall_score": overall_score
                }
                results.append(result)
                print(f"Judged checklist for {id} screenshot {screenshot_id}")
            except Exception as e:
                print(f"Error processing id {id} screenshot {screenshot_id}: {e}")
        
        # Thread-safe writing
        with write_lock:
            for result in results:
                f_out.write(json.dumps(result, ensure_ascii=False) + '\n')
                f_out.flush()

    with open(checklist_file, 'r') as f_in, open(output_path, 'w') as f_out:
        items = [json.loads(line) for line in f_in]
        item_data = [(item, f_out) for item in items]
        
        # Use ThreadPoolExecutor for concurrent processing
        with concurrent.futures.ThreadPoolExecutor(max_workers=32) as executor:
            list(tqdm(executor.map(process_item, item_data), total=len(items)))
