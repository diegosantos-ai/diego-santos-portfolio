---
title: "ChatBot Prefeitura - Atendimento Cidadão via WhatsApp"
summary: "Integração de serviços municipais via WhatsApp usando IA conversacional, automatizando 70% dos chamados de nível 1."
date: "2023-09-15"
category: "Integração"
stack: ["Node.js", "WhatsApp Business API", "PostgreSQL", "OpenAI API", "Docker"]
github: ""
demo: ""
---

### O Contexto
A Secretaria de Atendimento ao Cidadão de um município de médio porte enfrentava um volume imenso de chamados rotineiros (solicitação de segunda via de IPTU, consulta de alvarás e dúvidas sobre serviços públicos). Os atendentes passavam mais de 60% do tempo respondendo perguntas frequentes, gerando uma fila de espera que chegava a 4 horas em picos sazonais. O desafio era desafogar a equipe humana redirecionando demandas repetitivas para um assistente virtual no WhatsApp, o canal mais utilizado pela população.

### O Problema
O grande gargalo técnico não era simplesmente criar um chatbot, mas sim lidar com a falta de padronização nas intenções dos usuários e com integrações legadas. Os sistemas da prefeitura consumiam serviços SOAP antigos que frequentemente sofriam *timeouts*. Além disso, os munícipes enviavam mensagens de voz, imagens, ou textos com erros de ortografia que quebravam sistemas convencionais de fluxos estáticos (árvores de decisão).

### A Solução / Arquitetura
Desenvolvi uma solução de atendimento híbrida distribuída:
1. **Gateway de Mensageria:** Uma API em Node.js (Express) para receber *webhooks* da WhatsApp Business API (Meta).
2. **Motor de IA (NLU):** Integração com modelos LLM (OpenAI) ajustados via *prompt engineering* restrito para atuar como NLU (Natural Language Understanding). O modelo foi contido para não alucinar e extrair entidades como "CPF/CNPJ", "Inscrição Municipal" e a "Intenção Principal".
3. **Orquestração de Integrações:** Um módulo isolado que recebia as intenções e despachava as chamadas para as *APIs SOAP* legadas encapsuladas por adaptadores REST rápidos, com política robusta de *retry* exponencial.
4. **Infra e Banco de Dados:** Deploy utilizando containers `Docker`. PostgreSQL para registro de sessões de conversa e auditoria, permitindo que, em caso de erro, a fila de atendimento redirecionasse as métricas ao atendimento humano junto com todo o contexto conversacional salvo.

### Trade-offs & Decisões de Engenharia
- **Fluxos Estáticos x LLMs:** Optou-se por um modelo de IA Generativa para processar e compreender as entradas imprevisíveis dos usuários em vez do Dialogflow. Isso reduziu o aborrecimento com opções numéricas, mas inseriu o risco de latência. Para mitigar, *fallback* para fluxos de botão ocorria em chamadas críticas.
- **REST sob SOAP Legado:** Em vez de trocar os servidores do município, construímos um serviço "Anti-Corruption Layer". Ele convertia requests limpos do bot para envelopes XML pesados assincronamente.
- **Microserviço vs Monólito Modular:** Inicialmente monolítico para acelerar o MVP (*Go-to-market* rápido), mas com responsabilidades fortemente divididas por domínios (*Routing*, *AI Engine*, *Legacy Integrations*), o que facilitou o desacoplamento futuro caso algum serviço ganhasse latência.

### O Resultado
Em três meses de operação contínua, o sistema absorveu e concluiu automaticamente **70% de todo o fluxo de nível 1**. O tempo médio de resposta para serviços de consulta de protocolo caiu de horas para **cerca de 5 segundos**. A arquitetura tolerante a falhas lidou com os *timeouts* do sistema legado perfeitamente, retendo as intenções na fila temporária do PostgreSQL. O projeto validou não apenas um caso de automação urbana, mas provou que integrações hipermodernas podem reviver infraestruturas obsoletas.
