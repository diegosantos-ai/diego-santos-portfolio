# ARCHITECTURE.md — Diego Santos Portfolio

> Documentação técnica da arquitetura do projeto.

---

## Visão Geral

Aplicação monorepo com frontend SPA em React e backend Express mínimo (apenas serving).
Não há API REST, banco de dados ou autenticação — apenas entrega de conteúdo estático.

```
┌─────────────────────────────────────────────────────┐
│                   BROWSER                           │
│                                                     │
│   React SPA (Wouter routing)                        │
│   ├── / → Home.tsx                                  │
│   ├── /artigos → Articles.tsx                       │
│   ├── /artigos/:slug → ArticlePost.tsx              │
│   └── * → NotFound.tsx                              │
└───────────────────────┬─────────────────────────────┘
                        │ HTTP
┌───────────────────────▼─────────────────────────────┐
│              Express.js Server                      │
│                                                     │
│   Serve static files from dist/public/              │
│   Fallback: todas as rotas → index.html (SPA)       │
│   Porta: process.env.PORT || 3000                   │
└─────────────────────────────────────────────────────┘
```

---

## Estrutura de Pastas

```
diego-santos-portfolio/
│
├── client/                         # Frontend React (Vite)
│   ├── src/
│   │   ├── main.tsx                # Entry point React
│   │   ├── App.tsx                 # Rotas com Wouter
│   │   ├── index.css               # TailwindCSS + variáveis globais
│   │   ├── const.ts                # Constantes do cliente
│   │   │
│   │   ├── components/             # Componentes reutilizáveis
│   │   │   ├── ErrorBoundary.tsx   # Tratamento de erros React
│   │   │   ├── ManusDialog.tsx     # Dialog AI (Manus platform)
│   │   │   ├── Map.tsx             # Google Maps
│   │   │   ├── GitHubActivity.tsx  # Feed de atividade GitHub
│   │   │   └── ui/                 # shadcn/ui components (60+)
│   │   │
│   │   ├── contexts/
│   │   │   └── ThemeContext.tsx    # Dark/Light theme
│   │   │
│   │   ├── hooks/
│   │   │   ├── useComposition.ts
│   │   │   ├── useMobile.tsx       # Detecção mobile
│   │   │   └── usePersistFn.ts
│   │   │
│   │   ├── lib/
│   │   │   └── utils.ts            # Utilitários (cn, etc.)
│   │   │
│   │   └── pages/
│   │       ├── Home.tsx            # Página principal
│   │       ├── Articles.tsx        # Listagem de artigos
│   │       ├── ArticlePost.tsx     # Artigo individual (Markdown)
│   │       └── NotFound.tsx        # 404
│   │
│   └── public/
│       └── images/                 # Assets estáticos
│
├── server/
│   └── index.ts                    # Express: static serving + SPA fallback
│
├── shared/
│   └── const.ts                    # Tipos/constantes compartilhados
│
├── docs/                           # Documentação do projeto (playbook)
│   ├── CONTEXT.md                  # Contexto e objetivo
│   ├── ARCHITECTURE.md             # Este arquivo
│   └── progresso.md                # Fonte única de verdade do status
│
├── .agent/                         # Configuração de agentes de IA
│   ├── rules/GEMINI.md             # Regras operacionais dos agentes
│   ├── agents/                     # 20 agentes especialistas (playbook)
│   ├── skills/                     # Biblioteca de skills (50+)
│   └── workflows/                  # Workflows de orquestração (11)
│
├── recolocacao_diego/              # CVs e materiais de recolocação
│   ├── DIEGO_SANTOS.md
│   ├── CV_Diego_Santos_DataEngineer_v2.pdf
│   ├── CV_Diego_Santos_DataEngineer_STARTUPS.pdf
│   └── CV_Diego_Santos_DataEngineer_ENTERPRISE.pdf
│
├── dist/                           # Build output (gerado, não versionado)
├── node_modules/                   # Dependências pnpm (não versionado)
│
├── .env.example                    # Template de variáveis de ambiente
├── .gitignore
├── .prettierrc
├── components.json                 # shadcn/ui config
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── ideas.md                        # Brainstorm de design (referência)
├── MY_WAY.md                       # System prompt para agentes de IA
└── README.md                       # Documentação principal
```

---

## Fluxo de Build

```
DEV:
  pnpm dev → Vite (port 3000, HMR) → client/src/

PRODUÇÃO:
  pnpm build →
    1. vite build     → dist/public/ (frontend estático)
    2. esbuild        → dist/index.js (servidor Express bundle)

  pnpm start →
    NODE_ENV=production node dist/index.js
    └── Serve dist/public/
    └── Fallback SPA: qualquer rota → index.html
```

---

## Dependências Principais

### Frontend (client/)

| Pacote | Propósito |
|--------|-----------|
| `react` + `react-dom` | Framework UI |
| `typescript` | Tipagem estática |
| `vite` | Build tool + dev server |
| `tailwindcss` | Utility-first CSS |
| `@radix-ui/*` | Primitivos acessíveis (base do shadcn) |
| `framer-motion` | Animações |
| `wouter` | Roteamento leve |
| `react-hook-form` + `zod` | Forms com validação |
| `recharts` | Gráficos |
| `react-markdown` | Renderização de Markdown (artigos) |
| `next-themes` | Dark/Light mode |
| `axios` | HTTP client |
| `lucide-react` | Ícones |
| `sonner` | Toast notifications |

### Backend (server/)

| Pacote | Propósito |
|--------|-----------|
| `express` | Servidor HTTP |
| `esbuild` | Bundle do servidor para produção |
| `tsx` | TypeScript executor (dev) |

---

## Configurações Importantes

### Path Aliases (tsconfig.json)

```json
"@/*"       → "./client/src/*"
"@shared/*" → "./shared/*"
```

### Vite (vite.config.ts)

- **Root**: `client/`
- **Dev port**: 3000
- **Build output**: `dist/`
- **Plugins**: React, TailwindCSS, JSX location tracking, Manus runtime (dev only)
- **Base path**: Configurável via env (`VITE_BASE_PATH`) para deploy em subdiretório

### Prettier (.prettierrc)

- Double quotes, semi, trailing comma ES5, 80 chars, 2 spaces

---

## Pontos de Atenção

1. **Sem testes**: Vitest está instalado mas sem arquivos de teste escritos
2. **Sem CI/CD**: Nenhum workflow GitHub Actions configurado
3. **Manus runtime**: Dependência de plataforma proprietária no vite.config — apenas em dev
4. **Google Maps**: Requer `VITE_GOOGLE_MAPS_API_KEY` no `.env`
5. **Artigos**: Conteúdo via Markdown + gray-matter — sem CMS externo

---

## Próxima Evolução (Backlog)

Ver `docs/progresso.md` seção Backlog.

---

*Última atualização: 2026-02-18*
