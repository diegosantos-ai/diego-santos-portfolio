# Readiness Técnico para Refatoração
**Objetivo:** Diagnosticar o estado técnico real do projeto para guiar uma refatoração segura, estruturada e aderente ao novo posicionamento profissional (Engenharia de Software, Backend, Sistemas Distribuídos e Plataforma).

---

## 1. Resumo Executivo
O projeto é um Monorepo modesto que utiliza o paradigma de SPA (Single Page Application) hospedada e envelopada sob um backend estático em "Express.js". Não há banco de dados e as complexidades de estado são mínimas. A fundação de código é bem estruturada em React 19 + Vite 7, porém acumula "boilerplate" (ferramental de UI não utilizado) e há uma mistura entre dados mockados no código (`const`) e leitura de Content usando Glob/Markdown, o que precisará ser unificado caso o projeto evolua os `Cases de Engenharia` como páginas densas. A refatoração tem **baixo risco estrutural**, mas exigirá atenção pela **ausência total de uma suíte de testes de regressão**.

---

## 2. Inventário Técnico do Projeto (Stack Real)
* **Frontend Core:** React 19.2.1, Typescript 5.6.3
* **Build/Dev Tooling:** Vite 7.1.7, pnpm (PackageManager) com `patchedDependencies` em `wouter`
* **Roteamento:** Wouter 3.3.5 (Minimalista, baseado em hooks) 
* **Styling/UI:** TailwindCSS v4, Biblioteca de componentes enorme baseada em `shadcn/ui` e `@radix-ui/*` (+60 primitivos no diretório `/ui`)
* **Motion:** framer-motion, tailwindcss-animate
* **Gestão de Conteúdo (CMS-less):** `gray-matter` e `react-markdown` operando junto de `import.meta.glob` do Vite para ler `.md` textuais dinamicamente para os Artigos.
* **Serving (Backend):** Express 4.x processado via ESBuild.
* **Qualidade de Código:** Linting estático via tsc (`pnpm check`) e Prettier.

---

## 3. Estrutura Real de Páginas, Componentes e Fluxos
Atualmente, o entrypoint do aplicativo é instanciado em `client/src/App.tsx`, envelopando um `<Switch>` estrito do gerador Wouter sob o header `<Navigation />`.

**Fluxo atual de roteamento em `App.tsx`:**
* `/` -> `Home.tsx`
* `/sobre` -> `About.tsx`
* `/habilidades` -> `Skills.tsx`
* `/projetos` -> `Projects.tsx`
* `/artigos` -> `Articles.tsx`
* `/artigos/:slug` -> `ArticlePost.tsx` (Única rota dinâmica real)
* `/contato` -> `Contact.tsx`

**Como os dados são abastecidos:**
Existem duas camadas híbridas de fonte de verdade lidando com a renderização:
1. **Mockado no código-fonte (.tsx):** Páginas como `Projects.tsx` e `Skills.tsx` possuem contêineres e textos fixados dentro de constantes como `const PROJECTS = [...]` e `const SKILL_CATEGORIES`. Isso as fixa em layouts rígidos prejudicando o *Deep Dive*.
2. **Sistema de Arquivos MD (.ts):** Por meio de `client/src/lib/articles.ts`, a base processa dinamicamente a pasta raiz `client/src/content/articles/*.md`.

---

## 4. Dependências e pontos de acoplamento
* **Acoplamento UI:** A base depende imensamente do `shadcn/ui`, injetado localmente na pasta `components/ui/`. Muitos componentes (como Carousel, Charts, OTP, Calendar) foram adicionados mas **nunca utilizados**, enchendo a codebase de arquivos inativos.
* **Componentes de Terceiros (Side-effects):** `ManusDialog.tsx` e o `vite-plugin-manus-runtime` têm forte acoplamento no Vite process lifecycle (inserindo tags customizadas para coleta de logs no `index.html`). O `Google Maps` também aparece acoplado (em `components/Map.tsx`).
* **Wouter Patched:** Existe uma cláusula declarada em `pnpm-lock` e no `package.json` de: `"patchedDependencies": { "wouter@3.7.1": "patches/wouter@3.7.1.patch" }`, indicando um bypass/fix manual que não deve ter a versão alterada sob risco de quebra da SPA.

---

