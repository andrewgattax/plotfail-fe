import { useEffect, useState } from "react";
import { themeService } from "@/services/themeService.ts";
import cabajo from "@/assets/cabajo.jpeg";
import {Button} from "@/components/ui/button.tsx";

export function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    setTheme(themeService.init());
  }, []);

  const toggleTheme = () => {
    setTheme(themeService.toggle());
  };

  return (
    <div className="h-full">
      <div className="flex flex-col gap-6 items-center justify-center h-full">
        {/*<img src={cabajo} alt="Logo" className="w-lg" />*/}
        <h1 className="text-4xl text-primary">This app is using <span className={"text-blue-400 font-bold"}>Tailwind</span> + <span className={"font-bold"}>ShadCN</span></h1>
        <div className="flex gap-4">
          <Button
            onClick={() => {
              alert("Someone pressed me!")
            }}
            className="w-48"
            variant="outline"
          >
            A beautiful button
          </Button>
          <Button
            onClick={toggleTheme}
            className="w-48"
            variant="default"
          >
            Switch to {theme === "light" ? "dark" : "light"} mode
          </Button>
        </div>
      </div>
    </div>
  );
}
