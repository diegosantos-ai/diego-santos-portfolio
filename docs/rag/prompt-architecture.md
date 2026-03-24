# Prompt Architecture & Governance

Este documento descreve a arquitetura modular de prompts que governa o comportamento do assistente do portfólio.

## 1. Estrutura em Camadas

O sistema utiliza uma composição dinâmica de prompts para gerar a resposta final:

1.  **Camada Base (Global)**: Sempre incluída. Define quem é o Diego, as regras de segurança/verdade e o tom de voz.
2.  **Camada de Intenção (Dynamic)**: Injetada quando o roteador identifica o tópico (Stack, Projetos, etc).
3.  **Camada de Audiência (Contextual)**: Injetada se o usuário se identificar como Recrutador ou Técnico.
4.  **Camada de Fallback (Safety)**: Ativada quando não há dados ou há conflito de fontes.

## 2. Diretórios

- `prompts/base/`: Identidade, Segurança, Estilo, Evidência.
- `prompts/intents/`: Stack, Experiência, Projetos, Serviços, Oportunidades.
- `prompts/audiences/`: Recrutador, Técnico.
- `prompts/fallbacks/`: Out of Knowledge Base, Conflitos.

## 3. Fluxo de Composição

O backend deve carregar os arquivos `.txt` e concatená-los na seguinte ordem:
`[BASE] + [INTENT] + [AUDIENCE] + [RAG_CONTEXT]`

## 4. Política de Fallback

- **Pergunta sem resposta na KB**: Usar `prompts/fallbacks/out_of_kb.txt`. Nunca alucinar.
- **Conflito de Informação**: Priorizar `prompts/base/security.txt` e informar o usuário via `prompts/fallbacks/conflict.txt`.
