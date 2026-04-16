import React from 'react';
import {Wand2} from "lucide-react";

function Login() {
  return (
    <div className={"h-full w-full flex flex-col items-center justify-center px-6"}>
      <div className={"flex flex-col items-center justify-center bg-white/5 backdrop-blur-2xl gap-4 p-8 rounded-4xl"}>
        <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-pink-500 rounded-[2rem] border border-white/20s flex items-center justify-center -rotate-6 shadow-violet-glow-lg">
          <Wand2 className="w-10 h-10 text-white stroke-[2] drop-shadow-lg" />
        </div>
        <h1 className={"text-2xl font-bold text-white text-glow-white"}>Inizia la cacca</h1>
        <p className={"text-foreground/50 text-center text-sm"}>SALVA LE TUE STORIE E CONDIVIDILE COL MONDO</p>
      </div>
    </div>
  );
}

export default Login;