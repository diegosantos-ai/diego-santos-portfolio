import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const ARTICLES_DATA = [
    {
        id: "1",
        slug: "otimizando-airflow-dags",
        title: "Otimizando DAGs do Airflow em Escala",
        description: "Estratégias para reduzir latência e gerenciar milhares de tarefas concorrentes em ambientes de produção.",
        date: "20.05.2024",
        tags: ["AIRFLOW", "PYTHON", "ETL"],
        readTime: "8 MIN"
    },
    {
        id: "2",
        slug: "rag-sem-hype",
        title: "Construindo RAG sem o Hype",
        description: "Uma abordagem pragmática para Geração Aumentada por Recuperação usando PostgreSQL e embeddings simples.",
        date: "12.04.2024",
        tags: ["IA", "LLM", "POSTGRESQL"],
        readTime: "12 MIN"
    },
    {
        id: "3",
        slug: "modelagem-dados-dbt",
        title: "Modelagem de Dados Eficaz com dbt",
        description: "Migrando de SQL espaguete para transformações de dados modulares e testáveis com dbt Core.",
        date: "01.03.2024",
        tags: ["DBT", "SQL", "ANALYTICS"],
        readTime: "10 MIN"
    },
    {
        id: "4",
        slug: "boas-praticas-logging-python",
        title: "Melhores Práticas de Logging em Python",
        description: "Técnicas de logging estruturado para observabilidade em sistemas distribuídos.",
        date: "15.02.2024",
        tags: ["PYTHON", "DEVOPS", "OBSERVABILITY"],
        readTime: "6 MIN"
    },
    {
        id: "5",
        slug: "arquitetura-hexagonal-python",
        title: "Arquitetura Hexagonal em Python",
        description: "Desacoplando lógica de negócios da infraestrutura em aplicações intensivas em dados.",
        date: "20.01.2024",
        tags: ["ARQUITETURA", "PYTHON", "DDD"],
        readTime: "15 MIN"
    }
];

export default function Articles() {
    const [search, setSearch] = useState("");

    const filteredArticles = ARTICLES_DATA.filter(a =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.description.toLowerCase().includes(search.toLowerCase()) ||
        a.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-mono selection:bg-[#fff] selection:text-[#000]">

            <header className="fixed top-0 w-full z-50 bg-[#050505]/90 backdrop-blur-md border-b border-[#333]">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/">
                        <a className="text-xs font-bold tracking-widest hover:text-[#00ff41] transition-colors flex items-center gap-2">
                            <ArrowLeft size={14} /> VOLTAR AO SISTEMA
                        </a>
                    </Link>
                    <span className="text-[10px] uppercase tracking-widest opacity-50">
                        DIR: /ROOT/ARTIGOS
                    </span>
                </div>
            </header>

            <main className="container mx-auto px-6 pt-32 pb-20 max-w-4xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-[#333] pb-8">
                    <div>
                        <h1 className="text-[4rem] md:text-[5rem] font-bold leading-none tracking-tighter text-[#e0e0e0]">
                            NOTAS
                        </h1>
                        <h1 className="text-[4rem] md:text-[5rem] font-bold leading-none tracking-tighter text-transparent" style={{ WebkitTextStroke: '1px #666' }}>
                            TÉCNICAS
                        </h1>
                    </div>

                    <div className="w-full md:w-72 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]" />
                        <Input
                            placeholder="BUSCAR LOGS..."
                            className="pl-10 font-mono text-xs h-12 bg-[#0a0a0a] border-[#333] focus:border-[#00ff41] rounded-none text-[#e0e0e0] placeholder:text-[#444]"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-px bg-[#333] border border-[#333]">
                    {filteredArticles.map((article) => (
                        <Link key={article.id} href={`/artigos/${article.slug}`}>
                            <a className="group block bg-[#050505] hover:bg-[#0a0a0a] transition-all duration-300 p-8">
                                <div className="flex flex-col md:grid md:grid-cols-[120px,1fr,auto] gap-6 items-baseline">

                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-bold text-[#444] group-hover:text-[#00ff41] transition-colors">
                                            {article.date}
                                        </span>
                                        <span className="text-[10px] text-[#333]">
                                            LEITURA: {article.readTime}
                                        </span>
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors tracking-tight">
                                            {article.title}
                                        </h2>
                                        <p className="text-[#666] leading-relaxed max-w-xl group-hover:text-[#888] text-sm">
                                            {article.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 justify-start md:justify-end w-full">
                                        {article.tags.map(tag => (
                                            <span key={tag} className="text-[9px] border border-[#222] px-2 py-1 text-[#444] group-hover:border-[#444] group-hover:text-[#888] uppercase transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </a>
                        </Link>
                    ))}
                </div>

                {filteredArticles.length === 0 && (
                    <div className="py-24 text-center border border-[#333] border-t-0 bg-[#0a0a0a]">
                        <span className="text-[#444] font-mono text-sm uppercase tracking-widest">Nenhum registro encontrado</span>
                    </div>
                )}
            </main>
        </div>
    );
}
