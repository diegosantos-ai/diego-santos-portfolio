import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Github, Linkedin, FileText, Mail } from "lucide-react";

export function Navigation() {
    const [location] = useLocation();

    const NAV_ITEMS = [
        { label: "Home", href: "/" },
        { label: "Cases", href: "/cases" },
        { label: "Publicações", href: "/artigos" },
    ];

    const SOCIAL_LINKS = [
        { icon: Linkedin, href: "https://linkedin.com/in/diego-santos-ia", label: "LinkedIn" },
        { icon: Github, href: "https://github.com/diegosantos-ai", label: "GitHub" },
        { icon: Mail, href: "mailto:santos.diegoj86@gmail.com", label: "Email" },
        { icon: FileText, href: "/resume.pdf", label: "CV" }
    ];

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-[#222]">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/">
                    <a className="text-xl font-serif text-[#f2f2f2] tracking-tighter hover:text-[#ff3300] transition-colors">
                        Diego Santos.
                    </a>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {/* Main Nav */}
                    <div className="flex gap-8">
                        {NAV_ITEMS.map((item) => (
                            <Link key={item.href} href={item.href}>
                                <a
                                    className={cn(
                                        "text-sm font-mono tracking-wide transition-colors uppercase",
                                        location === item.href || (location.startsWith(item.href) && item.href !== '/')
                                            ? "text-[#ff3300] font-bold"
                                            : "text-[#888] hover:text-[#f2f2f2]"
                                    )}
                                >
                                    {item.label}
                                </a>
                            </Link>
                        ))}
                    </div>
                    
                    {/* Divider */}
                    <div className="w-[1px] h-4 bg-[#333]"></div>
                    
                    {/* Social / Contact Contacts in Header */}
                    <div className="flex gap-4">
                        {SOCIAL_LINKS.map((link) => (
                            <a 
                                key={link.label}
                                href={link.href} 
                                target={link.href.startsWith('http') ? "_blank" : "_self"}
                                rel="noreferrer"
                                className="text-[#888] hover:text-[#ff3300] transition-colors"
                                title={link.label}
                            >
                                <link.icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Mobile Menu Placeholder */}
                <div className="md:hidden text-[#888]">
                    MENU
                </div>
            </div>
        </nav>
    );
}
