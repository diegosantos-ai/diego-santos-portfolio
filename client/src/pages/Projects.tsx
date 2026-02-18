import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight, Github, Filter, Terminal, Database, Cloud, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
    {
        title: "NEXO FLUX",
        type: "Data Engineering",
        description: "High-throughput ETL orchestration system processing over 5TB of daily log data with sub-second latency.",
        stack: ["Python", "FastAPI", "ChromaDB", "PostgreSQL"],
        link: "https://github.com/diegosantos-ai/nexo-flux",
        github: "https://github.com/diegosantos-ai/nexo-flux",
        status: "Production",
        icon: Database
    },
    {
        title: "DATA STREAMER",
        type: "Infrastructure",
        description: "Real-time analytics engine built for e-commerce fraud detection using Kafka and Flink clusters.",
        stack: ["Python", "Kafka", "Flink", "AWS"],
        link: "https://github.com/diegosantos-ai/data-streamer",
        github: "https://github.com/diegosantos-ai/data-streamer",
        status: "Beta",
        icon: Cloud
    },
    {
        title: "AI PIPELINE",
        type: "AI/LLM",
        description: "LLM orchestration framework designed for autonomous data cleaning and metadata enrichment.",
        stack: ["n8n", "OpenAI", "LangChain", "Vector DB"],
        link: "https://github.com/diegosantos-ai/ai-pipeline",
        github: "https://github.com/diegosantos-ai/ai-pipeline",
        status: "Concept",
        icon: Cpu
    },
    {
        title: "CHURN ANALYZER",
        type: "Data Engineering",
        description: "Predictive modeling for customer churn using historical behavior data and scikit-learn pipelines.",
        stack: ["Python", "Scikit-learn", "Pandas", "Airflow"],
        link: "https://github.com/diegosantos-ai/churn-analysis",
        github: "https://github.com/diegosantos-ai/churn-analysis",
        status: "Completed",
        icon: Terminal
    }
];

const filters = ["All", "Data Engineering", "AI/LLM", "Infrastructure"];

export default function Projects() {
    const [filter, setFilter] = useState("All");

    const filteredProjects = filter === "All"
        ? projects
        : projects.filter(p => p.type === filter);

    return (
        <div className="min-h-screen bg-background text-foreground animate-fade-in">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-sm border-b border-border">
                <div className="container flex items-center justify-between h-16">
                    <Link href="/">
                        <a className="font-mono text-xs flex items-center gap-2 hover:text-primary transition-colors">
                            <ArrowLeft size={14} /> BACK_TO_HOME
                        </a>
                    </Link>
                    <span className="font-mono font-bold text-sm tracking-tighter">
                        SELECTED_WORK
                    </span>
                </div>
            </header>

            <main className="container pt-32 pb-20">

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-16 border-b border-border pb-8">
                    <div className="flex items-center gap-2 mr-4 text-muted-foreground">
                        <Filter size={14} />
                        <span className="font-mono text-xs uppercase tracking-widest">Filter:</span>
                    </div>
                    {filters.map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`font-mono text-xs px-3 py-1 border transition-all ${filter === f
                                    ? "border-primary text-primary bg-primary/10"
                                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                                }`}
                        >
                            {f.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border border border-border">
                    {filteredProjects.map((project, idx) => (
                        <div key={idx} className="bg-background p-10 flex flex-col group h-full">
                            <div className="flex justify-between items-start mb-8">
                                <div className="p-3 bg-secondary/30 rounded-none border border-border group-hover:border-primary/50 transition-colors">
                                    <project.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <span className={`font-mono text-[10px] px-2 py-1 border ${project.status === 'Production' ? 'border-accent/30 text-accent' :
                                        project.status === 'Beta' ? 'border-yellow-500/30 text-yellow-500' :
                                            'border-muted text-muted-foreground'
                                    }`}>
                                    {project.status.toUpperCase()}
                                </span>
                            </div>

                            <h3 className="font-mono text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                                {project.title}
                            </h3>

                            <p className="text-muted-foreground text-sm leading-7 mb-8 flex-1 border-l-2 border-transparent group-hover:border-primary pl-0 group-hover:pl-4 transition-all">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.stack.map(tech => (
                                    <span key={tech} className="font-mono text-[10px] text-muted-foreground/80 bg-secondary/50 px-2 py-1">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-6 mt-auto pt-6 border-t border-border border-dashed">
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-xs flex items-center gap-2 hover:text-primary transition-colors"
                                >
                                    VIEW PROJECT <ArrowUpRight size={14} />
                                </a>
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-xs flex items-center gap-2 hover:text-foreground text-muted-foreground transition-colors"
                                >
                                    SOURCE CODE <Github size={14} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-border py-8">
                <div className="container flex justify-between items-center text-xs text-muted-foreground font-mono">
                    <p>DIEGO SANTOS © 2026</p>
                    <a href="mailto:hello@diegosantos.dev" className="hover:text-primary transition-colors">HELLO@DIEGOSANTOS.DEV</a>
                </div>
            </footer>
        </div>
    );
}
