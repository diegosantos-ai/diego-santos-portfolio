import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="w-full max-w-lg mx-4 border border-border bg-card/80 backdrop-blur-sm p-12 text-center shadow-2xl shadow-black/50">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <AlertCircle className="relative h-16 w-16 text-primary animate-pulse" />
          </div>
        </div>

        <h1 className="text-6xl font-bold font-mono text-primary mb-4 tracking-tighter">404</h1>

        <h2 className="text-xl font-bold font-mono text-foreground mb-6 uppercase tracking-widest">
          PAGE_NOT_FOUND
        </h2>

        <p className="text-muted-foreground mb-12 font-mono text-xs leading-relaxed border-l-2 border-primary pl-4 text-left">
          SYSTEM_ERROR: The requested resource could not be located.
          <br />
          Check the URL or return to the main terminal.
        </p>

        <Button
          onClick={handleGoHome}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-none font-mono tracking-widest uppercase transition-all duration-200"
        >
          <Home className="w-4 h-4 mr-2" />
          RETURN_HOME
        </Button>
      </div>
    </div>
  );
}
