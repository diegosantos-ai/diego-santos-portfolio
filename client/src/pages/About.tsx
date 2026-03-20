import { Link } from "wouter";

export default function About() {
    return (
        <div className="container mx-auto px-6 py-20 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif text-[#f2f2f2] mb-12">Sobre Mim</h1>

            <div className="prose prose-invert prose-lg text-[#aaa] font-light leading-relaxed">
                <p className="text-xl text-[#f2f2f2] font-normal mb-8">
                    Mais do que código, construo sistemas que resolvem problemas reais. Minha jornada transita entre o desenvolvimento de software corporativo e a engenharia de dados, garantindo plataformas robustas e integradas.
                </p>

                <h3 className="text-2xl font-serif text-[#f2f2f2] mt-12 mb-6">Minha Jornada</h3>
                <p>
                    Com forte background analítico, desenvolvi minha carreira criando desde pipelines de ingestão de dados até arquiteturas complexas de backend e automação. Minha visão técnica sempre foi híbrida: engenharia de software aplicada para extrair o máximo de valor da infraestrutura e dos dados.
                </p>
                <p className="mt-4">
                    Hoje, meu foco está em liderar integrações escaláveis, construir plataformas resilientes e aplicar Inteligência Artificial de maneira pragmática, tratando-a como uma extensão natural da engenharia de software.
                </p>

                <h3 className="text-2xl font-serif text-[#f2f2f2] mt-12 mb-6">Além do Trabalho</h3>
                <p>
                    Quando não estou arquitetando soluções complexas no plano técnico, gosto de explorar o mundo através da fotografia analógica e da literatura de ficção científica. Acredito que a criatividade fora da tela alimenta a inovação de sistemas.
                </p>

                <h3 className="text-2xl font-serif text-[#f2f2f2] mt-12 mb-6">O que me entusiasma</h3>
                <p>
                    O que realmente me move é o desafio arquitetural e a oportunidade de impacto operacional. Desacoplar monolitos, desenhar automações que economizam horas de trabalho manual e implementar agentes de IA em fluxos produtivos é o que me faz levantar todos os dias.
                </p>
            </div>

            <div className="mt-16 flex gap-6 border-t border-[#222] pt-12">
                <a
                    href="https://linkedin.com/in/diego-santos-ia"
                    target="_blank"
                    className="text-[#ff3300] hover:text-[#fff] transition-colors font-bold uppercase tracking-widest text-sm"
                >
                    LinkedIn
                </a>
                <a
                    href="/resume.pdf"
                    className="text-[#ff3300] hover:text-[#fff] transition-colors font-bold uppercase tracking-widest text-sm"
                >
                    Download CV (PDF)
                </a>
            </div>
        </div>
    );
}
