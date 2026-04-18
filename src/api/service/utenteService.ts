import { post } from '../client.ts'
import type {LoginResponse} from "@/api";

class UtenteService {

  async login(body: any) {
    return post<LoginResponse>("/utente/login", body)
  }

}

export const utenteService = new UtenteService()