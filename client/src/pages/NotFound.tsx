import { Button } from "@/components/ui/button";
import { AlertTriangle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] text-[#e0e0e0] font-mono">
      <div className="w-full max-w-lg mx-4 border border-[#333] bg-[#0a0a0a] p-12 text-center relative overflow-hidden">

        {/* Decorative Grid Background */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        <div className="relative z-10">
          <div className="flex justify-center mb-8">
            <AlertTriangle className="h-20 w-20 text-[#00ff41] animate-pulse" />
          </div>

          <h1 className="text-6xl font-bold text-white mb-4 tracking-tighter">404</h1>

          <h2 className="text-xl font-bold text-[#666] mb-8 uppercase tracking-widest">
            FALHA DE ROTEAMENTO
          </h2>

          <p className="text-[#888] mb-12 text-xs leading-relaxed border-l-2 border-[#00ff41] pl-4 text-left font-bold">
            ERRO CRÍTICO: O recurso solicitado não foi localizado no mapa de memória.
            <br />
            Verifique o caminho ou retorne ao terminal principal.
          </p>

          <Button
            onClick={() => setLocation("/")}
            className="w-full bg-[#00ff41] hover:bg-[#00cc33] text-black h-12 rounded-none font-bold tracking-widest uppercase"
          >
            <Home className="w-4 h-4 mr-2" />
            VOLTAR AO INÍCIO
          </Button>
        </div>
      </div>
    </div>
  );
}
