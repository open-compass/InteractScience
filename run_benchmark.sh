echo "Processing model: ${MODEL}"
rm -rf ./pages/
rm -rf ./snapshots/
python ./extract_and_save_code.py --input ./eval/interactscience_lm_${MODEL}.jsonl --output pages
PLAYWRIGHT_JSON_OUTPUT_NAME=./results/PFT_test_results/${MODEL}_PFT_results.json npx playwright test --reporter=json --config playwright_PFT.config.js
PLAYWRIGHT_JSON_OUTPUT_NAME=./results/VQT_test_results/${MODEL}_VQT_results.json npx playwright test --reporter=json --config playwright_VQT.config.js
python clip_score.py --jsonl_path data/question_lm.jsonl --reference_dir data/snapshots --prediction_dir snapshots > ./results/snapshot_clip_results/${MODEL}_snapshot_clip_results.txt
mv ./snapshots ./snapshots_backup/${MODEL}
echo "Finished processing model: ${MODEL}"