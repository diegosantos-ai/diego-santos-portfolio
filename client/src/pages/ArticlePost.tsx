import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import ReactMarkdown from "react-markdown";
import { getArticleBySlug, Article } from "@/lib/articles";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Share2, Linkedin } from "lucide-react";

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
        return <div className="min-h-screen grid place-items-center">Carregando...</div>;
    }

    if (!article) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold">Artigo não encontrado</h1>
                <Button onClick={() => setLocation("/artigos")}>Voltar para Artigos</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground animate-fade-in">
            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 h-1 bg-primary z-50 w-full origin-left scale-x-0 animate-scroll-progress"></div>

            {/* Header com Navegação */}
            <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-40">
                <div className="container py-4 flex items-center justify-between">
                    <Button variant="ghost" size="sm" onClick={() => setLocation("/artigos")} className="gap-2">
                        <ArrowLeft size={16} /> Voltar
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" title="Compartilhar no LinkedIn">
                            <Linkedin size={18} />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Share2 size={18} />
                        </Button>
                    </div>
                </div>
            </div>

            <article className="container py-12 max-w-3xl mx-auto">
                {/* Header do Artigo */}
                <header className="mb-12 space-y-6 text-center">
                    <div className="flex flex-wrap justify-center gap-2">
                        {article.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold tracking-wide uppercase">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                        {article.title}
                    </h1>

                    <div className="flex items-center justify-center gap-4 text-muted-foreground text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>{article.date}</span>
                        </div>
                        <span>•</span>
                        <span>Diego Santos</span>
                    </div>

                    {article.image && (
                        <div className="relative aspect-video rounded-2xl overflow-hidden mt-8 shadow-2xl">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    )}
                </header>

                {/* Conteúdo Markdown */}
                <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-xl">
                    <ReactMarkdown
                        components={{
                            h1: ({ node, ...props }: any) => <h2 className="text-3xl font-bold mt-12 mb-6 text-primary" {...props} />,
                            h2: ({ node, ...props }: any) => <h3 className="text-2xl font-bold mt-10 mb-4" {...props} />,
                            blockquote: ({ node, ...props }: any) => <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground my-8" {...props} />,
                            code: ({ node, className, children, ...props }: any) => {
                                const match = /language-(\w+)/.exec(className || '')
                                return match ? (
                                    <div className="relative group my-6">
                                        <div className="absolute -top-3 right-4 bg-secondary text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            {match[1]}
                                        </div>
                                        <pre className="bg-secondary/30 p-4 rounded-xl overflow-x-auto border border-border">
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        </pre>
                                    </div>
                                ) : (
                                    <code className="bg-secondary/50 px-1.5 py-0.5 rounded text-sm font-mono text-accent" {...props}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    >
                        {article.content}
                    </ReactMarkdown>
                </div>

                {/* Footer do Artigo */}
                <hr className="my-12 border-border" />

                <div className="bg-card/50 rounded-2xl p-8 text-center space-y-4">
                    <h3 className="text-2xl font-bold">Gostou deste artigo?</h3>
                    <p className="text-muted-foreground">
                        Vamos discutir como aplicar essas técnicas no seu negócio.
                    </p>
                    <Button
                        size="lg"
                        className="bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2"
                        onClick={() => window.open("https://wa.me/5545999298275", "_blank")}
                    >
                        Discutir Pipeline RAG
                    </Button>
                </div>
            </article>
        </div>
    );
}
