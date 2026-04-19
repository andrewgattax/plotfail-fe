import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {BookOpen, Bookmark, Flame, Loader2, Play, Search} from "lucide-react";
import { clsx } from "clsx";
import { ApiError, type TemplateCompactResponse, type StoriaCompactResponse, templateService, storiaService } from "@/api";

function Explore() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"storie" | "template">("storie");
  const [categoryFilter, setCategoryFilter] = useState<"All" | "FUNNY" | "DARK" | "SAD">("All");
  const [stories, setStories] = useState<StoriaCompactResponse[]>([]);
  const [templates, setTemplates] = useState<TemplateCompactResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");

  // Filter stories and templates by category
  const filteredStories = stories.filter(story =>
    categoryFilter === "All" || story.categoria === categoryFilter
  );

  const filteredTemplates = templates.filter(template =>
    categoryFilter === "All" || template.categoria === categoryFilter
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storiesResponse, templatesResponse] = await Promise.all([
          storiaService.getPublicStories(),
          templateService.getTemplates()
        ]);
        setStories(storiesResponse);
        setTemplates(templatesResponse);
      } catch (error) {
        if (error instanceof ApiError) {
          setServerError(error.payload.message);
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSaveTemplate = async (templateId: number) => {
    // TODO: Implement save template logic
    console.log("Save template:", templateId);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center font-[Nunito]">
        <Loader2 className="w-12 h-12 text-lime-400 animate-spin mb-4" />
        <p className="text-slate-300 font-medium">Caricamento...</p>
      </div>
    );
  }

  // Error state
  if (serverError) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center font-[Nunito]">
        <h2 className="text-3xl font-black text-white mb-3">Errore</h2>
        <p className="text-slate-400 font-medium">{serverError}</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Fixed Header with Tabs */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 pt-8 pb-4 mx-auto">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-2 drop-shadow-white-glow">
              Esplora <Flame className="w-8 h-8 text-orange-500 fill-orange-500 drop-shadow-orange-glow"/>
            </h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Caos di Tendenza</p>
          </div>

          {/* Tab Switcher with Sliding Pill */}
          <div className="relative w-full bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-md">
            <motion.div
              className="absolute top-1 bottom-1 rounded-xl bg-lime-400 shadow-lime-glow"
              initial={false}
              animate={{
                left: activeTab === "storie" ? "4px" : "calc(50% + 4px)",
                width: "calc(50% - 8px)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <div className="relative flex w-full">
              <button
                onClick={() => setActiveTab("storie")}
                className={`flex-1 px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-colors relative z-10 ${
                  activeTab === "storie" ? "text-slate-950" : "text-slate-400 hover:text-white"
                }`}
              >
                Storie
              </button>
              <button
                onClick={() => setActiveTab("template")}
                className={`flex-1 px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-colors relative z-10 ${
                  activeTab === "template" ? "text-slate-950" : "text-slate-400 hover:text-white"
                }`}
              >
                Template
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Filters */}
      <div className="fixed top-40 mt-2 left-0 right-0 z-40">
        <div className="flex gap-3 overflow-x-auto pb-4 snap-x hide-scrollbar px-6 -mx-6 max-w-md mx-auto">
          {["All", "FUNNY", "DARK", "SAD"].map(category => (
            <button
              key={category}
              onClick={() => setCategoryFilter(category as any)}
              className={clsx(
                "px-5 py-2.5 rounded-full font-bold border whitespace-nowrap snap-center transition-all backdrop-blur-md uppercase tracking-wider text-sm",
                categoryFilter === category
                  ? "bg-lime-400 text-slate-950 border-lime-400"
                  : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white"
              )}
            >
              {category === "All" ? "Tutte" : category.toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Glass Overlay with gradient blur effect */}
      <div className="fixed top-0 left-0 right-0 h-40 -mt-px mx-auto z-40 pointer-events-none">
        <div className="absolute inset-0 gradient-blur-overlay" />
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 pt-56 space-y-6 pb-10 z-10 hide-scrollbar">
        <AnimatePresence mode="wait">
          {activeTab === "storie" ? (
            <motion.div
              key="storie"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {filteredStories.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-400 font-medium">Nessuna storia trovata per questa categoria</p>
                </div>
              ) : (
                filteredStories.map(story => (
                  <Link
                    key={story.id}
                    to={`/story/${story.id}`}
                    className="block"
                  >
                    <motion.div
                      className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md flex flex-col gap-5 relative overflow-hidden shadow-glass hover:border-white/20 transition-all active:scale-98"
                    >
                      {/* Corner glow */}
                      <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-violet-400 rounded-full mix-blend-screen filter blur-[60px] opacity-20 pointer-events-none" />

                      {/* Rotating corner badge */}
                      <div className="absolute top-6 right-6 z-20">
                        <span className="text-[10px] font-black bg-white/10 text-white px-3 py-1.5 rounded-lg border border-white/20 uppercase tracking-widest backdrop-blur-md inline-block -rotate-2 shadow-glass-sm">
                          {story.categoria}
                        </span>
                      </div>

                      <div className="flex justify-between items-center z-10 relative pr-24">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-black text-white text-base">{story.titolo}</h3>
                            <span className="text-violet-400 text-[10px] font-black tracking-widest uppercase">di {story.autore}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-slate-300 font-medium leading-relaxed font-serif text-[15px] z-10 relative">
                        {renderContentPreview(story.preview)}
                      </div>

                      <div className="flex items-center gap-8 mt-2 pt-5 border-t border-white/10 z-10 relative">
                        <div className="flex items-center gap-2 font-bold text-slate-400 uppercase tracking-widest text-xs">
                          <BookOpen className="w-5 h-5" />
                          Leggi Storia
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))
              )}
            </motion.div>
          ) : (
            <motion.div
              key="template"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {filteredTemplates.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-400 font-medium">Nessun template trovato per questa categoria</p>
                </div>
              ) : (
                filteredTemplates.map(template => (
                  <Link
                    key={template.id}
                    to={`/template/${template.id}`}
                    className="block"
                  >
                    <motion.div
                      className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md flex flex-col gap-5 relative overflow-hidden shadow-glass hover:border-white/20 transition-all active:scale-98"
                    >
                      {/* Corner glow */}
                      <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-lime-400 rounded-full mix-blend-screen filter blur-[60px] opacity-20 pointer-events-none" />

                      {/* Rotating corner badge */}
                      <div className="absolute top-6 right-6 z-20">
                        <span className="text-[10px] font-black bg-white/10 text-white px-3 py-1.5 rounded-lg border border-white/20 uppercase tracking-widest backdrop-blur-md inline-block rotate-3 shadow-glass-sm">
                          {template.categoria}
                        </span>
                      </div>

                      <div className="flex justify-between items-center z-10 relative pr-24">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-black text-white text-base">{template.titolo}</h3>
                            <span className="text-lime-400 text-[10px] font-black tracking-widest uppercase">{template.storieCreateCount} storie</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-slate-300 font-medium leading-relaxed font-serif text-[15px] z-10 relative">
                        {renderContentPreview(template.preview)}
                      </div>

                      <div className="flex items-center gap-8 mt-2 pt-5 border-t border-white/10 z-10 relative">
                        <div className="flex items-center gap-2 font-bold text-slate-400 uppercase tracking-widest text-xs">
                          <Play className="w-5 h-5 mb-1" />
                          Usa Template
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Search Button */}
      <button
        onClick={() => navigate("/search")}
        className="fixed bottom-34 right-6 z-50 w-16 h-16 bg-white/10 backdrop-blur-sm text-white/80 rounded-full flex items-center border border-white/30 justify-center shadow-white-glow hover:shadow-lime-glow-strong transition-all active:scale-95"
      >
        <Search className="w-7 h-7 " />
      </button>
    </div>
  );
}

function renderContentPreview(text: string) {
  const parts = text.split(/(\{[^}]+\})/g);
  return (
    <>
      {parts.slice(0, 5).map((part, index) => {
        if (part.startsWith("{") && part.endsWith("}")) {
          return (
            <span key={index} className="bg-lime-400/20 text-lime-300 font-bold px-1.5 py-0.5 rounded mx-1 inline-block -rotate-1 text-sm border border-lime-400/30">
              {part.slice(1, -1)}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
      {parts.length > 5 && <span className="text-violet-400 font-bold">...leggi di più</span>}
    </>
  );
}

export default Explore;