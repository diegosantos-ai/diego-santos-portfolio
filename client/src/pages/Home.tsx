import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  GraduationCap,
  Award,
  Briefcase,
  Code,
  Database,
  Bot,
  Brain,
  MessageSquare,
  ChevronDown,
  MapPin,
  Globe,
  CheckCircle,
} from "lucide-react";

/**
 * Portfólio Diego Santos - Engenheiro de Dados
 * Design: Minimalismo Técnico com Acentos Dinâmicos
 * Cores: #0a0a0a (fundo), #0066FF (primário), #00FF88 (accent)
 */

// Componente contador animado
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Hook para animação ao scroll
function useScrollAnimation() {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

export default function Home() {
  // Dados dos projetos
  const projects = [
    {
      title: "Chatbot RAG Corporativo",
      description: "Chatbot com Retrieval-Augmented Generation, CI/CD (GitHub Actions) e monitoramento via MLflow.",
      technologies: ["Python", "LangChain", "OpenAI", "Docker", "MLflow"],
      impact: "80% redução tempo resposta",
      impactIcon: "⚡",
      link: "https://github.com/diegosantos-ai/chatbot-rag-corporate",
    },
    {
      title: "Pipeline de Dados CNPJ",
      description: "Pipeline ETL automatizado com validação de qualidade, tratamento de erros e logging estruturado.",
      technologies: ["Python", "Pandas", "PostgreSQL", "Logging"],
      impact: "4h/dia automatizadas",
      impactIcon: "🔄",
      link: "https://github.com/diegosantos-ai/cnpj-data-pipeline",
    },
    {
      title: "Analisador de Sentimento PT-BR",
      description: "Aplicação Streamlit para análise de sentimento em português brasileiro usando NLP.",
      technologies: ["Python", "Streamlit", "NLP", "Scikit-learn"],
      impact: "1000 msgs/dia",
      impactIcon: "📊",
      link: "https://github.com/diegosantos-ai/cx-sentiment-analyzer-ptbr",
      highlight: true,
    },
    {
      title: "Sistema de Vagas com IA",
      description: "Automação que coleta, estrutura e prioriza vagas com IA. Integração com Notion.",
      technologies: ["Python", "n8n", "OpenAI", "Notion API"],
      impact: "70% redução triagem",
      impactIcon: "🎯",
      link: "https://github.com/diegosantos-ai/pega-vagas",
    },
    {
      title: "CRM MVP com Consultor IA",
      description: "CRM com interface Streamlit, PostgreSQL e consultor IA integrado para geração de propostas.",
      technologies: ["Python", "Streamlit", "PostgreSQL", "OpenAI"],
      impact: "2 semanas MVP",
      impactIcon: "🚀",
      link: "https://github.com/diegosantos-ai/nexo-basis-crm",
    },
    {
      title: "Análise de Churn",
      description: "Modelagem de churn com Scikit-learn. Identificação de padrões de comportamento.",
      technologies: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
      impact: "8% redução taxa",
      impactIcon: "📉",
      link: "https://github.com/diegosantos-ai/churn-analysis",
    },
  ];

  // Dados das experiências
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
      companyLogo: "🟠",
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
      companyLogo: "🇺🇸",
      period: "Fev 2015 – Jan 2017",
      duration: "2 anos",
      highlights: [
        "Estruturei operação norte-americana do zero",
        "Primeiro Product Owner da operação nos EUA",
        "Market analysis e validação product-market fit",
      ],
    },
  ];

  // Dados de educação
  const education = [
    {
      degree: "Pós-grad. Ciência de Dados e IA",
      institution: "Anhanguera",
      period: "Jun/2025 - Abr/2026",
      status: "in-progress",
      highlights: ["Python", "Machine Learning", "Deep Learning", "NLP", "Big Data"],
    },
    {
      degree: "Pós-grad. Liderança Ágil",
      institution: "PUC-PR",
      period: "Set/2024 - Dez/2025",
      status: "completed",
      grade: "8,8",
      highlights: ["Design Sprint", "Design Thinking", "Gestão Remota"],
    },
    {
      degree: "Tecnólogo Análise de Sistemas",
      institution: "FAG",
      period: "Out/2022 - Dez/2024",
      status: "completed",
      grade: "8,6",
      highlights: ["Web", "Mobile", "Banco de Dados"],
    },
    {
      degree: "Bacharelado Administração",
      institution: "FAG",
      period: "2019 - 2022",
      status: "completed",
      grade: "9,0",
      highlights: ["Gestão", "Finanças", "Marketing"],
    },
  ];

  // Certificações principais
  const certifications = [
    { name: "IBM Data Engineering", issuer: "IBM", count: 7, icon: "🔵" },
    { name: "Prompt Engineering", issuer: "Vanderbilt", icon: "🎓" },
    { name: "Inglês C1 Avançado", issuer: "EF SET", score: "70/100", icon: "🌐" },
    { name: "Imersão IA", issuer: "Alura/Google", icon: "🤖" },
    { name: "Jornada Python", issuer: "Hashtag", icon: "🐍" },
  ];

  // Skills por categoria
  const skills = [
    { 
      category: "Engenharia de Dados", 
      icon: Database,
      items: ["ETL/ELT", "Pipeline Orchestration", "Data Modeling", "PostgreSQL", "MySQL"] 
    },
    { 
      category: "Linguagens", 
      icon: Code,
      items: ["Python", "SQL", "Git/GitHub", "TypeScript"] 
    },
    { 
      category: "Automação", 
      icon: Bot,
      items: ["n8n", "Zapier", "Make", "GitHub Actions"] 
    },
    { 
      category: "IA & LLMs", 
      icon: Brain,
      items: ["OpenAI API", "LangChain", "Prompt Engineering", "NLP"] 
    },
  ];

  // Diferenciais competitivos
  const differentials = [
    {
      icon: Briefcase,
      title: "Business Acumen",
      description: "15 anos em liderança e operações. Entendo o \"porquê\" dos dados.",
    },
    {
      icon: Bot,
      title: "Automação Expert",
      description: "n8n, Zapier, Make — ferramentas low-code cada vez mais valorizadas.",
    },
    {
      icon: Brain,
      title: "IA & LLMs",
      description: "Projetos práticos com OpenAI, RAG e Agentes Inteligentes.",
    },
    {
      icon: Github,
      title: "Portfólio Ativo",
      description: "9 projetos no GitHub com documentação e impacto de negócio.",
    },
    {
      icon: MessageSquare,
      title: "Comunicação",
      description: "Traduzo conceitos técnicos para stakeholders não-técnicos.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container flex items-center justify-between h-16">
          <div className="font-bold text-xl tracking-tight gradient-text">DS</div>
          <div className="hidden md:flex gap-8">
            <a href="#about" className="text-sm link-underline text-muted-foreground hover:text-foreground transition-colors">Sobre</a>
            <a href="#projects" className="text-sm link-underline text-muted-foreground hover:text-foreground transition-colors">Projetos</a>
            <a href="#experience" className="text-sm link-underline text-muted-foreground hover:text-foreground transition-colors">Experiência</a>
            <a href="#education" className="text-sm link-underline text-muted-foreground hover:text-foreground transition-colors">Educação</a>
            <a href="#contact" className="text-sm link-underline text-muted-foreground hover:text-foreground transition-colors">Contato</a>
          </div>
          <Button 
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white gap-2"
            onClick={() => window.open("https://github.com/diegosantos-ai", "_blank")}
          >
            <Github size={16} /> GitHub
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-subtle"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse-subtle"></div>
        
        <div className="container relative py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-accent text-sm">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                  Disponível para contratação
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Diego Santos
                </h1>
                
                <p className="text-2xl lg:text-3xl font-semibold gradient-text-animated">
                  Engenheiro de Dados
                </p>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Combinando <span className="text-primary font-semibold">15+ anos de liderança</span> com expertise em <span className="text-accent font-semibold">pipelines de dados</span>, <span className="text-primary font-semibold">automação</span> e <span className="text-accent font-semibold">inteligência artificial</span>.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed max-w-lg flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                Francisco Beltrão, PR • 100% Remoto
                <Globe size={16} className="text-accent ml-2" />
                Inglês C1
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white gap-2 card-hover"
                  onClick={() => window.open("https://github.com/diegosantos-ai", "_blank")}
                >
                  <Github size={18} /> Ver GitHub
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 gap-2 card-hover"
                  onClick={() => window.open("https://linkedin.com/in/diego-santos-ia", "_blank")}
                >
                  <Linkedin size={18} /> LinkedIn
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent/10 gap-2 card-hover"
                  onClick={() => window.location.href = "mailto:santos.diegoj86@gmail.com"}
                >
                  <Mail size={18} /> Contato
                </Button>
              </div>
            </div>

            {/* Right: Metrics Grid */}
            <div className="grid grid-cols-2 gap-6 animate-slide-right">
              <Card className="bg-card/50 glass border-border p-6 card-hover card-glow group">
                <p className="text-5xl font-bold text-primary mb-2">
                  <AnimatedCounter end={15} suffix="+" />
                </p>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Anos de Liderança</p>
              </Card>
              
              <Card className="bg-card/50 glass border-border p-6 card-hover card-glow-accent group">
                <p className="text-5xl font-bold text-accent mb-2">
                  <AnimatedCounter end={146} />
                </p>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Contribuições/Ano</p>
              </Card>
              
              <Card className="bg-card/50 glass border-border p-6 card-hover card-glow group">
                <p className="text-5xl font-bold text-primary mb-2">
                  <AnimatedCounter end={15} suffix="+" />
                </p>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Certificações</p>
              </Card>
              
              <Card className="bg-card/50 glass border-border p-6 card-hover card-glow-accent group">
                <p className="text-5xl font-bold text-accent mb-2">
                  <AnimatedCounter end={7} />
                </p>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Formações</p>
              </Card>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
            <ChevronDown size={32} className="text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* About / Differentials Section */}
      <section id="about" className="py-24 border-t border-border">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4">Por que me contratar?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Diferenciais que me tornam um candidato único para posições de Engenharia de Dados
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {differentials.map((item, idx) => (
              <Card 
                key={idx}
                className={`bg-card/50 glass border-border p-6 card-hover ${idx % 2 === 0 ? 'card-glow' : 'card-glow-accent'} text-center`}
              >
                <div className={`w-12 h-12 rounded-xl ${idx % 2 === 0 ? 'bg-primary/20' : 'bg-accent/20'} flex items-center justify-center mx-auto mb-4`}>
                  <item.icon size={24} className={idx % 2 === 0 ? 'text-primary' : 'text-accent'} />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 border-t border-border bg-card/30">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Competências Técnicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, idx) => (
              <Card key={skill.category} className="bg-card/50 glass border-border p-6 card-hover card-glow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <skill.icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-primary">{skill.category}</h3>
                </div>
                <ul className="space-y-2">
                  {skill.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 border-t border-border">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Projetos</h2>
            <p className="text-muted-foreground">
              Soluções reais com impacto mensurável • 
              <a href="https://github.com/diegosantos-ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                Ver todos no GitHub →
              </a>
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <Card 
                key={idx}
                className={`bg-card/50 glass border-border p-6 card-hover ${project.highlight ? 'card-glow-accent ring-1 ring-accent/30' : 'card-glow'} group cursor-pointer relative overflow-hidden`}
                onClick={() => window.open(project.link, "_blank")}
              >
                {project.highlight && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-accent/20 rounded text-xs text-accent font-medium">
                    ⭐ Fork recebido
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold leading-tight pr-8">{project.title}</h3>
                  <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs badge-primary px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-border flex items-center gap-2">
                  <span className="text-lg">{project.impactIcon}</span>
                  <p className="text-sm font-semibold text-accent">{project.impact}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 border-t border-border bg-card/30">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Experiência Profissional</h2>
          
          <div className="max-w-4xl mx-auto space-y-0">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative pl-8 pb-12 last:pb-0">
                {/* Timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 timeline-line"></div>
                
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 w-2.5 h-2.5 -translate-x-1 rounded-full bg-primary ring-4 ring-background"></div>
                
                <Card className="bg-card/50 glass border-border p-6 card-hover card-glow ml-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{exp.role}</h3>
                      <p className="text-primary font-semibold flex items-center gap-2">
                        {exp.companyLogo && <span>{exp.companyLogo}</span>}
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{exp.period}</p>
                      <p className="text-xs text-accent">{exp.duration}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle size={14} className="text-accent flex-shrink-0 mt-0.5" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 border-t border-border">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Educação & Certificações</h2>
            <p className="text-muted-foreground">7 formações acadêmicas • 15+ certificações técnicas</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <GraduationCap className="text-primary" />
                Formação Acadêmica
              </h3>
              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <Card key={idx} className="bg-card/50 glass border-border p-5 card-hover card-glow">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold">{edu.degree}</h4>
                        <p className="text-sm text-primary">{edu.institution}</p>
                        <p className="text-xs text-muted-foreground mt-1">{edu.period}</p>
                      </div>
                      <div className="text-right">
                        {edu.status === "in-progress" ? (
                          <span className="text-xs badge-accent px-2 py-1 rounded-full">Em andamento</span>
                        ) : edu.grade && (
                          <span className="text-lg font-bold text-accent">{edu.grade}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {edu.highlights.map((h) => (
                        <span key={h} className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                          {h}
                        </span>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Certifications */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Award className="text-accent" />
                Certificações em Destaque
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, idx) => (
                  <Card key={idx} className="bg-card/50 glass border-border p-5 card-hover card-glow-accent flex items-center gap-4">
                    <div className="text-3xl">{cert.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-bold">{cert.name}</h4>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    </div>
                    {cert.count && (
                      <span className="text-xs badge-primary px-2 py-1 rounded-full">{cert.count} cursos</span>
                    )}
                    {cert.score && (
                      <span className="text-xs badge-accent px-2 py-1 rounded-full">{cert.score}</span>
                    )}
                  </Card>
                ))}
                
                <p className="text-sm text-muted-foreground text-center pt-4">
                  + mais certificações IBM, Coursera e PUC-PR
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 border-t border-border bg-gradient-to-b from-card/30 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-accent text-sm mb-4">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                Disponível para contratação
              </span>
              <h2 className="text-4xl font-bold mb-4">Vamos Conversar?</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Estou em busca de oportunidades como <span className="text-primary font-semibold">Engenheiro de Dados</span>. 
                Conecte-se comigo para discutir projetos, ideias ou oportunidades.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white gap-2 card-hover animate-glow"
                onClick={() => window.location.href = "mailto:santos.diegoj86@gmail.com"}
              >
                <Mail size={18} /> santos.diegoj86@gmail.com
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 gap-2 card-hover"
                onClick={() => window.open("https://linkedin.com/in/diego-santos-ia", "_blank")}
              >
                <Linkedin size={18} /> LinkedIn
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-accent text-accent hover:bg-accent/10 gap-2 card-hover"
                onClick={() => window.open("https://github.com/diegosantos-ai", "_blank")}
              >
                <Github size={18} /> GitHub
              </Button>
            </div>

            <div className="pt-8 border-t border-border/50 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                Francisco Beltrão, PR
              </span>
              <span className="flex items-center gap-2">
                <Globe size={16} className="text-accent" />
                100% Remoto
              </span>
              <span>+55 45 99929-8275</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border text-center">
        <div className="container">
          <p className="text-sm text-muted-foreground">
            © 2026 Diego Santos • Engenheiro de Dados • 
            <span className="gradient-text ml-2">Pipelines, Automação e IA</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
