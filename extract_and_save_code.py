import os
import json
import html
import re
import argparse

html_key = 'answer'

def extract_code_block(text, lang):
    """Extract code block wrapped in ```lang...```"""
    pattern = rf"```{lang}\s*\n(.*?)\s*```"
    match = re.search(pattern, text, re.DOTALL)
    if match:
        return html.unescape(match.group(1).strip())
    return None

def save_to_file(content, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def process_html(jsonl_path, output_dir='pages'):
    with open(jsonl_path, 'r', encoding='utf-8') as f:
        for line in f:
            data = json.loads(line)
            # if data.get('id') not in ids:
            #     continue
            html_code = data.get(html_key, '')
            html_code = extract_code_block(html_code, 'html')
            print(f"Processing ID: {data.get('id')}, HTML code length: {len(html_code) if html_code else 0}")
            if html_code:
                save_to_file(html_code, os.path.join(output_dir, f"{data['id']}.html"))

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Extract and save HTML/JS code from JSONL files')
    parser.add_argument('--input', '-i', required=True, help='Input JSONL file path')
    parser.add_argument('--output', '-o', required=True, help='Output directory')
    args = parser.parse_args()

    process_html(args.input, args.output)
