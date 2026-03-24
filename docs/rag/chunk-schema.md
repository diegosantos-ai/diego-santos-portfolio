# RAG Chunk Schema

Este documento define o schema canônico para os chunks de dados que alimentam o motor de recuperação (retrieval) do portfólio.

## 1. Schema Definition (JSON/Object)

Cada chunk deve ser um objeto seguindo a estrutura abaixo:

| Campo | Tipo | Descrição | Exemplo |
| :--- | :--- | :--- | :--- |
| `chunk_id` | `string` | ID único (slug-based) | `kb-stack-backend-001` |
| `doc_id` | `string` | Referência ao documento original | `KB_PORTFOLIO_INGEST_V1` |
| `version` | `string` | Versão do documento fonte | `1.0.0` |
| `topic` | `string` | Tópico macro da informação | `stack` |
| `section` | `string` | Nome da seção original | `Backend e APIs` |
| `intent` | `string` | Intenção de busca que este chunk resolve | `ask_stack_backend` |
| `entity` | `string` | Entidade principal referenciada | `Diego Santos` |
| `priority` | `int` | Nível de prioridade (0-9) | `0` |
| `canonicality` | `bool` | Se é a fonte de verdade absoluta | `true` |
| `retrieval_weight` | `float` | Peso adicional para o ranking (0.0 - 1.0) | `1.0` |
| `source_type` | `string` | Classificação da fonte (Sprint 1) | `canonical` |
| `audience` | `string` | Público alvo da resposta | `technical` |
| `language` | `string` | Idioma do conteúdo | `pt-BR` |
| `status` | `string` | Estado do chunk | `active` |
| `last_reviewed_at` | `iso_date` | Data da última revisão | `2024-03-24T10:00:00Z` |
| `content` | `string` | Texto bruto do chunk | `### Backend e APIs...` |

## 2. Metadados de Busca (Vector DB)

Os campos `topic`, `intent`, `priority` e `source_type` devem ser indexados como metadados filtráveis no banco vetorial para permitir:
1.  **Filtragem Prévia**: Excluir fontes `legacy`.
2.  **Boost Dinâmico**: Aumentar o peso de chunks com `priority: 0`.
3.  **Context Routing**: Recuperar chunks específicos para o público `technical` ou `recruiter`.
