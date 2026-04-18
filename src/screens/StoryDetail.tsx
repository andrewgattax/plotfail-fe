import { useParams, useNavigate, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Bookmark, Share2, CornerUpLeft, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext.tsx";
import { storiaService, ApiError } from "@/api";
import type { StoriaResponse } from "@/api";

export function StoryDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useUser();

  const [story, setStory] = useState<StoriaResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("ID storia non valido");
      setLoading(false);
      return;
    }

    const fetchStory = async () => {
      try {
        const storyId = parseInt(id);
        const response = await storiaService.getById(storyId);
        setStory(response);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.payload.message);
        } else {
          setError("Si è verificato un errore imprevisto");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  const saveStory = () => {
    console.log("Storia salvata");
  };

  const isMySaved = false; // TODO: Implement saved stories logic

  const handleSave = () => {
    if (user && !isMySaved && story) {
      saveStory();
    }
  };

  const renderContent = (text: string) => {
    const parts = text.split(/(\*[^*]+\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <span key={index} className="bg-lime-400/20 text-lime-300 font-bold px-1.5 py-0.5 rounded-md shadow-lime-glow-sm border border-lime-400/30 mx-1 inline-block -rotate-1">
            {part.slice(1, -1)}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center font-[Nunito]">
        <Loader2 className="w-12 h-12 text-lime-400 animate-spin mb-4" />
        <p className="text-slate-300 font-medium single-line">Caricamento storia...</p>
      </div>
    );
  }

  // Error state
  if (error || !story) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center text-slate-200 font-[Nunito]">
        <h2 className="text-3xl font-black text-white mb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] single-line">Storia Non Trovata</h2>
        <p className="text-slate-400 font-medium mb-8">{error || "Questa storia è svanita nel nulla."}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-black rounded-2xl flex items-center gap-2 shadow-violet-glow transition-all uppercase tracking-widest text-sm active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 stroke-[3]" /> <span className="single-line">Torna Indietro</span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col relative">
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-6 pt-12 pb-32 hide-scrollbar">
        <header className="flex items-center gap-5 mb-10 z-10">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md transition-all shadow-glass-light active:scale-95"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight leading-none drop-shadow-white-glow-sm single-line">
              Storia
            </h1>
            <span className="text-violet-400 text-[12px] font-black uppercase tracking-widest drop-shadow-[0_0_5px_rgba(139,92,246,0.5)] single-line">
              {story.categoria}
            </span>
          </div>
        </header>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/5 border border-white/20 rounded-[2rem] p-8 shadow-glass-md backdrop-blur-xl mb-10 relative"
        >
          <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-cyan-400 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none" />

          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-cyan-400/60 -rotate-2 border border-white/30 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.5)] rounded" />

          <h2 className="text-4xl font-black text-white mb-2 leading-tight drop-shadow-white-glow relative z-10 single-line">
            {story.titolo}
          </h2>
          <p className="text-violet-400 text-[12px] font-black uppercase tracking-widest drop-shadow-[0_0_5px_rgba(139,92,246,0.5)] mb-6 relative z-10 single-line">
            una storia di {story.autore.charAt(0).toUpperCase() + story.autore.slice(1)}
          </p>

          <div className="text-slate-300 text-lg leading-loose font-medium font-serif relative z-10">
            {renderContent(story.contenuto)}
          </div>
        </motion.div>
      </div>

      {/* Fixed Bottom Button Section with Gradient Blur */}
      <div className="fixed bottom-26 left-0 right-0 z-50 px-10 py-4 pt-10 max-w-md mx-auto">
        <div className="absolute inset-0 gradient-blur-overlay-bottom pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex gap-3">
            {!isMySaved && (
              <button
                onClick={handleSave}
                className="flex-1 py-3 bg-black/20 hover:bg-white/10 text-white font-black rounded-2xl flex items-center justify-center gap-2 border border-white/10 shadow-glass-light active:scale-95 transition-all uppercase tracking-widest text-xs backdrop-blur-sm"
              >
                <Bookmark className="w-4 h-4" /> <span className="single-line">Salva</span>
              </button>
            )}
            <button className="flex-1 py-3 bg-black/20 hover:bg-white/10 text-white font-black rounded-2xl flex items-center justify-center gap-2 border border-white/10 shadow-glass-light active:scale-95 transition-all uppercase tracking-widest text-xs backdrop-blur-sm hover:text-violet-400 hover:border-violet-400/30">
              <Share2 className="w-4 h-4" /> <span className="single-line">Condividi</span>
            </button>
          </div>
          <Link
            to={`/fill/${story.templateId}`}
            className="w-full mb-4 py-5 bg-gradient-to-r from-lime-400 to-lime-600 hover:from-lime-300 hover:to-lime-500 text-slate-950 font-black text-lg rounded-2xl flex items-center justify-center gap-2 shadow-lime-glow hover:shadow-lime-glow-strong active:scale-95 transition-all uppercase tracking-widest"
          >
            <CornerUpLeft className="w-5 h-5 stroke-[3]" /> <span className="single-line">Gioca Template</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
