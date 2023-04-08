import React, { useState, useEffect, useCallback, memo } from 'react'
import type { FC } from 'react'
import './MemoryGame.css'

const CARDS: Array<number> = [0, 1, 0, 1, 2, 3, 2, 3]

type GameState = {
  deck: number[]
  flipped: boolean[]
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

function shuffle<T>(array: Array<T>): T[] {
  const shuffledArray = [...array]
  shuffledArray.sort(() => Math.random() - 0.5)
  return shuffledArray
  //const shuffledArray = [...array]
  //for (let i = shuffledArray.length - 1; i > 0; i--) {
  //const j = Math.floor(Math.random() * (i + 1))
  //;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  //}
  //return shuffledArray
}

const Card: FC<CardProps> = memo(
  ({ value, flipped, matched, onClick }: CardProps): JSX.Element => {
    const isflipped = flipped || matched

    return (
      <div
        className={`card ${isflipped ? 'flipped' : ''}`}
        onClick={onClick}
        aria-label={isflipped ? `Card flipped ${value}` : 'Card unflipped'}>
        {flipped || matched ? value : ' '}
      </div>
    )
  }
)

const MemoryGame: FC = (): JSX.Element => {
  const [state, setState] = useState<GameState>({
    deck: shuffle(CARDS),
    flipped: Array(CARDS.length).fill(false),
    matched: [],
    disabled: false,
    gameOver: false,
  })

  // win condition
  useEffect(() => {
    if (state.flipped.every((value) => value)) {
      setState((prevState) => ({
        ...prevState,
        disabled: true,
        gameOver: true,
      }))
    }
  }, [state.flipped])

  const handleCardClick = useCallback(
    (index: number): void => {
      if (
        state.disabled ||
        state.flipped[index] ||
        state.matched.includes(index)
      ) {
        return
      }

      const newFlipped = [...state.flipped]
      newFlipped[index] = true

      const flippedCards = newFlipped.reduce<number[]>((acc, val, idx) => {
        if (val) {
          acc.push(idx)
        }
        return acc
      }, [])

      if (flippedCards.length === 2) {
        setState((prevState) => ({
          ...prevState,
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
      flipped: Array(CARDS.length).fill(false),
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
