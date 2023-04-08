import React from 'react'

const StartScreen = (props: { isStart: () => void }) => {
  return (
    <div>
      <button onClick={props.isStart}>Start</button>
    </div>
  )
}

export default StartScreen
