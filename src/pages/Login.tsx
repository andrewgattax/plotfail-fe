import React, {useState} from 'react';
  import {LoaderCircle, Wand2} from "lucide-react";
  import {LoginRequestSchema} from "@/api/schemas.ts";
  import {useForm} from "react-hook-form";
  import {zodResolver} from "@hookform/resolvers/zod";
  import {z} from "zod";
  import {Button} from "@/components/ui/button.tsx";
  import {ApiError, utenteService} from "@/api";
  import {router} from "@/routes.tsx";
  import {Link} from "react-router-dom";

  function Login() {

    type LoginData = z.infer<typeof LoginRequestSchema>

    const [serverError, setServerError] = useState("");

    const {
      register,
      handleSubmit,
      formState: {
        errors, isSubmitting
      }
    } = useForm<LoginData>({
      resolver: zodResolver(LoginRequestSchema),
      mode: "onTouched"
    })

  const onSubmit = async (data: LoginData) => {
    try {
      let response = await utenteService.login(data)
      console.log(response.token)
      await router.navigate("/")
    } catch (error) {
      if(error instanceof ApiError) {
        setServerError(error.payload.message)
      }
    }
  }

  return (
    <div className={"h-full w-full flex flex-col items-center justify-center px-6"}>
      <div className={"flex flex-col items-center justify-center bg-white/5 backdrop-blur-2xl gap-4 p-8 rounded-4xl"}>
        <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-pink-500 rounded-[2rem] border border-white/20s flex items-center justify-center -rotate-6 shadow-violet-glow-lg">
          <Wand2 className="w-10 h-10 text-white stroke-[2] drop-shadow-lg" />
        </div>
        <h1 className={"text-2xl font-bold text-white text-glow-white"}>Inizia la cacca</h1>
        <p className={"text-foreground/50 text-center text-sm"}>SALVA LE TUE STORIE E CONDIVIDILE COL MONDO</p>
        {serverError && (
          <p className={"w-full p-4 bg-destructive/10 border border-destructive font-bold text-destructive rounded-2xl"}>{serverError}</p>
        )}
        <form className={"w-full space-y-2"} onSubmit={handleSubmit(onSubmit)}>
          {errors.username?.message && (
            <p className={"text-destructive text-sm ml-2 mb-2"}>{errors.username.message}</p>
          )}
          <input
            type={"text"}
            placeholder={"Username"}
            {...register("username")}
            className={"w-full bg-white/5 border rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:border-transparent " + (errors.username?.message ? "border-red-500 focus:ring-red-500 text-destructive" : "border-white/20 focus:ring-primary text-white")}
          />
          {errors.password?.message && (
            <p className={"text-destructive text-sm ml-2 mb-2"}>{errors.password.message}</p>
          )}
          <input
            type={"password"}
            placeholder={"Password"}
            {...register("password")}
            className={"w-full bg-white/5 border rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:border-transparent " + (errors.password?.message ? "border-red-500 focus:ring-red-500 text-destructive" : "border-white/20 focus:ring-primary text-white")}
          />
          <Button type={"submit"} disabled={isSubmitting} className={"w-full bg-primary hover:bg-primary/90 font-bold py-6 rounded-2xl mt-2"}>
            {isSubmitting ? (<LoaderCircle className="animate-spin size-6"/>) : "Accedi"}
          </Button>
        </form>
        <p className={"text-white text-sm mt-2"}>Non hai un account? <Link className={"font-bold text-primary underline"} to={"/signup"}>Registrati.</Link></p>
      </div>
    </div>
  )
}

export default Login;