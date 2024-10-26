import { PlayerDataCard } from '@/components/guest/waiting-section/player-card'
import { Button } from '@/components/ui/button'
import { USER } from '@/lib/constants/api-routes'
import type { RegisterResponse } from '@/lib/types/RegisterResponse'
import { cn } from '@/lib/utils'
import { fetcher } from '@/lib/utils/fetch'
import { navigate } from 'astro:transitions/client'
import { useState } from 'react'

export function WaitingSection () {
  const [ready, setReady] = useState(false)

  const user = localStorage?.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null

  if (!user) {
    navigate('/', { history: 'replace' })
    return null
  }

  return (
    <section className='flex flex-col gap-3'>
      <h2 className='text-foreground font-bold loading-dots text-2xl'>
        Esperando al anfitrión
      </h2>
      <PlayerDataCard player={{ ...user, ready }} />
      <ActionButtons user={user} ready={ready} setReady={setReady} />
    </section>
  )
}

function ActionButtons ({
  user,
  ready,
  setReady
}: {
  user: { id: string }
  ready: boolean
  setReady: (value: boolean) => void
}) {
  const [loading, setLoading] = useState(false)

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

  const handleReady = async () => {
    try {
      const response = (await fetcher(
        `${USER}/ready`,
        { ...user, ready: !ready },
        { method: 'PUT' }
      )) as RegisterResponse

      localStorage.setItem('user', JSON.stringify(response.data))
      setReady(!!response.data.ready)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='flex gap-4 items-center justify-center'>
      <Button
        size='lg'
        variant='secondary'
        className={cn('text-lg font-bold bg-rose-800 hover:bg-rose-800 w-40', {
          'loading-dots': loading
        })}
        onClick={handleCancel}
        disabled={loading}
      >
        {loading ? 'Saliendo' : 'Salir'}
      </Button>
      <Button
        className='text-lg font-bold bg-sky-700 text-white hover:bg-sky-800 w-40'
        size='lg'
        variant='secondary'
        onClick={handleReady}
      >
        {ready ? 'Cancelar' : '¡Todo Listo!'}
      </Button>
    </div>
  )
}
