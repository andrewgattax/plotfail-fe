/**
 * Translate story category from English (backend) to Italian (UI)
 */
export function translateCategory(categoria: string): string {
  const categoryMap: Record<string, string> = {
    "FUNNY": "Divertente",
    "DARK": "Dark",
    "SAD": "Triste"
  }

  return categoryMap[categoria] || categoria
}
