import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Check, X, BookOpen, EyeOff } from "lucide-react";
import { clsx } from "clsx";

type PlaceholderInfo = {
  originalText: string;
  type: string;
  index: number;
};

export function FillStory() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "blind";
  const templates: any[] = []
  const template = templates.find(t => t.id === templateId);

  const [placeholders, setPlaceholders] = useState<PlaceholderInfo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const parsedSegments = useMemo(() => {
    if (!template) return [];
    const parts = template.content.split(/(\{[^}]+\})/g);
    let pIdx = 0;
    return parts.map((part: string) => {
      if (part.startsWith('{') && part.endsWith('}')) {
        return { type: 'placeholder', text: part.slice(1, -1), index: pIdx++ };
      }
      return { type: 'text', text: part };
    });
  }, [template]);

  useEffect(() => {
    if (template) {
      const regex = /\{([^}]+)\}/g;
      let match;
      const found: PlaceholderInfo[] = [];
      let i = 0;
      while ((match = regex.exec(template.content)) !== null) {
        found.push({ originalText: match[0], type: match[1], index: i });
        i++;
      }
      setPlaceholders(found);
      setAnswers(new Array(found.length).fill(""));
    } else {
      navigate("/");
    }
  }, [template, navigate]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      if (mode === "read") {
        inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentIndex, mode]);

  if (!template || placeholders.length === 0) return null;

  const currentPlaceholder = placeholders[currentIndex];
  const isLast = currentIndex === placeholders.length - 1;
  const progress = ((currentIndex) / placeholders.length) * 100;

  const handleNext = () => {
    if (!inputValue.trim()) return;

    const newAnswers = [...answers];
    newAnswers[currentIndex] = inputValue.trim();
    setAnswers(newAnswers);
    setInputValue("");

    if (isLast) {
      // Create final story string and pass via state to Result screen
      let finalContent = template.content;
      placeholders.forEach((ph, i) => {
        finalContent = finalContent.replace(ph.originalText, `*${newAnswers[i]}*`);
      });
      navigate(`/result`, {
        state: {
          title: template.title,
          content: finalContent,
          templateId: template.id,
          mode
        }
      });
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNext();
    }
  };

  return (
    <div className="min-h-full bg-slate-950 flex flex-col p-6 pt-12 relative overflow-hidden text-white font-[Nunito]">
      {/* Cool background pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

      <header className="flex justify-between items-center mb-8 z-10 relative">
        <button
          onClick={() => navigate(-1)}
          className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl backdrop-blur-md transition-colors border border-white/10 shadow-glass-light"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        <div className="text-center font-black tracking-widest text-slate-400 uppercase text-xs drop-shadow-white-glow-sm flex flex-col items-center gap-1">
          {mode === "read" ? (
            <span className="flex items-center gap-1 text-lime-400"><BookOpen className="w-3 h-3"/> Read Mode</span>
          ) : (
            <span className="flex items-center gap-1 text-violet-400"><EyeOff className="w-3 h-3"/> Blind Mode</span>
          )}
          Step {currentIndex + 1} of {placeholders.length}
        </div>
        <div className="w-12" /> {/* Spacer for alignment */}
      </header>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-white/5 rounded-full mb-12 overflow-hidden border border-white/10 relative z-10 shadow-glass-light backdrop-blur-md">
        <motion.div
          className="h-full bg-gradient-to-r from-lime-500 to-lime-300 shadow-lime-glow-md"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, type: "spring" }}
        />
      </div>

      {/* Main interaction area */}
      <div className="flex-1 flex flex-col z-10 relative w-full hide-scrollbar">
        {mode === "read" ? (
          <div className="flex-1 overflow-y-auto px-1 pb-40">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-glass-strong backdrop-blur-md mb-8">
              <h3 className="text-2xl font-black text-white mb-6 border-b border-white/10 pb-4 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-lime-400" />
                {template.title}
              </h3>
              <p className="text-slate-300 text-lg leading-loose font-medium font-serif">
                {parsedSegments.map((seg: any, i: any) => {
                  if (seg.type === 'placeholder') {
                    const isPast = seg.index < currentIndex;
                    const isCurrent = seg.index === currentIndex;
                    
                    if (isPast) {
                      return (
                        <span key={i} className="bg-lime-400 text-slate-950 font-bold px-1.5 py-0.5 rounded-md shadow-lime-glow-sm border border-lime-300 mx-1 inline-block -rotate-1">
                          {answers[seg.index]}
                        </span>
                      );
                    } else if (isCurrent) {
                      return (
                         <span key={i} className="inline-block mx-1">
                           <input
                             ref={inputRef}
                             type="text"
                             value={inputValue}
                             onChange={(e) => setInputValue(e.target.value)}
                             onKeyDown={handleKeyDown}
                             placeholder={seg.text}
                             className="bg-black/50 border-b-2 border-lime-400 text-lime-400 font-bold px-2 py-1 outline-none w-36 text-center rounded-t-md shadow-lime-glow-light placeholder:text-lime-400/30 placeholder:font-normal transition-all focus:bg-black/80"
                             autoFocus
                           />
                         </span>
                      );
                    } else {
                      return (
                        <span key={i} className="inline-block mx-1 px-2 py-1 border-b-2 border-slate-700 text-slate-600 font-medium">
                          {seg.text}
                        </span>
                      );
                    }
                  }
                  return <span key={i}>{seg.text}</span>;
                })}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-center items-center pb-32 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="w-full text-center flex flex-col items-center"
              >
                <h2 className="text-2xl font-bold text-slate-400 mb-2 uppercase tracking-widest text-sm drop-shadow-white-glow-sm">Give me a...</h2>
                <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400 mb-10 capitalize drop-shadow-violet-glow p-2 filter blur-[0.5px]">
                  {currentPlaceholder.type}
                </div>

                <div className="relative w-full max-w-sm group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-lime-400 to-lime-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type here..."
                    className="w-full relative bg-slate-900/80 border-2 border-white/10 focus:border-lime-400 text-white text-2xl font-bold rounded-2xl py-5 px-6 outline-none transition-all placeholder:text-slate-600 shadow-glass backdrop-blur-md focus:shadow-lime-glow-strong"
                    autoFocus
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 z-50 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent pb-10">
        <button
          onClick={handleNext}
          disabled={!inputValue.trim()}
          className={clsx(
            "w-full py-5 rounded-2xl text-xl font-black flex items-center justify-center gap-2 transition-all uppercase tracking-widest",
            inputValue.trim()
              ? "bg-lime-400 hover:bg-lime-300 text-slate-950 shadow-lime-glow hover:shadow-lime-glow-strong active:scale-95"
              : "bg-white/5 text-slate-500 border border-white/10 shadow-glass-light backdrop-blur-md cursor-not-allowed"
          )}
        >
          {isLast ? "Reveal Story" : "Next Word"}
          {isLast ? <Check className="w-6 h-6 stroke-[3]" /> : <ArrowRight className="w-6 h-6 stroke-[3]" />}
        </button>
      </div>
    </div>
  );
}
