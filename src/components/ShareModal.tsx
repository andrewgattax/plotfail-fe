import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check, MessageCircle } from "lucide-react";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  url: string;
}

export function ShareModal({ open, onOpenChange, title, url }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleWhatsAppShare = () => {
    const shareText = `Dai un'occhiata a "${title}" su PlotFail! 🎭✨`;
    const encodedText = encodeURIComponent(shareText);
    const whatsappUrl = `https://wa.me/?text=${encodedText}%20${encodeURIComponent(url)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white/10 border border-white/20 backdrop-blur-xl shadow-glass-md rounded-[2rem] p-8 max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-white text-center">
            Condividi
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {/* Copy Link Button */}
          <Button
            onClick={handleCopy}
            className={`w-full py-6 font-black text-base rounded-2xl flex items-center justify-center gap-3 transition-all uppercase tracking-widest shadow-glass-light active:scale-95 ${
              copied
                ? "bg-lime-400 text-slate-950 shadow-lime-glow"
                : "bg-black/20 hover:bg-white/10 text-white border border-white/10"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-6 h-6 fill-current" />
                <span>Copiato!</span>
              </>
            ) : (
              <>
                <Copy className="w-6 h-6" />
                <span>Copia Link</span>
              </>
            )}
          </Button>

          {/* WhatsApp Share Button */}
          <Button
            onClick={handleWhatsAppShare}
            className="w-full py-6 bg-[#25D366] hover:bg-[#128C7E] text-white font-black text-base rounded-2xl flex items-center justify-center gap-3 transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] active:scale-95"
          >
            <MessageCircle className="w-6 h-6 fill-current" />
            <span>WhatsApp</span>
          </Button>

          {/* URL Preview */}
          <div className="mt-6 p-4 bg-black/20 rounded-xl border border-white/10 backdrop-blur-sm">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Link</p>
            <p className="text-white text-sm font-medium truncate">{url}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
