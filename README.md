# Diego Santos — Portfólio Profissional

> Portfólio online de Diego Santos, Data Engineer. Presença profissional para recolocação no mercado de dados.

---

## Problema e Objetivo

**Problema**: Necessidade de presença profissional online consolidada para recolocação como Data Engineer Sênior.

**Público-alvo**: Recrutadores, CTOs e líderes técnicos de empresas de tecnologia e startups.

**Critério de sucesso**: Site publicado com conteúdo real, atualizado e acessível, representando fielmente a trajetória e os projetos de Diego.

---

## Escopo

### O que faz (nesta fase)
- Apresenta trajetória profissional, stack e diferenciais
- Lista projetos relevantes de engenharia de dados
- Publica artigos técnicos em Markdown
- Oferece formas de contato

### O que NÃO faz (nesta fase)
- Sem painel administrativo de conteúdo
- Sem API REST ou banco de dados
- Sem sistema de autenticação
- Sem comentários ou interação de usuários

---

## Estado do Projeto

**Fase atual**: Padronização e Organização (Fase 2)

Fonte única de verdade: [docs/progresso.md](docs/progresso.md)

**Próximos 3 passos**:
1. Preencher seção Hero com dados reais
2. Preencher seção Projetos com projetos reais
3. Configurar e executar deploy de produção

---

## Arquitetura e Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 19 + TypeScript |
| Build | Vite 7 |
| Styling | TailwindCSS v4 |
| UI Components | shadcn/ui + Radix UI |
| Animações | Framer Motion |
| Roteamento | Wouter |
| Backend (serving) | Express.js |
| Package manager | pnpm |

**Padrão arquitetural**: SPA monolítica com servidor de serving estático

Referência completa: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

---

## Estrutura de Pastas

```
diego-santos-portfolio/
├── client/          # Frontend React (Vite)
│   └── src/
│       ├── components/   # Componentes reutilizáveis
│       ├── pages/        # Home, Articles, ArticlePost, NotFound
│       ├── hooks/        # Custom hooks
│       ├── contexts/     # ThemeContext
│       └── lib/          # Utilitários
├── server/          # Express (SPA serving)
├── shared/          # Tipos compartilhados
├── docs/            # Documentação do projeto
│   ├── CONTEXT.md
│   ├── ARCHITECTURE.md
│   └── progresso.md     ← fonte única de verdade
└── recolocacao_diego/   # CVs e materiais
```

---

## Setup Rápido

**Pré-requisitos**: Node.js 20+, pnpm 10+

**1. Clonar e instalar**
```bash
git clone <repo-url>
cd diego-santos-portfolio
pnpm install
```

**2. Configurar variáveis de ambiente**
```bash
cp .env.example .env
# Editar .env com seus valores
```

**3. Iniciar em desenvolvimento**
```bash
pnpm dev
# Abre em http://localhost:3000
```

---

## Como Validar

```bash
# Checar tipos TypeScript
pnpm check

# Formatar código
pnpm format

# Build de produção
pnpm build

# Preview do build
pnpm preview
```

---

## Portas e Configurações

| Serviço | Porta | Observação |
|---------|-------|------------|
| Dev server (Vite) | 3000 | HMR ativado |
| Produção (Express) | `PORT` env | Default 3000 |

---

## Qualidade e Padrões

- Conventional Commits obrigatórios (`feat`, `fix`, `docs`, `chore`, etc.)
- Branches: `main` (produção) → `develop` (integração) → `feature/*` (tarefas)
- Sem hardcode de secrets — usar `.env`
- `.env` no `.gitignore`

---

## Como Validar o Deploy

```bash
# Build completo
pnpm build

# Iniciar servidor de produção
pnpm start

# Verificar em http://localhost:3000
```

---

## Segurança

- Nunca commitar `.env` com valores reais
- Usar `.env.example` como template
- Google Maps API Key via variável de ambiente
- Verificar `.gitignore` antes de qualquer push

---

## Playbook de Referência

Este projeto segue o [diego-playbook](../diego-playbook/) com:

| Arquivo | Uso |
|---------|-----|
| `MY_WAY.md` | System prompt para agentes de IA |
| `docs/progresso.md` | Fonte única de verdade |
| `docs/CONTEXT.md` | Contexto do projeto |
| `docs/ARCHITECTURE.md` | Arquitetura técnica |
| `.env.example` | Template de variáveis |

---

## Histórico

| Data | Mudança |
|------|---------|
| 2026-02-18 | Setup técnico inicial |
| 2026-02-18 | Padronização conforme playbook |

---

*Documentação em Português-BR conforme padrão do playbook.*
