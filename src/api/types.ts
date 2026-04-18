export interface ErrorResponse {
  message: string
  error: string
  status: number
  path: string
}

export interface LoginResponse {
  token: string
}

export interface TemplateCompactResponse {
  id: number,
  titolo: string,
  preview: string,
  categoria: string,
  storieCreateCount: number
}
