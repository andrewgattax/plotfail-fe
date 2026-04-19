import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import { Download, X } from "lucide-react";

export function PWAUpdatePrompt() {
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateSW, setUpdateSW] = useState<((reloadPage?: boolean) => void) | null>(null);

  useEffect(() => {
    // Listen for custom event from main.tsx
    const handleUpdateAvailable = (e: CustomEvent) => {
      setShowUpdate(true);
      setUpdateSW(() => e.detail.updateSW);
    };

    // @ts-ignore - custom event
    window.addEventListener("sw-update-available", handleUpdateAvailable);

    return () => {
      // @ts-ignore - custom event
      window.removeEventListener("sw-update-available", handleUpdateAvailable);
    };
  }, []);

  if (!showUpdate) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] p-4 flex justify-center">
      <Alert className="max-w-md bg-gradient-to-r from-lime-400/10 to-violet-600/10 border-lime-400/50 shadow-lg shadow-lime-400/20">
        <Download className="h-4 w-4 text-lime-400" />
        <AlertTitle className="text-lime-400">Nuova versione disponibile!</AlertTitle>
        <AlertDescription className="flex items-center justify-between gap-4">
          <span className="text-sm">Aggiorna per ottenere le ultime funzionalità.</span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUpdate(false)}
              className="h-8 px-2 text-slate-400 hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              onClick={() => {
                updateSW?.(true);
                setShowUpdate(false);
              }}
              className="h-8 bg-lime-400 hover:bg-lime-500 text-slate-950 font-semibold"
            >
              Aggiorna
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
