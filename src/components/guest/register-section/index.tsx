import { RegisterForm } from '@/components/guest/register-section/register-form'
import { Skeleton } from '@/components/ui/skeleton'
import { navigate } from 'astro:transitions/client'

export function RegisterSection () {
  const userFromStorage = window.localStorage?.getItem('user')
  if (userFromStorage) {
    navigate('/waiting', { history: 'push' })
    return <SkeletonCard />
  }

  return (
    <section className='flex flex-col items-center rounded-lg ring-1 ring-primary/20 bg-background/50 w-full mx-auto shadow shadow-primary/60 px-3'>
      <h2 className='text-2xl font-bold text-primary'>Registro</h2>
      <RegisterForm />
    </section>
  )
}

function SkeletonCard () {
  return (
    <div className='flex gap-4 w-full h-72'>
      <Skeleton className='w-full rounded-xl' />
    </div>
  )
}
