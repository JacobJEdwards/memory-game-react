import React, { useState, useEffect } from 'react'
import './MemoryGame.css'

const NUMBER_OF_CARDS = 4
const CARDS: number[] = [0, 1, 0, 1]

function shuffle<T>(array: T[]): T[] {
  const shuffledArray = [...array]
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }
  return shuffledArray
}

function MemoryGame(): JSX.Element {
  const [deck, setDeck] = useState<number[]>(shuffle(CARDS))
  const [flipped, setFlipped] = useState<boolean[]>(
    Array(NUMBER_OF_CARDS).fill(false)
  )
  const [matched, setMatched] = useState<number[]>([])
  const [disabled, setDisabled] = useState<boolean>(false)

  useEffect(() => {
    if (flipped.every((value) => value)) {
      setDisabled(true)
      setTimeout(() => {
        setFlipped(Array(NUMBER_OF_CARDS).fill(false))
        setMatched([])
        setDisabled(false)
      }, 1000)
    }
  }, [flipped, matched])

  function handleCardClick(index: number): void {
    if (disabled || flipped[index] || matched.includes(index)) {
      return
    }

    const newFlipped = [...flipped]
    newFlipped[index] = true
    setFlipped(newFlipped)

    const flippedCards = newFlipped.reduce<number[]>((acc, val, idx) => {
      if (val) {
        acc.push(idx)
      }
      return acc
    }, [])

    if (flippedCards.length === 2) {
      setDisabled(true)
      const [firstIndex, secondIndex] = flippedCards
      const [firstCard, secondCard] = [deck[firstIndex], deck[secondIndex]]

      if (firstCard === secondCard) {
        setMatched([...matched, firstIndex, secondIndex])
        setDisabled(false)
      } else {
        setTimeout(() => {
          newFlipped[firstIndex] = false
          newFlipped[secondIndex] = false
          setFlipped(newFlipped)
          setDisabled(false)
        }, 1000)
      }
    }
  }

  return (
    <section className='deck'>
      {deck.map((number, index) => (
        <div
          className='card'
          key={index}
          onClick={() => handleCardClick(index)}>
          {flipped[index] || matched.includes(index) ? number : ' '}
        </div>
      ))}
    </section>
  )
}

export default MemoryGame
