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


export function shuffle<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}



export const generateEmptyDeck = (length: number): boolean[] => {
  return Array.from({ length: length }, () => false)
}

export default generateDeck