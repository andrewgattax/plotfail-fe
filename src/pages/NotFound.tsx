import React from 'react';

function NotFound() {
  return (
    <div className={"h-full flex flex-col items-center justify-center gap-2 px-4"}>
      <h1 className={"text-2xl font-bold text-primary text-center"}>Questa pagina non esiste</h1>
      <p className={"text-foreground/50"}>Dove cazzo volevi andare?</p>
    </div>
  );
}

export default NotFound;