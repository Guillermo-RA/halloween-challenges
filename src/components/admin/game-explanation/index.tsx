import { START_GAME } from '@/lib/constants/api-routes'
import { useUsersConnected } from '@/lib/hooks/users-connected-hook'
import { fetcher } from '@/lib/utils/fetch'
import { navigate } from 'astro:transitions/client'
import { useEffect, useState } from 'react'

export function GameExplanation() {

    const [gameStarted, setGameStarted] = useState(getLocalGameStarted)
    const { users } = useUsersConnected()

    const gameStarting = localStorage.getItem('game_starting')
        ? JSON.parse(localStorage.getItem('game_starting') as string)
        : false


    useEffect(() => {
        const timer = setTimeout(() => {
            fetcher(START_GAME, { users, reassign: true }, { method: 'POST' })
                .then((response: any) => {
                    setGameStarted(true)
                    localStorage.setItem('game_started', JSON.stringify(true))
                    localStorage.setItem('players', JSON.stringify(response.data))
                })
        }, 20600)

        return () => clearTimeout(timer)
    }, [])

    if (gameStarted) {
        navigate('/admin/game-started', { history: 'replace' })
        return null
    }

    if (!gameStarting) {
        navigate('/admin', { history: 'replace' })
        return null
    }

    return (
        <section className="flex flex-col gap-3 items-center text-4xl text-center px-4">
            <p className='animate-text-1'>Cada uno recibirá en su móvil una misión principal.</p>
            <span className='animate-text-2'>
                <p>Para completarla deberán hacer que la persona que les haya tocado <b>haga</b> o <b>diga</b> una cosa concreta sin que os descubra.</p>
                <p>Si lo conseguís, recibiréis <b>3 puntos</b>.</p>
            </span>
            <p className='animate-text-3'>También hay 2 misiones secundarias con las que podréis ganar 1 punto con cada una. En ellas en lugar de que otra persona haga algo, tendréis que hacerlo vosotros sin que se note.</p>
            <p className='animate-text-4'>Tendréis hasta las <b>02:30</b> para completarlas</p>
        </section>
    )
}

function getLocalGameStarted() {
    return localStorage.getItem('game_started')
        ? JSON.parse(localStorage.getItem('game_started') as string)
        : false
}