// src/api/schemas.ts
// ⚠️ NON modificare schemas generati direttamente.
// Usa questo file per fix/override.

import * as generated from "./generated/schemas";
import { z } from "zod";

// ─── Override degli schemi rotti ──────────────────────────────────────────────
// Esempio: il generatore ha sbagliato un campo opzionale
const LoginRequest = generated.LoginRequest.extend({
  username: z.string().min(1, "Inserisci il tuo username."),
  password: z.string().min(1, "Inserisci la tua password.")// era required nel generato, ma è sbagliato
});

// Esempio: schema completamente riscritto
const PaginatedResponse = z.object({
  content: z.array(z.unknown()),
  totalElements: z.number(),
  totalPages: z.number(),
  size: z.number(),
  number: z.number(),
});

// ─── Re-export di tutto ───────────────────────────────────────────────────────
// Tutti gli schemi generati (quelli non overridati passano dritti)
export * from "./generated/schemas";

// Override: riesportati con lo stesso nome, sovrascrivono il wildcard sopra
export { LoginRequest };