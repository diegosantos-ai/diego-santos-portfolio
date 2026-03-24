# RAG Chunking Strategy

Este documento define a estratégia de segmentação de texto (chunking) para a base de conhecimento do portfólio. O objetivo é criar unidades de informação que sejam autocontidas, semanticamente densas e otimizadas para recuperação por similaridade vetorial.

## 1. Abordagem: Hybrid Structural-Semantic Chunking

Em vez de quebrar o texto por tamanho fixo (caracteres ou tokens), utilizaremos a estrutura lógica dos documentos Markdown para definir os limites dos chunks.

### Critérios de Segmentação:
1.  **Delimitadores de Nível**: Chunks são criados primariamente em cabeçalhos `##` (H2) e `###` (H3).
2.  **Unidade de Intenção**: Cada chunk deve responder a uma única "unidade de intenção" (ex: "Qual a stack de backend?", "Qual a experiência na Nexo Basis?").
3.  **Injeção de Contexto**: Cada chunk deve herdar metadados globais (identidade do Diego) para não depender de chunks vizinhos para fazer sentido.
4.  **Tamanho Sugerido**: Entre 300 e 800 tokens (ajustável conforme o modelo de embedding).

## 2. Categorias de Chunks

| Categoria | Fonte | Estratégia de Quebra | Intenção Alvo |
| :--- | :--- | :--- | :--- |
| **Identidade** | KB Sections 1, 2, 3 | Seção inteira (H2) | `who_is`, `positioning`, `value_prop` |
| **Stack** | KB Section 4 | Por subseção (H3) | `ask_stack`, `ask_technology` |
| **Experiência** | KB Section 6 | Por cargo/empresa (H3) | `ask_experience`, `ask_trajectory` |
| **Projetos** | KB Section 8 | Por projeto (H3) | `ask_project`, `show_evidence` |
| **FAQs** | KB Section 10 | Por par pergunta/resposta | `faq_short` |
| **Normativas** | KB Sections 11, 12 | Seção inteira (H2) | `style_guide`, `security_rules` |

## 3. Regras de Processamento

- **Headers**: O título da seção deve ser incluído no início do `content` do chunk para reforçar o peso semântico.
- **Listas**: Listas de tecnologias não devem ser quebradas ao meio; o chunk deve conter a lista completa daquela subseção.
- **Links**: Referências a arquivos (ex: `docs/ARCHITECTURE.md`) devem ser mantidas como texto puro para permitir que o modelo sugira a leitura desses arquivos.
