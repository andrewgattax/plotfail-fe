import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Download, X } from "lucide-react";
import { clsx } from "clsx";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);

      // Show prompt after a delay (don't show immediately)
      setTimeout(() => {
        setShowPrompt(true);
      }, 5000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setShowPrompt(false);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 animate-in slide-in-from-bottom-4 duration-500">
      <Card className="bg-gradient-to-br from-lime-400/10 to-violet-600/10 border-lime-400/30 backdrop-blur-xl shadow-lg shadow-lime-400/20">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-lime-400 to-violet-600 flex items-center justify-center">
                <Download className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-lime-400">Installa PlotFail</CardTitle>
                <CardDescription className="text-sm text-slate-400">
                  Installa l'app per la migliore esperienza
                </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowPrompt(false)}
              className="h-8 w-8 text-slate-400 hover:text-slate-200 hover:bg-white/5"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => setShowPrompt(false)}
              className="flex-1 text-slate-400 hover:text-slate-200"
            >
              Forse dopo
            </Button>
            <Button
              onClick={handleInstallClick}
              className={clsx(
                "flex-1 bg-gradient-to-r from-lime-400 to-lime-500",
                "hover:from-lime-500 hover:to-lime-600",
                "text-slate-950 font-semibold",
                "shadow-lg shadow-lime-400/30"
              )}
            >
              Installa ora
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
