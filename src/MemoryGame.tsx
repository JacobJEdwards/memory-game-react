import React, { useState, useEffect, useCallback, memo } from 'react'
import type { FC } from 'react'
import Card from './Card'

import './MemoryGame.css'
import generateDeck, {
  shuffle,
  generateEmptyDeck,
} from './utility/generateDeck'

const NUM_PAIRS = 2

type GameState = {
  deck: number[]
  flipped: boolean[]
  matchedCards: boolean[]
  matched: number[]
  disabled: boolean
  gameOver: boolean
}

// maybe replace useState with useReducer
type GameAction =
  | { type: 'RESET' }
  | { type: 'FLIP_CARD'; payload: { index: number } }
  | { type: 'MATCH_CARDS'; payload: { indexes: number[] } }
  | { type: 'RESET_MATCHED' }

const MemoryGame: FC = (): JSX.Element => {
  const [state, setState] = useState<GameState>({
    deck: generateDeck(NUM_PAIRS),
    flipped: generateEmptyDeck(NUM_PAIRS * 2),
    matchedCards: generateEmptyDeck(NUM_PAIRS * 2),
    matched: [],
    disabled: false,
    gameOver: false,
  })

  // checks if the game is won -> all cards are flipped
  const isGameWon = (flipped: boolean[]): boolean =>
    flipped.every((value) => value)

  // win condition -> if every card is flipped
  useEffect(() => {
    console.log(state.flipped)
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
          matchedCards: generateEmptyDeck(NUM_PAIRS * 2),
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
      flipped: generateEmptyDeck(NUM_PAIRS * 2),
      matchedCards: generateEmptyDeck(NUM_PAIRS * 2),
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
