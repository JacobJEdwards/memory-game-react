import React, { useState } from 'react'
import MemoryGame from './MemoryGame'
import StartScreen from './StartScreen'
import './App.css'

const App = () => {
  const [gameStarted, setGameStarted] = useState(false)
  return (
    <div className='App'>
      <h1>Memory Game</h1>
      {gameStarted ? (
        <MemoryGame />
      ) : (
        <StartScreen isStart={() => setGameStarted(true)} />
      )}
    </div>
  )
}

export default App
