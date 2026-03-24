import os
import json
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MANIFEST_PATH = os.path.join(BASE_DIR, "rag/manifests/chunk-manifest.json")

def test_rag_integrity():
    """Executa testes de sanidade na base RAG gerada."""
    if not os.path.exists(MANIFEST_PATH):
        print(f"Erro: Manifesto nao encontrado em {MANIFEST_PATH}. Execute 'make rag-build' primeiro.")
        sys.exit(1)

    with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
        manifest = json.load(f)

    errors = []

    # 1. Verificar se ha chunks
    if manifest.get("total_chunks", 0) == 0:
        errors.append("A base RAG esta vazia (total_chunks == 0).")

    # 2. Verificar presenca de intents obrigatorias
    required_intents = ["who_is", "positioning", "ask_stack", "ask_experience"]
    covered_intents = manifest.get("coverage", {}).get("intents", [])
    for intent in required_intents:
        if intent not in covered_intents:
            errors.append(f"Intencao obrigatoria ausente: '{intent}'")

    # 3. Verificar se todos os arquivos referenciados existem
    chunks_dir = os.path.join(os.path.dirname(os.path.dirname(MANIFEST_PATH)), "chunks")
    for chunk_ref in manifest.get("chunks_reference", []):
        chunk_file = os.path.join(chunks_dir, f"{chunk_ref['id']}.json")
        if not os.path.exists(chunk_file):
            errors.append(f"Arquivo de chunk referenciado nao existe: {chunk_ref['id']}.json")

    if errors:
        print(f"Falha nos testes de sanidade RAG ({len(errors)} erros):")
        for err in errors:
            print(f"  - {err}")
        sys.exit(1)

    print(f"Sucesso: Testes de sanidade RAG passaram (Total de chunks: {manifest['total_chunks']}).")

if __name__ == "__main__":
    test_rag_integrity()
