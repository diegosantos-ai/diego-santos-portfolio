/**
 * Serviço de integração com GitHub API
 * Busca repositórios públicos do usuário diegosantos-ai
 */

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  updated_at: string;
  created_at: string;
  fork: boolean;
}

export interface GitHubActivity {
  type: string;
  repo: string;
  date: string;
  message?: string;
}

const GITHUB_USERNAME = "diegosantos-ai";
const CACHE_KEY = "github_repos_cache";
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutos

interface CacheData {
  repos: GitHubRepo[];
  timestamp: number;
}

/**
 * Busca repositórios do GitHub com cache local
 */
export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  // Verifica cache primeiro
  const cached = getCachedRepos();
  if (cached) {
    console.log("[GitHub] Usando cache local");
    return cached;
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();

    // Filtra repositórios que não são forks
    const ownRepos = repos.filter((repo) => !repo.fork);

    // Salva no cache
    setCachedRepos(ownRepos);

    console.log(`[GitHub] ${ownRepos.length} repositórios carregados`);
    return ownRepos;
  } catch (error) {
    console.error("[GitHub] Erro ao buscar repositórios:", error);
    // Fallback para cache antigo se existir
    const oldCache = localStorage.getItem(CACHE_KEY);
    if (oldCache) {
      const data = JSON.parse(oldCache) as CacheData;
      return data.repos;
    }
    return [];
  }
}

/**
 * Filtra repositórios por tópicos relevantes
 */
export function filterReposByTopics(
  repos: GitHubRepo[],
  topics: string[]
): GitHubRepo[] {
  return repos.filter((repo) =>
    topics.some((topic) =>
      repo.topics.some((t) => t.toLowerCase().includes(topic.toLowerCase()))
    )
  );
}

/**
 * Obtém repositórios em destaque (mais estrelados)
 */
export function getFeaturedRepos(
  repos: GitHubRepo[],
  limit: number = 6
): GitHubRepo[] {
  return [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, limit);
}

/**
 * Busca atividade recente (últimos eventos)
 */
export async function getGitHubActivity(): Promise<GitHubActivity[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const events = await response.json();

    return events
      .filter((event: any) =>
        ["PushEvent", "CreateEvent", "PullRequestEvent"].includes(event.type)
      )
      .slice(0, 5)
      .map((event: any) => ({
        type: event.type,
        repo: event.repo.name.replace(`${GITHUB_USERNAME}/`, ""),
        date: event.created_at,
        message: event.payload?.commits?.[0]?.message || event.payload?.description,
      }));
  } catch (error) {
    console.error("[GitHub] Erro ao buscar atividade:", error);
    return [];
  }
}

/**
 * Formata data relativa (ex: "2 dias atrás")
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hoje";
  if (diffDays === 1) return "Ontem";
  if (diffDays < 7) return `${diffDays} dias atrás`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} semanas atrás`;

  return date.toLocaleDateString("pt-BR", {
    month: "short",
    year: "numeric",
  });
}

/**
 * Obtém cor do badge baseada na linguagem
 */
export function getLanguageColor(language: string | null): string {
  const colors: Record<string, string> = {
    Python: "bg-yellow-500/20 text-yellow-600",
    TypeScript: "bg-blue-500/20 text-blue-600",
    JavaScript: "bg-yellow-400/20 text-yellow-500",
    "Jupyter Notebook": "bg-orange-500/20 text-orange-600",
    SQL: "bg-purple-500/20 text-purple-600",
    Shell: "bg-green-500/20 text-green-600",
    HTML: "bg-orange-600/20 text-orange-700",
    CSS: "bg-blue-400/20 text-blue-500",
    Rust: "bg-orange-700/20 text-orange-800",
    Go: "bg-cyan-500/20 text-cyan-600",
  };

  return colors[language || ""] || "bg-muted text-muted-foreground";
}

// Funções auxiliares de cache
function getCachedRepos(): GitHubRepo[] | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const data = JSON.parse(cached) as CacheData;
    const now = Date.now();

    if (now - data.timestamp > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return data.repos;
  } catch {
    return null;
  }
}

function setCachedRepos(repos: GitHubRepo[]): void {
  try {
    const data: CacheData = {
      repos,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("[GitHub] Erro ao salvar cache:", error);
  }
}
