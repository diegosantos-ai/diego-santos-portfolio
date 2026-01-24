---
title: "Como otimizar pipelines RAG com ChromaDB"
date: "2026-01-25"
tags: ["Data Engineering", "RAG", "LLM"]
image: "/assets/articles/rag-opt.jpg"
excerpt: "Estratégias práticas para reduzir latência e melhorar a precisão da busca semântica em aplicações de produção."
---

# Otimizando RAG em Produção

Retrieval-Augmented Generation (RAG) é a arquitetura padrão para trazer contexto privado para LLMs. Mas colocar em produção traz desafios reais de latência e custo.

## O Problema da Latência Vectorial

Ao escalar para milhões de vetores, a busca por força bruta (KNN) se torna inviável. Índices como HNSW (Hierarchical Navigable Small World) são essenciais.

### Configurando ChromaDB para Performance

```python
import chromadb
from chromadb.config import Settings

client = chromadb.PersistentClient(path="./db")
collection = client.get_or_create_collection(
    name="docs",
    metadata={"hnsw:space": "cosine"} # Importante para busca semântica
)
```

## Chunking Inteligente

Não corte texto apenas por caracteres. Use *semantic chunking* para manter o contexto.

1. **Sentence Splitting:** Respeite pontuação.
2. **Overlap:** Mantenha 10-20% de sobreposição.
3. **Metadata Enrichment:** Adicione título do documento e data em cada chunk.

> "A qualidade da resposta do LLM é limitada pela qualidade do contexto recuperado."

## Conclusão

RAG não é apenas `retrieve` e `generate`. É um pipeline de engenharia de dados que exige monitoramento e otimização contínua.
