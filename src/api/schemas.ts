import { z } from "zod"

export const LoginRequestSchema = z.object({
  username: z.string().min(1, "Inserisci un username").min(4, "L'username deve essere minimo 4 caratteri"),
  password: z.string().min(1, "Inserisci la password")
})



