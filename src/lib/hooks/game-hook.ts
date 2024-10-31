import type { User } from '@/lib/types/User'
import { socket } from '@/lib/utils/socket'
import { useEffect, useState } from 'react'

export function useGame () {
  const [gameStarting, setGameStarting] = useState(getLocalGameStarting)
  const [gameStarted, setGameStarted] = useState(getLocalGameStarted)

  useEffect(() => {
    socket.connect()
    socket
      .on('game-starting', (_data: any) => {
        setGameStarting(true)
        localStorage.setItem('game_starting', JSON.stringify(true))
      })
      .on('game-started', (data: User[]) => {
        setGameStarted(true)

        changeUser(data)

        localStorage.setItem('game_started', JSON.stringify(true))
      })

    return () => {
      socket.disconnect()
    }
  }, [])

  return {
    gameStarting,
    gameStarted
  }
}

function changeUser (data: User[]) {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null

  if (user) {
    localStorage.setItem(
      'user',
      JSON.stringify({
        ...user,
        ...data.find(u => u.id === user.id)
      })
    )
  }
}

function getLocalGameStarted () {
  return !!localStorage.getItem('game_started')
}

function getLocalGameStarting () {
  return !!localStorage.getItem('game_starting')
}
