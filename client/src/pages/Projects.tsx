import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { getCases, Case } from "@/lib/cases";

export default function Projects() {
    const [cases, setCases] = useState<Case[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const data = await getCases();
            setCases(data);
            setLoading(false);
        }
        load();
    }, []);

    if (loading) {
        return <div className="min-h-screen grid place-items-center font-mono bg-[#0a0a0a] text-[#ff3300] animate-pulse">CARREGANDO CASES...</div>;
    }

    return (
        <div className="container mx-auto px-6 py-20 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-serif text-[#f2f2f2] mb-6">Cases Técnicos</h1>
            <p className="text-xl text-[#888] font-light mb-16 max-w-2xl">
                Uma seleção de desafios técnicos que resolvi, com foco em impacto no negócio e arquitetura de software robusta.
            </p>

            <div className="space-y-24">
                {cases.map((projeto, index) => (
                    <article key={projeto.slug} className="border-l-2 border-[#222] pl-8 md:pl-12 py-2 relative group hover:border-[#ff3300] transition-colors duration-500">
                        {/* Timeline dot */}
                        <div className="absolute -left-[9px] top-0 w-4 h-4 bg-[#0a0a0a] border-2 border-[#555] group-hover:border-[#ff3300] group-hover:bg-[#ff3300] transition-all duration-500 rounded-full shadow-[0_0_10px_rgba(255,51,0,0)] group-hover:shadow-[0_0_15px_rgba(255,51,0,0.5)]"></div>
                        
                        <header className="mb-4">
                            <Link href={`/cases/${projeto.slug}`}>
                                <a className="text-3xl font-bold text-[#f2f2f2] group-hover:text-[#ff3300] transition-colors mb-2 inline-flex items-center gap-3">
                                    {projeto.title} <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </Link>
                            <div className="flex gap-4 items-center text-xs font-mono text-[#666] uppercase tracking-widest mt-2">
                                <span>{projeto.category}</span>
                                <span>•</span>
                                <span>{projeto.date}</span>
                            </div>
                        </header>

                        <p className="text-[#aaa] leading-relaxed max-w-2xl mb-8">
                            {projeto.summary}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {projeto.stack.slice(0, 5).map(tech => (
                                <span key={tech} className="bg-[#111] text-[#888] border border-[#222] px-3 py-1 text-xs font-mono rounded">
                                    {tech}
                                </span>
                            ))}
                            {projeto.stack.length > 5 && (
                                <span className="bg-transparent text-[#666] px-2 py-1 text-xs font-mono">
                                    +{projeto.stack.length - 5}
                                </span>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
