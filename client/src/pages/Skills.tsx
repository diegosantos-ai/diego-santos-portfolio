import { Database, Cpu, Search, Cloud, Code, BarChart } from "lucide-react";

const SKILL_CATEGORIES = [
    {
        title: "Engenharia de Software & Backend",
        icon: Code,
        description: "Desenvolvimento de APIs robustas, microsserviços e integração de sistemas complexos.",
        skills: [
            { name: "Node.js / TypeScript", context: "Desenvolvimento backend contínuo, seguro e com alta tipagem." },
            { name: "Python", context: "Scripts de automação, manipulação de dados e integrações lógicas profundas." },
            { name: "REST & GraphQL", context: "Design de APIs conectando múltiplos sistemas legados e em nuvem." },
            { name: "PostgreSQL / Redis", context: "Modelagem relacional para transações e caching de baixa latência." },
        ]
    },
    {
        title: "Automação & Plataforma",
        icon: Cloud,
        description: "Orquestração de ambientes, automações operacionais e cultura DevOps.",
        skills: [
            { name: "Docker / Kubernetes", context: "Containerização, deployment previsível e orquestração de serviços." },
            { name: "CI/CD (GitHub Actions)", context: "Esteiras de validação estática, teste e deploy automatizado." },
            { name: "Terraform", context: "Provisionamento de infraestrutura como código (IaC) e idempotência." },
            { name: "n8n / Airflow", context: "Criação de fluxos complexos de automação de processos de negócio." },
        ]
    },
    {
        title: "IA Aplicada & Engenharia de Dados",
        icon: Cpu,
        description: "A IA como extensão pragmática da engenharia de software e suporte em dados.",
        skills: [
            { name: "Integração LLMs", context: "Orquestração de modelos, agentes autônomos e RAG em produção." },
            { name: "Vector DBs (Qdrant)", context: "Busca semântica acelerada para aplicações inteligentes." },
            { name: "dbt & Spark", context: "Transformações analíticas mantidas como subproduto de software." },
            { name: "Kafka", context: "Ingestão e processamento de eventos orientados a dados estruturados." },
        ]
    }
];

export default function Skills() {
    return (
        <div className="container mx-auto px-6 py-20 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-serif text-[#f2f2f2] mb-6">Habilidades e Ferramentas</h1>
            <p className="text-xl text-[#888] font-light mb-16 max-w-2xl">
                Ferramentas são meios, não fins. Aqui estão as tecnologias que domino e, mais importante, como as aplico para gerar valor.
            </p>

            <div className="grid gap-16">
                {SKILL_CATEGORIES.map((category) => (
                    <div key={category.title} className="group">
                        <div className="flex items-center gap-4 mb-6">
                            <category.icon className="text-[#ff3300] w-6 h-6" />
                            <h2 className="text-2xl font-bold text-[#f2f2f2]">{category.title}</h2>
                        </div>

                        <p className="text-[#666] mb-8 max-w-xl italic border-l-2 border-[#222] pl-4">
                            {category.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {category.skills.map((skill) => (
                                <div key={skill.name} className="bg-[#111] p-6 border border-[#222] hover:border-[#ff3300] transition-colors">
                                    <h3 className="text-[#f2f2f2] font-bold mb-2 font-mono text-sm">{skill.name}</h3>
                                    <p className="text-[#888] text-sm leading-relaxed">
                                        {skill.context}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
