import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function TerminalBlock({ className }: { className?: string }) {
    const [lines, setLines] = useState<string[]>([
        "> initializing nexo_flux_core...",
        "> loading modules: [etl, ai_agents, rag]...",
        "> connecting to postgres_dw... OK",
        "> starting ingestion pipeline... OK",
        "> system ready."
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setLines((prev) => {
                if (prev.length > 8) return prev.slice(1);
                return prev;
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={cn(
            "font-mono text-xs p-4 bg-background border border-border text-primary/80 relative overflow-hidden",
            "before:content-[''] before:absolute before:inset-0 before:bg-primary/5 before:pointer-events-none",
            className
        )}>
            <div className="absolute top-2 right-2 flex gap-1.5">
                <div className="w-2 h-2 rounded-none bg-border" />
                <div className="w-2 h-2 rounded-none bg-border" />
            </div>
            <div className="flex flex-col gap-1 mt-2">
                {lines.map((line, i) => (
                    <div key={i} className="animate-fade-in">
                        <span className="text-muted-foreground mr-2">$</span>
                        {line}
                    </div>
                ))}
                <div className="animate-pulse">_</div>
            </div>
        </div>
    );
}
