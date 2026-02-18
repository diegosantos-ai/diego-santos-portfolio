import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import ReactMarkdown from "react-markdown";
import { getArticleBySlug, Article } from "@/lib/articles";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Linkedin, Share2 } from "lucide-react";

export default function ArticlePost() {
    const [, params] = useRoute("/artigos/:slug");
    const [, setLocation] = useLocation();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            if (params?.slug) {
                const data = await getArticleBySlug(params.slug);
                setArticle(data);
            }
            setLoading(false);
        }
        load();
    }, [params?.slug]);

    if (loading) {
        return <div className="min-h-screen grid place-items-center font-mono bg-[#050505] text-[#00ff41] animate-pulse">CARREGANDO DADOS...</div>;
    }

    if (!article) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#050505] text-[#e0e0e0]">
                <h1 className="text-4xl font-bold font-mono tracking-tighter">ERRO 404: ARTIGO NÃO ENCONTRADO</h1>
                <Button onClick={() => setLocation("/artigos")} className="rounded-none bg-[#e0e0e0] text-black hover:bg-white font-bold">VOLTAR AOS ARQUIVOS</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-mono selection:bg-[#fff] selection:text-[#000]">

            {/* Scroll Progress */}
            <div className="fixed top-0 left-0 h-1 bg-[#00ff41] z-50 w-full origin-left scale-x-0 animate-scroll-progress mix-blend-difference"></div>

            {/* Header Flutuante */}
            <div className="border-b border-[#333] bg-[#050505]/95 backdrop-blur-sm sticky top-0 z-40">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <Button variant="ghost" size="sm" onClick={() => setLocation("/artigos")} className="gap-2 font-mono text-xs rounded-none hover:bg-[#111] text-[#888] hover:text-white uppercase tracking-widest">
                        <ArrowLeft size={14} /> Voltar ao Índice
                    </Button>
                    <div className="flex gap-px border border-[#333] bg-[#333]">
                        <button className="bg-[#0a0a0a] p-2 hover:bg-[#1f1f1f] text-[#888] hover:text-white transition-colors">
                            <Linkedin size={16} />
                        </button>
                        <button className="bg-[#0a0a0a] p-2 hover:bg-[#1f1f1f] text-[#888] hover:text-white transition-colors">
                            <Share2 size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <article className="container mx-auto px-6 py-24 max-w-3xl">
                {/* Meta Header */}
                <header className="mb-20 space-y-8 border-l-2 border-[#00ff41] pl-8">
                    <div className="flex flex-wrap gap-2">
                        {article.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-[#111] text-[#888] text-[10px] font-bold tracking-widest uppercase">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-white">
                        {article.title}
                    </h1>

                    <div className="flex items-center gap-6 text-[#666] text-xs uppercase tracking-widest">
                        <span>{article.date}</span>
                        <span>//</span>
                        <span>DIEGO SANTOS</span>
                    </div>
                </header>

                {/* Conteúdo */}
                <div className="prose prose-invert prose-lg max-w-none 
                    prose-headings:font-bold prose-headings:tracking-tighter prose-headings:text-white
                    prose-p:leading-relaxed prose-p:text-[#aaa] prose-p:text-base
                    prose-a:text-[#00ff41] prose-a:no-underline hover:prose-a:underline
                    prose-code:text-[#00ff41] prose-code:bg-[#111] prose-code:px-1 prose-code:py-0.5 prose-code:rounded-none prose-code:text-sm
                    prose-blockquote:border-l-[#333] prose-blockquote:text-[#666] prose-blockquote:italic
                ">
                    <ReactMarkdown>{article.content}</ReactMarkdown>
                </div>

                {/* CTA Footer */}
                <div className="mt-32 border-t border-[#333] pt-16">
                    <div className="bg-[#0a0a0a] border border-[#222] p-12 text-center">
                        <h3 className="text-2xl font-bold text-white mb-2">CMD: INICIAR_DEBATE</h3>
                        <p className="text-[#666] text-sm mb-8 max-w-md mx-auto">
                            Quer discutir os detalhes técnicos desta implementação ou solicitar uma auditoria?
                        </p>
                        <Button
                            size="lg"
                            className="bg-[#00ff41] hover:bg-[#00cc33] text-black font-bold gap-3 rounded-none tracking-widest h-14 px-8 uppercase"
                            onClick={() => window.open("https://wa.me/5545999298275", "_blank")}
                        >
                            CONECTAR VIA WHATSAPP
                        </Button>
                    </div>
                </div>
            </article>
        </div>
    );
}
