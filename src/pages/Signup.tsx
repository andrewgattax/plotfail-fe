import React, {useState} from 'react';

function Signup() {

  return (
    <div className={"h-full w-full flex flex-col items-center justify-center px-6"}>
      <div className={"flex flex-col items-center justify-center bg-white/5 backdrop-blur-2xl gap-4 p-8 rounded-4xl"}>
        <h1 className={"text-2xl font-bold text-white text-glow-white"}>Signup</h1>
        <p className={"text-foreground/50 text-center text-sm"}>SALVA LE TUE STORIE E CONDIVIDILE COL MONDO</p>
      </div>
    </div>
  );
}

export default Signup;