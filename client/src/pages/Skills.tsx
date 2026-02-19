import { Database, Cpu, Search, Cloud, Code, BarChart } from "lucide-react";

const SKILL_CATEGORIES = [
    {
        title: "Engenharia de Dados",
        icon: Database,
        description: "Construção de pipelines resilientes e modelagem de dados escalável.",
        skills: [
            { name: "Apache Airflow", context: "Orquestração de workflows complexos e dependências." },
            { name: "Apache Kafka", context: "Ingestão de eventos em tempo real e arquitetura EDA." },
            { name: "Spark / PySpark", context: "Processamento distribuído de grandes volumes de dados." },
            { name: "dbt (Data Build Tool)", context: "Transformação e testes de dados no warehouse." },
        ]
    },
    {
        title: "Banco de Dados & Armazenamento",
        icon: Cloud,
        description: "Escolha e otimização da tecnologia certa para cada caso de uso.",
        skills: [
            { name: "PostgreSQL", context: "OLTP principal e warehousing para pequenas escalas." },
            { name: "Snowflake / BigQuery", context: "Data Warehousing moderno em nuvem." },
            { name: "Redis", context: "Caching e armazenamento de sessão de baixa latência." },
            { name: "Vector DBs (Qdrant)", context: "Busca semântica para aplicações de IA." },
        ]
    },
    {
        title: "Machine Learning & IA",
        icon: Cpu,
        description: "Operacionalização de modelos e integração de LLMs.",
        skills: [
            { name: "Scikit-Learn", context: "Modelos preditivos clássicos e análise estatística." },
            { name: "LangChain", context: "Orquestração de LLMs e construção de agentes." },
            { name: "MLflow", context: "Rastreamento de experimentos e registro de modelos." },
        ]
    },
    {
        title: "DevOps & Infraestrutura",
        icon: Code,
        description: "Automação e infraestrutura como código.",
        skills: [
            { name: "Docker / Kubernetes", context: "Containerização e orquestração de serviços." },
            { name: "Terraform", context: "Provisionamento de infraestrutura em AWS/GCP." },
            { name: "CI/CD (GitHub Actions)", context: "Automação de testes e deploy." }
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
