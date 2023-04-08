import React, { useState, useEffect, useCallback, memo } from 'react'
import type { FC } from 'react'
import './MemoryGame.css'

const NUM_PAIRS = 4

type GameState = {
  deck: number[]
  flipped: boolean[]
  matchedCards: boolean[]
  matched: number[]
  disabled: boolean
  gameOver: boolean
}

type CardProps = {
  value: number
  flipped: boolean
  matched: boolean
  onClick: () => void
}

// generates a deck of cards
const generateDeck = (): number[] => {
  // set used to ensure no duplicates
  const cards = new Set<number>()
  while (cards.size < NUM_PAIRS) {
    cards.add(Math.floor(Math.random() * 100))
  }
  // flatMap is used to duplicate the cards
  const deck = Array.from(cards).flatMap((card) => [card, card])
  return shuffle(deck)
}

// shuffles an array
function shuffle<T>(array: Array<T>): T[] {
  const shuffledArray = [...array]
  shuffledArray.sort(() => Math.random() - 0.5)
  return shuffledArray
}

// Card component -> memoized to prevent unnecessary re-renders
const Card: FC<CardProps> = memo(
  ({ value, flipped, matched, onClick }: CardProps): JSX.Element => {
    const isflipped = flipped || matched

    return (
      <div
        className={`card ${isflipped ? 'flipped' : ''} ${
          matched ? 'matched' : ''
        }`}
        onClick={onClick}
        aria-label={isflipped ? `Card flipped ${value}` : 'Card unflipped'}>
        {flipped || matched ? value : ' '}
      </div>
    )
  }
)

// checks if the game is won -> all cards are flipped
const isGameWon = (flipped: boolean[]): boolean =>
  flipped.every((value) => value)

const MemoryGame: FC = (): JSX.Element => {
  const [state, setState] = useState<GameState>({
    deck: generateDeck(),
    flipped: Array(NUM_PAIRS * 2).fill(false),
    matchedCards: Array(NUM_PAIRS * 2).fill(false),
    matched: [],
    disabled: false,
    gameOver: false,
  })

  // win condition -> if every card is flipped
  useEffect(() => {
    if (isGameWon(state.flipped)) {
      setState((prevState) => ({
        ...prevState,
        disabled: true,
        gameOver: true,
      }))
    }
  }, [state.flipped])

  // use callback to prevent unnecessary regenerations of the function
  const handleCardClick = useCallback(
    (index: number): void => {
      // if the card is disabled, flipped or matched, do nothing
      if (
        state.disabled ||
        state.flipped[index] ||
        state.matched.includes(index)
      ) {
        return
      }

      // creates a copy of the state
      const newFlipped = [...state.flipped]
      const newMatchedCards = [...state.matchedCards]
      // updates the state
      newFlipped[index] = true
      newMatchedCards[index] = true

      // gets the indexes of the most recent flipped cards
      const flippedCards = newMatchedCards.reduce<number[]>((acc, val, idx) => {
        if (val) {
          acc.push(idx)
        }
        return acc
      }, [])

      if (flippedCards.length === 2) {
        setState((prevState) => ({
          ...prevState,
          matchedCards: Array(NUM_PAIRS * 2).fill(false),
          flipped: newFlipped,
          disabled: true,
        }))

        const [firstIndex, secondIndex] = flippedCards
        const [firstCard, secondCard] = [
          state.deck[firstIndex],
          state.deck[secondIndex],
        ]

        if (firstCard === secondCard) {
          setState((prevState) => ({
            ...prevState,
            matched: [...prevState.matched, firstIndex, secondIndex],
            disabled: false,
          }))
        } else {
          setTimeout(() => {
            newFlipped[firstIndex] = false
            newFlipped[secondIndex] = false
            setState((prevState) => ({
              ...prevState,
              flipped: newFlipped,
              disabled: false,
            }))
          }, 1000)
        }
      } else {
        setState((prevState) => ({
          ...prevState,
          matchedCards: newMatchedCards,
          flipped: newFlipped,
        }))
      }
    },
    [state.deck, state.disabled, state.flipped, state.matched]
  )

  const resetGame = (): void => {
    setState((prevState) => ({
      ...prevState,
      deck: shuffle(prevState.deck),
      flipped: Array(NUM_PAIRS * 2).fill(false),
      matchedCards: Array(NUM_PAIRS * 2).fill(false),
      matched: [],
      disabled: false,
      gameOver: false,
    }))
  }

  return (
    <section>
      <section className='deck'>
        {state.deck.map((number, index) => (
          <Card
            key={index}
            value={number}
            flipped={state.flipped[index]}
            matched={state.matched.includes(index)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </section>
      {state.gameOver && (
        <div>
          <h1>You Won!</h1>
          <button onClick={resetGame}>Restart</button>
        </div>
      )}
    </section>
  )
}

export default MemoryGame