## 5. Divergências entre documentação e implementação
* Na leitura do documento técnico raiz (`docs/ARCHITECTURE.md`), a topologia do Switch Wouter lista apenas rotas `/`, `/artigos` e `*`. Ele **omite inteiramente** o escopo e as rotas de `/sobre`, `/habilidades`, `/projetos` e `/contato` presentes na real implementação em código-fonte `App.tsx`.
* A documentação assinala Vitest como framework adotado. No entanto, sua implementação e cobertura de arquivos em `test/` e arquivos `.spec.ts` é inexistente.
* Em `docs/CONTEXT.md`, ele delimita a persona global restrita à `Data Engineer`, fato completamente rebatido com sua nova tese de reposicionamento (Software/Backend Engineer).

---

## 6. Débitos Técnicos e Fragilidades
1. **Zero Testes (Fragilidade Alta):** Não temos suíte Vitest/Playwright implementada. Qualquer remoção condicional no `Wouter` ou no `Navigation.tsx` resultará em um "deploy cego".
2. **Fat UI Bundle:** Pastas gigantes com `components/ui` (60+ arquivos, + de 300kb raw source) onde mais de 50% não deve estar em uso sob a view do usuário.
3. **Hardcoded State:** Para transformar a listagem de Projetos superficiais em "Páginas Profundas Arquiteturais" (Cases de Sistema/Cloud), a página `Projects.tsx` hoje baseada num `Array[]` constante é um débito inviável. Precisará ser migrada para o formato de Leitura Local (`MD`).

---

## 7. Riscos de Refatoração
* **Risco de Roteamento (Moderado):** Wouter com Patch personalizado. Remover as páginas `/sobre` e `/habilidades` precisa ser feito com atenção para refletir simultaneamente na declaração do Navigation.
* **Regressão de Build (Fácil de prevenir):** Ao deletar views e renomear arquivos de `Projects` para `Cases` por exemplo, imports circulares (`lib/utils.ts`, `components/ui`) podem falhar a build estrita do TypeScript e Vite se não rodarmos o `tsc --noEmit`. 
* **Risco Visual (Baixo):** Como a base visual conta com TailwindCSS, as remoções de páginas não propagam vazão de bugs visuais em cascata.

---

## 8. Critérios de Validação
Antes, durante e pós a refatoração, o desenvolvedor (ou agente) deve se balizar pelos seguintes validadores automáticos limitantes:
*  **Checagem TS Estrita:** O comando `pnpm check` (tsc --noEmit) obrigatoriamente deve retornar ZERO erros de import após a fusão de componentes da Home.
* **Build Saudável:** A refatoração SPA deve respeitar a esteira `pnpm build` finalizando Vite Client + ESBuild Express sem Warnings impeditivos.
* **Roteamento de ErrorBoundary:** As rotas deletadas que já foram publicadas (`/habilidades`) precisam ter seu tráfego jogado apropriadamente de volta à Home (ou renderizar 404).
* **Navegação SPA:** Não pode haver travamento de clique nem "refresh de página de navegador real" durante o clique de um caso publicado do portfólio (preservando o wouter `Link`).

---

## 9. Recomendações técnicas priorizadas
1. **Unificar Motor de Conteúdo (High Priority):** Mover dados brutos dos Projetos (Backend, Sistemas) da constante suja do TSX para um diretório como `/content/cases/*.md`, reutilizando a lógica que hoje renderiza os Artigos usando `gray-matter`. Isso te permite aprofundar diagramas em System Design sem sujar os componentes visuais.
2. **Purgar Códigos Zumbis de UI (Mid Priority):** Após estabilidade das páginas primordiais (Home + Cases), passar um scanner para limpar os primitivos Radix e as páginas não acionadas (About.tsx, Contact.tsx).
3. **Configurar Pipeline Mínima (Mid Priority):** Adicionar no `.github/workflows/` um lint/check automatizado.

---

## 10. Sequência sugerida de execução
A fim de conter os riscos de quebra do monorepo, a refatoração estrutural operará em 4 commits:
* **Fase 1:** Atualizar os textos centrais na `Home.tsx` aplicando o reposicionamento em código ativo, absorvendo blocos limpos de `Sobre` no componente primário.
* **Fase 2:** Migração de Rotas. Eliminar `/sobre`, `/contato`, `/habilidades`. Limpar o `App.tsx` e injetar a lógica que converte "Cards de Projetos" para URLs dinâmicas `/casos/:id`.
* **Fase 3:** Refatorar Motor MD. Escrever o script que injeta "Cases de Arquitetura", permitindo mostrar proezas em IA e Backend (via pastas Markdown).
* **Fase 4:** Teste de Integração & Estabilidade (Rodar checks, build local, rodar `pnpm dev` sob validações e purgar o arquivo UI sem utilidade).