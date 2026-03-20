# Plano operacional de execução por fase


# Branches sugeridas

Para manter isolamento de entrega, no seu padrão de trabalho, eu sugiro:

* `feature/portfolio-repositioning`
* `feature/portfolio-navigation-cases`
* `feature/portfolio-case-engine`
* `feature/portfolio-case-content`
* `feature/portfolio-home-refactor`
* `feature/portfolio-cleanup`
* `feature/portfolio-ci`

Isso mantém a disciplina de “uma branch = uma entrega coerente”. 

---

# Critérios globais de validação

Esses critérios precisam ser repetidos em quase toda fase, porque o readiness já os apontou como limitantes:

* `pnpm check` sem erro
* `pnpm build` saudável
* navegação SPA intacta
* rotas antigas tratadas
* clique em case sem refresh indevido 

## Fase 0 — Preparação e congelamento de contexto

### Objetivo

Abrir a refatoração com contexto claro, branch correta, critério de aceite definido e baseline técnico registrado, seguindo seu fluxo padrão de execução: entender → planejar → isolar → implementar → validar → registrar → encerrar. 

### Critério de aceite

* branch da entrega criada
* estado atual do projeto registrado
* objetivo da fase documentado
* baseline técnico validado com `git status`, `pnpm check` e `pnpm build`

### Riscos

* começar a mexer sem baseline
* misturar reposicionamento, conteúdo e estrutura na mesma tacada
* perder rastreabilidade da refatoração

### Arquivos-alvo

* `README.md`
* `docs/progresso.md`
* `docs/assessment/*`
* opcional: `docs/refactor-plan.md`

### Sequência operacional

1. atualizar `main`
2. criar branch da refatoração
3. rodar baseline:

   * `git status`
   * `git branch --show-current`
   * `pnpm check`
   * `pnpm build`
4. registrar no Trello ou documento de fase:

   * objetivo da fase
   * critério de aceite
   * riscos
   * próxima task
5. congelar escopo da Fase 1

### Validação

* `git status`
* `pnpm check`
* `pnpm build`

### Saída esperada

Projeto pronto para refatorar com método, sem nebulosidade operacional. Isso é coerente com seu fluxo macro: não começar sem objetivo, branch, validação e próximo passo claro.  

---

## Fase 1 — Reposicionamento de mensagem central

### Objetivo

Corrigir a mensagem principal do portfólio para que ele deixe de comunicar “Engenharia de Dados pura” e passe a comunicar um perfil mais alinhado a **desenvolvimento, automação, backend, integração e engenharia aplicada**, sem apagar sua base em dados. O assessment apontou esse como o maior desalinhamento atual.  

### Critério de aceite

Ao abrir a Home e o README, o visitante deve entender em menos de 20 segundos que você atua em:

* desenvolvimento de sistemas
* automação
* backend e integração
* infraestrutura / plataforma
* IA aplicada como extensão de engenharia

### Riscos

* pivotar demais e parecer artificial
* apagar competências fortes de dados em vez de subordiná-las
* manter texto bonito, mas ainda genérico

### Arquivos-alvo

* `README.md`
* `client/src/pages/Home.tsx`
* `client/src/pages/About.tsx`
* `client/src/pages/Skills.tsx`

### Sequência operacional

1. reescrever tese central do README
2. reescrever Hero da Home
3. revisar resumo biográfico / About
4. reclassificar stack em Skills
5. alinhar taxonomia dos projetos atuais com o novo posicionamento

### Primeira task

**Reescrever `README.md` e Hero da `Home.tsx`** com a nova tese híbrida.

### Validação

* revisão manual da narrativa
* `git diff`
* `pnpm check`
* `pnpm build`

### Saída esperada

Nova tese pública consistente com o objetivo maior do projeto, que exige portfólio coerente com vaga-alvo, profundidade técnica e narrativa de mercado.  

---

## Fase 2 — Refatoração da arquitetura de informação

### Objetivo

Sair da estrutura de “currículo web” fragmentado (`Sobre`, `Habilidades`, `Projetos`, `Contato`) e migrar para uma arquitetura mais forte de **Home + Cases + Publicações**, reduzindo fricção e aumentando densidade de prova técnica. O assessment aponta que a estrutura atual dilui evidências e aumenta cliques desnecessários. 

### Critério de aceite

A navegação principal deve refletir a arquitetura nova:

* **Home**
* **Cases**
* **Publicações**
* links de contato e CV no header/footer

### Riscos

* remover páginas cedo demais, antes de migrar conteúdo útil
* quebrar navegação já publicada
* deixar o site “mais limpo”, porém mais vazio

### Arquivos-alvo

