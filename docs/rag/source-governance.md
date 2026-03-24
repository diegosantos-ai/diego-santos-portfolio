# RAG Source Governance

Este documento estabelece as regras de governança para a base de conhecimento (Knowledge Base) do assistente de IA do portfólio. O objetivo é garantir que o assistente sempre forneça respostas alinhadas ao posicionamento profissional atual de Diego Santos, evitando alucinações baseadas em dados legados ou conflitantes.

## 1. Princípios de Governança

1.  **Verdade Canônica**: Existe apenas uma fonte de verdade para identidade e posicionamento.
2.  **Precedência Explícita**: Em caso de conflito, a fonte de maior hierarquia vence automaticamente.
3.  **Exclusão Ativa**: Materiais que não refletem o posicionamento atual devem ser marcados como `legacy` ou `excluded_from_retrieval`.
4.  **Sincronização**: Qualquer alteração no posicionamento profissional deve ser refletida primeiro na base canônica antes de ser propagada para outras fontes.

## 2. Hierarquia de Precedência (Tiering)

| Nível | Categoria | Descrição |
| :--- | :--- | :--- |
| **P0** | **Canonical Authority** | Define quem o Diego é, o que ele faz e como deve ser representado. |
| **P1** | **Operational Instructions** | Define o comportamento e os limites éticos/técnicos do assistente. |
| **P2** | **Technical Evidence** | Detalhes técnicos de projetos, arquiteturas e implementações reais. |
| **P3** | **Contextual Support** | Documentação de apoio, processos de trabalho e histórico. |
| **P9** | **Legacy/Shadow** | Informações antigas, rascunhos ou materiais de transição. |

## 3. Política de Resolução de Conflitos

Quando duas ou mais fontes fornecerem informações divergentes sobre o mesmo tópico, o assistente deve seguir este fluxo de decisão:

1.  **Identificar o nível de precedência** de cada fonte envolvida.
2.  **Descartar a informação de menor precedência**.
3.  Se o conflito persistir no mesmo nível de precedência, priorizar o arquivo com a data de modificação mais recente (`last_modified`).
4.  Se a divergência for sobre **stack técnica**, a `KB_PORTFOLIO_DIEGO_SANTOS_INGEST.md` (P0) é a autoridade final.
5.  Se a divergência for sobre **detalhes de implementação de um projeto específico**, o arquivo em `content/cases/` (P2) provê o detalhe técnico, mas o enquadramento do papel do Diego no projeto deve seguir a P0.

## 4. Manutenção da Base

- **Auditoria Bimestral**: Revisão das fontes `complementary` para garantir que não se tornaram `legacy`.
- **Expurgo de Legacy**: Arquivos marcados como `legacy` devem ser movidos para uma pasta de arquivo ou ter metadados que impeçam sua indexação no motor de busca vetorial.
