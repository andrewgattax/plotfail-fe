import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Wand2, ChevronRight, LoaderCircle } from "lucide-react";
import {z} from "zod";
import {LoginRequestSchema} from "@/api/schemas.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ApiError, utenteService} from "@/api";
import {useUser} from "@/context/UserContext.tsx";
import {useNavigate} from "react-router";

type LoginForm = z.infer<typeof LoginRequestSchema>

export function Login() {
  const [serverError, setServerError] = useState("")
  const [step, setStep] = useState<1 | 2>(1)

  const {
    register,
    handleSubmit,
    trigger,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginRequestSchema),
    mode: "onTouched"
  })

  const {loadFromJwt} = useUser()
  const navigate = useNavigate()

  const handleContinue = async () => {
    const isValid = await trigger("username")
    if (isValid) {
      setStep(2)
    }
  }

  const onSubmit = async (data: LoginForm) => {
    setServerError("")
    try {
      let response = await utenteService.login(data)
      loadFromJwt(response.token)
      navigate("/")
    } catch (err) {
      if (err instanceof ApiError) {
        setServerError(err.payload.message)
      } else {
        console.error(err)
      }
    }
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-white/5 border border-white/20 rounded-[2.5rem] p-8 shadow-glass-strong backdrop-blur-xl flex flex-col items-center relative z-10"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-pink-500 rounded-[2rem] border border-white/20 mb-8 flex items-center justify-center -rotate-6 shadow-violet-glow-lg">
          <Wand2 className="w-10 h-10 text-white stroke-[3] drop-shadow-lg" />
        </div>
        <h1 className="text-4xl font-black text-white mb-3 tracking-tight drop-shadow-white-glow">Unisciti al Caos</h1>
        <p className="text-slate-400 font-bold mb-6 text-center text-[13px] uppercase tracking-widest leading-relaxed">Salva i tuoi fail e condividili con il mondo.</p>

        <AnimatePresence mode="wait">
          {serverError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full p-4 bg-red-500/10 border border-red-500/20 rounded-2xl mb-5"
            >
              <p className="text-red-400 font-bold text-sm text-center uppercase tracking-wider">{serverError}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-5"
              >
                {errors.username?.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs font-bold ml-2 uppercase tracking-wider"
                  >
                    {errors.username.message}
                  </motion.p>
                )}
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    autoComplete="username"
                    {...register("username")}
                    className={`w-full bg-black/20 border font-bold rounded-2xl py-4 px-6 outline-none transition-all placeholder:text-slate-500 backdrop-blur-md ${
                      errors.username?.message
                        ? "border-red-500/50 text-red-400 focus:bg-red-500/10 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                        : "border-white/10 text-white focus:border-lime-400 focus:bg-black/40 focus:shadow-lime-glow"
                    }`}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="w-full py-4 bg-lime-400 hover:bg-lime-300 text-slate-950 text-lg font-black rounded-2xl flex items-center justify-center gap-2 shadow-lime-glow hover:shadow-lime-glow-strong active:scale-95 transition-all uppercase tracking-widest"
                >
                  Continua <ChevronRight className="w-6 h-6" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                {errors.password?.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs font-bold ml-2 uppercase tracking-wider"
                  >
                    {errors.password.message}
                  </motion.p>
                )}
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    {...register("password")}
                    className={`w-full bg-black/20 border font-bold rounded-2xl py-4 px-6 outline-none transition-all placeholder:text-slate-500 backdrop-blur-md ${
                      errors.password?.message
                        ? "border-red-500/50 text-red-400 focus:bg-red-500/10 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                        : "border-white/10 text-white focus:border-lime-400 focus:bg-black/40 focus:shadow-lime-glow"
                    }`}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 text-slate-300 font-bold rounded-2xl border border-white/10 active:scale-95 transition-all uppercase tracking-widest text-sm"
                >
                  Indietro
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-lime-400 hover:bg-lime-300 text-slate-950 text-lg font-black rounded-2xl flex items-center justify-center gap-2 shadow-lime-glow hover:shadow-lime-glow-strong active:scale-95 transition-all uppercase tracking-widest disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <LoaderCircle className="size-6 animate-spin" />
                  ) : (
                    <>Inizia a Creare <Sparkles className="w-6 h-6 fill-slate-950" /></>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  );
}
