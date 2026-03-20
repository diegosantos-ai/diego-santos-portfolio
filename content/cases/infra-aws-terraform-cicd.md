---
title: "Infraestrutura Imutável AWS e CI/CD Zero-Downtime"
summary: "Provisionamento de infraestrutura completa na AWS com Terraform e esteiras de CI/CD automatizadas bloqueando falhas de qualidade."
date: "2022-11-20"
category: "Arquitetura"
stack: ["Terraform", "AWS (ECS/RDS/VPC)", "GitHub Actions", "Docker", "Bash"]
github: ""
demo: ""
---

### O Contexto
O time de engenharia sofria com o fenômeno "funciona na minha máquina". Existiam três ambientes (Dev, Staging, Produção) provisionados via **ClickOps** (clicando no console da AWS), o que gerava aberrações de configuração. Variáveis de ambiente eram esquecidas, subnets faltavam, e o deploy dependia de uma única pessoa na sexta-feira à noite. Fui desafiado a profissionalizar o delivery e proteger os ambientes através de esteiras imutáveis.

### O Problema
Um deploy na produção demorava em média 4 horas porque o banco de dados caía, o balanceador de carga desligava as instâncias antigas antes de subir as novas (Downtime) e não existia qualquer barreira estática que impedisse código com bugs ou credenciais vazadas de entrar no repositório.

### A Solução / Arquitetura
Evoluímos para Infrastructure as Code (IaC) associada a pipelines rígidos:
1. **Módulos Terraform:** Reescrevi os serviços essenciais em HCL (Terraform). Criei módulos reutilizáveis de `VPC`, `RDS (PostgreSQL)` com Multi-AZ para alta disponibilidade, e `ECS Fargate` (Containers Serverless) em uma topologia fechada de rede privada, onde apenas o Load Balancer ficava exposto.
2. **GitHub Actions (CI):** Implementação de hooks rigorosos no repositório. Toda abertura de Pull Request ativava: Verificação de lint (`pre-commit`), Scan de segurança estático (`Gitleaks` para proibir segredos expostos), Testes Unitários, e `terraform plan` injetado como comentário automático no PR.
3. **Delivery Contínuo (CD):** Ao aprovar e realizar o merge para a *main*, a pipeline iniciava um deploy `Blue/Green` no AWS ECS, rotacionando o tráfego apenas quando as instâncias novas emitissem *Health-checks HTTP 200*.

### Trade-offs & Decisões de Engenharia
- **ECS Fargate vs EKS (Kubernetes):** Escolhi ECS Fargate em vez de Kubernetes pela baixa sobrecarga de manutenção (overhead). A equipe não precisava gerenciar control planes (Masters) nem planejar atualizações pesadas de clusters, mantendo o foco do código na aplicação.
- **State Remoto e Lock:** O estado do Terraform (arquivo `.tfstate`) foi isolado em um Bucket S3 criptografado acoplado a uma tabela DynamoDB, bloqueando magicamente qualquer operação concorrente de engenheiros trabalhando no mesmo recurso ao mesmo tempo.

### O Resultado
A adoção de Terraform + CI/CD permitiu a recriação do ambiente completo (Disaster Recovery simulado) em **menos de 15 minutos**. Os deploys passaram a ser diários, automatizados e, crucialmente, zero-downtime (nenhum cliente via queda do sistema durante atualizações normais). O bloqueio de *secrets* nos Pull Requests via `gitleaks` evitou pelo menos dois incidentes documentados de vazamento de chaves de API da AWS.
