import { Switch, Route } from "wouter";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Navigation } from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import CasePost from "./pages/CasePost";
import Articles from "./pages/Articles";
import ArticlePost from "./pages/ArticlePost";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/30 antialiased relative">
        {/* Background gradient effects */}
        <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))] opacity-50 pointer-events-none" />

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/cases" component={Projects} />
              <Route path="/cases/:slug" component={CasePost} />
              {/* Fallbacks legados, apontando pra cases e home */}
              <Route path="/projetos" component={Projects} />
              <Route path="/sobre" component={About} />
              <Route path="/artigos" component={Articles} />
              <Route path="/artigos/:slug" component={ArticlePost} />
              <Route component={NotFound} />
            </Switch>
          </main>

          <footer className="w-full border-t border-border/40 py-8 mt-20">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} Diego Santos. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <a href="https://github.com/diegosantos-ai" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">GitHub</a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
                <a href="mailto:diegorsantos@live.com" className="hover:text-primary transition-colors">Contact</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
