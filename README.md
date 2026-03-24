
# Diego Santos — Portfólio de Engenharia de IA

<div align="center">
  <img src="https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/RAG-AI_Applied-blue?style=for-the-badge&logo=openai&logoColor=white" alt="RAG">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white" alt="Terraform">
  <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" alt="AWS">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19">
</div>



## Visão Geral
Este repositório apresenta o portfólio técnico de Diego Santos, com foco em Engenharia de IA aplicada, backend, automação e governança de sistemas. O projeto demonstra práticas de engenharia voltadas para sistemas de RAG (Retrieval-Augmented Generation), automação de infraestrutura e integração de LLMs em ambientes reprodutíveis e auditáveis.


## Governança e Qualidade
O portfólio segue diretrizes de engenharia profissional, priorizando:
- Segurança (Zero Secrets)
- Automação via Makefile
- Qualidade impeditiva (pre-commit)
- Idempotência arquitetural
As regras completas estão descritas em [AGENTS.md](AGENTS.md).


## Componentes

### Camada RAG
- Base canônica: docs/KB_PORTFOLIO_DIEGO_SANTOS_INGEST.md
- Pipeline de chunking e rastreabilidade
- Prompts organizados por intenção e fallback

### Backend e Infraestrutura
- API em FastAPI
- Provisionamento AWS via Terraform
- Containerização com Docker

### Frontend
- Interface moderna com React e TypeScript

### Automação
- Operações encapsuladas em Makefile

## Como Usar

Todas as operações são realizadas via Makefile:

```bash
make install         # Instala dependências
make rag-pipeline    # Gera e valida base RAG
make dev             # Sobe ambiente de desenvolvimento
make lint            # Executa validações de qualidade
```

## Validação
A integridade da base RAG é garantida por validação automatizada e schemas Pydantic. O pipeline verifica conformidade dos chunks e cobertura de intenções antes de liberar para uso.

---

## Contato

- [LinkedIn](https://linkedin.com/in/diego-santos-ia)
- [GitHub](https://github.com/diegosantos-ai)
- [Site oficial](https://www.diegosantos.me)

## 4. Uso e Operação

A interação com o repositório é realizada via Makefile:

```bash
# Instalacao de dependencias (Node.js e Python venv)
make install

# Geracao e validacao da base de conhecimento RAG
make rag-pipeline

# Execucao do ambiente de desenvolvimento
make dev

# Execucao de linters e testes de sanidade
make lint
```

## 5. Validação e Qualidade
A integridade da base RAG é validada através de schemas Pydantic. O pipeline automatizado verifica a conformidade dos chunks e a cobertura de intenções obrigatórias antes da disponibilização para o assistente.

---
*Este repositório é gerenciado pelas regras de governança sistêmicas do cofre dev-workspace.*
