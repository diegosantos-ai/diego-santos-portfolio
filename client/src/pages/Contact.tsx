import { Mail, Linkedin, Github } from "lucide-react";

export default function Contact() {
    return (
        <div className="container mx-auto px-6 py-20 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-serif text-[#f2f2f2] mb-12">Vamos Conversar?</h1>

            <div className="grid md:grid-cols-2 gap-16 items-start">
                <div>
                    <p className="text-xl text-[#aaa] font-light leading-relaxed mb-8">
                        Estou sempre interessado em ouvir sobre novos projetos, oportunidades de consultoria ou convites para palestras.
                    </p>
                    <p className="text-[#888] leading-relaxed mb-12">
                        Se você está procurando alguém para ajudar a estruturar sua plataforma de dados, otimizar pipelines existentes ou integrar IA ao seu negócio, mande uma mensagem.
                    </p>

                    <div className="space-y-6">
                        <a
                            href="mailto:santos.diegoj86@gmail.com"
                            className="flex items-center gap-4 text-[#f2f2f2] hover:text-[#ff3300] transition-colors group"
                        >
                            <div className="bg-[#111] p-3 rounded-full group-hover:bg-[#ff3300] group-hover:text-white transition-colors">
                                <Mail size={20} />
                            </div>
                            <span className="text-lg">santos.diegoj86@gmail.com</span>
                        </a>

                        <a
                            href="https://linkedin.com/in/diego-santos-ia"
                            target="_blank"
                            className="flex items-center gap-4 text-[#f2f2f2] hover:text-[#ff3300] transition-colors group"
                        >
                            <div className="bg-[#111] p-3 rounded-full group-hover:bg-[#ff3300] group-hover:text-white transition-colors">
                                <Linkedin size={20} />
                            </div>
                            <span className="text-lg">LinkedIn</span>
                        </a>

                        <a
                            href="https://github.com/diegosantos-ai"
                            target="_blank"
                            className="flex items-center gap-4 text-[#f2f2f2] hover:text-[#ff3300] transition-colors group"
                        >
                            <div className="bg-[#111] p-3 rounded-full group-hover:bg-[#ff3300] group-hover:text-white transition-colors">
                                <Github size={20} />
                            </div>
                            <span className="text-lg">GitHub</span>
                        </a>
                    </div>
                </div>

                {/* Optional: Contact Form Placeholder or Calendly Embed */}
                <div className="bg-[#111] p-8 border border-[#222]">
                    <h3 className="text-[#f2f2f2] font-bold mb-6">Agendar uma Reunião</h3>
                    <p className="text-[#888] text-sm mb-6">
                        Prefere uma conversa direta? Verifique minha disponibilidade e agende um horário.
                    </p>
                    <a
                        href="#" // Replace with Calendly link if available
                        className="block w-full bg-[#ff3300] text-white text-center py-4 font-bold uppercase tracking-widest text-sm hover:bg-[#cc2900] transition-colors"
                        onClick={(e) => { e.preventDefault(); alert("Link do Calendly deve ser configurado."); }}
                    >
                        Agendar via Calendly
                    </a>
                </div>
            </div>
        </div>
    );
}
