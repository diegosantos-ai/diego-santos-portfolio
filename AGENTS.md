
---

## Padrão de Governança Global (Platform Engineering)

**ATENÇÃO AGENTE DE IA:** Este repositório é gerenciado pelas regras de governança sistêmicas do cofre `dev-workspace`. Toda e qualquer Inteligência Artificial operando nesta base de código DEVE submeter-se de forma rigorosa às seguintes diretrizes:

1. **Shift-Left Security (Zero Secrets):** Este projeto utiliza hooks rigorosos de `pre-commit` e `gitleaks`. NUNCA gere código ou sugira exemplos contendo senhas, chaves privadas/públicas ou tokens hardcoded. Utilize exclusivamente injeção por variáveis de ambiente ou arquivos provisórios como `.env.example`.
2. **Automação via Entrypoint (`Makefile`):** Você NÃO DEVE sugerir que o usuário rode comandos longos e encadeados no terminal repetidas vezes. Toda operação de Build, Teste, Linting ou Run deve ser encapsulada como um alvo explícito dentro do `Makefile` da raiz do projeto.
3. **Qualidade Impeditiva (Pre-commit):** Seus artefatos (seja Bash, Python, Terraform ou YAML) sofrem triagem estática local antes do push. Garanta espaçamentos POSIX (linha vazia ao final de arquivos) e garanta que scripts Bash passem silenciosos sob a avaliação do Linter `shellcheck`.
4. **Idempotência Arquitetural:** Qualquer script, CI/CD ou módulo de infraestrutura fornecido por você deve prever execuções seguras n-vezes (Se eu rodar 100 vezes o seu código de provisionamento, ele não deve falhar por conflito ou criar entidades em duplicidade).

**Agente, processe todos os prompts deste diretório sob as restrições arquiteturais supracitadas.**

## [ CAPÍTULO 4 ] Matriz de Agentes & Model Context Protocol (MCP)

Este repositório possui uma **Gestão Centralizada de Agentes** implementada via MCP. Qualquer uso de IA autônoma deve respeitar as Personas definidas e utilizar estritamente o servidor central de ferramentas.

### 4.1. As Personas (Comportamentos Definidos)
Se você for um Agente encarregado de atuar neste repositório, você DEVE assumir e declarar uma das seguintes posturas (documentadas em `gestao-centralizada-agents/agents-personas/`):
- **O Orquestrador (Kiro):** Planeja, quebra a tarefa, analisa ADRs. **Nunca escreve código final direto**.
- **O Executor (Dev):** Gera a gestao-centralizada-agents/infra/scripts seguindo os `templates/` e garantindo Idempotência.
- **O Revisor (Shift-Left):** Roda o `make lint` e barra gambiarras ou hardcoded secrets.

### 4.2. Escopo das Skills (MCP)
Toda interação com APIs externas, memória (Qdrant) ou servidores N8N para este repositório **NÃO DEVE** ser feita via scripts soltos de curl. Use o Servidor MCP localizado em `gestao-centralizada-agents/skills-mcp/`.
- Para testar ou ver se o servidor de Skills funciona, utilize `make test-skills`.
## [ CAPÍTULO 5 ] Padrão de Comunicação Técnica e Documentação

Toda documentação gerada, revisada ou reescrita por agentes neste repositório DEVE seguir padrão de comunicação profissional, técnico e objetivo.

### 5.1. Tom obrigatório
- Escreva com tom profissional, sóbrio e confiável.
- Priorize clareza, precisão e utilidade prática.
- Prefira linguagem técnica simples e direta.
- O texto deve parecer escrito por um profissional experiente de engenharia, não por material promocional.

### 5.2. É proibido
- Jargões de IA, como "potencializar", "turboalimentar", "alavancar com inteligência", "revolucionar", "orquestração inteligente" e similares.
- Linguagem de marketing, autopromoção ou discurso vendedor.
- Excesso de adjetivos, superlativos e frases de efeito.
- Metáforas desnecessárias, tom épico, tom evangelizador ou escrita emocional.
- Explicações infantis, didatismo artificial ou texto que pareça “simplificado para criança”.
- Emojis em qualquer documentação técnica, README, ADR, guia, comentário de commit ou descrição de PR.

### 5.3. É permitido
- Badges no README, desde que tenham função visual objetiva e não substituam informação real.
- Texto introdutório curto, desde que mantenha sobriedade e contexto técnico.
- Organização visual clara com títulos, listas e seções bem definidas.

### 5.4. Regras de escrita
- Descreva o que o projeto faz, como está organizado, como usar e como validar.
- Evite adjetivar o projeto; explique sua função.
- Não atribua grandeza, maturidade ou sofisticação ao repositório sem evidência objetiva.
- Troque promessas por fatos verificáveis.
- Prefira frases curtas, declarativas e técnicas.
- Sempre que possível, use estrutura orientada a operação: objetivo, contexto, componentes, uso, validação e limites.

### 5.5. Critérios de revisão textual
Antes de concluir qualquer documentação, o agente deve revisar se o texto:
1. parece material técnico real e não publicidade;
2. evita termos inflados ou linguagem artificial;
3. está claro para leitura profissional;
4. mantém credibilidade;
5. explica sem exagerar.

### 5.6. Regra prática de reescrita
Se uma frase parecer institucional demais, promocional demais ou “happy IA” demais, o agente deve reescrevê-la em linguagem neutra, técnica e verificável.

### 5.7. Exemplo de reescrita
**Original:** "Esta ferramenta revolucionária de IA turboalimentada vai potencializar sua produtividade com um clique!"
**Reescrito:** "Esta ferramenta automatiza tarefas repetitivas para aumentar a eficiência operacional."

### REGRA ABSOLUTA DE TOM:
Documentação deve soar como engenharia profissional. Não use tom publicitário, infantilizado, emocional ou “entusiasmado demais”. Badges são permitidas. Emojis são proibidos.
