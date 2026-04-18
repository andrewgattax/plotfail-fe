import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowLeft, Frown, Shuffle, MessageCircleHeart, EyeOff, BookOpen } from "lucide-react";
import { clsx } from "clsx";

export function Generate() {
  const templates: any[] = []
  const [filter, setFilter] = useState<"All" | "Funny" | "Dark" | "Random">("All");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredTemplates = templates.filter(t => filter === "All" || t.tone === filter);

  const getToneIcon = (tone: string) => {
    switch (tone) {
      case "Funny": return <MessageCircleHeart className="w-4 h-4 text-pink-400" />;
      case "Dark": return <Frown className="w-4 h-4 text-violet-400" />;
      case "Random": return <Shuffle className="w-4 h-4 text-blue-400" />;
      default: return null;
    }
  };

  const getToneStyle = (tone: string) => {
    switch (tone) {
      case "Funny": return "bg-pink-500/10 border-pink-500/30 text-pink-300";
      case "Dark": return "bg-violet-500/10 border-violet-500/30 text-violet-300";
      case "Random": return "bg-blue-500/10 border-blue-500/30 text-blue-300";
      default: return "bg-white/10 border-white/20 text-slate-300";
    }
  };

  return (
    <div className="min-h-full flex flex-col p-6 pt-12 relative overflow-hidden">
      <header className="flex items-center gap-4 mb-8 z-10">
        <button onClick={() => navigate(-1)} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md transition-colors shadow-glass-light">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-3xl font-black text-white tracking-tight drop-shadow-white-glow">Pick a Plot</h1>
      </header>

      {/* Filters */}
      <div className="flex gap-3 overflow-x-auto pb-6 snap-x hide-scrollbar z-10">
        {["All", "Funny", "Dark", "Random"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={clsx(
              "px-5 py-2.5 rounded-full font-bold border whitespace-nowrap snap-center transition-all backdrop-blur-md uppercase tracking-wider text-sm",
              filter === f
                ? "bg-lime-400 text-slate-950 border-lime-400 shadow-lime-glow-md"
                : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Templates List */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-32 z-10 hide-scrollbar">
        <AnimatePresence>
          {filteredTemplates.map(template => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedTemplate(template.id)}
              className={clsx(
                "p-5 rounded-3xl border cursor-pointer transition-all flex flex-col gap-3 backdrop-blur-sm",
                selectedTemplate === template.id
                  ? "border-lime-400 bg-lime-400/10 shadow-lime-glow-dim"
                  : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
              )}
            >
              <div className="flex justify-between items-start">
                <h3 className={clsx("text-xl font-bold transition-colors", selectedTemplate === template.id ? "text-lime-400" : "text-white")}>
                  {template.title}
                </h3>
                <span className={clsx(
                  "flex items-center gap-1.5 text-[10px] font-black uppercase px-2.5 py-1.5 rounded-xl border",
                  getToneStyle(template.tone)
                )}>
                  {getToneIcon(template.tone)} {template.tone}
                </span>
              </div>
              <p className="text-slate-400 font-medium text-sm line-clamp-2 leading-relaxed">
                {template.content.replace(/\{([^}]+)\}/g, '[___]')}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Sticky Bottom CTA */}
      <AnimatePresence>
        {selectedTemplate && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent z-50 pb-24"
          >
            <div className="flex gap-4">
              <Link
                to={`/fill/${selectedTemplate}?mode=blind`}
                className="flex-1 py-4 bg-violet-600 hover:bg-violet-500 text-white font-black rounded-2xl flex flex-col items-center justify-center gap-1 transition-all shadow-violet-glow hover:shadow-violet-glow-strong uppercase tracking-widest active:scale-95"
              >
                <div className="flex items-center gap-2"><EyeOff className="w-5 h-5" /> Blind</div>
                <span className="text-[10px] text-violet-300 normal-case tracking-normal font-bold">Max chaos</span>
              </Link>
              <Link
                to={`/fill/${selectedTemplate}?mode=read`}
                className="flex-1 py-4 bg-lime-400 hover:bg-lime-300 text-slate-950 font-black rounded-2xl flex flex-col items-center justify-center gap-1 transition-all shadow-lime-glow hover:shadow-lime-glow-strong uppercase tracking-widest active:scale-95"
              >
                <div className="flex items-center gap-2"><BookOpen className="w-5 h-5" /> Read</div>
                <span className="text-[10px] text-slate-800 normal-case tracking-normal font-bold">See the story</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
