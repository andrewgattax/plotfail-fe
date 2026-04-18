import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router";
import { motion } from "motion/react";
import { Save, Share2, RefreshCw, MessageSquare } from "lucide-react";
import { clsx } from "clsx";
import {useUser} from "@/context/UserContext.tsx";

export function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser()
  const [isSaved, setIsSaved] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const { title, content, templateId, mode } = location.state || {};

  const saveStory = (story: any) => {
    console.log("saved")
  }

  const publishStory = (story: any) => {
    console.log("published")
  }

  useEffect(() => {
    if (!content) {
      navigate("/");
    }
  }, [content, navigate]);

  if (!content) return null;

  const handleSave = () => {
    if (!user) {
      alert("Login to save stories!");
      return;
    }
    const newStory = {
      id: `saved_${Date.now()}`,
      templateId,
      title,
      content,
      author: user.username,
      likes: 0,
      isPublic: false,
      createdAt: new Date().toISOString()
    };
    saveStory(newStory);
    setIsSaved(true);
  };

  const handlePublish = () => {
    if (!user) {
      alert("Login to share stories with the world!");
      return;
    }
    const newStory = {
      id: `pub_${Date.now()}`,
      templateId,
      title,
      content,
      author: user.username,
      likes: 0,
      isPublic: true,
      createdAt: new Date().toISOString()
    };
    publishStory(newStory);
    setIsPublished(true);
  };

  // Helper to render bolded user inputs
  const renderContent = (text: string) => {
    const parts = text.split(/(\*[^*]+\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <span key={index} className="bg-lime-400 text-slate-950 font-bold px-1.5 py-0.5 rounded-md shadow-lime-glow-sm border border-lime-300 mx-1 inline-block -rotate-1">
            {part.slice(1, -1)}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="min-h-full bg-slate-950 flex flex-col p-6 pt-12 font-[Nunito] relative overflow-y-auto text-slate-200">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[50%] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="z-10 relative"
      >
        <header className="text-center mb-8">
          <h1 className="text-5xl font-black text-white tracking-tight drop-shadow-violet-glow-sm">
            Plot<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-500">Failed</span>!
          </h1>
          <p className="text-lime-400 font-bold uppercase tracking-widest text-xs mt-3 drop-shadow-lime-glow">Masterpiece created</p>
        </header>

        <div className="bg-white/5 border border-white/20 rounded-3xl p-6 shadow-glass-strong backdrop-blur-md mb-10 relative">
          {/* Tape decoration */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-pink-500/80 rotate-2 border border-white/30 backdrop-blur-md shadow-pink-glow" />

          <h2 className="text-2xl font-black text-white mb-4 border-b border-white/10 pb-4 flex items-center gap-2 drop-shadow-white-glow-sm">
            <MessageSquare className="w-6 h-6 text-violet-400 fill-violet-400/20" />
            {title}
          </h2>
          <div className="text-slate-300 text-lg leading-loose font-medium font-serif">
            {renderContent(content)}
          </div>
        </div>

        <div className="space-y-4 pb-24">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleSave}
              disabled={isSaved}
              className={clsx(
                "py-4 rounded-2xl font-black flex flex-col items-center gap-1 border transition-all uppercase tracking-widest text-sm backdrop-blur-sm",
                isSaved
                  ? "bg-white/5 text-slate-500 border-white/10"
                  : "bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40 shadow-glass-light active:scale-95"
              )}
            >
              <Save className={clsx("w-6 h-6", isSaved && "opacity-50")} /> {isSaved ? "Saved!" : "Save"}
            </button>
            <button
              onClick={handlePublish}
              disabled={isPublished}
              className={clsx(
                "py-4 rounded-2xl font-black flex flex-col items-center gap-1 border transition-all uppercase tracking-widest text-sm backdrop-blur-sm",
                isPublished
                  ? "bg-violet-500/20 text-violet-300 border-violet-500/30"
                  : "bg-violet-500 hover:bg-violet-400 text-white border-violet-400 shadow-violet-glow active:scale-95"
              )}
            >
              <Share2 className={clsx("w-6 h-6", isPublished && "opacity-50")} /> {isPublished ? "Shared!" : "Share"}
            </button>
          </div>

          <Link
            to={`/fill/${templateId}?mode=${mode || 'blind'}`}
            className="w-full py-4 bg-lime-400 hover:bg-lime-300 text-slate-950 font-black rounded-2xl flex items-center justify-center gap-2 border-none shadow-lime-glow hover:shadow-lime-glow-strong active:scale-95 transition-all uppercase tracking-widest"
          >
            <RefreshCw className="w-5 h-5 stroke-[3]" /> Try Again
          </Link>

          <Link
            to="/"
            className="block text-center mt-6 text-slate-400 font-bold hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
