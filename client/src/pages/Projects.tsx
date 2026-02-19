import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

const PROJECTS = [
    {
        title: "Nexo Flux - Orquestrador ETL Distribuído",
        businessProblem: "A empresa enfrentava lentidão no processamento de logs diários, com atrasos de até 6 horas na disponibilidade dos dados para o time de analytics, impactando a tomada de decisão.",
        solution: "Desenvolvi um orquestrador distribuído em Rust com gRPC para comunicação entre nós. Implementei particionamento dinâmico de dados e backpressure handling para maximizar throughput.",
        result: "Redução de 95% no tempo de processamento (de 6h para 20min) e redução de 40% nos custos de infraestrutura AWS.",
        stack: ["Rust", "Tokio", "gRPC", "AWS S3", "PostgreSQL"],
        links: {
            github: "https://github.com/diegosantos-ai/nexo-flux",
            demo: "#"
        }
    },
    {
        title: "Data Streamer - Ingestão de Fraude Real-Time",
        businessProblem: "O sistema legado de detecção de fraude operava em batch (D+1), permitindo que transações fraudulentas fossem aprovadas e descobertas apenas no dia seguinte.",
        solution: "Arquitetei uma solução de streaming baseada em Apache Kafka e Flink. Criei janelas de tempo deslizantes para análise de comportamento de usuário em tempo real.",
        result: "Detecção de anomalias em sub-segundo (<500ms). Bloqueio preventivo de R$ 2M em fraudes no primeiro mês de operação.",
        stack: ["Python", "Apache Kafka", "Apache Flink", "Redis", "Docker"],
        links: {
            github: "https://github.com/diegosantos-ai/data-streamer",
            demo: "#"
        }
    },
    {
        title: "AI Pipeline - RAG para Documentação Técnica",
        businessProblem: "Engenheiros perdiam horas buscando informações em documentações técnicas dispersas e desatualizadas.",
        solution: "Implementei um pipeline de RAG (Retrieval-Augmented Generation) que ingere automaticamente wikis internas, PDFs e repositórios de código. Usei Qdrant para busca vetorial e LangChain para orquestração.",
        result: "Redução de 30% no tempo médio de onboarding de novos engenheiros e resposta instantânea para dúvidas de arquitetura.",
        stack: ["Python", "LangChain", "Qdrant", "OpenAI API", "React"],
        links: {
            github: "https://github.com/diegosantos-ai/ai-pipeline",
            demo: "#"
        }
    }
];

export default function Projects() {
    return (
        <div className="container mx-auto px-6 py-20 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-serif text-[#f2f2f2] mb-6">Projetos de Impacto</h1>
            <p className="text-xl text-[#888] font-light mb-16 max-w-2xl">
                Uma seleção de desafios técnicos que resolvi, com foco em valor de negócio e arquitetura robusta.
            </p>

            <div className="space-y-24">
                {PROJECTS.map((project, index) => (
                    <article key={index} className="border-l-2 border-[#222] pl-8 md:pl-12 py-2 relative">
                        {/* Timeline dot */}
                        <div className="absolute -left-[9px] top-0 w-4 h-4 bg-[#0a0a0a] border-2 border-[#ff3300] rounded-full"></div>

                        <header className="mb-8">
                            <h2 className="text-3xl font-bold text-[#f2f2f2] mb-4">{project.title}</h2>
                            <div className="flex gap-4">
                                <a href={project.links.github} target="_blank" className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-[#888] hover:text-[#fff] transition-colors">
                                    <Github size={14} /> Repository
                                </a>
                                {project.links.demo !== "#" && (
                                    <a href={project.links.demo} target="_blank" className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-[#888] hover:text-[#fff] transition-colors">
                                        <ExternalLink size={14} /> Live Demo
                                    </a>
                                )}
                            </div>
                        </header>

                        <div className="grid gap-8 text-[#aaa] leading-relaxed">
                            <div>
                                <h3 className="text-[#ff3300] font-bold uppercase tracking-widest text-xs mb-2">O Problema</h3>
                                <p>{project.businessProblem}</p>
                            </div>

                            <div>
                                <h3 className="text-[#ff3300] font-bold uppercase tracking-widest text-xs mb-2">A Solução</h3>
                                <p>{project.solution}</p>
                            </div>

                            <div className="bg-[#111] p-6 border-l-4 border-[#ff3300]">
                                <h3 className="text-[#fff] font-bold uppercase tracking-widest text-xs mb-2">Resultado</h3>
                                <p className="text-[#f2f2f2] font-medium">{project.result}</p>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-2">
                            {project.stack.map(tech => (
                                <span key={tech} className="bg-[#1a1a1a] text-[#666] px-3 py-1 text-xs font-mono rounded-full">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
