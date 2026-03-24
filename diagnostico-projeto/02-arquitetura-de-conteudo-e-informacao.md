# Diagnóstico de Arquitetura de Conteúdo e Informação
**Objetivo:** Avaliar a estrutura de navegação e a organização de informações do portfólio, diagnosticando sua eficácia para comunicar um perfil focado em Desenvolvimento, Automação, Backend, Integração de Sistemas e Maturidade de Engenharia.

---

## 1. Resumo Executivo
A estrutura atual do portfólio segue uma arquitetura informacional clássica de "site institucional" ou "currículo web" tradicional. Ela fragmenta os ativos do candidato em silos genéricos (`Sobre`, `Habilidades`, `Projetos`), o que dilui a densidade técnica e aumenta a fricção (cliques) para que um líder técnico encontre as **provas concretas** de sua engenharia. Para um profissional de Backend/Plataforma, a arquitetura de conteúdo não deve ser apenas uma "vitrine" de resumos textuais, mas sim uma documentação viva (Case Studies, Architecture Diagrams, Post-mortems) que comprove maturidade técnica de ponta a ponta.

---

## 2. Mapa da estrutura atual
Baseado no componente `client/src/components/Navigation.tsx` e no mapeamento de páginas em `client/src/pages/`, a taxonomia atual é plana (Flat Architecture) com seis nós principais:

```text
/ (Home.tsx) -> Hero Section + Teaser de Projetos
├── /sobre (About.tsx) -> Textos longos de biografia
├── /habilidades (Skills.tsx) -> Grid isolado de ferramentas e stacks
├── /projetos (Projects.tsx) -> Coleção linear de cards de projetos
├── /artigos (Articles.tsx) -> Lista de publicações técnicas em Markdown
└── /contato (Contact.tsx) -> Página exclusiva para links de contato
```

---

## 3. Avaliação da navegação e hierarquia de informação
- **Fricção Cognitiva:** O fluxo separa rigidamente "o que eu sei usar" (`/habilidades`) de "o que eu construí" (`/projetos`). Na engenharia de software madura, habilidades só importam no contexto da execução.
- **Peso Desproporcional:** Existe o mesmo peso de menu para `Contato` e `Projetos`. Páginas puramente burocráticas ganham protagonismo indevido.
- **Falta de Profundidade Progressiva (Progressive Disclosure):** O visitante não consegue "mergulhar" em um projeto. Ao clicar em um projeto em `client/src/pages/Projects.tsx`, o usuário é jogado para fora do site (para o GitHub). Não há uma view de "Detalhes do Sistema" no próprio portfólio.

---

## 4. Avaliação por página principal

* **`Home.tsx`:** Funciona bem como landing page, mas o *teaser* de projetos falha ao não ter link interno para um detalhamento profundo arquitetural, forçando a saída prematura do engajador.
* **`Projects.tsx`:** Atualmente atua como uma vitrine superficial. Embora os textos de Problema/Solução sejam bons, as respostas visuais são nulas. Não há diagramas DFD (Data Flow Diagrams), manifestos de infra ou recortes de código (`snippets`). Mostra o "o que", mas esconde o "como" (que é o que um Engineering Manager de Backend quer ver).
* **`Skills.tsx`:** Um catálogo estático de tecnologias encavaladas. Dizer que conhece "Docker" e "Terraform" em um *card* não prova proficiência em orquestração de infraestrutura.
* **`Articles.tsx`:** Esta é hoje a seção mais densa (com *Hexagonal Data Pipelines*, *TerezIA*, etc.), mas ela compete por atenção com as páginas institucionais em vez de ser a espinha dorsal do portfólio.
* **`About.tsx` e `Contact.tsx`:** Excesso de conteúdo institucional para um profissional Sênior. Recrutadores buscam resultados; um parágrafo sobre biografia na Home é suficiente.

---

## 5. Lacunas de conteúdo e prova (Evidências Faltantes)

Para sustentar o posicionamento "Automação, Backend e Maturidade de Engenharia", faltam peças arquitetônicas essenciais:

