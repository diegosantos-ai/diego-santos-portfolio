import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getCases, Case } from "@/lib/cases";

export default function Home() {
  const [recentCases, setRecentCases] = useState<Case[]>([]);

  useEffect(() => {
    getCases().then(cases => setRecentCases(cases.slice(0, 2)));
  }, []);

  return (
    <div className="container mx-auto px-6 py-20 max-w-4xl">
      {/* Hero Section - Narrative Focus */}
      <section className="mb-32">
        <h1 className="text-5xl md:text-7xl font-serif text-[#f2f2f2] leading-[1.1] mb-8 tracking-tight">
          Sistemas escaláveis, automação corporativa e <span className="text-[#ff3300] italic">arquitetura backend</span>.
        </h1>
        <p className="text-xl md:text-2xl text-[#888] font-light leading-relaxed max-w-2xl text-justify">
          Olá, sou <strong>Diego Santos</strong>. Engenheiro de Software especializado em construir plataformas resilientes e integrar ecossistemas complexos. Aplico automação e Inteligência Artificial como extensão da engenharia para resolver problemas reais de negócio.
        </p>

        <div className="mt-12 flex gap-6">
          <Link href="/cases">
            <a className="bg-[#f2f2f2] text-[#0a0a0a] px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-[#ff3300] hover:text-white transition-colors">
              Ver Cases
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
          <Link href="/cases">
            <a className="text-[#ff3300] text-sm hover:underline flex items-center gap-2">
              Ver Cases Técnicos <ArrowUpRight size={14} />
            </a>
          </Link>
        </div>

        <div className="grid gap-12">
          {recentCases.map((c) => (
            <Link key={c.slug} href={`/cases/${c.slug}`}>
              <a className="block group cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-2">
                  <h3 className="text-2xl font-bold group-hover:text-[#ff3300] transition-colors">{c.title}</h3>
                  <span className="text-xs font-mono text-[#666] uppercase tracking-widest">{c.category}</span>
                </div>
                <p className="text-[#888] leading-relaxed max-w-2xl">{c.summary}</p>
              </a>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Links / Footer tease */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-[#222] pt-20">
        <div>
          <h3 className="text-xl font-serif mb-4 text-[#f2f2f2]">Escrita Técnica</h3>
          <p className="text-[#666] mb-6">Compartilho aprendizados sobre Engenharia, Arquitetura e IA.</p>
          <Link href="/artigos">
            <a className="text-[#ff3300] hover:underline">Ler Publicações &rarr;</a>
          </Link>
        </div>
        <div>
          <h3 className="text-xl font-serif mb-4 text-[#f2f2f2]">Vamos Conversar?</h3>
          <p className="text-[#666] mb-6">Aberto a discutir desafios complexos de arquitetura e infraestrutura.</p>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#ff3300] hover:underline">LinkedIn &rarr;</a>
        </div>
      </section>
    </div>
  );
}
