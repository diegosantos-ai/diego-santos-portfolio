import { Link } from "wouter";

export default function About() {
    return (
        <div className="container mx-auto px-6 py-20 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif text-[#f2f2f2] mb-12">Sobre Mim</h1>

            <div className="prose prose-invert prose-lg text-[#aaa] font-light leading-relaxed">
                <p className="text-xl text-[#f2f2f2] font-normal mb-8">
                    Mais do que código, construo soluções que resolvem problemas reais. Minha jornada na Engenharia de Dados começou pela curiosidade em entender o "porquê" por trás dos números.
                </p>

                <h3 className="text-2xl font-serif text-[#f2f2f2] mt-12 mb-6">Minha Jornada</h3>
                <p>
                    Iniciei minha carreira no desenvolvimento web, mas logo percebi que o verdadeiro valor estava nos dados que as aplicações geravam. Decidi migrar para a área de dados para ajudar empresas a transformar terabytes de informações brutas em insights acionáveis.
                </p>
                <p className="mt-4">
                    Desde então, tenho liderado projetos de arquitetura de dados, construído pipelines de ETL robustos e implementado soluções de Machine Learning em produção.
                </p>

                <h3 className="text-2xl font-serif text-[#f2f2f2] mt-12 mb-6">Além do Trabalho</h3>
                <p>
                    Quando não estou otimizando queries SQL ou desenhando arquiteturas no draw.io, gosto de explorar o mundo através da fotografia analógica e da literatura de ficção científica. Acredito que a criatividade fora da tela alimenta a inovação técnica.
                </p>

                <h3 className="text-2xl font-serif text-[#f2f2f2] mt-12 mb-6">O que me entusiasma</h3>
                <p>
                    O que realmente me move é o desafio de escala e a oportunidade de causar impacto. Ver um pipeline rodando 10x mais rápido ou um modelo preditivo economizando recursos para uma empresa é o que me faz levantar todos os dias.
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
