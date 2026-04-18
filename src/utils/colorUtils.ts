// Define color scheme for cards
export const CARD_COLORS = [
  {
    color: "from-pink-500/20 to-pink-600/5",
    border: "border-pink-500/30",
    name: "pink"
  },
  {
    color: "from-blue-500/20 to-blue-600/5",
    border: "border-blue-500/30",
    name: "blue"
  },
  {
    color: "from-violet-500/20 to-violet-600/5",
    border: "border-violet-500/30",
    name: "violet"
  },
  {
    color: "from-lime-500/20 to-lime-600/5",
    border: "border-lime-500/30",
    name: "lime"
  },
  {
    color: "from-orange-500/20 to-orange-600/5",
    border: "border-orange-500/30",
    name: "orange"
  }
]

/**
 * Get color configuration for a card using round-robin distribution
 * @param index - The card index in the list
 * @returns Color configuration object with `color` and `border` classes
 */
export function getCardColor(index: number) {
  const colorIndex = index % CARD_COLORS.length
  return CARD_COLORS[colorIndex]
}

/**
 * Assign colors to an array of items using round-robin
 * @param items - Array of items to colorize
 * @returns Array of items with assigned color configuration
 */
export function assignColorsRoundRobin<T>(items: T[]): Array<T & { color: string; border: string }> {
  return items.map((item, index) => {
    const colorConfig = getCardColor(index)
    return {
      ...item,
      color: colorConfig.color,
      border: colorConfig.border
    }
  })
}
