import React from 'react'

type StartScreenProps = {
  isStart: () => void
}

const StartScreen = ({ isStart }: StartScreenProps) => {
  return (
    <div>
      <input
        id='numPairs'
        type='number'
        min={1}
        max={6}
        placeholder='1'
        defaultValue={2}
      />
      <button onClick={isStart}>Start</button>
    </div>
  )
}

export default StartScreen
