#!/bin/bash

echo "==== Starting ===="
# Run the test script
python vlm_as_judge.py \
    --reference_image_dir "./data/snapshots" \
    --generated_image_dir "./data/lm_snapshots_backup/$MODEL" \
    --checklist_file "./data/checklists.jsonl" \
    --output_path "./data/lm_results/VQT_vlm_judge_results/$MODEL.jsonl" \
    --base_url "" \
    --api_key ""

echo "Judge completed."
echo "==============================="
echo