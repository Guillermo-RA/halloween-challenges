import { Button } from '@/components/ui/button'
import { USER } from '@/lib/constants/api-routes'
import { getAvatar } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { fetcher } from '@/lib/utils/fetch'
import { navigate } from 'astro:transitions/client'
import { useState } from 'react'

export function WaitingSection () {
  const [loading, setLoading] = useState(false)

  const user = localStorage?.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null

  if (!user) {
    navigate('/', { history: 'replace' })
    return null
  }

  const handleCancel = () => {
    setLoading(true)
    window.localStorage.removeItem('user')
    fetcher(USER, { id: user.id }, { method: 'DELETE' })
      .then(res => {
        console.log(res)
        navigate('/', { history: 'replace' })
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  return (
    <section className='flex flex-col gap-3'>
      <h2 className='text-foreground font-bold loading-dots text-2xl'>
        Esperando al anfitrión
      </h2>
      <PlayerData player={user} />
      <Button
        size='lg'
        className={cn('text-lg font-bold', { 'loading-dots': loading })}
        onClick={handleCancel}
        disabled={loading}
      >
        {loading ? 'Cancelando...' : 'Cancelar'}
      </Button>
    </section>
  )
}

function PlayerData ({ player }: { player: any }) {
  const avatar = getAvatar(player)

  return (
    <div className='flex gap-8 items-center w-full h-28'>
      <img src={avatar} alt={player.name} className='w-20 h-20 rounded-full' />
      <p className='text-foreground font-medium text-2xl'>{player.name}</p>
    </div>
  )
}
