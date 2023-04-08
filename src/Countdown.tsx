import React, { useEffect, useState } from 'react'
import type { FC } from 'react'

type CountdownProps = {
  countDown: number
  countFinished: () => void
}

const Countdown: FC<CountdownProps> = ({
  countDown,
  countFinished,
}: CountdownProps) => {
  const [count, setCount] = useState(countDown)

  useEffect(() => {
    if (count === 0) {
      countFinished()
    }
    setTimeout(() => setCount(count - 1), 1000)
  }, [count])

  return <div>{count}</div>
}

export default Countdown
