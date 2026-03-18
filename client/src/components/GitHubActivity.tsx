import { useGitHubStats } from '@/hooks/useGitHubStats';
import { Card } from '@/components/ui/card';
import { Github, GitFork, Star, Users, BookOpen, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function GitHubActivity() {
    const { stats, repos, loading, error } = useGitHubStats();

    if (loading) {
        return (
            <div className="animate-pulse space-y-4">
                <div className="h-32 bg-secondary/30 rounded-xl"></div>
                <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-20 bg-secondary/30 rounded-lg"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error || !stats) {
        return null; // Falha silenciosa - não mostra nada se a API falhar
    }

    return (
        <div className="space-y-6">
            {/* Header com Avatar e Stats Resumidos */}
            <div className="flex items-center gap-6">
                <img
                    src={stats.avatar_url}
                    alt={stats.name}
                    className="w-16 h-16 rounded-full border-2 border-primary"
                />
                <div className="flex-1">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Github size={20} className="text-primary" />
                        Atividade no GitHub
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Dados em tempo real de @{stats.login}
                    </p>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => window.open(stats.html_url, '_blank')}
                >
                    Ver Perfil <ExternalLink size={14} />
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
                <Card className="p-4 bg-card/50 glass border-border text-center">
                    <BookOpen className="mx-auto text-primary mb-2" size={24} />
                    <div className="text-2xl font-bold">{stats.public_repos}</div>
                    <div className="text-xs text-muted-foreground">Repositórios</div>
                </Card>
                <Card className="p-4 bg-card/50 glass border-border text-center">
                    <Users className="mx-auto text-accent mb-2" size={24} />
                    <div className="text-2xl font-bold">{stats.followers}</div>
                    <div className="text-xs text-muted-foreground">Seguidores</div>
                </Card>
                <Card className="p-4 bg-card/50 glass border-border text-center">
                    <Users className="mx-auto text-muted-foreground mb-2" size={24} />
                    <div className="text-2xl font-bold">{stats.following}</div>
                    <div className="text-xs text-muted-foreground">Seguindo</div>
                </Card>
            </div>

            {/* GitHub Readme Stats Image */}
            <div className="rounded-xl overflow-hidden border border-border">
                <img
                    src="https://github-readme-stats.vercel.app/api?username=diegosantos-ai&show_icons=true&theme=transparent&hide_border=true&title_color=A855F7&icon_color=22D3EE&text_color=FFFFFF&bg_color=00000000"
                    alt="GitHub Stats"
                    className="w-full"
                    loading="lazy"
                />
            </div>

            {/* Contribution Graph */}
            <div className="rounded-xl overflow-hidden border border-border">
                <img
                    src="https://github-readme-streak-stats.herokuapp.com/?user=diegosantos-ai&theme=transparent&hide_border=true&ring=A855F7&fire=22D3EE&currStreakLabel=FFFFFF"
                    alt="GitHub Streak"
                    className="w-full"
                    loading="lazy"
                />
            </div>

            {/* Top Repos */}
            {repos.length > 0 && (
                <div className="space-y-3">
                    <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                        Repositórios Recentes
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {repos.slice(0, 4).map(repo => (
                            <Card
                                key={repo.name}
                                className="p-4 bg-card/50 glass border-border cursor-pointer hover:border-primary/50 transition-colors"
                                onClick={() => window.open(repo.html_url, '_blank')}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="min-w-0 flex-1">
                                        <h5 className="font-semibold text-sm truncate">{repo.name}</h5>
                                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                            {repo.description || 'Sem descrição'}
                                        </p>
                                    </div>
                                    <ExternalLink size={12} className="text-muted-foreground flex-shrink-0 ml-2" />
                                </div>
                                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                                    {repo.language && (
                                        <span className="flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                                            {repo.language}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1">
                                        <Star size={12} /> {repo.stargazers_count}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <GitFork size={12} /> {repo.forks_count}
                                    </span>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default GitHubActivity;
