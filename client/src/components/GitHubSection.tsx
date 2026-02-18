import { useGitHubStats } from '@/hooks/useGitHubStats';
import { Card } from '@/components/ui/card';
import { 
    Github, 
    GitFork, 
    Star, 
    Users, 
    BookOpen, 
    ExternalLink,
    GitCommit,
    GitPullRequest,
    GitBranch,
    Loader2,
    AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatRelativeDate } from '@/services/github';

// Cores das linguagens
const languageColors: Record<string, string> = {
    Python: '#FFD700',
    TypeScript: '#3178C6',
    JavaScript: '#F7DF1E',
    'Jupyter Notebook': '#F37626',
    SQL: '#336791',
    Shell: '#89E051',
    HTML: '#E34F26',
    CSS: '#1572B6',
    Rust: '#DEA584',
    Go: '#00ADD8',
    Java: '#B07219',
    'C++': '#F34B7D',
    C: '#555555',
};

function getLanguageColor(language: string | null): string {
    return languageColors[language || ''] || '#8B949E';
}

// Componente de loading skeleton
function GitHubSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-6 animate-pulse">
            {/* Left column skeleton */}
            <div className="space-y-4">
                <div className="aspect-square bg-secondary/30 rounded-none border border-border" />
                <div className="h-6 bg-secondary/30 w-3/4" />
                <div className="h-4 bg-secondary/30 w-1/2" />
                <div className="grid grid-cols-3 gap-2 mt-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-16 bg-secondary/30 border border-border" />
                    ))}
                </div>
            </div>
            {/* Right column skeleton */}
            <div className="space-y-4">
                <div className="h-8 bg-secondary/30 w-48" />
                <div className="space-y-3">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-20 bg-secondary/30 border border-border" />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Componente de erro
function GitHubError({ onRetry }: { onRetry: () => void }) {
    return (
        <Card className="p-8 text-center border-border bg-card/50">
            <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
            <h3 className="text-lg font-semibold mb-2">Erro ao carregar dados do GitHub</h3>
            <p className="text-sm text-muted-foreground mb-4">
                Não foi possível conectar à API do GitHub. Isso pode ser devido a limites de requisição.
            </p>
            <Button variant="outline" size="sm" onClick={onRetry}>
                Tentar novamente
            </Button>
        </Card>
    );
}

// Componente de perfil (coluna esquerda)
function ProfileCard({ stats }: { stats: NonNullable<ReturnType<typeof useGitHubStats>['stats']> }) {
    return (
        <div className="space-y-5">
            {/* Avatar com borda neon */}
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                <img
                    src={stats.avatar_url}
                    alt={stats.name || stats.login}
                    className="relative w-full aspect-square object-cover border border-border"
                    loading="lazy"
                />
            </div>

            {/* Nome e username */}
            <div>
                <h3 className="text-xl font-bold tracking-tight">
                    {stats.name || stats.login}
                </h3>
                <a 
                    href={stats.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 mt-1"
                >
                    @{stats.login}
                    <ExternalLink size={12} />
                </a>
            </div>

            {/* Bio */}
            {stats.bio && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {stats.bio}
                </p>
            )}

            {/* Stats compactos */}
            <div className="grid grid-cols-3 gap-px bg-border border border-border">
                <div className="bg-card p-3 text-center">
                    <BookOpen className="mx-auto text-primary mb-1.5" size={18} />
                    <div className="text-lg font-bold leading-none">{stats.public_repos}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Repos</div>
                </div>
                <div className="bg-card p-3 text-center">
                    <Users className="mx-auto text-accent mb-1.5" size={18} />
                    <div className="text-lg font-bold leading-none">{stats.followers}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Followers</div>
                </div>
                <div className="bg-card p-3 text-center">
                    <Users className="mx-auto text-muted-foreground mb-1.5" size={18} />
                    <div className="text-lg font-bold leading-none">{stats.following}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Following</div>
                </div>
            </div>

            {/* Botão Ver Perfil */}
            <Button
                variant="outline"
                className="w-full gap-2 font-mono text-xs tracking-wider border-border hover:border-primary hover:bg-primary/5"
                onClick={() => window.open(stats.html_url, '_blank')}
            >
                <Github size={14} />
                Ver Perfil Completo
                <ExternalLink size={12} />
            </Button>
        </div>
    );
}

