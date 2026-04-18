import React, {useEffect, useState} from 'react';
import {Bookmark, Clock, Play, Save} from "lucide-react";
import {ApiError, type TemplateCompactResponse, templateService} from "@/api";
import TemplatePreview from "@/components/template-preview.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";

function Explore() {

  const [templates, setTemplates] = useState<TemplateCompactResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const caricaTemplate = async () => {
      try {
        let response = await templateService.getTemplates();
        setTemplates(response)
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

    caricaTemplate();
  }, []);


  return (
    <div className={"h-full w-full flex flex-col items-center justify-start gap-10 px-6 py-10"}>
      <div className={"w-full flex justify-between items-center"}>
        <div>
          <h1 className={"text-foreground text-glow-white text-3xl font-bold"}>Esplora</h1>
          <p className={"text-foreground/30 text-xs font-bold mt-1"}>CAOS DI TENDENZA</p>
        </div>
        <div className={"bg-foreground/5 p-3 rounded-2xl border-2 border-foreground/10"}>
          <Clock className={"text-white"}/>
          {/*todo: recents*/}
        </div>
      </div>
      {templates.map(template => (
        <div className={"py-6 px-7 bg-foreground/5 backdrop-blur-2xl rounded-2xl w-full space-y-4"}>
          <div className={"flex justify-between w-full items-center"}>
            <div className={"flex-1/2 flex flex-col"}>
              <span className={"text-foreground text-sm font-bold text-glow-white"}>{template.titolo}</span>
              <span className={"text-xs font-bold text-primary text-glow-primary mt-2"}>10 APRILE 2026</span>
            </div>
            <div className={"flex-1/2 flex justify-end"}>
              <p className={"text-foreground/90 p-2 rounded-xl border-2 border-foreground/10 bg-foreground/10 backdrop-blur-2xl text-xs font-bold w-fit"}>{template.categoria}</p>
            </div>
          </div>
          <div>
            <TemplatePreview template={template.preview}/>
          </div>
          <Separator className={"border-foreground/10"}/>
          <div className={"flex w-full gap-4 items-center"}>
            <Button variant={"default"} className={"flex-1/2 p-6"}>
              <div className={"flex items-center text-lg font-bold gap-2"}>
                <Play className={"stroke-3"}/>
                Usa
              </div>
            </Button>
            <Button variant={"outline"} className={"flex-1/2 p-6 text-primary"}>
              <div className={"flex items-center text-lg font-bold gap-2"}>
                <Bookmark className={"stroke-3 w-12 h-12"}/>
                Salva
              </div>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Explore;