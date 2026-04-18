import React, {useEffect, useState} from 'react';
import {ApiError, type StoriaCompactResponse, storiaService} from "@/api";

function Storie() {

  const [storie, setStorie] = useState<StoriaCompactResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [serverError, setServerError] = useState("")

  useEffect(() => {
    const caricaStorie = async () => {
      try {
        let response = await storiaService.getStorieByUser();
        setStorie(response)
      } catch (error) {
        if(error instanceof ApiError) {
          setServerError(error.payload.message)
        } else {
          console.error(error)
        }
      } finally {
        setLoading(false)
      }
    }

    caricaStorie();
  }, []);

  return (
    <div className={"w-full h-full flex flex-col justify-start gap-4 items-center"}>
      <h1 className={"text-2xl font-bold text-primary mt-8"}>Le tue storie</h1>
      {loading ? (
        <h2 className={"text-foreground/50 text-xl"}>Caricamento...</h2>
      ) : (
        storie.map(storia => (
          <div className={"text-foreground"}>
            <p>{storia.titolo}</p>
          </div>
        ))
      )}
      {serverError && (
        <p className={"text-destructive"}>{serverError}</p>
      )}
    </div>
  );
}

export default Storie;