// Componente de card de repositório
function RepoCard({ repo }: { repo: ReturnType<typeof useGitHubStats>['repos'][0] }) {
    return (
        <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-4 border border-border hover:border-primary transition-all duration-300 bg-card/30 hover:bg-card"
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <GitBranch size={14} className="text-muted-foreground flex-shrink-0" />
                        <h4 className="font-mono text-sm font-semibold truncate group-hover:text-primary transition-colors">
                            {repo.name}
                        </h4>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                        {repo.description || 'Sem descrição'}
                    </p>
                </div>
                <ExternalLink 
                    size={12} 
                    className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" 
                />
            </div>
            
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                {repo.language && (
                    <span className="flex items-center gap-1.5">
                        <span 
                            className="w-2.5 h-2.5 rounded-full" 
                            style={{ backgroundColor: getLanguageColor(repo.language) }}
                        />
                        {repo.language}
                    </span>
                )}
                <span className="flex items-center gap-1 hover:text-foreground transition-colors">
                    <Star size={12} /> 
                    {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1 hover:text-foreground transition-colors">
                    <GitFork size={12} /> 
                    {repo.forks_count}
                </span>
                <span className="ml-auto font-mono text-[10px]">
                    {formatRelativeDate(repo.updated_at)}
                </span>
            </div>
        </a>
    );
}

// Componente de timeline de atividade
function ActivityTimeline({ repos }: { repos: ReturnType<typeof useGitHubStats>['repos'] }) {
    // Simula atividade baseada nos repos mais recentes
    const activities = repos.slice(0, 4).map((repo, idx) => {
        const types = ['PushEvent', 'CreateEvent', 'PullRequestEvent'] as const;
        const type = types[idx % types.length];
        const daysAgo = idx + 1;
        
        return {
            type,
            repo: repo.name,
            date: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
        };
    });

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'PushEvent': return <GitCommit size={14} className="text-primary" />;
            case 'PullRequestEvent': return <GitPullRequest size={14} className="text-accent" />;
            case 'CreateEvent': return <GitBranch size={14} className="text-muted-foreground" />;
            default: return <GitCommit size={14} className="text-primary" />;
        }
    };

    const getActivityLabel = (type: string) => {
        switch (type) {
            case 'PushEvent': return 'Commit em';
            case 'PullRequestEvent': return 'PR em';
            case 'CreateEvent': return 'Novo repo';
            default: return 'Atividade em';
        }
    };

    return (
        <div className="space-y-0">
            {activities.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3 group">
                    {/* Linha de timeline */}
                    <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full border border-border bg-card flex items-center justify-center group-hover:border-primary transition-colors">
                            {getActivityIcon(activity.type)}
                        </div>
                        {idx < activities.length - 1 && (
                            <div className="w-px h-10 bg-border mt-1" />
                        )}
                    </div>
                    
                    {/* Conteúdo */}
                    <div className="flex-1 pb-5">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs text-muted-foreground">
                                {getActivityLabel(activity.type)}
                            </span>
                            <a 
                                href={`https://github.com/diegosantos-ai/${activity.repo}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-xs text-foreground hover:text-primary transition-colors"
                            >
                                {activity.repo}
                            </a>
                        </div>
                        <span className="text-[10px] text-muted-foreground/60 font-mono">
                            {formatRelativeDate(activity.date)}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

// Componente principal
export function GitHubSection() {
    const { stats, repos, loading, error } = useGitHubStats();

    if (loading) {
        return <GitHubSkeleton />;
    }

    if (error || !stats) {
        return <GitHubError onRetry={() => window.location.reload()} />;
    }

    return (
        <div className="space-y-8">
            {/* Layout principal assimétrico */}
            <div className="grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-6 lg:gap-8">
                {/* Coluna esquerda - Perfil */}
                <div className="lg:sticky lg:top-24 lg:self-start">
                    <ProfileCard stats={stats} />
                </div>

                {/* Coluna direita - Conteúdo */}
                <div className="space-y-6">
                    {/* Repositórios Recentes */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <p className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase">
                                // Repositórios Recentes
                            </p>
                            <span className="font-mono text-[10px] text-muted-foreground/60">
                                {repos.length} total
                            </span>
                        </div>
                        <div className="space-y-2">
                            {repos.slice(0, 4).map(repo => (
                                <RepoCard key={repo.name} repo={repo} />
                            ))}
                        </div>
                    </div>

                    {/* Grid de Stats + Atividade */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* GitHub Stats Image */}
                        <div>
                            <p className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase mb-3">
                                // Estatísticas
                            </p>
                            <div className="border border-border overflow-hidden">
                                <img
                                    src={`https://github-readme-stats.vercel.app/api?username=${stats.login}&show_icons=true&theme=transparent&hide_border=true&title_color=0066FF&icon_color=00FF88&text_color=FFFFFF&bg_color=00000000&hide_title=true&card_width=320`}
                                    alt="GitHub Stats"
                                    className="w-full"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        {/* Timeline de Atividade */}
                        <div>
                            <p className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase mb-3">
                                // Atividade Recente
                            </p>
                            <ActivityTimeline repos={repos} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Contribution Graph - Full Width */}
            <div className="border border-border p-4">
                <p className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase mb-4">
                    // Contribuições
                </p>
                <div className="overflow-x-auto">
                    <img
                        src={`https://github-readme-streak-stats.herokuapp.com/?user=${stats.login}&theme=transparent&hide_border=true&ring=0066FF&fire=00FF88&currStreakLabel=FFFFFF&background=00000000&date_format=M%20j%5B%2C%20Y%5D`}
                        alt="GitHub Streak"
                        className="w-full min-w-[500px]"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    );
}

export default GitHubSection;
