import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export function Navigation() {
    const [location] = useLocation();

    const NAV_ITEMS = [
        { label: "Home", href: "/" },
        { label: "Sobre", href: "/sobre" },
        { label: "Habilidades", href: "/habilidades" },
        { label: "Projetos", href: "/projetos" },
        { label: "Artigos", href: "/artigos" },
        { label: "Contato", href: "/contato" },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-[#222]">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/">
                    <a className="text-xl font-serif text-[#f2f2f2] tracking-tighter hover:text-[#ff3300] transition-colors">
                        Diego Santos.
                    </a>
                </Link>

                <div className="hidden md:flex gap-8">
                    {NAV_ITEMS.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <a
                                className={cn(
                                    "text-sm font-mono tracking-wide transition-colors uppercase",
                                    location === item.href
                                        ? "text-[#ff3300] font-bold"
                                        : "text-[#888] hover:text-[#f2f2f2]"
                                )}
                            >
                                {item.label}
                            </a>
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Placeholder - simplificado para desktop first, mobile pode vir depois */}
                <div className="md:hidden text-[#888]">
                    {/* TODO: Mobile Menu */}
                    MENU
                </div>
            </div>
        </nav>
    );
}
