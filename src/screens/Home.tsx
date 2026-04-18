import { motion } from "motion/react";
import { Link } from "react-router";
import { Sparkles, ArrowRight, Play, BookOpen, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { storiaService, ApiError } from "@/api";
import type { StoriaCompactResponse } from "@/api";
import { getCardColor } from "@/utils/colorUtils";
import { translateCategory } from "@/utils/categoryUtils";

export function Home() {
  const [stories, setStories] = useState<StoriaCompactResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await storiaService.getPublicStories();
        setStories(response);
      } catch (error) {
        if (error instanceof ApiError) {
          setServerError(error.payload.message);
        } else {
          console.error("Unexpected error:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <>
      {/* Fixed Header with Glass Effect */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 max-w-md mx-auto"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-2">
              Plot<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-500">Fail</span>
              <Sparkles className="w-8 h-8 text-lime-400 drop-shadow-lime-glow" />
            </h1>
            <p className="text-slate-400 font-semibold mt-1">Pronto a rovinare una storia?</p>
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-full border-2 border-white/20 backdrop-blur-md flex items-center justify-center overflow-hidden shadow-white-glow-sm">
            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=jelly" alt="avatar" className="w-10 h-10 opacity-90" />
          </div>
        </div>
      </motion.header>

      {/* Glass Overlay with gradient blur effect */}
      <div className="fixed top-0 left-0 right-0 h-40 -mt-px w-full mx-auto z-40 pointer-events-none">
        <div className="absolute inset-0 gradient-blur-overlay" />
      </div>

      {/* Scrollable Content Area */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 space-y-10 pt-32"
      >
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 to-pink-600/30 rounded-[2rem] blur-xl translate-y-2 translate-x-2"></div>
          <div className="relative bg-white/10 border border-white/20 backdrop-blur-md rounded-[2rem] p-8 shadow-glass flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-lime-400 to-lime-600 rounded-full border-4 border-slate-950 mb-6 flex items-center justify-center shadow-lime-glow-md relative">
              <Play className="w-8 h-8 text-slate-950 ml-1 fill-slate-950" />
            </div>
            <h2 className="text-3xl font-black text-white mb-3 tracking-wide">Crea Caos</h2>
            <p className="text-slate-300 font-medium mb-8 px-4 leading-relaxed">Genera una storia stile mad-libs e rendila bellamente orribile.</p>
            <Link
              to="/generate"
              className="w-full py-4 bg-lime-400 hover:bg-lime-300 text-slate-950 font-black rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lime-glow hover:shadow-lime-glow-strong uppercase tracking-widest"
            >
              Genera Storia <ArrowRight className="w-6 h-6 stroke-[3]" />
            </Link>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
              <Clock className="w-5 h-5 text-violet-400" /> Storie Recenti
            </h3>
            <Link to="/explore" className="text-sm font-bold text-lime-400 hover:text-lime-300 transition-colors drop-shadow-[0_0_8px_rgba(163,230,53,0.3)]">Vedi Tutto</Link>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
              {[1, 2, 3].map((i) => (
                <div key={i} className="min-w-[200px] h-36 bg-white/5 rounded-3xl animate-pulse" />
              ))}
            </div>
          )}

          {/* Error State */}
          {serverError && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-center">
              {serverError}
            </div>
          )}

          {/* Stories List */}
          {!loading && !serverError && stories.length > 0 && (
            <div className="-mx-6 flex gap-4 overflow-x-auto pb-4 px-6 snap-x hide-scrollbar">
              {stories.map((story, index) => {
                const colorConfig = getCardColor(index);
                return (
                  <RecentCard
                    key={story.id}
                    id={story.id}
                    title={story.titolo}
                    badge={translateCategory(story.categoria)}
                    color={colorConfig.color}
                    border={colorConfig.border}
                  />
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!loading && !serverError && stories.length === 0 && (
            <div className="text-center py-8">
              <p className="text-slate-400">Nessuna storia trovata</p>
            </div>
          )}
        </section>
      </motion.div>
    </>
  );
}

function RecentCard({ id, title, badge, color, border }: { id: number, title: string, badge: string, color: string, border: string }) {
  return (
    <Link to={`/story/${id}`} className="block">
      <div className={`min-w-[200px] snap-center shrink-0 bg-gradient-to-br ${color} bg-white/5 border ${border} rounded-3xl p-5 backdrop-blur-sm flex flex-col justify-between h-36 relative group overflow-hidden shadow-glass-sm cursor-pointer active:scale-95 transition-all`}>
        <div className="flex justify-between items-start z-10">
          <span className="text-[10px] font-black bg-slate-950/50 text-slate-300 px-2 py-1.5 rounded-lg border border-white/10 uppercase tracking-widest">{badge}</span>
          <BookOpen className="w-4 h-4 text-slate-400" />
        </div>
        <h4 className="font-bold text-white text-lg leading-tight mt-2 line-clamp-2 z-10">{title}</h4>
        {/* Decorative glow */}
        <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-white/10 rounded-full blur-2xl" />
      </div>
    </Link>
  );
}
