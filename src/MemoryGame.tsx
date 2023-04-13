import React, { useState, useEffect, useCallback, memo } from 'react'
import type { FC } from 'react'
import Card from './Card'
import Timer from './Timer'
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
  resetTimer: boolean
}

const INITIAL_STATE: GameState = {
  deck: generateDeck(NUM_PAIRS),
  flipped: generateEmptyDeck(NUM_PAIRS * 2),
  matchedCards: generateEmptyDeck(NUM_PAIRS * 2),
  matched: [],
  disabled: false,
  gameOver: false,
  resetTimer: false,
}

interface MemoryGameProps {
  numPairs: number
}

const MemoryGame: FC<MemoryGameProps> = ({
  numPairs,
}: MemoryGameProps): JSX.Element => {
  const [state, setState] = useState<GameState>(INITIAL_STATE)

  // checks if the game is won -> all cards are flipped
  const isGameWon = (flipped: boolean[]): boolean =>
    flipped.every((value) => value)

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
      ...INITIAL_STATE,
      deck: generateDeck(NUM_PAIRS),
      resetTimer: !prevState.resetTimer,
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
      <Timer
        pauseTimer={state.gameOver}
        resetTimer={state.resetTimer}
      />
    </section>
  )
}

export default MemoryGame
