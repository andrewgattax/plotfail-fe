import {useEffect, useState} from "react";
import {ApiError, type TemplateCompactResponse, templateService} from "@/api";


export function Home() {

  const [templates, setTemplates] = useState<TemplateCompactResponse[]>([])
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const getTemplates = async () => {
      try {
        let response = await templateService.getTemplates()
        setTemplates(response)
      } catch (error) {
        if(error instanceof ApiError) {
          setServerError(error.payload.message)
        } else {
          console.error("Unexpected error:", error);
        }
      } finally {
        setLoading(false);
      }
    }

    getTemplates();
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-start w-full">
      <h1 className="text-3xl font-bold text-primary mt-8">Templates</h1>
      {loading ? (
        <p className="text-foreground/50 mt-4">Caricamento...</p>
      ) : serverError ? (
        <p className="text-destructive mt-4">{serverError}</p>
      ) : (
        <div className="w-full max-w-4xl mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {templates.map(template => (
            <div key={template.id} className="bg-white/5 backdrop-blur-2xl p-4 rounded-lg flex flex-col items-start gap-2">
              <h2 className="text-xl font-semibold text-white">{template.titolo}</h2>
              <p className="text-sm text-foreground/50">{template.preview}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
