import os
import json
import re
import hashlib
from datetime import datetime
from typing import List, Dict, Any, Optional

# Configurações de Caminho
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
KB_PATH = os.path.join(BASE_DIR, "docs/KB_PORTFOLIO_DIEGO_SANTOS_INGEST.md")
CHUNKS_DIR = os.path.join(BASE_DIR, "rag/chunks")
MANIFEST_PATH = os.path.join(BASE_DIR, "rag/manifests/chunk-manifest.json")

# Versão da Base
VERSION = "1.0.0"

class ChunkBuilder:
    """
    Builder responsável por transformar a base canônica Markdown em chunks RAG.
    Seguindo a governança das Sprints 1, 2 e 3.
    """

    def __init__(self, kb_path: str, chunks_dir: str):
        self.kb_path = kb_path
        self.chunks_dir = chunks_dir
        self.chunks = []
        self.source_doc = os.path.basename(kb_path)

    def _generate_deterministic_id(self, content: str) -> str:
        """Gera um ID único e determinístico baseado no conteúdo."""
        hash_digest = hashlib.sha256(content.encode('utf-8')).hexdigest()
        return f"chunk-{hash_digest[:16]}"

    def _map_metadata(self, section_title: str) -> Dict[str, Any]:
        """Mapeia o título da seção para metadados de tópico e intenção."""
        title_lower = section_title.lower()

        mapping = {
            "identidade": {"topic": "identity", "intent": "who_is", "priority": 0},
            "posicionamento": {"topic": "identity", "intent": "positioning", "priority": 0},
            "tese profissional": {"topic": "identity", "intent": "value_prop", "priority": 1},
            "stack técnica": {"topic": "stack", "intent": "ask_stack", "priority": 0},
            "linguagens e base": {"topic": "stack", "intent": "ask_stack", "priority": 0},
            "backend e apis": {"topic": "stack", "intent": "ask_stack", "priority": 0},
            "dados e persistência": {"topic": "stack", "intent": "ask_stack", "priority": 0},
            "ia aplicada": {"topic": "stack", "intent": "ask_stack", "priority": 0},
            "orquestração": {"topic": "stack", "intent": "ask_stack", "priority": 0},
            "infraestrutura": {"topic": "stack", "intent": "ask_stack", "priority": 0},
            "frontend e visualização": {"topic": "stack", "intent": "ask_stack", "priority": 0},
            "experimentação": {"topic": "stack", "intent": "ask_stack", "priority": 0},
            "observabilidade e segurança": {"topic": "stack", "intent": "ask_stack", "priority": 0},
            "como enquadrar a stack": {"topic": "stack", "intent": "ask_stack_context", "priority": 1},
            "experiência": {"topic": "experience", "intent": "ask_experience", "priority": 0},
            "serviços": {"topic": "services", "intent": "ask_services", "priority": 1},
            "projetos-âncora": {"topic": "projects", "intent": "ask_project", "priority": 2},
            "assistente": {"topic": "instructions", "intent": "behavior_rules", "priority": 1},
            "perguntas e respostas": {"topic": "faqs", "intent": "faq_short", "priority": 1},
            "regras de estilo": {"topic": "normative", "intent": "style_guide", "priority": 1},
            "regras de segurança": {"topic": "normative", "intent": "security_rules", "priority": 0},
            "orientações para rag": {"topic": "normative", "intent": "rag_config", "priority": 3},
            "conflitos conhecidos": {"topic": "normative", "intent": "conflict_resolution", "priority": 1},
            "versão curta": {"topic": "identity", "intent": "short_summary", "priority": 1},
            "palavras-chave": {"topic": "metadata", "intent": "keyword_retrieval", "priority": 9},
            "instrução final": {"topic": "instructions", "intent": "final_directive", "priority": 1}
        }

        for key, value in mapping.items():
            if key in title_lower:
                return value

        return {"topic": "general", "intent": "general_info", "priority": 5}

    def parse_and_chunk(self):
        """Lê o arquivo e quebra em chunks baseados em H2 e H3."""
        if not os.path.exists(self.kb_path):
            print(f"Erro: Arquivo {self.kb_path} não encontrado.")
            return

        with open(self.kb_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Regex para capturar seções (H2 e H3)
        # Captura o header e todo o conteúdo até o próximo header ou fim do arquivo
        sections = re.split(r'\n(##+ .+\n)', content)

        # O primeiro elemento pode ser o título do documento ou introdução
        current_header = "Intro"

        for i in range(1, len(sections), 2):
            header = sections[i].strip()
            text = sections[i+1].strip()

            if not text:
                continue

            metadata = self._map_metadata(header)

            # Limpeza do header para o campo 'section'
            clean_header = re.sub(r'^##+ ', '', header)

            chunk_content = f"{header}\n\n{text}"
            chunk_id = self._generate_deterministic_id(chunk_content)

            chunk = {
                "chunk_id": chunk_id,
                "doc_id": self.source_doc,
                "version": VERSION,
                "topic": metadata["topic"],
                "section": clean_header,
                "intent": metadata["intent"],
                "entity": "Diego Santos",
                "priority": metadata["priority"],
                "canonicality": True,
                "retrieval_weight": 1.0,
                "source_type": "canonical",
                "audience": "general",
                "language": "pt-BR",
                "status": "active",
                "last_reviewed_at": datetime.now().isoformat() + "Z",
                "content": chunk_content
            }
            self.chunks.append(chunk)

    def save_chunks(self):
        """Salva os chunks em arquivos individuais JSON."""
        if not os.path.exists(self.chunks_dir):
            os.makedirs(self.chunks_dir)

        # Limpar diretório de chunks antes de salvar novos (para garantir limpeza)
        for f in os.listdir(self.chunks_dir):
            if f.endswith(".json"):
                os.remove(os.path.join(self.chunks_dir, f))

        for chunk in self.chunks:
            file_path = os.path.join(self.chunks_dir, f"{chunk['chunk_id']}.json")
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(chunk, f, indent=2, ensure_ascii=False)

        print(f"Sucesso: {len(self.chunks)} chunks gerados em {self.chunks_dir}")

    def generate_manifest(self):
        """Gera o manifesto consolidado dos chunks."""
        intents = sorted(list(set(c["intent"] for c in self.chunks)))
        topics = sorted(list(set(c["topic"] for c in self.chunks)))

        manifest = {
            "manifest_version": "1.0.0",
            "generated_at": datetime.now().isoformat() + "Z",
            "total_chunks": len(self.chunks),
            "source_documents": [self.source_doc],
            "coverage": {
                "topics": topics,
                "intents": intents
            },
            "chunks_reference": [
                {"id": c["chunk_id"], "topic": c["topic"], "intent": c["intent"]}
                for c in self.chunks
            ]
        }

        os.makedirs(os.path.dirname(MANIFEST_PATH), exist_ok=True)
        with open(MANIFEST_PATH, 'w', encoding='utf-8') as f:
            json.dump(manifest, f, indent=2, ensure_ascii=False)

        print(f"Sucesso: Manifesto gerado em {MANIFEST_PATH}")

if __name__ == "__main__":
    builder = ChunkBuilder(KB_PATH, CHUNKS_DIR)
    builder.parse_and_chunk()
    builder.save_chunks()
    builder.generate_manifest()
