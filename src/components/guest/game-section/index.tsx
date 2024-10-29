import { GameDiary } from '@/components/guest/game-section/game-diary'
import { ThickArrowUp } from '@/components/ui/icons/thick-arrow-up'
import { useGame } from '@/lib/hooks/game-hook'
import { navigate } from 'astro:transitions/client'

export function GameSection() {
  const { gameStarted } = useGame()

  const user = localStorage?.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null

  if (!user?.ready) {
    navigate('/waiting')
    return null
  }

  if (gameStarted) {
    return <GameDiary />
  }

  return (
    <section className='flex flex-col justify-center items-center gap-16 h-full'>
      <h2 className='text-foreground font-bold  text-5xl'>¡Mira la tele!</h2>
      <ThickArrowUp className='stroke-[3] animate-bounce animate-p w-28' />
    </section>
  )
}
