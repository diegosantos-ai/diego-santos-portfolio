import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { getArticles, Article } from "@/lib/articles";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";

export default function Articles() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
    const [selectedTag, setSelectedTag] = useState<string>("Todos");
    const [isLoading, setIsLoading] = useState(true);
    const [, setLocation] = useLocation();

    useEffect(() => {
        async function loadArticles() {
            const data = await getArticles();
            setArticles(data);
            setFilteredArticles(data);
            setIsLoading(false);
        }
        loadArticles();
    }, []);

    useEffect(() => {
        if (selectedTag === "Todos") {
            setFilteredArticles(articles);
        } else {
            setFilteredArticles(articles.filter(article => article.tags.includes(selectedTag)));
        }
    }, [selectedTag, articles]);

    // Extrair tags únicas
    const allTags = ["Todos", ...Array.from(new Set(articles.flatMap(a => a.tags)))];

    return (
        <div className="min-h-screen bg-background text-foreground animate-fade-in">
            {/* Header */}
            <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
                <div className="container py-4 flex items-center justify-between">
                    <Button variant="ghost" size="sm" onClick={() => setLocation("/")} className="gap-2">
                        <ArrowLeft size={16} /> Voltar ao Portfólio
                    </Button>
                    <span className="font-bold gradient-text">DS Blog</span>
                </div>
            </div>

            <div className="container py-12">
                {/* Hero Section */}
                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold">Engenharia & Insights</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Aprendizados práticos do campo de batalha sobre Engenharia de Dados, IA e Automação.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedTag === tag
                                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-96 rounded-xl bg-secondary/20 animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredArticles.map((article) => (
                            <Card
                                key={article.slug}
                                className="group cursor-pointer overflow-hidden border-border bg-card/50 glass hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                                onClick={() => setLocation(`/artigos/${article.slug}`)}
                            >
                                {/* Image Placeholder if no image */}
                                <div className="aspect-video bg-secondary/30 relative overflow-hidden">
                                    {article.image ? (
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground/20">
                                            <span className="text-6xl font-bold">DS</span>
                                        </div>
                                    )}
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        {article.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="text-xs font-bold px-2 py-1 rounded bg-black/50 text-white backdrop-blur-md">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>{article.date}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1"><Clock size={12} /> 5 min</span>
                                        </div>
                                        <h2 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                                            {article.title}
                                        </h2>
                                        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                                            {article.excerpt}
                                        </p>
                                    </div>

                                    <div className="pt-4 flex items-center text-sm font-medium text-primary">
                                        Ler artigo <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
