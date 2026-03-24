# RAG Source Priority Matrix

Esta matriz classifica todos os arquivos e diretórios do repositório quanto à sua utilidade e autoridade para o sistema RAG.

## 1. Classificação de Fontes

| Fonte | Caminho / Padrão | Classificação | Nível | Descrição |
| :--- | :--- | :--- | :--- | :--- |
| **Identidade Canônica** | `docs/KB_PORTFOLIO_DIEGO_SANTOS_INGEST.md` | `canonical` | P0 | A fonte de verdade absoluta sobre o perfil. |
| **System Prompts** | `docs/SYSTEM_PROMPTS_PORTFOLIO.md` | `canonical` | P1 | Instruções de comportamento e enquadramento. |
| **Casos de Uso** | `content/cases/*.md` | `complementary` | P2 | Evidência técnica e detalhes de projetos. |
| **Arquitetura do Site** | `docs/ARCHITECTURE.md` | `complementary` | P2 | Detalhes sobre como este portfólio foi construído. |
| **Contexto do Projeto** | `docs/CONTEXT.md` | `complementary` | P3 | Visão geral e objetivos do repositório. |
| **README Principal** | `README.md` | `complementary` | P3 | Visão geral rápida para visitantes. |
| **Currículo Oficial** | `docs/curriculo_diego_santos.pdf` (TBD) | `complementary` | P2 | Dados biográficos e cronológicos. |
| **Documentos RAG** | `docs/rag/*.md` | `canonical` | P1 | Regras de governança do próprio assistente. |
| **READMEs de Projetos** | `projects/**/README.md` | `legacy` | P9 | Materiais antigos que podem conter títulos obsoletos. |
| **Código Fonte** | `client/src/**/*`, `server/**/*` | `excluded` | - | Ruído para recuperação de conteúdo semântico. |
| **Configurações** | `package.json`, `tsconfig.json`, etc. | `excluded` | - | Metadados técnicos irrelevantes para o usuário final. |

## 2. Regras de Ingestão por Classe

### `canonical` (P0-P1)
- **Ingestão**: Obrigatória.
- **Peso Vetorial**: Alto.
- **Refresh**: Imediato após alteração.

### `complementary` (P2-P3)
- **Ingestão**: Recomendada para profundidade.
- **Peso Vetorial**: Normal.
- **Refresh**: Sob demanda ou ciclo semanal.

### `legacy` (P9)
- **Ingestão**: **PROIBIDA**.
- **Uso**: Apenas para histórico humano, nunca para o assistente de IA.
- **Ação**: Devem possuir o metadado `rag_ignore: true`.

### `excluded`
- **Ingestão**: Ignorada por padrão pelo crawler/loader.
- **Ação**: Adicionar aos padrões de exclusão do loader RAG.

## 3. Mapeamento de Conflitos Comuns

| Tópico | Fonte Vencedora (Winner) | Fonte Perdedora (Loser) | Justificativa |
| :--- | :--- | :--- | :--- |
| **Cargo/Título** | `KB_PORTFOLIO...INGEST.md` | `README.md` antigo | Alinhamento com o novo posicionamento de AI Engineer. |
| **Stack Técnica** | `KB_PORTFOLIO...INGEST.md` | Arquivos de configuração | A KB reflete o que o Diego *domina* e *quer vender*, não apenas o que está instalado. |
| **Experiência** | `KB_PORTFOLIO...INGEST.md` | LinkedIn (se houver divergência) | A KB contém o enquadramento narrativo estratégico para a transição de carreira. |
