import json
import os
import glob

def calculate_average_score(jsonl_file_path):
    scores = []
    
    with open(jsonl_file_path, 'r', encoding='utf-8') as file:
        for line in file:
            line = line.strip()
            if line:
                data = json.loads(line)
                if 'overall_score' in data:
                    scores.append(float(data['overall_score']))
    
    if scores:
        return sum(scores) / len(scores), len(scores)
    else:
        return 0.0, 0

if __name__ == "__main__":
    # 输入目录路径
    input_dir = ""
    
    # 获取目录下所有.jsonl文件
    jsonl_files = glob.glob(os.path.join(input_dir, "*.jsonl"))
    
    if not jsonl_files:
        print("No .jsonl files found in the specified directory.")
    else:
        print(f"Found {len(jsonl_files)} .jsonl files")
        print("-" * 50)
        
        for file_path in sorted(jsonl_files):
            filename = os.path.basename(file_path)
            avg_score, count = calculate_average_score(file_path)
            print(f"File: {filename}")
            print(f"Number of Scores: {count}")
            print(f"Average Score: {avg_score:.5f}")
            print("-" * 50)