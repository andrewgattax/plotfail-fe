import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Bookmark, Trash2, ArrowRight, FolderOpen } from "lucide-react";
import { clsx } from "clsx";

export function Saved() {
  const savedStories: any[] = []
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setDeleting(id);
    // Real implementation would remove from store here
    setTimeout(() => {
      setDeleting(null);
    }, 1000);
  };

  return (
    <div className="min-h-full flex flex-col p-6 pt-12 relative overflow-hidden">
      <header className="mb-8 z-10">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-2 drop-shadow-white-glow">
          Your Fails <Bookmark className="w-8 h-8 text-violet-400 fill-violet-400/30 drop-shadow-violet-glow-sm" />
        </h1>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Keep the chaos close</p>
      </header>

      <div className="flex-1 overflow-y-auto space-y-5 pb-24 z-10 hide-scrollbar">
        <AnimatePresence>
          {savedStories.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-72 text-center border-2 border-dashed border-white/20 bg-white/5 rounded-[2rem] backdrop-blur-sm"
            >
              <FolderOpen className="w-20 h-20 text-slate-500 mb-6 drop-shadow-white-glow-sm" />
              <h2 className="text-2xl font-bold text-white mb-3">No saved stories yet!</h2>
              <p className="text-slate-400 font-medium px-8 mb-8 leading-relaxed">Start generating chaos and save your masterpieces here.</p>
              <Link to="/generate" className="px-8 py-4 bg-lime-400 hover:bg-lime-300 text-slate-950 font-black rounded-2xl flex items-center gap-3 shadow-lime-glow hover:shadow-lime-glow-strong uppercase tracking-widest transition-all">
                Generate Story <ArrowRight className="w-5 h-5 stroke-[3]" />
              </Link>
            </motion.div>
          ) : (
            savedStories.map(story => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className={clsx(
                  "bg-white/5 border border-white/10 rounded-[2rem] p-5 backdrop-blur-md flex flex-col gap-4 relative transition-all shadow-glass hover:border-white/20",
                  deleting === story.id && "scale-95 opacity-50 bg-red-950/30 border-red-500/50 shadow-red-glow"
                )}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white text-xl leading-tight mb-1">{story.title}</h3>
                    <span className="text-violet-400 text-[10px] font-black uppercase tracking-widest">{new Date(story.createdAt).toLocaleDateString()}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(story.id)}
                    className="p-2.5 text-slate-400 hover:text-red-400 bg-white/5 rounded-xl hover:bg-red-500/10 hover:shadow-red-glow transition-all border border-transparent hover:border-red-500/30"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-slate-300 font-medium text-sm line-clamp-2 leading-relaxed bg-black/20 p-4 rounded-2xl border border-white/5">
                  {renderContentPreview(story.content)}
                </div>

                <Link
                  to={`/story/${story.id}`}
                  className="w-full py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-black rounded-xl flex items-center justify-center gap-2 border border-white/10 transition-all uppercase tracking-widest"
                >
                  Read Full Story
                </Link>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function renderContentPreview(text: string) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <span key={index} className="font-bold text-lime-400 drop-shadow-[0_0_5px_rgba(163,230,53,0.5)]">
              {part.slice(1, -1)}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}