1. **Automação e CI/CD:** Não há provas de pipeline. Nenhum arquivo de projeto detalha *Github Actions*, *GitLab CI* ou esteiras de qualidade.
2. **Desenvolvimento e Backend:** Ausência de documentação de APIs (citar Swagger/OpenAPI), testes de carga ou decisões de design de sistema (System Design).
3. **Integração e Infraestrutura:** Os cards dizem "Terraform" e "AWS", mas o portfólio não mostra nenhum diagrama de Cloud (ex: VPCs, subnets, lambdas) dentro dos cases.
4. **Observabilidade:** Nenhuma menção a telemetria, logs ou métricas (Prometheus, Grafana, Datadog), vitais para quem gerencia sistemas críticos.
5. **Documentação Técnica:** Falta de *Design Docs* ou *RFCs* na exposição dos projetos.

---

## 6. Seções/páginas que precisam ser fundidas, removidas ou reordenadas

* **REMOVER:** `/contato` (links sociais, e-mail e CV devem viver globalmente no rodapé e no Navbar).
* **FUNDIR:** `/sobre` e `/habilidades`. Devem ser agrupadas em uma subseção menor na própria `Home` chamada `Meu Perfil` ou dissolvidas sob a rubrica da biografia curta.
* **REORDENAR:** Elevar os `Artigos` e transformá-los/integrá-los com a área de `Projetos`. Um artigo bem escrito **é** a prova documental de um projeto (um Case Study).

---

## 7. Seções/páginas que deveriam existir (A Criar)

1. **`Case Studies` / `/projetos/[slug]`**: Cada projeto grande deve possuir uma página própria dentro do portfólio (ex: `/projetos/nexo-flux`). Essa página deve conter:
   - Diagrama de Arquitetura (usando componente de imagem ou Mermaid.js)
   - Snippets de código de decisões difíceis
   - Manifestos CI/CD ou IaC resumidos
2. **`Engenharia ao Vivo (Live Activity)`**: Como o portfólio é React 19/Vite, usar componentes (como ex: `GitHubActivity.tsx`) na primeira página evidenciando PRs recentes, commits e atividade Open Source, garantindo a percepção "mão na massa".

---

## 8. Proposta de nova arquitetura informacional

```text
/ (Home / Hub de Engenharia)
├── Hero (Nova Tese Híbrida)
├── Selected Case Studies (Mergulho profundo em 2-3 projetos com arquitetura)
├── Live Git Activity (O que estou codando nesta semana)
└── Resumo Biográfico e Stack embasada

/casos (Substitui "Projetos" e "Habilidades")
├── /casos/nexo-flux (Página Interna com Diagramas, Code Snippets, System Design)
├── /casos/data-streamer (Idem)
└── /casos/ai-pipelines (Idem)

/publicacoes (Antigo "Artigos")
└── /publicacoes/[slug] (Artigos de arquitetura, System Design Docs e RFCs)

[Global UI]
└── Sticky Footer/Header: LinkedIn, Github, Email e Download CV. (Elimina Sobre/Contato)
```

---

## 9. Backlog priorizado de refatoração estrutural

1. **Top Priority (`client/src/components/Navigation.tsx`):**
   * Excluir rotas de "Contato", "Habilidades" e fundir "Sobre" na Home. Limpar Navbar para foque puramente técnico: `Home`, `Cases de Engenharia`, `Publicações`.
2. **High Priority (`client/src/pages/Projects.tsx` -> Transformação em Cases):**
   * Refatorar sistema de roteamento (Wouter) para suportar páginas dinâmicas de projeto (`/casos/:id`).
   * Adicionar suporte a renderização de diagramas ou exibição de stack detalhada dentro das páginas de caso.
3. **Mid Priority (`client/src/pages/Home.tsx`):**
   * Transformar o grid isolado de "Habilidades" em componentes contextuais que rodeiam a seção "Sobre Mim" da página inicial.
4. **Low Priority (`client/src/components/GitHubActivity.tsx`):**
   * Criar integração real ou baseada em dados mockados recentes do GitHub para mostrar automação e engenharia perene logo na Home.
