import matter from 'gray-matter';

export interface Article {
    slug: string;
    title: string;
    date: string;
    tags: string[];
    image: string;
    excerpt: string;
    content: string;
}

export async function getArticles(): Promise<Article[]> {
    const modules = import.meta.glob('../content/articles/*.md', { query: '?raw', import: 'default' });

    const articles: Article[] = [];

    for (const path in modules) {
        try {
            const rawContent = await modules[path]() as string;
            const { data, content } = matter(rawContent);
            const slug = path.split('/').pop()?.replace('.md', '') || '';

            articles.push({
                slug,
                title: data.title,
                date: data.date,
                tags: data.tags || [],
                image: data.image,
                excerpt: data.excerpt,
                content,
            });
        } catch (e) {
            console.error(`Error loading article at ${path}`, e);
        }
    }

    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    const articles = await getArticles();
    return articles.find(article => article.slug === slug) || null;
}
