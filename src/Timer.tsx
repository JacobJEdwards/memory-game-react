import React, { useState, useEffect, useRef } from 'react'
import type { FC } from 'react'

type TimerProps = {
  pauseTimer: boolean
  resetTimer: boolean
}

const Timer: FC<TimerProps> = ({ pauseTimer, resetTimer }: TimerProps) => {
  const [count, setCount] = useState(0)
  const timerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    timerRef.current = setTimeout(() => setCount((count) => count + 1), 1000)

    return () => clearTimeout(timerRef.current!)
  }, [count])

  useEffect(() => {
    if (pauseTimer) {
      clearTimeout(timerRef.current!)
    }
  }, [pauseTimer])

  useEffect(() => {
    setCount(0)
    clearTimeout(timerRef.current!)
    timerRef.current = setTimeout(() => setCount((count) => count + 1), 1000)
  }, [resetTimer])

  return <div>{count}</div>
}

export default Timer
