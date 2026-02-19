import { Switch, Route } from "wouter";
import { Navigation } from "@/components/Navigation";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Articles from "@/pages/Articles";
import ArticlePost from "@/pages/ArticlePost";
import NotFound from "@/pages/NotFound";
import About from "@/pages/About";
import Skills from "@/pages/Skills";
import Contact from "@/pages/Contact";

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f2f2f2]">
      <Navigation />
      <div className="pt-16"> {/* Spacer for fixed nav */}
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/sobre" component={About} />
          <Route path="/habilidades" component={Skills} />
          <Route path="/projetos" component={Projects} />
          <Route path="/artigos" component={Articles} />
          <Route path="/artigos/:slug" component={ArticlePost} />
          <Route path="/contato" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
