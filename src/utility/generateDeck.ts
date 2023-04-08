// generates a deck of cards
const generateDeck = (numPairs: number): number[] => {
  // set used to ensure no duplicates
  const cards = new Set<number>()
  while (cards.size < numPairs) {
    cards.add(Math.floor(Math.random() * (numPairs * 20)))
  }
  // flatMap is used to duplicate the cards
  const deck = Array.from(cards).flatMap((card) => [card, card])
  return shuffle(deck)
}

// shuffles an array
export function shuffle<T>(array: Array<T>): T[] {
  const shuffledArray = [...array]
  shuffledArray.sort(() => Math.random() - 0.5)
  return shuffledArray
}

export const generateEmptyDeck = (length: number): boolean[] => {
  return Array.from({ length: length }, () => false)
}

export default generateDeck