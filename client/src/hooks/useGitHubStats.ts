import { useState, useEffect } from 'react';

export interface GitHubStats {
    login: string;
    name: string;
    avatar_url: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
    html_url: string;
    created_at: string;
    updated_at: string;
}

export interface GitHubRepo {
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    updated_at: string;
}

interface UseGitHubStatsReturn {
    stats: GitHubStats | null;
    repos: GitHubRepo[];
    loading: boolean;
    error: string | null;
}

const GITHUB_USERNAME = 'diegosantos-ai';
const CACHE_KEY = 'github_stats_cache';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutos

export function useGitHubStats(): UseGitHubStatsReturn {
    const [stats, setStats] = useState<GitHubStats | null>(null);
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            // Verificar cache
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const { data, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_DURATION) {
                    setStats(data.stats);
                    setRepos(data.repos);
                    setLoading(false);
                    return;
                }
            }

            try {
                // Buscar dados do usuário
                const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
                if (!userResponse.ok) throw new Error('Erro ao buscar perfil');
                const userData: GitHubStats = await userResponse.json();

                // Buscar repositórios
                const reposResponse = await fetch(
                    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
                );
                if (!reposResponse.ok) throw new Error('Erro ao buscar repositórios');
                const reposData: GitHubRepo[] = await reposResponse.json();

                // Salvar no cache
                localStorage.setItem(CACHE_KEY, JSON.stringify({
                    data: { stats: userData, repos: reposData },
                    timestamp: Date.now()
                }));

                setStats(userData);
                setRepos(reposData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return { stats, repos, loading, error };
}

export default useGitHubStats;
