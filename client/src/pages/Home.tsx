import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  GraduationCap,
  Award,
  ArrowRight,
  MessageSquare,
  MapPin,
  Globe,
} from "lucide-react";

/**
 * Portfólio Diego Santos — Engenheiro de Dados
 * Design: Editorial Técnico
 * - Zero glassmorphism / floating blobs
 * - Tipografia IBM Plex Mono (headings) + Inter (body)
 * - Bordas sharp 1px, sem card-glow
 * - Layout editorial com labels monospace
 */

function SectionDivider({ label, extra }: { label: string; extra?: ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <p className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase whitespace-nowrap">
        // {label}
      </p>
      <div className="flex-1 border-t border-border" />
      {extra}
    </div>
  );
}

export default function Home() {
  const projects = [
    {
      title: "TerezIA — Chatbot RAG Institucional",
      description:
        "Assistente virtual para atendimento ao cidadão via Facebook/Instagram. Pipeline RAG + Policy Guard + Auditoria PostgreSQL. Integração Meta API com webhooks HMAC.",
      technologies: ["Python", "FastAPI", "ChromaDB", "PostgreSQL", "Meta API", "Gemini"],
      impact: "Case Real em Produção",
      link: "https://github.com/diegosantos-ai/terezia-chatbot",
    },
    {
      title: "Chatbot RAG Corporativo",
      description:
        "RAG com CI/CD via GitHub Actions e monitoramento MLflow. Respostas precisas sobre base interna de conhecimento.",
      technologies: ["Python", "LangChain", "OpenAI", "Docker", "MLflow"],
      impact: "80% ↓ tempo resposta",
      link: "https://github.com/diegosantos-ai/chatbot-rag-corporate",
    },
    {
      title: "Pipeline de Dados CNPJ",
      description:
        "ETL automatizado com validação de qualidade, tratamento de erros e logging estruturado.",
      technologies: ["Python", "Pandas", "PostgreSQL", "Logging"],
      impact: "4h/dia automatizadas",
      link: "https://github.com/diegosantos-ai/cnpj-data-pipeline",
    },
    {
      title: "Analisador de Sentimento PT-BR",
      description:
        "Análise de sentimento em português brasileiro com NLP. Interface Streamlit para visualização em tempo real.",
      technologies: ["Python", "Streamlit", "NLP", "Scikit-learn"],
      impact: "1000 msgs/dia",
      link: "https://github.com/diegosantos-ai/cx-sentiment-analyzer-ptbr",
    },
    {
      title: "Sistema de Vagas com IA",
      description:
        "Coleta, estrutura e prioriza vagas com IA. Integração com Notion para gestão pessoal.",
      technologies: ["Python", "n8n", "OpenAI", "Notion API"],
      impact: "70% ↓ triagem",
      link: "https://github.com/diegosantos-ai/pega-vagas",
    },
    {
      title: "CRM MVP com Consultor IA",
      description:
        "CRM com Streamlit, PostgreSQL e consultor IA para geração de propostas comerciais.",
      technologies: ["Python", "Streamlit", "PostgreSQL", "OpenAI"],
      impact: "MVP em 2 semanas",
      link: "https://github.com/diegosantos-ai/nexo-basis-crm",
    },
    {
      title: "Análise de Churn",
      description:
        "Modelagem com Scikit-learn para identificação de padrões de comportamento e predição de churn.",
      technologies: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
      impact: "8% ↓ taxa churn",
      link: "https://github.com/diegosantos-ai/churn-analysis",
    },
  ];

  const experiences = [
    {
      role: "Propagandista Consultor",
      company: "Grande Laboratório Farmacêutico",
      period: "Jan 2023 – Nov 2025",
      duration: "2 anos 11 meses",
      highlights: [
        "Estruturei processos de coleta de dados, gerando insights para decisões de marketing",
        "Reduzi desperdício operacional em ~15% com análise de KPIs",
        "Implementei dashboards de performance em tempo real",
      ],
    },
    {
      role: "Executivo de Vendas",
      company: "iFood",
      period: "Fev 2021 – Set 2022",
      duration: "1 ano 8 meses",
      highlights: [
        "Análise de dados de parceiros: +20% ativação, +12% retenção",
        "Traduzi requisitos operacionais para equipe de desenvolvimento",
        "Atuei como Product Owner em pilotos de validação",
      ],
    },
    {
      role: "Gerente Comercial",
      company: "Fachini Machinery (EUA)",
      period: "Fev 2015 – Jan 2017",
      duration: "2 anos",
      highlights: [
        "Estruturei operação norte-americana do zero",
        "Primeiro Product Owner da operação nos EUA",
        "Market analysis e validação product-market fit",
      ],
    },
  ];

  const education = [
    {
      degree: "Pós-grad. Ciência de Dados e IA",
      institution: "Anhanguera",
      period: "Jun/2025 – Abr/2026",
      status: "in-progress" as const,
    },
    {
      degree: "Pós-grad. Liderança Ágil",
      institution: "PUC-PR",
      period: "Set/2024 – Dez/2025",
      grade: "8,8",
    },
    {
      degree: "Tecnólogo Análise de Sistemas",
      institution: "FAG",
      period: "Out/2022 – Dez/2024",
      grade: "8,6",
    },
    {
      degree: "Bacharelado Administração",
      institution: "FAG",
      period: "2019 – 2022",
      grade: "9,0",
    },
  ];

  const certifications = [
    {
      name: "Engenharia de Dados",
      issuer: "IBM / Coursera",
      link: "https://www.coursera.org/professional-certificates/ibm-data-engineer",
    },
    {
      name: "Engenharia de Prompt",
      issuer: "Vanderbilt / Coursera",
      link: "https://www.coursera.org/specializations/prompt-engineering",
    },
    {
      name: "Python para IA",
      issuer: "IBM / Coursera",
      link: "https://www.coursera.org/learn/python-for-applied-data-science-ai",
    },
    {
      name: "Inglês C1 Avançado",
      issuer: "EF SET · 70/100",
      link: "https://cert.efset.org/en/oCVGnT",
    },
  ];

  const skills = [
    {
      category: "Dados",
      items: ["ETL/ELT", "dbt", "Airflow", "PostgreSQL", "pgvector", "Data Modeling"],
    },
    {
      category: "Cloud",
      items: ["AWS (EC2, S3, Lambda, RDS)", "Docker", "Linux", "CI/CD", "CloudWatch"],
    },
    {
      category: "Automação",
      items: ["GitHub Actions", "n8n", "Make", "Zapier", "Jira", "Confluence"],
    },
    {
      category: "IA & LLMs",
      items: ["RAG", "LangChain", "OpenAI", "Anthropic", "MLflow", "ChromaDB"],
    },
    {
      category: "Arquitetura",
      items: ["Hexagonal", "DDD", "Event-driven", "FastAPI", "Microsserviços"],
    },
    {
      category: "Linguagens",
      items: ["Python", "SQL", "TypeScript", "Bash"],
    },
  ];

  const differentials = [
    {
      title: "Business Acumen",
      description:
        '15 anos em liderança e operações. Entendo o "porquê" dos dados antes de construir o pipeline.',
    },
    {
      title: "Arquitetura Sólida",
      description: "Hexagonal, DDD, Event-driven — sistemas que escalam sem virar caos.",
    },
    {
      title: "IA Aplicada",
      description: "RAG, agentes, MLflow — IA em produção, não em notebooks.",
    },
    {
      title: "Cloud & Infra",
      description: "AWS, Docker, GitHub Actions — do código ao deploy sem surpresa.",
    },
    {
      title: "Comunicação",
      description: "Traduzo técnico para não-técnico e vice-versa. Inglês C1.",
    },
  ];

  const metrics = [
    { value: "15+", label: "anos de liderança" },
    { value: "146", label: "commits / ano" },
    { value: "15+", label: "certificações" },
    { value: "C1", label: "inglês" },
  ];

  const tereziaArch = [
    { label: "Meta Webhook", sub: "Facebook / Instagram", dot: "bg-primary" },
    { label: "FastAPI", sub: "HMAC Validation", dot: "bg-accent" },
    { label: "RAG Pipeline", sub: "ChromaDB + Embeddings", dot: "bg-primary" },
    { label: "Gemini", sub: "LLM Generation", dot: "bg-accent" },
    { label: "Policy Guard", sub: "Filtro Ético", dot: "bg-yellow-400" },
    { label: "PostgreSQL", sub: "Auditoria Completa", dot: "bg-primary" },
  ];

  const contactLinks = [
    {
      label: "Email",
      value: "santos.diegoj86@gmail.com",
      href: "mailto:santos.diegoj86@gmail.com",
      icon: Mail,
    },
    {
      label: "LinkedIn",
      value: "diego-santos-ia",
      href: "https://linkedin.com/in/diego-santos-ia",
      icon: Linkedin,
    },
    {
      label: "GitHub",
      value: "diegosantos-ai",
      href: "https://github.com/diegosantos-ai",
      icon: Github,
    },
    {
      label: "WhatsApp",
      value: "(45) 99929-8275",
      href: "https://wa.me/5545999298275?text=Olá Diego, vi seu portfólio e gostaria de conversar.",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Navigation ─────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between h-14">
          <span className="font-mono font-bold text-sm tracking-widest">DS</span>

          <div className="hidden md:flex gap-8">
            {[
              { label: "Sobre", href: "#about" },
              { label: "Stack", href: "#stack" },
              { label: "Projetos", href: "#projects" },
              { label: "Experiência", href: "#experience" },
              { label: "Blog", href: "/artigos" },
              { label: "Contato", href: "#contact" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-mono text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors uppercase"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="https://github.com/diegosantos-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
          >
            <Github size={14} />
            GitHub
          </a>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="min-h-[90vh] flex flex-col justify-end pb-16 pt-32 border-b border-border">
        <div className="container">
          <p className="font-mono text-xs text-accent tracking-[0.3em] uppercase mb-6">
            // Engenheiro de Dados · Disponível · Francisco Beltrão, PR · Remoto
          </p>

          <h1 className="text-[clamp(4rem,12vw,9rem)] font-bold leading-[0.88] tracking-tight mb-10">
            DIEGO<br />
            <span className="text-primary">SANTOS</span>
            <span className="text-primary cursor-blink">_</span>
          </h1>

          <div className="border-t border-border pt-8 grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-8 items-end">
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              15 anos em liderança e operações{" "}
              <span className="text-foreground font-medium">→ Engenharia de Dados</span>.
              Construo pipelines robustos, automação real e IA aplicada a problemas de negócio.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white font-mono text-xs tracking-wider gap-2"
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Ver Projetos <ArrowRight size={14} />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-border text-muted-foreground hover:text-foreground font-mono text-xs tracking-wider gap-2"
                onClick={() =>
                  window.open("https://linkedin.com/in/diego-santos-ia", "_blank")
                }
              >
                <Linkedin size={14} /> LinkedIn
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-border text-muted-foreground hover:text-foreground font-mono text-xs tracking-wider gap-2"
                onClick={() => (window.location.href = "mailto:santos.diegoj86@gmail.com")}
              >
                <Mail size={14} /> Email
              </Button>
            </div>
          </div>

          {/* Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-l border-t border-border mt-12">
            {metrics.map((m, i) => (
              <div key={i} className="p-6 text-center border-r border-b border-border">
                <p className="font-mono text-3xl md:text-4xl font-bold text-primary">{m.value}</p>
                <p className="font-mono text-xs text-muted-foreground mt-2 tracking-wide">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case: TerezIA ──────────────────────────────────────── */}
      <section className="py-20 border-b border-border">
        <div className="container">
          <SectionDivider label="Case em produção" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Story */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-1">TerezIA</h2>
              <p className="font-mono text-xs text-accent mb-6 tracking-wider">
                Chatbot RAG Institucional
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                Instituições públicas recebem centenas de perguntas repetitivas por dia. Construí um
                assistente que responde via Facebook/Instagram com{" "}
                <span className="text-foreground">precisão</span>,{" "}
                <span className="text-foreground">ética</span> e{" "}
                <span className="text-foreground">auditoria completa</span>.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "Pipeline RAG completo em produção",
                  "Policy Guard bloqueando respostas fora do escopo",
                  "100% das interações auditadas no PostgreSQL",
                  "Integração Meta API com validação HMAC",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://github.com/diegosantos-ai/terezia-chatbot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:text-primary/80 transition-colors border-b border-primary/30 pb-0.5"
              >
                Ver repositório <ArrowRight size={12} />
              </a>
            </div>

            {/* Architecture */}
            <div className="border border-border p-6">
              <p className="font-mono text-xs text-muted-foreground mb-6 tracking-[0.2em] uppercase">
                // Arquitetura RAG
              </p>

              <div className="relative">
                <div className="absolute left-[7px] top-3 bottom-3 w-px bg-border" />
                <div className="space-y-4 relative">
                  {tereziaArch.map((node, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div
                        className={`w-3.5 h-3.5 rounded-full ${node.dot} z-10 flex-shrink-0`}
                        style={{ minWidth: "14px" }}
                      />
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-xs font-semibold text-foreground">
                          {node.label}
                        </span>
                        <span className="text-xs text-muted-foreground">— {node.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Diferenciais ───────────────────────────────────────── */}
      <section id="about" className="py-20 border-b border-border">
        <div className="container">
          <SectionDivider label="Diferenciais" />

          <div className="max-w-3xl">
            {differentials.map((d, i) => (
              <div
                key={i}
                className={`flex gap-8 py-6 ${
                  i < differentials.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <span className="font-mono text-xs text-muted-foreground w-6 flex-shrink-0 mt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-bold text-base mb-1">{d.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stack ──────────────────────────────────────────────── */}
      <section id="stack" className="py-20 border-b border-border">
        <div className="container">
          <SectionDivider label="Stack" />

          <div className="border-l border-t border-border">
            {skills.map((skill, idx) => (
              <div
                key={skill.category}
                className="flex flex-col md:flex-row border-r border-b border-border"
              >
                <div className="md:w-36 p-4 md:border-r border-b md:border-b-0 border-border flex-shrink-0 flex items-center">
                  <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                    {skill.category}
                  </p>
                </div>
                <div className="flex-1 p-4 flex items-center">
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {skill.items.join(" · ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projetos ───────────────────────────────────────────── */}
      <section id="projects" className="py-20 border-b border-border">
        <div className="container">
          <SectionDivider
            label="Projetos"
            extra={
              <a
                href="https://github.com/diegosantos-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 whitespace-nowrap"
              >
                Ver todos <ArrowRight size={10} />
              </a>
            }
          />

          <div>
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group flex items-start gap-6 py-6 px-4 -mx-4 border-b border-border hover:bg-secondary/40 transition-colors cursor-pointer"
                onClick={() => window.open(project.link, "_blank")}
              >
                <span className="font-mono text-xs text-muted-foreground w-6 flex-shrink-0 mt-1.5 select-none">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-bold text-base group-hover:text-primary transition-colors leading-tight">
                      {project.title}
                    </h3>
                    <ArrowRight
                      size={14}
                      className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {project.description}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground/60">
                    {project.technologies.join(" · ")}
                  </p>
                </div>

                <div className="flex-shrink-0 hidden sm:block">
                  <span className="font-mono text-xs text-accent whitespace-nowrap">
                    {project.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experiência ────────────────────────────────────────── */}
      <section id="experience" className="py-20 border-b border-border">
        <div className="container">
          <SectionDivider label="Experiência" />

          <div className="max-w-3xl">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className={`py-8 ${idx < experiences.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <p className="font-mono text-xs text-primary mt-1">{exp.company}</p>
                  </div>
                  <div className="md:text-right">
                    <p className="font-mono text-xs text-muted-foreground">{exp.period}</p>
                    <p className="font-mono text-xs text-accent mt-0.5">{exp.duration}</p>
                  </div>
                </div>
                <ul className="space-y-2 mt-4">
                  {exp.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <div className="w-1 h-1 rounded-full bg-border flex-shrink-0 mt-2" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Educação & Certificações ───────────────────────────── */}
      <section id="education" className="py-20 border-b border-border">
        <div className="container">
          <SectionDivider label="Educação & Certificações" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-4xl">
            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap size={14} className="text-muted-foreground" />
                <p className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase">
                  Formação Acadêmica
                </p>
              </div>
              <div>
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start justify-between py-4 ${
                      idx < education.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-sm">{edu.degree}</h4>
                      <p className="font-mono text-xs text-primary mt-1">{edu.institution}</p>
                      <p className="font-mono text-xs text-muted-foreground mt-1">{edu.period}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {edu.status === "in-progress" ? (
                        <span className="font-mono text-xs text-accent border border-accent/30 px-2 py-0.5">
                          cursando
                        </span>
                      ) : edu.grade ? (
                        <span className="font-mono text-sm font-bold text-muted-foreground">
                          {edu.grade}
                        </span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Award size={14} className="text-muted-foreground" />
                <p className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase">
                  Certificações em Destaque
                </p>
              </div>
              <div>
                {certifications.map((cert, idx) => (
                  <a
                    key={idx}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between py-4 group hover:pl-2 transition-all ${
                      idx < certifications.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-sm group-hover:text-primary transition-colors">
                        {cert.name}
                      </h4>
                      <p className="font-mono text-xs text-muted-foreground mt-1">{cert.issuer}</p>
                    </div>
                    <ExternalLink
                      size={12}
                      className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-4"
                    />
                  </a>
                ))}
                <div className="pt-5">
                  <a
                    href="https://drive.google.com/drive/folders/1CYRrS1b2TtFZ35KXU-5stbVr0XgKhCDQ?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                  >
                    <Download size={12} />
                    Ver todos os certificados
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contato ────────────────────────────────────────────── */}
      <section id="contact" className="py-20">
        <div className="container">
          <SectionDivider label="Contato" />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-12 items-start max-w-4xl">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Vamos<br />
                <span className="text-primary">conversar?</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
                Estou em busca de oportunidades como{" "}
                <span className="text-foreground font-medium">Engenheiro de Dados</span>.
                Posso contribuir com pipelines, automação e IA aplicada a resultados reais.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={13} className="text-primary" />
                  Francisco Beltrão, PR
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe size={13} className="text-accent" />
                  100% Remoto
                </div>
              </div>
            </div>

            <div className="flex flex-col min-w-[240px]">
              {contactLinks.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith("mailto") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 py-4 border-b border-border hover:border-primary transition-all"
                >
                  <contact.icon
                    size={14}
                    className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                      {contact.label}
                    </p>
                    <p className="text-sm text-foreground/80 group-hover:text-foreground transition-colors truncate mt-0.5">
                      {contact.value}
                    </p>
                  </div>
                  <ArrowRight
                    size={12}
                    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="py-6 border-t border-border">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted-foreground">
            © 2026 Diego Santos · Engenheiro de Dados
          </p>
          <p className="font-mono text-xs text-muted-foreground/40">diegosantos.me</p>
        </div>
      </footer>
    </div>
  );
}
