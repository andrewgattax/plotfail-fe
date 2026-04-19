import {get, post, del} from "@/api/client.ts";
import type {TemplateCompactResponse, TemplateResponse} from "@/api/types.ts";

class TemplateService {
  async getTemplates() {
    return get<TemplateCompactResponse[]>("/template")
  }

  async getById(id: number) {
    return get<TemplateResponse>(`/template/${id}`)
  }

  async save(id: number) {
    return post<void>(`/template/save/${id}`, {})
  }

  async unsave(id: number) {
    return del<void>(`/template/unsave/${id}`)
  }
}

export const templateService = new TemplateService()