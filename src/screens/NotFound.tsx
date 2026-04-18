import { useNavigate } from "react-router";
import { Home, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full px-6">
      {/* Decorative background elements */}
      <div className="relative">
        {/* Glow effect behind the ghost icon */}
        <div className="absolute inset-0 bg-violet-600/30 rounded-full blur-3xl scale-150" />

        {/* Ghost icon */}
        <div className="relative z-10 mb-8">
          <div className="rounded-2xl">
            <div className="rounded-[2rem] pt-8 pb-2 relative">
              <Ghost className="w-24 h-24 text-violet-400 mx-auto" />

              {/* Floating animation for the ghost */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-violet-400/20 rounded-full blur-xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error message */}
      <h1 className="text-4xl font-black text-white mb-3 text-center drop-shadow-white-glow">
        404
      </h1>
      <h2 className="text-2xl font-bold text-slate-300 mb-4 text-center">
        Pagina non trovata
      </h2>
      <p className="text-slate-400 text-center mb-8 max-w-xs">
        La pagina che stai cercando è svanita nel nulla o non esiste.
      </p>

      {/* Back to home button */}
      <Button
        onClick={() => navigate("/")}
        className="
          bg-lime-400
          text-slate-950
          font-black
          p-8
          text-xl
          rounded-2xl
          shadow-lime-glow
          active:scale-95
          active:bg-lime-300
          transition-all
          items-center gap-2
        "
      >
        <Home className="size-6 stroke-2" />
        Torna alla Home
      </Button>
    </div>
  );
}
