# CONTEXT.md — Diego Santos Portfolio

> Documento de contexto do projeto. Leitura obrigatória antes de qualquer ação.

---

## Problema e Objetivo

**Problema**: Diego Santos precisa de presença profissional online consistente para recolocação no mercado como Data Engineer Sênior.

**Público-alvo**:
- Recrutadores de empresas de tecnologia
- CTOs e líderes técnicos de startups
- Empresas enterprise em busca de especialistas em dados

**Critério de sucesso**:
- Site publicado, acessível e funcional com conteúdo real
- Apresenta projetos, habilidades e trajetória profissional
- Atualizável sem dificuldade técnica (conteúdo vivo)

---

## O que o projeto é

- Portfólio pessoal de Data Engineer
- SPA (Single Page Application) em React + TypeScript
- Seções: Hero, Projetos, Artigos técnicos, Sobre, Contato
- Estilo: Minimalismo técnico com acentos dinâmicos (Swiss minimalism + digital modernism)
- Referências visuais: Stripe, Vercel, Linear

## O que o projeto NÃO é (nesta fase)

- Não tem backend de API (apenas serving estático)
- Não tem sistema de autenticação
- Não tem banco de dados
- Não tem painel administrativo para conteúdo

---

## Stack Tecnológica

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Frontend | React + TypeScript | 19.x + 5.6 |
| Build | Vite | 7.x |
| Styling | TailwindCSS v4 | 4.x |
| UI Components | shadcn/ui + Radix UI | — |
| Animações | Framer Motion | 12.x |
| Roteamento | Wouter | 3.x |
| Forms | React Hook Form + Zod | — |
| Charts | Recharts | 2.x |
| Backend (serving) | Express.js | 4.x |
| Bundle server | esbuild | 0.25 |
| Package manager | pnpm | 10.x |

---

## Design System

- **Tipografia**: IBM Plex Mono (títulos) + Inter (corpo)
- **Paleta**: Background preto/dark gray + acentos neon (electric blue `#0066FF`, neon green `#00FF88`)
- **Animações**: Fade-in, slide-up, hover efeitos sutis
- **Elementos**: Linhas geométricas, métricas destacadas, snippets de código decorativos
- **Tema**: Dark/Light mode com `next-themes`

---

## Decisões Arquiteturais

| Decisão | Escolha | Motivo |
|---------|---------|--------|
| Routing | Wouter (não React Router) | Menor bundle, suficiente para SPA simples |
| Backend | Express minimal | Apenas serving de SPA — sem necessidade de API real |
| Monorepo | `client/` + `server/` + `shared/` | Separação clara de responsabilidades |
| UI Library | shadcn/ui | Componentes acessíveis sem lock-in de estilo |
| CSS | TailwindCSS v4 | Zero-config, performance máxima em build |

---

## Estrutura de Rotas

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `/` | `Home.tsx` | Landing page principal |
| `/artigos` | `Articles.tsx` | Listagem de artigos técnicos |
| `/artigos/:slug` | `ArticlePost.tsx` | Artigo individual |
| `*` | `NotFound.tsx` | Página 404 |

---

## Contexto Profissional do Diego

- **Cargo alvo**: Data Engineer Sênior / Tech Lead de Dados
- **CVs disponíveis**: versão genérica (v2), startups, enterprise (pasta `recolocacao_diego/`)

### Stack Técnico Atual (o que usa efetivamente)

| Categoria | Tecnologias |
|-----------|------------|
| **Dados** | Python, PostgreSQL, FastAPI, dbt, Airflow, n8n, pgvector |
| **Cloud** | AWS (EC2, S3, Lambda, RDS, CloudWatch) |
| **DevOps** | GitHub Actions, Docker, CI/CD pipelines |
| **Arquitetura** | Hexagonal Architecture, DDD, Event-driven, Automação |
| **Gestão** | Jira, Confluence |
| **IA/ML** | LLMs (Anthropic, OpenAI), RAG, MLflow, ChromaDB |
| **Infra** | Linux, Terraform (explorando), redes, monitoramento |

### Projetos em andamento (exemplos a destacar no portfólio)

- **Automação hexagonal** — sistemas complexos com arquitetura hexagonal e automação de processos
- **Projetos de infra** — infraestrutura como código, observabilidade, pipelines robustos
- **Agentes de IA** — automação com LLMs, RAG, agentes multimodais
- **Pipelines de dados** — ETL/ELT com Python, dbt, Airflow

### Diferencial

Engenharia de dados + automação de processos com IA + visão de arquitetura de sistemas complexos

---

## Referências

- Playbook: `C:\Users\santo\diego-playbook\`
- Design decisions: `ideas.md` na raiz do projeto
- Progresso: `docs/progresso.md`
- Arquitetura técnica: `docs/ARCHITECTURE.md`

---

*Última atualização: 2026-02-18*
