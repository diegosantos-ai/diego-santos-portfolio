---
title: "TerezIA: Arquitetura de um Agente de Atendimento Público"
date: "2026-01-25"
tags: ["IA", "Arquitetura", "Case Real"]
image: "/assets/articles/terezia-arch.jpg"
excerpt: "Deep dive na construção de um assistente virtual governamental: desafios de alucinação, segurança e integração com Meta API."
---

# TerezIA: IA Cidadã

Construir chatbots para o setor público exige um rigor que vai muito além do *prompt engineering* básico. Não há margem para alucinações ("inventar fatos") quando se trata de leis, prazos e direitos do cidadão.

Neste artigo, detalho as decisões de engenharia por trás do **TerezIA**, o assistente virtual projetado para automatizar o atendimento via Instagram e Facebook.

## O Desafio: Confiança Zero

O principal requisito não era "ser inteligente", mas **"ser confiável"**.

> "Um atendente humano pode dizer 'não sei'. Um LLM mal configurado inventa uma resposta convincente."

Para resolver isso, implementamos uma arquitetura **RAG (Retrieval-Augmented Generation)** com camadas de verificação rigorosas.

## A Arquitetura em 4 Camadas

### 1. Ingestão e Vetorização (A Base)
Não basta jogar PDFs no banco. Implementamos um pipeline de ETL que:
- Quebra leis e decretos em *chunks* semânticos (respeitando artigos e parágrafos).
- Enriquece cada chunk com metadados (data de vigência, fonte oficial).
- Gera embeddings usando modelos multilíngues otimizados para PT-BR.

### 2. Retrieval (A Busca)
Usamos **ChromaDB** para busca vetorial. A chave aqui foi implementar **Hybrid Search**: misturamos busca semântica (vetores) com busca por palavras-chave (BM25) para garantir que termos técnicos específicos (ex: "isenção de IPTU") sejam encontrados com precisão.

### 3. Generation & Policy Guard (O Filtro)
Antes de chegar ao usuário, a resposta do LLM passa pelo **Policy Guard**. É um segundo modelo menor, ultra-rápido, treinado apenas para classificar:
*   "A resposta está baseada no contexto fornecido?"
*   "A resposta viola alguma diretriz de tom de voz?"
Se o Guard reprovar, a resposta é bloqueada e um fallback seguro é acionado.

### 4. Integração Meta (A Entrega)
A conexão com o cidadão ocorre via **Meta API (WhatsApp/Instagram)**.
- Servidor **FastAPI** assíncrono para lidar com webhooks em alta concorrência.
- Validação HMAC para garantir que as requisições venham realmente do Facebook.

## Resultados

- **Redução de carga:** 70% das dúvidas repetitivas respondidas automaticamente.
- **Auditoria:** 100% das conversas salvas em PostgreSQL para análise de qualidade.
- **Disponibilidade:** Atendimento 24/7 sem fila de espera.

Esta arquitetura prova que é possível usar IA Generativa em ambientes críticos, desde que haja engenharia robusta de controle e segurança ao redor do modelo.
