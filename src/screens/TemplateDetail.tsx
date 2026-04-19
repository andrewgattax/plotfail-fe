import { useParams, useNavigate, Link } from "react-router";
import { motion } from "motion/react";
import {ArrowLeft, Loader2, Bookmark, BookmarkCheck, Share2, Play, LoaderCircle} from "lucide-react";
import { useState, useEffect } from "react";
import { templateService, ApiError } from "@/api";
import type { TemplateResponse } from "@/api";
import { ShareModal } from "@/components/ShareModal";

export function TemplateDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [template, setTemplate] = useState<TemplateResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("ID template non valido");
      setLoading(false);
      return;
    }

    const fetchTemplate = async () => {
      try {
        const templateId = parseInt(id);
        const response = await templateService.getById(templateId);
        setTemplate(response);
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

    fetchTemplate();
  }, [id]);

  const handleSave = async () => {
    if (!template || saving) return;

    setSaving(true);
    try {
      if (template.saved) {
        await templateService.unsave(template.id);
        setTemplate({ ...template, saved: false });
      } else {
        await templateService.save(template.id);
        setTemplate({ ...template, saved: true });
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.payload.message);
      } else {
        setError("Si è verificato un errore imprevisto");
      }
    } finally {
      setTimeout(() => {
        setSaving(false);
      }, 500);
    }
  };

  const renderContent = (text: string) => {
    const parts = text.split(/(\{[^}]+\})/g);
    return parts.map((part, index) => {
      if (part.startsWith("{") && part.endsWith("}")) {
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
        <p className="text-slate-300 font-medium">Caricamento template...</p>
      </div>
    );
  }

  // Error state
  if (error || !template) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center text-slate-200 font-[Nunito]">
        <h2 className="text-3xl font-black text-white mb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">Template Non Trovato</h2>
        <p className="text-slate-400 font-medium mb-8">{error || "Questo template è svanito nel nulla."}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-black rounded-2xl flex items-center gap-2 shadow-violet-glow transition-all uppercase tracking-widest text-sm active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 stroke-[3]" /> <span>Torna Indietro</span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col relative">
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-6 pt-12 pb-20 hide-scrollbar">
        <header className="flex items-center gap-5 mb-10 z-10">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md transition-all shadow-glass-light active:scale-95"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight leading-none drop-shadow-white-glow">
              Template
            </h1>
            <span className="text-violet-400 text-[12px] font-black uppercase tracking-widest drop-shadow-[0_0_5px_rgba(139,92,246,0.5)]">
              {template.categoria}
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

          <h2 className="text-2xl font-black text-white mb-2 leading-tight drop-shadow-white-glow relative z-10">
            {template.titolo}
          </h2>
          <p className="text-violet-400 text-[10px] font-black uppercase tracking-widest drop-shadow-[0_0_5px_rgba(139,92,246,0.5)] mb-6 relative z-10">
            {template.storieCreateCount} storie create
          </p>

          <div className="text-slate-300 text-base leading-loose font-medium font-serif relative z-10">
            {renderContent(template.contenuto)}
          </div>
        </motion.div>
      </div>

      {/* Fixed Bottom Button Section with Gradient Blur */}
      <div className="fixed bottom-26 left-0 right-0 z-50 px-6 py-4 pt-10  mx-auto">
        <div className="absolute inset-0 gradient-blur-overlay-bottom pointer-events-none" />
        <div className="relative z-10 mb-4 flex items-center">
          {/* Left button - Salva */}
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex-1 py-4 -mr-1 font-black rounded-l-2xl flex items-center justify-center gap-2 border-y border-l shadow-glass-light active:scale-95 transition-all uppercase tracking-widest text-xs backdrop-blur-sm ${
              template?.saved
                ? "bg-white/10 text-white shadow-white-glow border-white/20"
                : "bg-black/20 hover:bg-white/10 text-white border-white/10"
            }`}
          >
            {template?.saved ? (
              <BookmarkCheck className="w-5 h-5 fill-current" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
            <span>{saving ? <LoaderCircle className={"size-5 animate-spin"}/> : template.saved ? "Salvato" : "Salva"}</span>
          </button>

          {/* Center button - Play */}
          <Link
            to={`/fill/${template.id}`}
            className="w-16 h-16 aspect-square bg-gradient-to-br from-lime-400 to-lime-600 hover:from-lime-300 hover:to-lime-500 text-slate-950 rounded-2xl flex items-center justify-center shadow-lime-glow hover:shadow-lime-glow-strong active:scale-95 transition-all relative z-10"
          >
            <Play className="w-7 h-7 fill-slate-950 ml-1" />
          </Link>

          {/* Right button - Condividi */}
          <button
            onClick={() => setShareModalOpen(true)}
            className="flex-1 py-4 -ml-1 bg-black/20 hover:bg-white/10 text-white font-black rounded-r-2xl flex items-center justify-center gap-2 border-y border-r border-white/10 shadow-glass-light active:scale-95 transition-all uppercase tracking-widest text-xs backdrop-blur-sm"
          >
            <Share2 className="w-5 h-5" /> <span>Condividi</span>
          </button>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        open={shareModalOpen}
        onOpenChange={setShareModalOpen}
        title={template?.titolo || ""}
        url={`${window.location.origin}/template/${template?.id}`}
      />
    </div>
  );
}
