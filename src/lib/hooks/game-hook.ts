import { socket } from '@/lib/utils/socket'
import { useEffect, useState } from 'react'

export function useGame () {
  const [gameStarting, setGameStarting] = useState(getLocalGameStarting)
  const [gameStarted, setGameStarted] = useState(getLocalGameStarted)

  useEffect(() => {
    socket
      .on('game-starting', (data: boolean) => {
        setGameStarting(data)
        localStorage.setItem('game_starting', JSON.stringify(data))
      })
      .on('game-started', (data: boolean) => {
        setGameStarted(data)
        localStorage.setItem('game_started', JSON.stringify(data))
      })
    return () => {
      socket.off('game-starting')
    }
  }, [])

  return {
    gameStarting,
    gameStarted
  }
}

function getLocalGameStarted () {
  return !!localStorage.getItem('game_started')
}

function getLocalGameStarting () {
  return !!localStorage.getItem('game_starting')
}
