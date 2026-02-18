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
        return <div className="min-h-screen grid place-items-center font-mono">LOADING_CONTENT...</div>;
    }

    if (!article) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold font-mono">ERROR_404: ARTICLE_NOT_FOUND</h1>
                <Button onClick={() => setLocation("/artigos")} className="font-mono rounded-none">RETURN_TO_LOGS</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground animate-fade-in">
            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 h-1 bg-primary z-50 w-full origin-left scale-x-0 animate-scroll-progress"></div>

            {/* Header com Navegação */}
            <div className="border-b border-border/50 bg-background/90 backdrop-blur-sm sticky top-0 z-40">
                <div className="container py-4 flex items-center justify-between">
                    <Button variant="ghost" size="sm" onClick={() => setLocation("/artigos")} className="gap-2 font-mono text-xs rounded-none hover:bg-secondary/50">
                        <ArrowLeft size={16} /> BACK_TO_LOGS
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" title="Compartilhar no LinkedIn" className="rounded-none hover:bg-secondary/50">
                            <Linkedin size={18} />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-none hover:bg-secondary/50">
                            <Share2 size={18} />
                        </Button>
                    </div>
                </div>
            </div>

            <article className="container py-24 max-w-3xl mx-auto">
                {/* Header do Artigo */}
                <header className="mb-16 space-y-8 text-center border-b border-border pb-16">
                    <div className="flex flex-wrap justify-center gap-2">
                        {article.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 border border-border text-primary text-[10px] font-mono tracking-widest uppercase">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none">
                        {article.title}
                    </h1>

                    <div className="flex items-center justify-center gap-4 text-muted-foreground text-xs font-mono">
                        <div className="flex items-center gap-2">
                            <span>{article.date}</span>
                        </div>
                        <span>//</span>
                        <span>DIEGO SANTOS</span>
                    </div>

                    {article.image && (
                        <div className="relative aspect-video overflow-hidden mt-8 border border-border">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    )}
                </header>

                {/* Conteúdo Markdown */}
                <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-none prose-p:leading-relaxed prose-p:text-muted-foreground">
                    <ReactMarkdown
                        components={{
                            h1: ({ node, ...props }: any) => <h2 className="text-3xl font-bold mt-16 mb-8 text-foreground font-mono" {...props} />,
                            h2: ({ node, ...props }: any) => <h3 className="text-2xl font-bold mt-12 mb-6 font-mono" {...props} />,
                            h3: ({ node, ...props }: any) => <h4 className="text-xl font-bold mt-8 mb-4 font-mono" {...props} />,
                            blockquote: ({ node, ...props }: any) => <blockquote className="border-l-2 border-primary pl-6 italic text-lg text-muted-foreground my-12" {...props} />,
                            code: ({ node, className, children, ...props }: any) => {
                                const match = /language-(\w+)/.exec(className || '')
                                return match ? (
                                    <div className="relative group my-8 border border-border bg-card/20">
                                        <div className="absolute -top-3 right-4 bg-background border border-border text-[10px] px-2 py-1 font-mono uppercase tracking-widest text-muted-foreground">
                                            {match[1]}
                                        </div>
                                        <pre className="p-6 overflow-x-auto">
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        </pre>
                                    </div>
                                ) : (
                                    <code className="bg-secondary/30 px-1.5 py-0.5 text-sm font-mono text-primary" {...props}>
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
                <div className="mt-24 pt-12 border-t border-border">
                    <div className="bg-card/20 border border-border p-12 text-center space-y-6">
                        <h3 className="text-2xl font-bold font-mono">CMD: START_DISCUSSION</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            Discuss implementation details or request a technical audit.
                        </p>
                        <Button
                            size="lg"
                            className="bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2 rounded-none font-mono tracking-wide h-12 px-8"
                            onClick={() => window.open("https://wa.me/5545999298275", "_blank")}
                        >
                            WHATSAPP_CONNECT
                        </Button>
                    </div>
                </div>
            </article>
        </div>
    );
}
