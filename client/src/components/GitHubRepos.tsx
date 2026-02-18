import { useState, useEffect } from "react";
import {
  getGitHubRepos,
  getFeaturedRepos,
  filterReposByTopics,
  formatRelativeDate,
  getLanguageColor,
  GitHubRepo,
} from "@/services/github";
import { Github, Star, ExternalLink, GitBranch } from "lucide-react";

const TOPIC_FILTERS = [
  { label: "Todos", topics: [] },
  { label: "Data Engineering", topics: ["data", "etl", "pipeline", "dbt"] },
  { label: "Automação", topics: ["automation", "n8n", "bot", "rpa"] },
  { label: "IA & ML", topics: ["ai", "ml", "rag", "llm", "openai", "langchain"] },
  { label: "Infra", topics: ["infra", "docker", "aws", "devops", "ci-cd"] },
];

export default function GitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRepos() {
      try {
        setIsLoading(true);
        const data = await getGitHubRepos();
        setRepos(data);
        // Por padrão, mostra os mais destacados
        setFilteredRepos(getFeaturedRepos(data, 6));
      } catch (err) {
        setError("Erro ao carregar repositórios");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadRepos();
  }, []);

  useEffect(() => {
    if (selectedFilter === 0) {
      setFilteredRepos(getFeaturedRepos(repos, 6));
    } else {
      const filter = TOPIC_FILTERS[selectedFilter];
      const filtered = filterReposByTopics(repos, filter.topics);
      setFilteredRepos(filtered.slice(0, 6));
    }
  }, [selectedFilter, repos]);

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 rounded border border-border bg-secondary/20 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground font-mono text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {TOPIC_FILTERS.map((filter, idx) => (
          <button
            key={filter.label}
            onClick={() => setSelectedFilter(idx)}
            className={`px-4 py-2 rounded font-mono text-xs tracking-wider transition-all ${
              selectedFilter === idx
                ? "bg-primary text-white"
                : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Grid de Repositórios */}
      {filteredRepos.length === 0 ? (
        <div className="py-12 text-center border border-dashed border-border rounded">
          <GitBranch size={24} className="mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground font-mono text-sm">
            Nenhum repositório encontrado para este filtro
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRepos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 border border-border rounded hover:border-primary hover:bg-secondary/30 transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Github size={14} className="text-muted-foreground" />
                  <h3 className="font-mono text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {repo.name}
                  </h3>
                </div>
                <ExternalLink
                  size={12}
                  className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                />
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem]">
                {repo.description || "Sem descrição"}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {repo.language && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-mono ${getLanguageColor(
                        repo.language
                      )}`}
                    >
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                    <Star size={12} />
                    {repo.stargazers_count}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground/60 font-mono">
                  {formatRelativeDate(repo.updated_at)}
                </span>
              </div>

              {/* Tópicos */}
              {repo.topics.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="text-[10px] px-1.5 py-0.5 bg-secondary rounded text-muted-foreground font-mono"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>
      )}

      {/* Link para ver todos */}
      <div className="text-center pt-4">
        <a
          href={`https://github.com/${"diegosantos-ai"}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors border-b border-border hover:border-primary pb-0.5"
        >
          Ver todos no GitHub <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
}
