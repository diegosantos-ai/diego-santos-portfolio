---
title: "Nexo Flux - Orquestrador ETL"
summary: "Redução de 95% no tempo de processamento de pipelines legados substituindo uma arquitetura batch defasada por streaming distribuído."
date: "2024-03-15"
category: "Engenharia de Dados & Performance"
stack: ["Rust", "Tokio", "gRPC", "AWS S3", "PostgreSQL"]
github: "https://github.com/diegosantos-ai/nexo-flux"
---

### O Contexto
A empresa mantinha uma malha de dados legada responsável por consolidar logs e eventos financeiros. Com o crescimento da base de usuários, a janela de batch noturna passou de 2h para 6h, frequentemente ultrapassando o SLA de entrega e impactando o dashboard executivo da manhã.

### O Problema
- Processamento massivo sequencial rodando em uma única EC2 instável.
- Falta de backpressure handling, causando OOM (Out Of Memory) em picos de volume.
- Retrabalho manual constante da engenharia de dados (em média 12h/semana) só para reprocessamento de falhas triviais.

### A Solução / Arquitetura
Escalei o processamento de forma horizontal abandonando a abordagem de scripts cron isolados. Desenvolvi um orquestrador distribuído do zero (Nexo Flux) que gerencia nós de processamento. 

- O serviço Master gerencia filas em memória e delega blocos de partições para N workers via **gRPC**.
- Implementei particionamento dinâmico otimizado pelo tamanho do payload.
- Inclusão do **Tokio** (Rust runtime) para ingestão concorrente asśincrona altíssima, sem o peso em memória natural do acoplamento multithread do Python tradicionalmente usado no cliente.

### Trade-offs & Decisões de Engenharia
- **Por que Rust e não Spark/Airflow?** O problema do cliente era especificamente latência de computação em microbatches com custo restrito. O tamanho do cluster Spark necessário custaria 4x mais em Cloud Computing do que o binário compilado em Rust que entregou a mesma vazão usando pequenas instâncias spot.
- **Evitado intencionalmente:** Evitei amarrar o orquestrador em uma cloud específica, garantindo agnósticidade na leitura do Datalake para futura migração GCP.

### O Resultado
- A infraestrutura enxugou custos da AWS em quase **40%**.
- A janela noturna de 6h caiu para absurdos **20 minutos**.
- Risco zero de OOM kill nos workers graças ao parser estático seguro em tempo de compilação da arquitetura.
