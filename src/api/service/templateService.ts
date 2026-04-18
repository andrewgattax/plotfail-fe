import {get} from "@/api/client.ts";
import type {TemplateCompactResponse} from "@/api/types.ts";

class TemplateService {
  async getTemplates() {
    return get<TemplateCompactResponse[]>("/template")
  }
}

export const templateService = new TemplateService()