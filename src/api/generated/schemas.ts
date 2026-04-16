/**
 * ⚠️  AUTO-GENERATED — DO NOT EDIT MANUALLY
 * Rigenera con: npm run gen:schemas
 */
import { z } from "zod";

export const RegistrazioneRequest = z
  .object({
    username: z.string(),
    password: z.string(),
    verificaPassword: z.string(),
  })
  .passthrough();
export const LoginRequest = z
  .object({ username: z.string(), password: z.string() })
  .passthrough();
export const GeneraStoriaRequest = z
  .object({ categoria: z.enum(["FUNNY", "DARK", "SAD"]) })
  .passthrough();
export const CreaStoriaRequest = z
  .object({
    titolo: z.string(),
    contenuto: z.string(),
    pubblico: z.boolean().optional(),
    templateId: z.number().int(),
  })
  .passthrough();
export const TokenResponse = z
  .object({ token: z.string() })
  .partial()
  .passthrough();
export const TemplateResponse = z
  .object({
    id: z.number().int(),
    titolo: z.string(),
    contenuto: z.string(),
    categoria: z.string(),
    status: z.enum(["PROCESSING", "COMPLETED", "FAILED"]),
    storieCreateCount: z.number().int(),
    used: z.boolean(),
  })
  .partial()
  .passthrough();
export const GeneraStoriaResponse = z
  .object({
    id: z.number().int(),
    categoria: z.enum(["FUNNY", "DARK", "SAD"]),
    status: z.string(),
    titolo: z.string(),
    contenuto: z.string(),
  })
  .partial()
  .passthrough();
export const TemplateCompactResponse = z
  .object({
    id: z.number().int(),
    titolo: z.string(),
    preview: z.string(),
    categoria: z.enum(["FUNNY", "DARK", "SAD"]),
    storieCreateCount: z.number().int(),
  })
  .partial()
  .passthrough();
export const StoriaCompactResponse = z
  .object({ id: z.number().int(), titolo: z.string(), public: z.boolean() })
  .partial()
  .passthrough();
export const StoriaResponse = z
  .object({
    id: z.number().int(),
    titolo: z.string(),
    autore: z.string(),
    contenuto: z.string(),
    templateId: z.number().int(),
    pubblico: z.boolean(),
  })
  .partial()
  .passthrough();
