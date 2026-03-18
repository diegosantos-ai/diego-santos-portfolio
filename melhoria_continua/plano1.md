# Documento Mestre: Plano de Refatoração do Portfólio

**Objetivo:** Transformar o portfólio em uma ferramenta de conversão em 2 minutos.

## 🧭 Diretriz Central

"Tudo que não prova competência ou gera confiança imediata deve ser removido. O foco é clareza, impacto de negócio e senioridade."

## ✅ Fase 1: O "Gancho" (Impacto Imediato)

**Meta:** O recrutador deve entender seu papel e valor antes de tocar no scroll do mouse.

### 1.1 Refatorar o HERO (Topo)

O texto atual foca muito em "quem sou" (estático). Mudar para "o que entrego" (dinâmico).

  - **Arquivo alvo:** `index.html` ou componente `Hero.tsx`
  - **Ação:** Substituir textos pelos abaixo.

| Elemento        | Novo Texto (Copiar e Colar)                                                                                             |
| :-------------: | :---------------------------------------------------------------------------------------------------------------------: |
| **H1 (Título)** | **Engenharia de Dados com Foco em Negócio**                                                                             |
| **H2 (Sub)**    | Construo pipelines robustos, automatizados e focados em confiabilidade para transformar dados brutos em decisões reais. |
| **Diferencial** | *Nota para o agente: Aumentar o tamanho da fonte do H1 e garantir contraste alto.*                                      |

### 1.2 Ajuste de CTAs (Call to Action)

Remover passividade.

  - **Botão Primário:** Ver Projetos (ou Ver Código)
  - **Botão Secundário:** LinkedIn / Email
  - **Regra de Ouro:** Remover qualquer botão "Saiba mais".

## ✅ Fase 2: O Projeto Âncora (TerezIA)

**Meta:** Provar senioridade técnica através de um case real em produção. Tratar o projeto como case de engenharia de IA conversacional.

### 2.1 Estrutura Visual da Seção Case

O agente deve inserir uma seção de destaque **após o Hero** e **antes da seção de diferenciais**.

#### Bloco A: Contexto de Negócio

**Título:** O Desafio do Atendimento Público

**Texto:**

Instituições públicas recebem centenas de perguntas repetitivas diariamente. O desafio não foi apenas criar um chatbot, mas garantir respostas precisas e auditáveis, com proteção ética (Policy Guard) e integração real com Facebook/Instagram via Meta API.

#### Bloco B: Arquitetura RAG

*Diagrama visual com fluxo:*

`Mensagem → Meta Webhook → FastAPI → RAG (ChromaDB) → Gemini → Policy Guard → Resposta Auditada → PostgreSQL`

#### Bloco C: Destaques Técnicos

**Impacto e Diferenciais:**

  - **Pipeline RAG completo:** Embeddings + busca semântica + geração contextualizada.
  - **Policy Guard:** Filtro ético que bloqueia respostas fora do escopo institucional.
  - **Auditoria total:** 100% das interações logadas no PostgreSQL para compliance.
  - **Integração real:** Webhooks HMAC com Meta API validados em produção.

## ✅ Fase 3: Conversão Silenciosa

**Meta:** Disponibilidade sem desespero. Profissionalismo sênior.

### 3.1 Seção "Como posso somar"

Inserir no rodapé ou antes do footer.

**Título:** Como posso contribuir

**Texto:**

Atuação focada em engenharia de dados: ingestão, automação, qualidade e modelagem para analytics. Trago bagagem de gestão para garantir que a solução técnica resolva o problema de negócio real, com comunicação direta e sem over-engineering.

### 3.2 CTA Final

**Botão:** Iniciar conversa (whatsapp “(45) 99929-8275)
