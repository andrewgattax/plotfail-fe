import { useEffect, useState } from "react";
import { WifiOff, Wifi } from "lucide-react";
import { clsx } from "clsx";

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    // Check initial status
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowStatus(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!showStatus) return null;

  return (
    <div
      className={clsx(
        "fixed top-16 left-4 right-4 z-50 flex items-center justify-center gap-2 px-4 py-3 rounded-xl shadow-lg backdrop-blur-xl transition-all duration-300",
        isOnline
          ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
          : "bg-orange-500/20 border border-orange-500/30 text-orange-400"
      )}
    >
      {isOnline ? (
        <>
          <Wifi className="h-4 w-4" />
          <span className="text-sm font-medium">Sei online di nuovo</span>
        </>
      ) : (
        <>
          <WifiOff className="h-4 w-4" />
          <span className="text-sm font-medium">Sei offline - alcuni contenuti potrebbero non essere disponibili</span>
        </>
      )}
    </div>
  );
}
