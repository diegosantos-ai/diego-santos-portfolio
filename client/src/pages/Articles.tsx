import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const articles = [
    {
        id: "1",
        slug: "optimizing-airflow-dags",
        title: "Optimizing Airflow DAGs for Scale",
        description: "Strategies for reducing latency and handling thousands of concurrent tasks in production environments.",
        date: "2024.05.20",
        tags: ["AIRFLOW", "PYTHON", "ETL"],
        readTime: "8 MIN"
    },
    {
        id: "2",
        slug: "rag-without-hype",
        title: "Building RAG without the Hype",
        description: "A pragmatic approach to Retrieval-Augmented Generation using PostgreSQL and simple embeddings.",
        date: "2024.04.12",
        tags: ["AI", "LLM", "POSTGRESQL"],
        readTime: "12 MIN"
    },
    {
        id: "3",
        slug: "data-modeling-dbt",
        title: "Effective Data Modeling with dbt",
        description: "Moving from spaghetti SQL to modular, testable data transformations with dbt Core.",
        date: "2024.03.01",
        tags: ["DBT", "SQL", "ANALYTICS"],
        readTime: "10 MIN"
    },
    {
        id: "4",
        slug: "python-logging-best-practices",
        title: "Python Logging Best Practices",
        description: "Structured logging techniques for observability in distributed systems.",
        date: "2024.02.15",
        tags: ["PYTHON", "DEVOPS", "OBSERVABILITY"],
        readTime: "6 MIN"
    },
    {
        id: "5",
        slug: "hexagonal-architecture-python",
        title: "Hexagonal Architecture in Python",
        description: "Decoupling business logic from infrastructure in data intensive applications.",
        date: "2024.01.20",
        tags: ["ARCHITECTURE", "PYTHON", "DDD"],
        readTime: "15 MIN"
    }
];

export default function Articles() {
    const [search, setSearch] = useState("");

    const filteredArticles = articles.filter(a =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.description.toLowerCase().includes(search.toLowerCase()) ||
        a.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );

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
                        WRITING
                    </span>
                </div>
            </header>

            <main className="container pt-32 pb-20 max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                    <h1 className="font-mono text-4xl md:text-5xl font-bold leading-tight">
                        TECHNICAL<br />
                        <span className="text-primary">NOTES_</span>
                    </h1>

                    <div className="w-full md:w-64 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="SEARCH_LOGS..."
                            className="pl-9 font-mono text-xs h-10 bg-secondary/20 border-border focus:ring-primary/50"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="border-t border-border">
                    {filteredArticles.map((article) => (
                        <Link key={article.id} href={`/artigos/${article.slug}`}>
                            <a className="group block border-b border-border py-8 hover:bg-muted/30 transition-colors px-4 -mx-4">
                                <div className="grid grid-cols-1 md:grid-cols-[140px,1fr,auto] gap-6 items-baseline">
                                    {/* Date */}
                                    <div className="flex flex-col gap-2">
                                        <span className="font-mono text-xs text-muted-foreground group-hover:text-primary transition-colors">
                                            {article.date}
                                        </span>
                                        <span className="font-mono text-[10px] text-muted-foreground/60 hidden md:block">
                                            [{article.readTime}]
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h2 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                                            {article.title}
                                        </h2>
                                        <p className="text-muted-foreground leading-relaxed max-w-xl">
                                            {article.description}
                                        </p>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 justify-end">
                                        {article.tags.map(tag => (
                                            <span key={tag} className="font-mono text-[10px] border border-border px-2 py-1 text-muted-foreground group-hover:border-primary/30 group-hover:text-foreground transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                        <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all ml-2" />
                                    </div>
                                </div>
                            </a>
                        </Link>
                    ))}
                </div>

                {filteredArticles.length === 0 && (
                    <div className="py-20 text-center border-b border-border">
                        <span className="font-mono text-muted-foreground">NO_LOGS_FOUND_</span>
                    </div>
                )}
            </main>
        </div>
    );
}
