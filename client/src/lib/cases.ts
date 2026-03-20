import matter from 'gray-matter';

export interface Case {
    slug: string;
    title: string;
    summary: string;
    date: string;
    category: string;
    stack: string[];
    github?: string;
    demo?: string;
    content: string;
}

export async function getCases(): Promise<Case[]> {
    const modules = import.meta.glob('../../content/cases/*.md', { query: '?raw', import: 'default' });

    const cases: Case[] = [];

    for (const path in modules) {
        // Ignora o template
        if (path.includes('_template.md')) continue;

        try {
            const rawContent = await modules[path]() as string;
            const { data, content } = matter(rawContent);
            const slug = path.split('/').pop()?.replace('.md', '') || '';

            cases.push({
                slug,
                title: data.title,
                summary: data.summary,
                date: data.date,
                category: data.category,
                stack: data.stack || [],
                github: data.github,
                demo: data.demo,
                content,
            });
        } catch (e) {
            console.error(`Error loading case at ${path}`, e);
        }
    }

    return cases.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getCaseBySlug(slug: string): Promise<Case | null> {
    const cases = await getCases();
    return cases.find(c => c.slug === slug) || null;
}
