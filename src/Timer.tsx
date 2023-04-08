import React, { useState, useEffect } from 'react'
import type { FC } from 'react'

type TimerProps = {
  timeFinished: boolean
}

const Timer: FC<TimerProps> = ({ timeFinished }: TimerProps) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (timeFinished) return

    setTimeout(() => setCount(count + 1), 1000)
  }, [count])

  return <div>{count}</div>
}

export default Timer
