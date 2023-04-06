import React from 'react'
import type { ReactElement } from 'react'
import MemoryGame from './MemoryGame'
import './App.css'

const App = (): ReactElement => {
  return (
    <main className='App'>
      <MemoryGame />
    </main>
  )
}
