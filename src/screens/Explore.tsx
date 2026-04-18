import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Heart, MessageCircle, Share2, Flame, User as UserIcon } from "lucide-react";
import { clsx } from "clsx";

export function Explore() {
  const [likes, setLikes] = useState<{ [key: string]: number }>({});
  const [liked, setLiked] = useState<{ [key: string]: boolean }>({});
  const publicStories: any[] = []

  const handleLike = (storyId: string) => {
    setLiked(prev => ({ ...prev, [storyId]: !prev[storyId] }));
    setLikes(prev => {
      const current = prev[storyId] || 0;
      return { ...prev, [storyId]: liked[storyId] ? current - 1 : current + 1 };
    });
  };

  return (
    <div className="min-h-full flex flex-col p-6 pt-12 relative overflow-hidden">
      <header className="flex justify-between items-center mb-8 z-10">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-2 drop-shadow-white-glow">
            Explore <Flame className="w-8 h-8 text-orange-500 fill-orange-500 drop-shadow-orange-glow" />
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Trending Chaos</p>
        </div>
        <div className="w-12 h-12 bg-white/5 border border-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-white-glow-dim">
          <UserIcon className="w-6 h-6 text-slate-300" />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto space-y-6 pb-24 z-10 hide-scrollbar">
        <AnimatePresence>
          {publicStories.map(story => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md flex flex-col gap-5 relative overflow-hidden shadow-glass hover:border-white/20 transition-all"
            >
              {/* Funky corner glow shape */}
              <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-lime-400 rounded-full mix-blend-screen filter blur-[60px] opacity-20 pointer-events-none" />
              
              <div className="flex justify-between items-center z-10 relative">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-violet-900 border-2 border-violet-400 rounded-full flex items-center justify-center overflow-hidden shadow-violet-glow-sm">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${story.author}`} alt={story.author} className="w-10 h-10 opacity-90" />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-base">{story.author}</h3>
                    <span className="text-violet-400 text-[10px] font-black tracking-widest uppercase">2h ago</span>
                  </div>
                </div>
                <span className="text-[10px] font-black bg-white/10 text-white px-3 py-1.5 rounded-xl border border-white/20 uppercase tracking-widest backdrop-blur-md">{story.title}</span>
              </div>

              <div className="text-slate-300 font-medium leading-relaxed font-serif text-[15px] z-10 relative">
                {renderContentPreview(story.content)}
              </div>

              <div className="flex items-center gap-8 mt-2 pt-5 border-t border-white/10 z-10 relative">
                <button
                  onClick={() => handleLike(story.id)}
                  className={clsx(
                    "flex items-center gap-2 font-bold transition-all group uppercase tracking-widest text-xs",
                    liked[story.id] ? "text-pink-400 drop-shadow-pink-glow" : "text-slate-400 hover:text-white"
                  )}
                >
                  <Heart className={clsx("w-6 h-6 transition-transform group-active:scale-75", liked[story.id] && "fill-pink-400")} />
                  {(story.likes || 0) + (likes[story.id] || 0)}
                </button>
                <button className="flex items-center gap-2 font-bold text-slate-400 hover:text-white transition-all uppercase tracking-widest text-xs">
                  <MessageCircle className="w-6 h-6" /> 12
                </button>
                <button className="flex items-center gap-2 font-bold text-slate-400 hover:text-white transition-all ml-auto">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function renderContentPreview(text: string) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.slice(0, 5).map((part, index) => {
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <span key={index} className="bg-lime-400/20 text-lime-300 font-bold px-1.5 py-0.5 rounded mx-1 inline-block -rotate-1 text-sm border border-lime-400/30">
              {part.slice(1, -1)}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
      {parts.length > 5 && <span className="text-violet-400 font-bold ml-2">...Read more</span>}
    </>
  );
}
