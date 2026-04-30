import { useState, useEffect, useRef } from 'react'

export const useCountdown = (deadline, onExpire) => {
  const [remaining, setRemaining] = useState(() => {
    if (!deadline) return 0
    return Math.max(0, deadline - Date.now())
  })
  const onExpireRef = useRef(onExpire)
  onExpireRef.current = onExpire

  useEffect(() => {
    if (!deadline) return
    const tick = () => {
      const left = Math.max(0, deadline - Date.now())
      setRemaining(left)
      if (left <= 0) {
        clearInterval(id)
        onExpireRef.current?.()
      }
    }
    tick()
    const id = setInterval(tick, 200)
    return () => clearInterval(id)
  }, [deadline])

  const totalSec = Math.ceil(remaining / 1000)
  const hours = String(Math.floor(totalSec / 3600)).padStart(2, '0')
  const minutes = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0')
  const seconds = String(totalSec % 60).padStart(2, '0')
  const isUrgent = totalSec <= 300 && totalSec > 0
  const progress = deadline ? Math.max(0, remaining / (deadline - (deadline - remaining > 0 ? deadline - remaining : deadline))) : 0

  return { hours, minutes, seconds, remaining, isUrgent, totalSec }
}