* `client/src/components/Navigation.tsx`
* `client/src/App.tsx`
* `client/src/pages/Projects.tsx`
* `client/src/pages/Articles.tsx`
* `client/src/pages/About.tsx`
* `client/src/pages/Skills.tsx`
* `client/src/pages/Contact.tsx`

### Sequência operacional

1. definir taxonomia final de navegação
2. ajustar `Navigation.tsx`
3. preparar substituição de `Projetos` por `Cases`
4. reduzir protagonismo de `Sobre`, `Habilidades` e `Contato`
5. só depois decidir remoção/fusão definitiva

### Primeira task

**Refatorar `Navigation.tsx` e `App.tsx` para a nova navegação-alvo**, mantendo compatibilidade temporária.

### Validação

* navegação SPA sem refresh indevido
* rotas antigas funcionando ou redirecionadas
* `pnpm check`
* `pnpm build`

### Saída esperada

Arquitetura mais coerente com a recomendação do assessment: Home como hub, Cases como prova profunda e Publicações como extensão da narrativa técnica. 

---

## Fase 3 — Criação do modelo de case

### Objetivo

Definir o padrão único de case técnico que será reutilizado em todos os projetos fortes. Isso atende diretamente à diretriz da documentação maior: transformar projetos em **cases apresentáveis**, com documentação, arquitetura, trade-offs e profundidade.  

### Critério de aceite

Existe um template reutilizável de case com seções fixas e legíveis.

### Estrutura mínima do case

* resumo executivo
* contexto
* problema
* arquitetura da solução
* stack
* decisões de engenharia
* operação / deploy / observabilidade
* trade-offs
* resultado
* o que esse projeto prova

### Riscos

* criar cases bonitos, mas superficiais
* transformar case em README reformatado
* exagerar em texto sem evidência

### Arquivos-alvo

* novo diretório `content/cases/`
* novo template em Markdown
* possível componente de renderização de case
* documentação de padrão em `docs/`

### Sequência operacional

1. definir template de case
2. validar template com 1 projeto piloto
3. ajustar padrão
4. documentar convenção

### Primeira task

**Criar `content/cases/_template.md`** e um padrão de frontmatter.

### Validação

* leitura humana
* aderência ao objetivo de evidência técnica
* compatibilidade com futura renderização

### Saída esperada

Um padrão de case que permite transformar projetos em ativos de prova pública de consistência. 

---

## Fase 4 — Implementação do motor de conteúdo para cases

### Objetivo

Eliminar o acoplamento de projetos hardcoded no TSX e migrar para um motor de conteúdo semelhante ao dos artigos, usando Markdown + `gray-matter`. O readiness técnico priorizou exatamente isso.  

### Critério de aceite

* existe diretório `content/cases/*.md`
* há rota dinâmica `/casos/:slug`
* pelo menos 1 case piloto renderiza no site

### Riscos

* misturar lógica de artigos e projetos sem abstração mínima
* quebrar `Projects.tsx` antes do novo fluxo estar pronto
* rotas internas inconsistentes

### Arquivos-alvo

* `client/src/pages/Projects.tsx`
* nova página `CasePost.tsx` ou equivalente
* `client/src/App.tsx`
* parser e utilitários de conteúdo
* `content/cases/*.md`

### Sequência operacional

1. criar estrutura `content/cases`
2. reaproveitar padrão de leitura dos artigos
3. criar rota dinâmica `/casos/:slug`
4. migrar 1 case piloto
5. conectar Home → Cases → detalhe

### Primeira task

**Criar o parser e a rota dinâmica de cases**.

### Validação

* clique SPA funcional
* rota `/casos/:slug` carregando
* `pnpm check`
* `pnpm build`

### Saída esperada

Base técnica pronta para escalar profundidade sem sujar componentes com dados mockados. Isso foi apontado como recomendação técnica prioritária.  

---

## Fase 5 — Migração dos 3 cases prioritários

### Objetivo

Transformar os projetos mais fortes em páginas profundas que sustentem sua narrativa pública.

### Cases prioritários recomendados

1. **Chat Bot Prefeitura**
2. **Personal Dev Workspace**
3. **API/CI-CD** ou **Terraform/AWS**, dependendo da ênfase que você quiser dar

### Critério de aceite

Pelo menos 3 cases completos publicados e navegáveis.

### Riscos

* escrever cases como marketing, não engenharia
* excesso de detalhe sem hierarquia
* falta de consistência entre os 3

### Arquivos-alvo

* `content/cases/chat-bot-prefeitura.md`
* `content/cases/personal-dev-workspace.md`
* `content/cases/projeto-api-cicd.md` ou `terraform-aws.md`

### Sequência operacional

1. migrar case 1
2. validar padrão
3. migrar case 2
4. migrar case 3
5. ajustar listagem de cases na Home e na página índice

