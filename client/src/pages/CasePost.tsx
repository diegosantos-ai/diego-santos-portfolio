import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import ReactMarkdown from "react-markdown";
import { getCaseBySlug, Case } from "@/lib/cases";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";

export default function CasePost() {
    const [, params] = useRoute("/cases/:slug");
    const [, setLocation] = useLocation();
    const [caseData, setCaseData] = useState<Case | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            if (params?.slug) {
                const data = await getCaseBySlug(params.slug);
                setCaseData(data);
            }
            setLoading(false);
        }
        load();
    }, [params?.slug]);

    if (loading) {
        return <div className="min-h-screen grid place-items-center font-mono bg-[#050505] text-[#ff3300] animate-pulse">CARREGANDO ARQUITETURA...</div>;
    }

    if (!caseData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#050505] text-[#e0e0e0]">
                <h1 className="text-4xl font-bold font-mono tracking-tighter">ERRO 404: CASE NÃO ENCONTRADO</h1>
                <Button onClick={() => setLocation("/cases")} className="rounded-none bg-[#e0e0e0] text-black hover:bg-white font-bold">VOLTAR AOS CASES</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-mono selection:bg-[#fff] selection:text-[#000]">
            {/* Header Flutuante */}
            <div className="border-b border-[#333] bg-[#050505]/95 backdrop-blur-sm sticky top-0 z-40">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <Button variant="ghost" size="sm" onClick={() => setLocation("/cases")} className="gap-2 font-mono text-xs rounded-none hover:bg-[#111] text-[#888] hover:text-white uppercase tracking-widest">
                        <ArrowLeft size={14} /> Voltar aos Cases
                    </Button>
                    <div className="flex gap-4">
                        {caseData.github && (
                            <a href={caseData.github} target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-[#888] hover:text-[#fff] transition-colors">
                                <Github size={14} /> Repo
                            </a>
                        )}
                        {caseData.demo && (
                            <a href={caseData.demo} target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-[#888] hover:text-[#fff] transition-colors">
                                <ExternalLink size={14} /> Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <article className="container mx-auto px-6 py-24 max-w-3xl">
                {/* Meta Header */}
                <header className="mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="px-3 py-1 bg-[#111] text-[#ff3300] border border-[#ff3300]/30 text-xs font-bold tracking-widest uppercase rounded">
                            {caseData.category}
                        </span>
                        <span className="text-[#666] text-xs uppercase tracking-widest">{caseData.date}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-white mb-6">
                        {caseData.title}
                    </h1>

                    <p className="text-xl text-[#aaa] font-light leading-relaxed border-l-2 border-[#333] pl-6 mb-12">
                        {caseData.summary}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-8 border-t border-[#222]">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#666] mr-2 flex items-center">STACK:</span>
                        {caseData.stack.map(tech => (
                            <span key={tech} className="px-2 py-1 bg-[#1a1a1a] text-[#888] text-[10px] font-bold tracking-widest uppercase">
                                {tech}
                            </span>
                        ))}
                    </div>
                </header>

                {/* Conteúdo (Markdown) */}
                <div className="prose prose-invert prose-lg max-w-none
                    prose-headings:font-bold prose-headings:tracking-tighter prose-headings:text-[#f2f2f2] prose-headings:mt-12 prose-headings:mb-6
                    prose-h3:text-2xl prose-h3:border-b prose-h3:border-[#222] prose-h3:pb-2
                    prose-p:leading-relaxed prose-p:text-[#aaa] prose-p:text-base
                    prose-ul:text-[#aaa] prose-li:text-base
                    prose-strong:text-[#f2f2f2]
                    prose-a:text-[#ff3300] prose-a:no-underline hover:prose-a:underline
                    prose-code:text-[#ff3300] prose-code:bg-[#111] prose-code:px-1 prose-code:py-0.5 prose-code:rounded-none prose-code:text-sm
                    prose-blockquote:border-l-[#ff3300] prose-blockquote:text-[#888] prose-blockquote:italic prose-blockquote:bg-[#0a0a0a] prose-blockquote:p-4
                ">
                    <ReactMarkdown>{caseData.content}</ReactMarkdown>
                </div>
            </article>
        </div>
    );
}
