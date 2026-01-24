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

## ✅ Fase 2: O Projeto Âncora (CNPJ)

**Meta:** Provar senioridade técnica através da narrativa, não apenas do código. Tratar o projeto como um case de engenharia.

### 2.1 Estrutura Visual da Página do Projeto

O agente deve inserir estes blocos **antes** de mostrar qualquer linha de código.

#### Bloco A: Contexto de Negócio

**Título:** O Desafio dos Dados Públicos

**Texto:**

Dados públicos de CNPJ são volumosos, inconsistentes e nativamente inviáveis para análise direta. O desafio deste projeto não foi apenas a ingestão, mas garantir a confiabilidade dos dados e uma evolução segura da base (schema evolution) sem quebrar o consumo na ponta.

#### Bloco B: Decisões de Arquitetura (O "Pulo do Gato")

*Solicitar ao agente que gere um gráfico Mermaid.js com este fluxo:*

`Fonte Bruta (Receita) -> Ingestão (Python) -> Bronze (Raw) -> Tratamento/Qualidade -> Silver (Trusted) -> Postgres/Analytics`

#### Bloco C: Decisões de Engenharia (Bullet Points)

**Destaques Técnicos:**

  - **Pipeline Faseado:** Redução de risco e facilidade de debug.
  - **Carga Incremental:** Lógica baseada no estado atual do banco para evitar reprocessamento total.
  - **Tratamento de Falhas:** Dados parciais são tratados explicitamente como exceção controlada, não como erro silencioso.

## ✅ Fase 3: Conversão Silenciosa

**Meta:** Disponibilidade sem desespero. Profissionalismo sênior.

### 3.1 Seção "Como posso somar"

Inserir no rodapé ou antes do footer.

**Título:** Como posso contribuir

**Texto:**

Atuação focada em engenharia de dados: ingestão, automação, qualidade e modelagem para analytics. Trago bagagem de gestão para garantir que a solução técnica resolva o problema de negócio real, com comunicação direta e sem over-engineering.

### 3.2 CTA Final

**Botão:** Iniciar conversa (whatsapp “(45) 99929-8275)
