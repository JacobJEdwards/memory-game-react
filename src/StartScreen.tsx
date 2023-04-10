import React from 'react'

type StartScreenProps = {
  isStart: () => void
}

const StartScreen = ({ isStart }: StartScreenProps) => {
  return (
    <div>
      <button onClick={isStart}>Start</button>
    </div>
  )
}

export default StartScreen
