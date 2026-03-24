import os
import json
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CHUNKS_DIR = os.path.join(BASE_DIR, "rag/chunks")
MANIFEST_DIR = os.path.join(BASE_DIR, "rag/manifests")
PACKED_PATH = os.path.join(MANIFEST_DIR, "packed-chunks.json")

def package_chunks():
    """Consolida todos os chunks em um unico arquivo JSON para facilitar o consumo."""
    if not os.path.exists(CHUNKS_DIR):
        print(f"Erro: Diretorio de chunks nao encontrado em {CHUNKS_DIR}")
        return

    packed_data = {
        "generated_at": datetime.now().isoformat() + "Z",
        "chunks": []
    }

    chunk_files = sorted([f for f in os.listdir(CHUNKS_DIR) if f.endswith(".json")])
    for filename in chunk_files:
        path = os.path.join(CHUNKS_DIR, filename)
        with open(path, 'r', encoding='utf-8') as f:
            packed_data["chunks"].append(json.load(f))

    os.makedirs(MANIFEST_DIR, exist_ok=True)
    with open(PACKED_PATH, 'w', encoding='utf-8') as f:
        json.dump(packed_data, f, indent=2, ensure_ascii=False)

    print(f"Sucesso: {len(packed_data['chunks'])} chunks empacotados em {PACKED_PATH}")

if __name__ == "__main__":
    package_chunks()
