import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import { registerSW } from "virtual:pwa-register";

// Register service worker
const updateSW = registerSW({
  onNeedRefresh() {
    // Will be handled by PWAUpdatePrompt component
    if (confirm("Nuova versione disponibile! Ricaricare per aggiornare?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("App ready to work offline");
  },
  onRegistered(registration) {
    console.log("Service Worker registered");

    // Check for updates every hour
    if (registration) {
      setInterval(() => {
        registration.update();
      }, 60 * 60 * 1000);
    }
  },
  onRegisterError(error) {
    console.error("SW registration error:", error);
  }
});

createRoot(document.getElementById("root")!).render(<App />);
  