---
title: "Personal Dev Workspace - Agentes Especialistas Locais"
summary: "Infraestrutura de agentes de inteligência artificial via Model Context Protocol rodando nativamente no ecossistema local."
date: "2024-02-10"
category: "Automação"
stack: ["TypeScript", "Cline/Claude", "MCP", "Docker", "Node.js"]
github: "https://github.com/diegosantos-ai/diego-santos-portfolio"
demo: ""
---

### O Contexto
Com a aceleração das ferramentas de IA generativa, a dependência de interfaces web (como o ChatGPT ou Claude web) limitou meu fluxo de produtividade. Como Engenheiro de Software focado em automação e plataforma, eu precisava de ferramentas que atuassem direto no meu ambiente de desenvolvimento local (IDE, File System e Terminal), respeitando as regras estritas de governança dos meus repositórios.

### O Problema
Não existia uma forma fácil de fazer Modelos de Linguagem grandes interagirem nativamente com a minha máquina de forma segura, compreendendo os fluxos de Git (pre-commits, branches) e as regras arquiteturais, sem que eles sobrescrevessem o código de maneira imprudente ou vazassem credenciais locais via APIs públicas abertas (Shift-Left Security zero-secrets).

### A Solução / Arquitetura
Adoção e implementação rigorosa do **Model Context Protocol (MCP)** acoplado com clientes de orquestração de IA open-source. Foram desenhados subagentes com `skills` segmentadas:
1. **Governança por Markdown:** Regras declarativas em `AGENTS.md` e diretórios `.agent`, garantindo que qualquer IA operando o projeto absorva as restrições sistêmicas (idempotência arquitetural, automação via Makefile, verificação de linters).
2. **Separação de Papéis (Sub-agentes):** Diversos perfis parametrizados (`orchestrator`, `backend-specialist`, `devops-engineer`), para impedir alucinações genéricas e promover foco na tarefa delimitada pelo prompt.
3. **Controle de Estado Via GitFlow Estrito:** Configuração nativa atrelada a uma esteira `pnpm` para rodar baselines e builds estáticos a cada troca de fase da IA, criando uma barreira de proteção de compilação contínua.

### Trade-offs & Decisões de Engenharia
- **Repositório Monorepo vs Ferramentas Externas:** Optou-se por ter todo o *tuning* da IA vivendo dentro do próprio repositório `(docs/, .agent/)`. Isso mantém tudo versionado e permite que qualquer membro cloque o projeto e tenha a IA com a mesma cognição do projeto que o criador original.
- **Ferramentas de Execução vs Acesso Total:** As ferramentas de leitura, terminal bash e modificação direta de arquivos geram riscos de deleção ou loop infinito. Implementou-se timeouts robustos nos bashes permitidos e limites rigorosos para interações complexas de rede. 

### O Resultado
Ao implementar essa estrutura de agentes acoplada ao repositório, o tempo de refatoração estrutural pesada (como migrações arquiteturais de frontend ou scaffolding de APIs densas) caiu na métrica de **40 a 50%**. A IA assumiu o papel de "Operadora de Código" validando comandos de compilação automatizada (pnpm/bash) em background antes de fazer push, anulando falhas de "commit às escuras". Esse Dev Workspace é meu padrão atual e a própria estrutura deste portfólio.
