import React from 'react';
import { z } from "zod";
import { LoginRequest } from "@/api/schemas.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button.tsx";

function LoginGay() {

  type LoginData = z.infer<typeof LoginRequest>

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginData>({
    resolver: zodResolver(LoginRequest),
    mode: "onBlur"
  })

  const onSubmit = (formData: LoginData) => {
    console.log("yay", formData)
  }

  return (
    <div className={"w-full h-full flex justify-center items-center p-8"}>
      <div className={"backdrop-blur-2xl w-full bg-white/5 p-8 rounded-4xl flex flex-col items-center justify-center"}>
        <h1 className={"text-2xl font-bold text-white text-glow-white"}>Login</h1>
        <p className={"text-foreground/30 text-sm mt-1"}>Entra nel tuo profilo</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
          type={"text"}
          placeholder={"Username"}
          className={"w-full text-white bg-background/50 rounded-md p-3 mt-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"}
          {...register("username")}
          />
          {errors.username && <p className={"text-destructive text-sm mt-1"}>{errors.username.message}</p>}
          <input
            type={"password"}
            placeholder={"Password"}
            className={"w-full text-white bg-background/50 rounded-md p-3 mt-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"}
            {...register("password")}
          />
          {errors.password && <p className={"text-destructive text-sm mt-1"}>{errors.password.message}</p>}
          <Button type={"submit"} className={"w-full mt-6"}>Entra</Button>
        </form>
      </div>
    </div>
  );
}

export default LoginGay;