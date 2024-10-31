import { MissionsSections } from '@/components/guest/game-section/game-diary/missions/primary-mission'
import moment from 'moment'
import { useEffect, useState } from 'react'

export function GameDiary() {

  const [timeLeft, setTimeLeft] = useState(getTimeLeft)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className='flex flex-col gap-3'>
      Tiempo restante: {timeLeft.hours()}:{timeLeft.minutes()}:{timeLeft.seconds()}
      <MissionsSections />
    </section>
  )
}

function getTimeLeft() {
  const now = moment()
  const midnight = moment().endOf('day')
  const diff = midnight.diff(now)
  const duration = moment.duration(diff)
  return duration
}