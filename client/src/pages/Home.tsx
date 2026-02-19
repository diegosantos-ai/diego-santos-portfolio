import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-20 max-w-4xl">
      {/* Hero Section - Narrative Focus */}
      <section className="mb-32">
        <h1 className="text-5xl md:text-7xl font-serif text-[#f2f2f2] leading-[1.1] mb-8 tracking-tight">
          Transformando dados complexos em <span className="text-[#ff3300] italic">decisões estratégicas</span>.
        </h1>
        <p className="text-xl md:text-2xl text-[#888] font-light leading-relaxed max-w-2xl text-justify">
          Olá, sou <strong>Diego Santos</strong>. Engenheiro de Dados Sênior especializado em construir pipelines resilientes e arquiteturas escaláveis. Acredito que tecnologia sem propósito de negócio é apenas custo.
        </p>

        <div className="mt-12 flex gap-6">
          <Link href="/projetos">
            <a className="bg-[#f2f2f2] text-[#0a0a0a] px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-[#ff3300] hover:text-white transition-colors">
              Ver Projetos
            </a>
          </Link>
          <Link href="/sobre">
            <a className="border border-[#333] text-[#888] px-8 py-4 font-bold uppercase tracking-widest text-sm hover:border-[#f2f2f2] hover:text-[#f2f2f2] transition-colors">
              Minha História
            </a>
          </Link>
        </div>
      </section>

      {/* Featured Projects Teaser - Editorial List */}
      <section className="mb-32 border-t border-[#222] pt-20">
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="text-3xl font-serif text-[#f2f2f2]">Trabalhos Recentes</h2>
          <Link href="/projetos">
            <a className="text-[#ff3300] text-sm hover:underline flex items-center gap-2">
              Ver Portfolio Completo <ArrowUpRight size={14} />
            </a>
          </Link>
        </div>

        <div className="grid gap-12">
          {[
            {
              title: "Nexo Flux",
              category: "Orquestração de Dados",
              summary: "Redução de 40% no tempo de processamento de ETL para empresa de logística.",
              link: "/projetos" // Idealmente linkaria para detalhe
            },
            {
              title: "Data Streamer",
              category: "Analytics em Tempo Real",
              summary: "Ingestão de 5TB/dia com detecção de fraude millisecond-latency.",
              link: "/projetos"
            }
          ].map((project) => (
            <div key={project.title} className="group cursor-pointer">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-2">
                <h3 className="text-2xl font-bold group-hover:text-[#ff3300] transition-colors">{project.title}</h3>
                <span className="text-xs font-mono text-[#666] uppercase tracking-widest">{project.category}</span>
              </div>
              <p className="text-[#888] leading-relaxed max-w-2xl">{project.summary}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links / Footer tease */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-[#222] pt-20">
        <div>
          <h3 className="text-xl font-serif mb-4 text-[#f2f2f2]">Escrita Técnica</h3>
          <p className="text-[#666] mb-6">Compartilho aprendizados sobre Engenharia de Dados, Arquitetura e Carreira.</p>
          <Link href="/artigos">
            <a className="text-[#ff3300] hover:underline">Ler Artigos &rarr;</a>
          </Link>
        </div>
        <div>
          <h3 className="text-xl font-serif mb-4 text-[#f2f2f2]">Vamos Conversar?</h3>
          <p className="text-[#666] mb-6">Estou sempre aberto a discutir novos desafios e oportunidades de consultoria.</p>
          <Link href="/contato">
            <a className="text-[#ff3300] hover:underline">Entrar em Contato &rarr;</a>
          </Link>
        </div>
      </section>

    </div>
  );
}
