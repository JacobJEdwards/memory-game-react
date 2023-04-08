import React, { memo } from 'react'
import type { FC } from 'react'
import './MemoryGame.css'

type CardProps = {
  value: number
  flipped: boolean
  matched: boolean
  onClick: () => void
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

export default Card
