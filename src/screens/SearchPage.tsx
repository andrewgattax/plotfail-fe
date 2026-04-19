import { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Search, X, BookOpen, Play, Loader2 } from "lucide-react";
import { storiaService, templateService, ApiError } from "@/api";
import type { StoriaCompactResponse, TemplateCompactResponse } from "@/api";

type SearchResult = (StoriaCompactResponse | TemplateCompactResponse) & { type: "storia" | "template" };

export function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setLoading(true);
        setSearched(true);
        try {
          const [storiesResponse, templatesResponse] = await Promise.all([
            storiaService.getPublicStories(),
            templateService.getTemplates()
          ]);

          const queryLower = query.toLowerCase().trim();

          const storyResults = storiesResponse
            .filter(story =>
              story.titolo.toLowerCase().includes(queryLower) ||
              story.autore.toLowerCase().includes(queryLower)
            )
            .map(s => ({ ...s, type: "storia" as const }));

          const templateResults = templatesResponse
            .filter(template =>
              template.titolo.toLowerCase().includes(queryLower)
            )
            .map(t => ({ ...t, type: "template" as const }));

          setResults([...storyResults, ...templateResults]);
        } catch (error) {
          if (error instanceof ApiError) {
            console.error(error.payload.message);
          }
        } finally {
          setLoading(false);
        }
      } else if (query.trim().length === 0) {
        setResults([]);
        setSearched(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
    setResults([]);
  }, [query]);

  const getBadgeStyle = (type: "storia" | "template") => {
    switch (type) {
      case "storia":
        return "bg-lime-400/20 text-lime-300 border-lime-400/30";
      case "template":
        return "bg-violet-400/20 text-violet-300 border-violet-400/30";
      default:
        return "bg-white/10 text-slate-400 border-white/20";
    }
  };

  const getBadgeIcon = (type: "storia" | "template") => {
    switch (type) {
      case "storia":
        return <BookOpen className="w-3 h-3" />;
      case "template":
        return <Play className="w-3 h-3" />;
      default:
        return null;
    }
  };

  // @ts-ignore
  // @ts-ignore
  return (
    <div className="min-h-full flex flex-col relative">
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-6 pt-12 pb-20 hide-scrollbar">
        <header className="flex items-center gap-5 mb-8 z-10">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md transition-all shadow-glass-light active:scale-95"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-black text-white tracking-tight drop-shadow-white-glow flex items-center gap-2">
              Cerca <Search className="w-6 h-6 text-lime-400" />
            </h1>
          </div>
        </header>

        {/* Search Input */}
        <div className="mb-8 relative z-10">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca storie o template..."
            className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder:text-slate-500 focus:border-lime-400 focus:shadow-lime-glow active:scale-98 transition-all font-medium backdrop-blur-sm"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-lime-400 animate-spin" />
          </div>
        )}

        {/* Results */}
        {!loading && searched && (
          <div className="space-y-4">
            {results.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400 font-medium">Nessun risultato trovato</p>
                <p className="text-slate-500 text-sm mt-2">Prova con parole chiave diverse</p>
              </div>
            ) : (
              <AnimatePresence>
                {results.map((result, index) => (
                  <motion.div
                    key={result.id + result.type}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {result.type === "storia" ? (
                      <Link
                        to={`/story/${result.id}`}
                        className="block"
                      >
                        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md flex flex-col gap-5 relative overflow-hidden shadow-glass hover:border-white/20 transition-all active:scale-98">
                          {/* Corner glow */}
                          <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-violet-400 rounded-full mix-blend-screen filter blur-[60px] opacity-20 pointer-events-none" />

                          {/* Badge */}
                          <div className="absolute top-6 right-6 z-20">
                            <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg border uppercase tracking-widest backdrop-blur-md inline-block -rotate-2 shadow-glass-sm flex items-center gap-1.5 ${getBadgeStyle(result.type)}`}>
                              {getBadgeIcon(result.type)}
                              {result.type === "storia" ? "STORIA" : "TEMPLATE"}
                            </span>
                          </div>

                          <div className="flex justify-between items-center z-10 relative pr-24">
                            <div className="flex items-center gap-4">
                              <div>
                                <h3 className="font-black text-white text-base">{result.titolo}</h3>
                                <span className="text-violet-400 text-[10px] font-black tracking-widest uppercase">di {(result as StoriaCompactResponse).autore}</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-slate-300 font-medium leading-relaxed font-serif text-[15px] z-10 relative">
                            {renderContentPreview((result as StoriaCompactResponse).preview)}
                          </div>

                          <div className="flex items-center gap-8 mt-2 pt-5 border-t border-white/10 z-10 relative">
                            <div className="flex items-center gap-2 font-bold text-slate-400 uppercase tracking-widest text-xs">
                              <BookOpen className="w-5 h-5" />
                              Leggi Storia
                            </div>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <Link
                        to={`/template/${result.id}`}
                        className="block"
                      >
                        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md flex flex-col gap-5 relative overflow-hidden shadow-glass hover:border-white/20 transition-all active:scale-98">
                          {/* Corner glow */}
                          <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-lime-400 rounded-full mix-blend-screen filter blur-[60px] opacity-20 pointer-events-none" />

                          {/* Badge */}
                          <div className="absolute top-6 right-6 z-20">
                            <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg border uppercase tracking-widest backdrop-blur-md inline-block rotate-3 shadow-glass-sm flex items-center gap-1.5 ${getBadgeStyle(result.type)}`}>
                              {getBadgeIcon(result.type)}
                              {/*@ts-ignore*/}
                              {result.type === "storia" ? "STORIA" : "TEMPLATE"}
                            </span>
                          </div>

                          <div className="flex justify-between items-center z-10 relative pr-24">
                            <div className="flex items-center gap-4">
                              <div>
                                <h3 className="font-black text-white text-base">{result.titolo}</h3>
                                <span className="text-lime-400 text-[10px] font-black tracking-widest uppercase">{(result as TemplateCompactResponse).storieCreateCount} storie</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-slate-300 font-medium leading-relaxed font-serif text-[15px] z-10 relative">
                            {renderContentPreview((result as TemplateCompactResponse).preview)}
                          </div>

                          <div className="flex items-center gap-8 mt-2 pt-5 border-t border-white/10 z-10 relative">
                            <div className="flex items-center gap-2 font-bold text-slate-400 uppercase tracking-widest text-xs">
                              <Play className="w-5 h-5" />
                              Usa Template
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        )}
      </div>

      {/* Fixed Bottom Gradient Blur */}
      <div className="fixed bottom-0 left-0 right-0 h-40 -mt-px z-40 pointer-events-none">
        <div className="absolute inset-0 gradient-blur-overlay-bottom pointer-events-none" />
      </div>
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
