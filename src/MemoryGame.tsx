import React, { useState } from 'react'
import './MemoryGame.css'

const NUMBER_OF_CARDS = 4
const CARDS = [0, 1, 0, 1]

function shuffle(array: number[]) {
  const shuffledArray = [...array]
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }
  return shuffledArray
}

function MemoryGame() {
  const [deck, setDeck] = useState(shuffle(CARDS))
  const [flipped, setFlipped] = useState(Array(NUMBER_OF_CARDS).fill(false))
  const [matched, setMatched] = useState<number[]>([])

  function handleCardClick(index: number) {
    if (flipped[index] || matched.includes(index)) {
      return
    }

    const newFlipped = [...flipped]
    newFlipped[index] = true
    setFlipped(newFlipped)

    const flippedCards = newFlipped.reduce((acc, val, idx) => {
      if (val) {
        acc.push(idx)
      }
      return acc
    }, [])

    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards
      const [firstCard, secondCard] = [deck[firstIndex], deck[secondIndex]]

      if (firstCard === secondCard) {
        setMatched([...matched, firstIndex, secondIndex])
        if (matched.length + 2 === NUMBER_OF_CARDS) {
          alert('You win!')
        }
      } else {
        setTimeout(() => {
          newFlipped[firstIndex] = false
          newFlipped[secondIndex] = false
          setFlipped(newFlipped)
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
