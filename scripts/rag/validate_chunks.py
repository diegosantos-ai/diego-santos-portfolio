import os
import json
import sys
from datetime import datetime
from enum import Enum
from typing import Optional, List
from pydantic import BaseModel, Field, ValidationError

# --- Schema Replication (Sprint 2) ---
class SourceType(str, Enum):
    CANONICAL = "canonical"
    COMPLEMENTARY = "complementary"
    LEGACY = "legacy"
    EXCLUDED = "excluded_from_retrieval"

class Audience(str, Enum):
    GENERAL = "general"
    RECRUITER = "recruiter"
    TECHNICAL = "technical"

class ChunkStatus(str, Enum):
    ACTIVE = "active"
    DEPRECATED = "deprecated"
    DRAFT = "draft"

class RAGChunk(BaseModel):
    chunk_id: str
    doc_id: str
    version: str
    topic: str
    section: str
    intent: str
    entity: str
    priority: int = Field(..., ge=0, le=9)
    canonicality: bool
    retrieval_weight: float = Field(..., ge=0.0, le=1.0)
    source_type: SourceType
    audience: Audience
    language: str
    status: ChunkStatus
    last_reviewed_at: datetime
    content: str = Field(..., min_length=10)

# --- Validation Logic ---
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CHUNKS_DIR = os.path.join(BASE_DIR, "rag/chunks")

def validate_all_chunks():
    if not os.path.exists(CHUNKS_DIR):
        print(f"Erro: Diretorio de chunks nao encontrado em {CHUNKS_DIR}")
        sys.exit(1)

    chunk_files = [f for f in os.listdir(CHUNKS_DIR) if f.endswith(".json")]
    if not chunk_files:
        print("Aviso: Nenhum chunk encontrado para validar.")
        return

    errors = []
    for filename in chunk_files:
        path = os.path.join(CHUNKS_DIR, filename)
        try:
            with open(path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                RAGChunk(**data)
        except (ValidationError, json.JSONDecodeError) as e:
            errors.append(f"Erro no arquivo {filename}: {str(e)}")

    if errors:
        print(f"Falha na validacao de {len(errors)} chunks:")
        for err in errors:
            print(f"  - {err}")
        sys.exit(1)

    print(f"Sucesso: {len(chunk_files)} chunks validados contra o schema canônico.")

if __name__ == "__main__":
    validate_all_chunks()
