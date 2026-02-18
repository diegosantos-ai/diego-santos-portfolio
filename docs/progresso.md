# Progresso — Diego Santos Portfolio

> Fonte única de verdade do status do projeto.
> Atualizar após cada entrega.

---

## Fase Atual: Padronização e Organização (Fase 2)

---

### ✅ Concluído

- [x] Setup técnico inicial — React 19 + TypeScript + Vite + TailwindCSS (2026-02-18)
- [x] Estrutura de componentes base — shadcn/ui + Radix (2026-02-18)
- [x] Design system definido — IBM Plex Mono + Inter, paleta dark/neon (2026-02-18)
- [x] Roteamento configurado — Wouter + páginas Home, Articles, ArticlePost, 404 (2026-02-18)
- [x] Dark/Light mode — ThemeContext + next-themes (2026-02-18)
- [x] Configuração `.agent/` — skills e workflows para agentes de IA (2026-02-18)
- [x] Criado `docs/CONTEXT.md` — contexto do projeto (2026-02-18)
- [x] Criado `docs/ARCHITECTURE.md` — arquitetura técnica (2026-02-18)
- [x] Criado `docs/progresso.md` — fonte única de verdade (2026-02-18)
- [x] Criado `README.md` — documentação principal no formato playbook (2026-02-18)
- [x] Criado `.env.example` — template de variáveis de ambiente (2026-02-18)
- [x] Atualizado `.agent/rules/GEMINI.md` — sincronizado com playbook completo (2026-02-18)
- [x] Copiado `.agent/agents/` — 20 agentes especialistas do playbook (2026-02-18)

---

### 🔄 Em Andamento

*(vazio — aguardando próxima instrução)*

---

### 📋 Próximas (Fase 3 — Conteúdo)

- [x] Preencher seção Hero com dados reais (2026-02-18)
- [x] Preencher seção Projetos com projetos reais (2026-02-18)
- [x] Preencher seção Habilidades/Stack com stack atual — 6 categorias: dados, cloud, devops, IA, arquitetura, linguagens (2026-02-18)
- [x] Preencher seção Sobre com trajetória profissional (2026-02-18)
- [x] Configurar seção Contato — email, LinkedIn, GitHub, WhatsApp, telefone (2026-02-18)
- [ ] Criar primeiros artigos técnicos em Markdown

---

### 📋 Próximas (Fase 4 — Deploy)

- [x] Escolher plataforma — Vercel (2026-02-18)
- [x] Criar `vercel.json` — build estático, SPA routing, pnpm (2026-02-18)
- [x] Adicionar script `build:client` no package.json (2026-02-18)
- [x] Domínio definido — `diegosantos.me` (GitHub Student Pack, 1 ano free) (2026-02-18)
- [ ] Push para GitHub e importar projeto no Vercel
- [ ] Adicionar domínio `diegosantos.me` no painel Vercel
- [ ] Configurar DNS no registrador (Namecheap) com os registros do Vercel
- [ ] Validar deploy em `https://diegosantos.me`

---

### 📋 Próximas (Fase 5 — Portfólio Vivo)

> Objetivo: o portfólio reflete o que Diego está **efetivamente fazendo agora** — projetos reais, stack real, atividade real.

**GitHub Integration (atividade e projetos reais)**
- [ ] Integração com GitHub API — listar repos reais com linguagem, stars, descrição
- [ ] Seção "Atividade Recente" — commits, PRs, contribuições dos últimos 30 dias
- [ ] Filtrar repos por tópico/tag (ex: `data-engineering`, `automation`, `infra`, `hexagonal`)
- [ ] Exibir projetos em destaque via GitHub Topics ou lista curada no código

**Stack Dinâmico (o que Diego usa hoje)**
- [ ] Seção "Stack Atual" — tecnologias organizadas por categoria:
  - Dados: Python, PostgreSQL, FastAPI, dbt, Airflow, n8n
  - Cloud e Infra: AWS (EC2, S3, Lambda, RDS), Docker, Terraform (se aplicável)
  - DevOps: GitHub Actions, CI/CD pipelines
  - Gestão: Jira, Confluence
  - Arquitetura: Hexagonal, DDD, Event-driven
- [ ] Indicador visual de "usando agora" vs "já usei" por tecnologia
- [ ] Destaque para projetos de automação hexagonal e infra

**Conteúdo vivo**
- [ ] Template para artigos técnicos — facilitar publicação de aprendizados reais
- [ ] Seção "O que estou construindo" — projetos em andamento (alimentado manualmente ou via GitHub)

---

## Backlog (não priorizado)

- GitHub Actions para CI/CD do portfólio (lint + build automático)
- Testes unitários com Vitest
- Testes E2E com Playwright
- Lighthouse audit automatizado
- Google Analytics ou Plausible para analytics
- RSS feed para artigos
- Sitemap.xml para SEO
- Internacionalização (PT-BR + EN)
- Webhook para atualizar portfólio automaticamente ao fazer push no GitHub

---

## Histórico

| Data | Mudança | Validação |
|------|---------|-----------|
| 2026-02-18 | Setup técnico inicial | `pnpm dev` funcional |
| 2026-02-18 | Padronização conforme playbook — docs criados, GEMINI.md e agents sincronizados | Estrutura de pastas validada |
