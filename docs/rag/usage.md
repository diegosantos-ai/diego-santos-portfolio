# RAG Pipeline Usage

Este documento descreve como operar o pipeline de automação da base de conhecimento (RAG) do portfólio.

## Comandos Disponíveis

Toda a operação é centralizada no `Makefile` da raiz do projeto.

### 1. Construir a Base
Gera os chunks individuais a partir do arquivo `docs/KB_PORTFOLIO_DIEGO_SANTOS_INGEST.md`.
```bash
make rag-build
```

### 2. Validar Chunks
Verifica se todos os chunks gerados seguem o schema canônico (Pydantic).
```bash
make rag-validate
```

### 3. Testar Sanidade
Executa testes de integridade, verificando se intenções obrigatórias (como `who_is` e `stack`) estão cobertas.
```bash
make rag-test
```

### 4. Empacotar para o App
Consolida todos os chunks em um único arquivo `rag/manifests/packed-chunks.json`, facilitando o carregamento pelo sistema.
```bash
make rag-package
```

### 5. Executar Pipeline Completo (Recomendado)
Limpa, constrói, valida, testa e empacota a base em um único comando.
```bash
make rag-pipeline
```

### 6. Limpar Artefatos
Remove todos os arquivos JSON gerados em `rag/chunks/` e `rag/manifests/`.
```bash
make rag-clean
```

## Governança

- **Idempotência**: O processo é determinístico. Se o conteúdo da KB não mudar, os IDs dos chunks permanecerão os mesmos.
- **Segurança**: O pipeline falha explicitamente se algum chunk estiver inválido ou se intenções críticas sumirem da base.
