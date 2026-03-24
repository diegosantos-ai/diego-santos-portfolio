from datetime import datetime
from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field

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
    """
    Schema canônico para um chunk de conhecimento na base RAG.
    Alinhado com a governança da Sprint 1 e 2.
    """
    chunk_id: str = Field(..., description="ID único do chunk (ex: kb-identity-001)")
    doc_id: str = Field(..., description="ID do documento de origem")
    version: str = Field("1.0.0", description="Versão semântica do conteúdo")

    # Semântica e Recuperação
    topic: str = Field(..., description="Tópico macro (ex: stack, experience)")
    section: str = Field(..., description="Seção específica no documento")
    intent: str = Field(..., description="Intenção principal que este chunk resolve")
    entity: str = Field("Diego Santos", description="Entidade principal")

    # Governança e Ranking
    priority: int = Field(0, ge=0, le=9, description="Prioridade de 0 (máxima) a 9")
    canonicality: bool = Field(True, description="Indica se é a fonte de verdade absoluta")
    retrieval_weight: float = Field(1.0, ge=0.0, le=1.0, description="Peso para algoritmos de ranking")
    source_type: SourceType = Field(SourceType.CANONICAL)

    # Contexto e Metadados
    audience: Audience = Field(Audience.GENERAL)
    language: str = Field("pt-BR", pattern="^[a-z]{2}-[A-Z]{2}$")
    status: ChunkStatus = Field(ChunkStatus.ACTIVE)
    last_reviewed_at: datetime = Field(default_factory=datetime.now)

    # Conteúdo
    content: str = Field(..., min_length=10, description="Conteúdo textual do chunk")

    class Config:
        json_schema_extra = {
            "example": {
                "chunk_id": "kb-stack-backend-001",
                "doc_id": "KB_PORTFOLIO_INGEST_V1",
                "version": "1.0.0",
                "topic": "stack",
                "section": "Backend e APIs",
                "intent": "ask_stack_backend",
                "entity": "Diego Santos",
                "priority": 0,
                "canonicality": True,
                "retrieval_weight": 1.0,
                "source_type": "canonical",
                "audience": "technical",
                "language": "pt-BR",
                "status": "active",
                "content": "### 4.2 Backend e APIs\n- FastAPI\n- APIs REST\n- Padrões Port & Adapters..."
            }
        }
