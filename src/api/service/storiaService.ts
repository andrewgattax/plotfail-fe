import { get, post, del } from "../client"
import type { StoriaCompactResponse, StoriaResponse, CreaStoriaRequest } from "../types"

class StoriaService {
  // Fetch public stories for homepage (no auth required)
  async getPublicStories() {
    return get<StoriaCompactResponse[]>("/storia/public")
  }

  // Fetch current user's stories (requires auth)
  async getUserStories() {
    return get<StoriaCompactResponse[]>("/storia")
  }

  // Fetch story by ID (for detail view)
  async getById(id: number) {
    return get<StoriaResponse>(`/storia/${id}`)
  }

  // Create a new story (requires auth)
  async create(body: CreaStoriaRequest) {
    return post<void>("/storia", body)
  }

  // Toggle story public status (requires auth)
  async togglePublic(id: number) {
    return post<void>(`/storia/toggle-public/${id}`)
  }

  // Delete a story (requires auth)
  async delete(id: number) {
    return del<void>(`/storia/${id}`)
  }
}

export const storiaService = new StoriaService();