### Primeira task

**Escrever o case do Chat Bot Prefeitura** como piloto.

### Validação

* leitura técnica coerente
* profundidade suficiente
* navegação funcional
* `pnpm build`

### Saída esperada

O portfólio passa a demonstrar profundidade real, não apenas cards resumidos — um dos critérios de sucesso explícitos da sua documentação. 

---

## Fase 6 — Refatoração da Home como hub técnico

### Objetivo

Transformar a Home em um hub de engenharia, não apenas uma landing institucional.

### Estrutura-alvo

* Hero com nova tese
* 2–3 cases em destaque
* atividade recente / “o que estou construindo”
* resumo biográfico curto
* stack contextualizada
* CTA para cases, publicações e CV

### Critério de aceite

A Home precisa conduzir o visitante para prova concreta em no máximo 2 cliques.

### Riscos

* Home virar página muito longa e difusa
* repetir o que já existe nos cases
* enfatizar stack isolada em vez de capacidade

### Arquivos-alvo

* `client/src/pages/Home.tsx`
* componentes relacionados a cards, atividade GitHub e highlights

### Sequência operacional

1. reestruturar seções
2. trocar projetos teaser por cases reais
3. integrar links internos
4. reduzir conteúdo redundante

### Primeira task

**Refatorar a Home para refletir a navegação e os cases novos**.

### Validação

* leitura rápida e clara
* CTA interno funcionando
* `pnpm check`
* `pnpm build`

### Saída esperada

Home coerente com a arquitetura proposta no assessment. 

---

## Fase 7 — Limpeza de rotas, páginas e código zumbi

### Objetivo

Remover o que ficar redundante depois que Home + Cases + Publicações estiverem estáveis. O readiness sugere purgar páginas e primitivos desnecessários só após estabilidade. 

### Critério de aceite

* páginas redundantes removidas ou incorporadas
* imports mortos eliminados
* componentes não usados reduzidos

### Riscos

* apagar algo ainda referenciado
* quebrar links antigos
* limpar cedo demais

### Arquivos-alvo

* `client/src/pages/About.tsx`
* `client/src/pages/Skills.tsx`
* `client/src/pages/Contact.tsx`
* `client/src/App.tsx`
* componentes mortos

### Sequência operacional

1. mapear páginas redundantes
2. remover links
3. remover rotas
4. limpar imports/componentes
5. revisar build final

### Primeira task

**Despublicar rotas redundantes do menu antes de removê-las fisicamente**.

### Validação

* navegação intacta
* sem erro de import
* `pnpm check`
* `pnpm build`

### Saída esperada

Base mais limpa e coerente.

---

## Fase 8 — Pipeline mínima de qualidade

### Objetivo

Adicionar o mínimo de segurança operacional para a refatoração e evolução futura: check/build automatizados em GitHub Actions. Isso também foi apontado como prioridade técnica média. 

### Critério de aceite

Existe workflow automatizado validando pelo menos:

* instalação
* `pnpm check`
* `pnpm build`

### Riscos

* adicionar CI tarde demais
* mascarar falhas locais
* complicar pipeline desnecessariamente

### Arquivos-alvo

* `.github/workflows/ci.yml`

### Sequência operacional

1. criar workflow mínimo
2. validar localmente
3. subir branch
4. observar execução no GitHub

### Primeira task

**Criar `ci.yml` com check e build**.

### Validação

* workflow verde no GitHub
* compatibilidade com `pnpm`

### Saída esperada

Melhora objetiva de maturidade de fluxo, alinhada à governança e prova pública de consistência. 

---

# Ordem recomendada de execução

## Bloco 1 — Fundar a direção

1. Fase 0
2. Fase 1

## Bloco 2 — Mudar a arquitetura

3. Fase 2
4. Fase 3

## Bloco 3 — Construir a nova prova

5. Fase 4
6. Fase 5
7. Fase 6

## Bloco 4 — Consolidar

8. Fase 7
9. Fase 8

---

# Branches sugeridas

Para manter isolamento de entrega, no seu padrão de trabalho, eu sugiro:

* `feature/portfolio-repositioning`
* `feature/portfolio-navigation-cases`
* `feature/portfolio-case-engine`
* `feature/portfolio-case-content`
* `feature/portfolio-home-refactor`
* `feature/portfolio-cleanup`
* `feature/portfolio-ci`

Isso mantém a disciplina de “uma branch = uma entrega coerente”. 

---

# Critérios globais de validação

Esses critérios precisam ser repetidos em quase toda fase, porque o readiness já os apontou como limitantes:

* `pnpm check` sem erro
* `pnpm build` saudável
* navegação SPA intacta
* rotas antigas tratadas
* clique em case sem refresh indevido 

---

