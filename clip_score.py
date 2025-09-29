import torch
import clip
from PIL import Image
import json
import argparse
from pathlib import Path
import torch.nn.functional as F

class CLIPSimilarityCalculator:
    def __init__(self, device="cuda" if torch.cuda.is_available() else "cpu", batch_size=32):
        self.device = device
        self.batch_size = batch_size
        self.model, self.preprocess = clip.load("ViT-B/32", device=device)
        
    def load_and_preprocess_images(self, image_paths):
        images = []
        for path in image_paths:
            try:
                image = self.preprocess(Image.open(path))
                images.append(image)
            except Exception as e:
                print(f"Error loading image {path}: {e}")
                images.append(torch.zeros(3, 224, 224))
        
        return torch.stack(images).to(self.device)
    
    def calculate_batch_similarity(self, image1_paths, image2_paths):
        similarities = []
        for i in range(0, len(image1_paths), self.batch_size):
            batch_img1_paths = image1_paths[i:i+self.batch_size]
            batch_img2_paths = image2_paths[i:i+self.batch_size]
            
            batch_images1 = self.load_and_preprocess_images(batch_img1_paths)
            batch_images2 = self.load_and_preprocess_images(batch_img2_paths)
            
            with torch.no_grad():
                features1 = self.model.encode_image(batch_images1)
                features2 = self.model.encode_image(batch_images2)
                
                features1 = F.normalize(features1, dim=1)
                features2 = F.normalize(features2, dim=1)
                
                batch_similarities = torch.cosine_similarity(features1, features2)
                similarities.extend(batch_similarities.cpu().tolist())
        
        return similarities

def collect_image_pairs(ids, reference_dir, prediction_dir):
    image_pairs = []
    metadata = []
    
    reference_dir = Path(reference_dir)
    prediction_dir = Path(prediction_dir)
    
    for question_id in ids:
        reference_files = list(reference_dir.glob(f"{question_id}_Snapshot-*.png"))
        
        for ref_file in reference_files:
            filename = ref_file.stem
            x = filename.split('-')[-1]
            pred_file = prediction_dir / f"{question_id}-{x}.png"
            
            image_pairs.append((str(ref_file), str(pred_file)))
            metadata.append({
                'id': question_id,
                'x': x,
                'pred_exists': pred_file.exists()
            })
    
    return image_pairs, metadata

def main():
    parser = argparse.ArgumentParser(description="Calculate CLIP similarity between reference and prediction images")
    parser.add_argument("--jsonl_path", help="Path to the JSONL file containing question IDs")
    parser.add_argument("--reference_dir", help="Directory containing reference images")
    parser.add_argument("--prediction_dir", help="Directory containing prediction images")
    parser.add_argument("--batch_size", type=int, default=32, help="Batch size for processing")
    
    args = parser.parse_args()

    ids = []
    with open(args.jsonl_path, 'r', encoding='utf-8') as f:
        for line in f:
            data = json.loads(line.strip())
            ids.append(data['id'])
    
    print(f"Processing {len(ids)} IDs...")
    
    image_pairs, metadata = collect_image_pairs(ids, args.reference_dir, args.prediction_dir)
    
    print(f"Found {len(image_pairs)} image pairs to process...")
    
    calculator = CLIPSimilarityCalculator(batch_size=args.batch_size)
    
    existing_pairs = []
    existing_metadata = []
    
    for i, (ref_path, pred_path) in enumerate(image_pairs):
        if metadata[i]['pred_exists']:
            existing_pairs.append((ref_path, pred_path))
            existing_metadata.append(metadata[i])
    
    print(f"Processing {len(existing_pairs)} existing prediction images...")
    
    if existing_pairs:
        ref_paths, pred_paths = zip(*existing_pairs)
        similarities = calculator.calculate_batch_similarity(list(ref_paths), list(pred_paths))
    else:
        similarities = []
    
    id_scores = {}
    id_counts = {}
    total_score = 0.0
    total_images = 0
    
    for i, sim in enumerate(similarities):
        meta = existing_metadata[i]
        question_id = meta['id']
        x = meta['x']
        
        if question_id not in id_scores:
            id_scores[question_id] = 0.0
            id_counts[question_id] = 0
        
        id_scores[question_id] += sim
        id_counts[question_id] += 1
        total_score += sim
        print(f"ID {question_id}, image {x}: {sim:.4f}")
    
    for i, (ref_path, pred_path) in enumerate(image_pairs):
        meta = metadata[i]
        if not meta['pred_exists']:
            question_id = meta['id']
            x = meta['x']
            
            if question_id not in id_scores:
                id_scores[question_id] = 0.0
                id_counts[question_id] = 0
            
            id_counts[question_id] += 1
            print(f"ID {question_id}, image {x}: 0.0000 (prediction not found)")
    
    total_images = len(image_pairs)
    
    mean_avg = 0.0
    print("\nPer-ID average scores:")
    for question_id in ids:
        if question_id in id_scores and id_counts[question_id] > 0:
            avg_score = id_scores[question_id] / id_counts[question_id]
            print(f"ID {question_id}: {avg_score:.4f}")
            mean_avg += avg_score / len(ids)
        else:
            print(f"ID {question_id}: 0.0000")
            mean_avg += 0.0
    
    overall_avg = total_score / total_images if total_images > 0 else 0.0
    
    print(f"\nTotal images processed: {total_images}")
    print(f"Total score: {total_score:.4f}")
    print(f"Overall average score: {overall_avg:.4f}")
    print(f"Mean of per-ID averages: {mean_avg:.4f}")

if __name__ == "__main__":
    main()