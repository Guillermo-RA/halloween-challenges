import { START_GAME } from '@/lib/constants/api-routes'
import { useUsersConnected } from '@/lib/hooks/users-connected-hook'
import { fetcher } from '@/lib/utils/fetch'
import { navigate } from 'astro:transitions/client'
import moment from 'moment'
import { useEffect, useState } from 'react'

export function GameStarted() {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft)
    const { users } = useUsersConnected()

    const gameStarted = localStorage.getItem('game_started')
        ? JSON.parse(localStorage.getItem('game_started') as string)
        : false

    if (!gameStarted) {
        navigate('/admin/game', { history: 'replace' })
        return null
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeLeft)
        }, 1000)



        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (timeLeft.seconds() % 3 === 0) {
            fetcher(START_GAME, { users, reassign: false }, { method: 'POST' })
        }
    }, [timeLeft])

    return (
        <section className='flex justify-center items-center'>
            <h2 className='text-5xl font-bold'>
                TIEMPO RESTANTE: {timeLeft.hours()}:{timeLeft.minutes()}:{timeLeft.seconds()}
            </h2>
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