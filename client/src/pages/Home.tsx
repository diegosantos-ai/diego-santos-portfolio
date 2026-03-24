import { Link } from "wouter";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { getCases, Case } from "@/lib/cases";

export default function Home() {
  const [recentCases, setRecentCases] = useState<Case[]>([]);

  useEffect(() => {
    getCases().then(cases => setRecentCases(cases.slice(0, 3))); // Pegar os 3 para refletir o plano
  }, []);

  return (
    <div className="container mx-auto px-6 py-20 max-w-4xl space-y-32">
      {/* Hero Section */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-5xl md:text-7xl font-serif text-[#f2f2f2] leading-[1.1] mb-8 tracking-tight">
          Sistemas escaláveis, automação corporativa e <span className="text-[#ff3300] italic">arquitetura backend</span>.
        </h1>
        <p className="text-xl md:text-2xl text-[#888] font-light leading-relaxed max-w-2xl text-justify mb-12">
          Engenheiro de Software com foco em abstrair complexidade. Transformo necessidades corporativas em arquiteturas distribuídas, infraestrutura imutável e automação baseada em agentes autônomos.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/cases">
            <a className="bg-[#f2f2f2] text-[#0a0a0a] px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-[#ff3300] hover:text-white transition-colors text-center">
              Explorar Cases Técnicos
            </a>
          </Link>
          <a
            href="https://github.com/diegosantos-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#333] text-[#888] px-8 py-4 font-bold uppercase tracking-widest text-sm hover:border-[#f2f2f2] hover:text-[#f2f2f2] transition-colors flex items-center justify-center gap-3"
          >
            <Github size={18} />
            GitHub
          </a>
        </div>
      </section>

      {/* Engenharia e Cases */}
      <section className="border-t border-[#222] pt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-serif text-[#f2f2f2] mb-2">Engenharia e Arquitetura</h2>
            <p className="text-[#888]">Projetos selecionados evidenciando infraestrutura e integração sistêmica.</p>
          </div>
          <Link href="/cases">
            <a className="text-[#ff3300] text-sm hover:underline flex items-center gap-2 uppercase tracking-wide font-bold">
              Ver todos <ArrowUpRight size={16} />
            </a>
          </Link>
        </div>

        <div className="grid gap-10">
          {recentCases.map((c) => (
            <Link key={c.slug} href={`/cases/${c.slug}`}>
              <a className="group block border border-[#222] p-8 hover:border-[#444] transition-colors relative bg-[#0a0a0a]/50">
                <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                  <div className="space-y-4 max-w-2xl">
                    <span className="text-xs font-mono text-[#ff3300] uppercase tracking-widest bg-[#ff3300]/10 px-3 py-1 rounded-sm">
                      {c.category}
                    </span>
                    <h3 className="text-2xl font-bold group-hover:text-[#f2f2f2] text-[#e0e0e0] transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-[#888] leading-relaxed">
                      {c.summary}
                    </p>
                  </div>
                  <div className="md:text-right w-full md:w-auto">
                     <p className="text-xs text-[#555] font-mono mb-2">STACK</p>
                     <div className="flex flex-wrap md:justify-end gap-2 max-w-[250px]">
                       {c.stack.slice(0, 3).map((tech) => (
                         <span key={tech} className="text-xs text-[#aaa] border border-[#333] px-2 py-1 rounded hover:border-[#666]">
                           {tech}
                         </span>
                       ))}
                       {c.stack.length > 3 && <span className="text-xs text-[#666] px-2 py-1">+{c.stack.length - 3}</span>}
                     </div>
                  </div>
                </div>
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                  <ArrowUpRight className="text-[#ff3300]" size={24} />
                </div>
              </a>
            </Link>
          ))}
        </div>
      </section>

      {/* Resumo Biográfico & Atividade e Footer */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-[#222] pt-20">
        <div>
          <h3 className="text-2xl font-serif mb-6 text-[#f2f2f2]">Sobre a Prática</h3>
          <div className="space-y-4 text-[#888] text-justify leading-relaxed">
             <p>
               Trabalho mitigando débito técnico através de processos estritos de IaC e CI/CD. Minha abordagem de engenharia assume que código bom é código previsível, testável e capaz de ser revertido.
             </p>
             <p>
               Recentemente, introduzi orquestração baseada em LLMs locais para acelerar baselines de automação.
             </p>
          </div>
          <div className="mt-8">
            <Link href="/sobre">
              <a className="text-[#ff3300] hover:underline flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
                Ler Background Completo <ArrowUpRight size={16} />
              </a>
            </Link>
          </div>
        </div>

        <div className="border border-[#222] p-8 bg-[#0a0a0a]/50">
          <h3 className="text-xl font-bold mb-2 flex items-center gap-3 text-[#f2f2f2]">
            <Github size={20} className="text-[#ff3300]" /> Snapshot do Repositório
          </h3>
          <p className="text-[#666] text-sm mb-6">Atividade atual de engenharia.</p>

          <img
            src="https://github-readme-stats.vercel.app/api?username=diegosantos-ai&show_icons=true&theme=transparent&hide_border=true&title_color=ff3300&icon_color=f2f2f2&text_color=888888&bg_color=00000000"
            alt="GitHub Stats"
            className="w-full opacity-80 hover:opacity-100 transition-opacity"
            loading="lazy"
          />
          <div className="mt-6 pt-6 border-t border-[#222]">
            <a href="https://github.com/diegosantos-ai" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group">
              <span className="text-[#888] group-hover:text-[#f2f2f2] transition-colors">Seguir no GitHub</span>
              <ExternalLink size={16} className="text-[#444] group-hover:text-[#ff3300]" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
