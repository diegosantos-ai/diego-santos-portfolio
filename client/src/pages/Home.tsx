import { Button } from "@/components/ui/button";
import { GitHubSection } from "@/components/GitHubSection";
import { TerminalBlock } from "@/components/TerminalBlock";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  MessageSquare,
  MapPin,
  Globe,
  Terminal,
  Cpu,
  Database,
  Network
} from "lucide-react";
import { Link } from "wouter";

/**
 * Portfólio Diego Santos — Engenheiro de Dados
 * Design: Swiss Minimalism + Digital Modernism
 */

function SectionDivider({ label, extra }: { label: string; extra?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8 border-b border-border pb-2">
      <p className="font-mono text-xs text-primary tracking-widest uppercase">
        // {label}
      </p>
      {extra && <div className="ml-auto">{extra}</div>}
    </div>
  );
}

export default function Home() {
  const projects = [
    {
      title: "NEXO FLUX",
      description: "Pipeline RAG + Policy Guard + Auditoria PostgreSQL. Integração Meta API.",
      technologies: ["Python", "FastAPI", "ChromaDB"],
      link: "https://github.com/diegosantos-ai/terezia-chatbot",
      year: "2024"
    },
    {
      title: "DATA STREAMER",
      description: "ETL automatizado com validação de qualidade e logging estruturado.",
      technologies: ["Python", "Pandas", "PostgreSQL"],
      link: "https://github.com/diegosantos-ai/cnpj-data-pipeline",
      year: "2024"
    },
    {
      title: "AI PIPELINE",
      description: "Coleta, estrutura e prioriza dados com IA Generativa.",
      technologies: ["n8n", "OpenAI", "Notion API"],
      link: "https://github.com/diegosantos-ai/pega-vagas",
      year: "2023"
    },
    {
      title: "CHURN ANALYZER",
      description: "Modelagem preditiva para identificação de padrões de comportamento.",
      technologies: ["Scikit-learn", "Matplotlib"],
      link: "https://github.com/diegosantos-ai/churn-analysis",
      year: "2023"
    }
  ];

  const stack = [
    { name: "PYTHON", icon: Terminal },
    { name: "SQL", icon: Database },
    { name: "AWS", icon: Network },
    { name: "AIRFLOW", icon: Cpu },
    { name: "DBT", icon: Database },
    { name: "RAG", icon: Cpu }
  ];

  const contactLinks = [
    { label: "EMAIL", value: "santos.diegoj86@gmail.com", href: "mailto:santos.diegoj86@gmail.com", icon: Mail },
    { label: "LINKEDIN", value: "diego-santos-ia", href: "https://linkedin.com/in/diego-santos-ia", icon: Linkedin },
    { label: "GITHUB", value: "diegosantos-ai", href: "https://github.com/diegosantos-ai", icon: Github },
    { label: "WHATSAPP", value: "(45) 99929-8275", href: "https://wa.me/5545999298275", icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <span className="font-mono font-bold text-sm tracking-tighter text-primary">
            DS_PORTFOLIO_V2
          </span>
          <div className="hidden md:flex gap-8">
            {["PROJECTS", "STACK", "WRITING", "CONTACT"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-mono text-xs hover:text-primary transition-colors cursor-pointer"
              >
                [{item}]
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col justify-center pt-24 border-b border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full border-l border-border/50 hidden lg:block -z-10 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-2 h-2 bg-accent animate-pulse" />
                <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                  System Status: Online
                </p>
              </div>

              <h1 className="font-mono text-[clamp(3.5rem,10vw,8rem)] font-bold leading-[0.8] mb-8 tracking-tighter">
                DATA<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">ENGINEER</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed mb-10 border-l-2 border-primary pl-6">
                Building scalable data platforms and high-performance AI agents through precision engineering.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  className="bg-primary hover:bg-primary/90 text-white rounded-none font-mono text-xs h-12 px-8"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  VIEW WORK_
                </Button>
                <Button
                  variant="outline"
                  className="border-border hover:bg-muted text-foreground rounded-none font-mono text-xs h-12 px-8"
                  onClick={() => window.open("https://github.com/diegosantos-ai", "_blank")}
                >
                  <Github className="mr-2 h-4 w-4" /> GITHUB_
                </Button>
              </div>
            </div>

            <div className="hidden lg:block">
              <TerminalBlock className="w-full max-w-md ml-auto shadow-2xl shadow-primary/5" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-primary to-transparent" />
          <span className="font-mono text-[10px] tracking-widest">SCROLL</span>
        </div>
      </section>

      {/* ── Projects ───────────────────────────────────────────── */}
      <section id="projects" className="py-32 border-b border-border">
        <div className="container">
          <SectionDivider label="Selected Work" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group border border-border bg-card/30 hover:bg-card/50 hover:border-primary/50 transition-all duration-300 p-8 flex flex-col h-full relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-6 h-6 -rotate-45 text-primary" />
                </div>

                <span className="font-mono text-xs text-accent mb-4">{project.year}</span>

                <h3 className="font-mono text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-[10px] font-mono border border-border px-2 py-1 text-muted-foreground">
                      {tech.toUpperCase()}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs flex items-center gap-2 hover:text-accent transition-colors mt-auto"
                >
                  CASE STUDY <ArrowRight size={12} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stack ──────────────────────────────────────────────── */}
      <section id="stack" className="py-24 border-b border-border bg-secondary/20">
        <div className="container">
          <SectionDivider label="Core Stack" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border mt-12 border border-border">
            {stack.map((item) => (
              <div key={item.name} className="bg-background p-8 flex flex-col items-center justify-center gap-4 hover:bg-accent/5 transition-colors group">
                <item.icon className="w-8 h-8 text-muted-foreground group-hover:text-accent transition-colors stroke-1" />
                <span className="font-mono text-xs tracking-widest">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Writing/Articles ───────────────────────────────────── */}
      <section id="writing" className="py-32 border-b border-border">
        <div className="container">
          <SectionDivider label="Latest Writing" extra={<Link href="/artigos" className="font-mono text-xs hover:text-primary">VIEW ALL</Link>} />

          <div className="mt-12 space-y-px bg-border border border-border">
            {/* Mocked Articles for Home Preview */}
            {[
              { date: "2024.05.20", title: "Optimizing Airflow DAGs for Scale", tags: ["#AIRFLOW", "#PYTHON"] },
              { date: "2024.04.12", title: "Building RAG without the Hype", tags: ["#AI", "#LLM"] },
              { date: "2024.03.01", title: "Effective Data Modeling with dbt", tags: ["#DBT", "#SQL"] }
            ].map((article, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-[120px,1fr,auto] gap-4 p-6 bg-background hover:bg-card/50 transition-colors items-center group cursor-pointer" onClick={() => window.location.href = '/artigos'}>
                <span className="font-mono text-xs text-muted-foreground">{article.date}</span>
                <h4 className="text-lg font-medium group-hover:text-primary transition-colors">{article.title}</h4>
                <div className="flex gap-2">
                  {article.tags.map(tag => (
                    <span key={tag} className="font-mono text-[10px] text-accent/80 hidden sm:inline-block">{tag}</span>
                  ))}
                  <ArrowRight size={14} className="ml-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GitHub Activity ────────────────────────────────────── */}
      <section id="github" className="py-24 border-b border-border">
        <div className="container">
          <SectionDivider label="Code Activity" />
          <GitHubSection />
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────────── */}
      <section id="contact" className="py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-mono text-4xl md:text-5xl font-bold mb-8">
                LET'S BUILD<br />SOMETHING ROBUST.
              </h2>
              <p className="text-muted-foreground max-w-sm mb-12">
                Available for data engineering projects, AI consulting, and architectural reviews.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 font-mono text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Remote / Global</span>
                </div>
                <div className="flex items-center gap-3 font-mono text-sm">
                  <Globe className="w-4 h-4 text-accent" />
                  <span>Available for hire</span>
                </div>
              </div>
            </div>

            <div className="grid gap-px bg-border border border-border">
              {contactLinks.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  className="bg-background p-6 flex items-center justify-between hover:bg-card transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <contact.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="font-mono text-sm tracking-wider">{contact.label}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="py-8 border-t border-border bg-background">
        <div className="container flex justify-between items-center">
          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            © 2026 Diego Santos — Engineered for Precision
          </div>
          <div className="font-mono text-[10px] text-muted-foreground">
            v2.0.0
          </div>
        </div>
      </footer>
    </div>
  );
}
