import argparse
import json
from openai import OpenAI
import httpx
import base64
from tqdm import tqdm
from concurrent.futures import ThreadPoolExecutor

# Function to encode the image
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")

def api_call(
    prompt: str,
    image_paths: list,
    model: str = "gemin-2.5-pro",
    base_url: str = "",
    api_key: str = "EMPTY",
    num_images: int = 0
) -> str:
    
    client = OpenAI(
        base_url=base_url,
        api_key=api_key,
        http_client = httpx.Client(verify=False)
    )
    content = []
    content.append({"type": "text", "text": prompt})
    for image_path in image_paths[:num_images]:
        image_base64 = encode_image(image_path)
        content.append({"type": "image_url", "image_url": {"url": f"data:image/png;base64,{image_base64}"}})
    messages = [
        {
            "role": "user",
            "content": content
        }
    ]
    print(messages)
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=0,
        timeout=3600
    )
    # print(f"Token usage: {response.usage}")
    return response.choices[0].message.content


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run vllm inference on a dataset.")
    parser.add_argument("--dataset_path", type=str, help="Relative path to the dataset file")
    parser.add_argument("--prompt_type", type=str, help="Type of prompt: lm_system_prompt or vlm_system_prompt")
    parser.add_argument("--dump_path", type=str, help="Relative path to the output file")
    parser.add_argument("--model_path", type=str, help="Path to the model directory")
    parser.add_argument("--base_url", type=str, help="Base URL for the API")
    parser.add_argument("--api_key", type=str, help="API key for authentication")
    parser.add_argument("--num_images", type=int, help="Number of images to use")

    args = parser.parse_args()

    dataset_path = args.dataset_path
    prompt_type = args.prompt_type
    dump_path = args.dump_path
    model_path = args.model_path
    base_url = args.base_url
    api_key = args.api_key
    num_images = args.num_images

    source_list = []
    with open(dataset_path, 'r') as f_in:
        for line in tqdm(f_in):
            line_parsed = json.loads(line)
            source_list.append(line_parsed)

    batch_size = 256
    def api_call_wrapper(sample):
        answer = api_call(
            prompt=sample[prompt_type] + sample['question'],
            image_paths=sample['image_path'] if 'image_path' in sample else [],
            model=model_path,
            base_url=base_url,
            api_key=api_key,
            num_images=num_images
        )
        return answer

    with open(dump_path, 'w') as f_out:
        for i in range(0, len(source_list), batch_size):
            sample_split = source_list[i:i + batch_size]
            
            with ThreadPoolExecutor(max_workers=min(len(sample_split), 32)) as executor:
                split_answers = list(executor.map(api_call_wrapper, sample_split))

            for sample, answer in zip(sample_split, split_answers):
                dump_dict = {
                    "id": sample['id'],
                    prompt_type: sample[prompt_type],
                    "question": sample['question'],
                    "answer": answer
                }
                if 'image_path' in sample:
                    dump_dict["image_path"] = sample['image_path']
                
                dump_str = json.dumps(dump_dict, ensure_ascii=False)
                f_out.write(dump_str + '\n')