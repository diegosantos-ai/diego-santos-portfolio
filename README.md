# Diego Santos — Portfólio Profissional

> Presença profissional e hub técnico de Diego Santos. Focado em desenvolvimento de software, automação corporativa, plataformas backend, e engenharia aplicada com IA.

---

## Tese Central

**Perfil**: Engenheiro de Software com forte background analítico (Dados). Especialista em desenhar e construir sistemas escaláveis, pipelines de automação robustos e integrações de back-end. Acredito na Inteligência Artificial como uma extensão das capacidades de engenharia para criar soluções concretas.

**Público-alvo**: Recrutadores, CTOs, Tech Leads e líderes de engenharia buscando um perfil sênior híbrido capaz de navegar entre engenharia de plataforma, backend e automação inteligente.

**Objetivo do Portfólio**: Centralizar publicações técnicas, cases e projetos com densidade de engenharia, abandonando o modelo de currículo superficial para adotar o de hub de conteúdo.

---

## Escopo

### O que faz
- Apresenta cases aprofundados sobre arquitetura de software, automação e integração
- Evidencia a trajetória multidisciplinar de desenvolvimento
- Publica artigos e decisões técnicas
- Estabelece uma plataforma-base para deploy rápido de inovações

### O que NÃO faz (nesta fase)
- Sem APIs expostas com carga viva
- Sem painel de administração

---

## Estado do Projeto

**Fase atual**: Arquitetura de Informação e Reposicionamento (Fase 1 / 2)

Fonte única de verdade: [docs/progresso.md](docs/progresso.md)

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
| Motor de Conteúdo | Markdown (gray-matter) |
| Backend (serving) | Express.js |

**Padrão arquitetural**: SPA monolítica renderizando conteúdo estático a partir de arquivos Markdown (Articles e Cases).

Referência completa: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

---

## Setup Rápido

**Pré-requisitos**: Node.js 20+, pnpm 10+

**1. Clonar e instalar**
```bash
git clone <repo-url>
cd diego-santos-portfolio
pnpm install
```

**2. Iniciar em desenvolvimento**
```bash
pnpm dev
# Abre em http://localhost:3000
```

---

## Como Validar

```bash
# Workflow principal local
pnpm check
pnpm build
```

---

## Governança e Qualidade

- Segurança: Sem secrets hardcoded (obrigatório uso de variáveis ambiente)
- Pull requests estruturados seguindo padronização imposta.

---

*Documentação em Português-BR*
