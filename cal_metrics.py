import json
import glob

json_files = glob.glob("lm_results/PFT_test_results/*results.json")
# json_files = glob.glob("lm_results/VQT_test_results/*results.json")

all_results = []

for json_file in json_files:
    with open(json_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    file_stats = []

    for top_suite in data["suites"]:
        file_name = top_suite["file"]
        passed = 0
        total = 0

        for suite in top_suite.get("suites", []):
            for spec in suite.get("specs", []):
                for test in spec.get("tests", []):
                    total += 1
                    for result in test.get("results", []):
                        if result.get("status") == "passed":
                            passed += 1
                            break

        if total > 0:
            file_stats.append((file_name, passed, total))

    total_passed = sum(p for _, p, _ in file_stats)
    total_tests = sum(t for _, _, t in file_stats)
    total_pass_rate = total_passed / total_tests if total_tests else 0

    average_pass_rate = sum(p / t for _, p, t in file_stats) / len(file_stats) if file_stats else 0

    fully_passed_files = sum(1 for _, p, t in file_stats if p == t)
    full_pass_rate = fully_passed_files / len(file_stats) if file_stats else 0

    all_results.append({
        'file': json_file,
        'total_pass_rate': total_pass_rate,
        'average_pass_rate': average_pass_rate,
        'full_pass_rate': full_pass_rate
    })

print(f"{'File':<50} {'Overall Pass Rate':<12} {'Average Pass Rate':<12} {'Perfect Pass Rate':<12}")
print("-" * 86)
for result in all_results:
    print(f"{result['file']:<50} {result['total_pass_rate']:<12.2%} {result['average_pass_rate']:<12.2%} {result['full_pass_rate']:<12.2%}")