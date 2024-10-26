import type { User } from '@/lib/types/User'

export function UserItem ({ user }: { user: User }): JSX.Element {
  return (
    <div className='flex items-center gap-3 w-80 border-b-2 border-b-foreground pb-2 relative'>
      <div className='w-full h-0.5 border-b-2 border-b-foreground blur-md absolute -bottom-0.5 left-0' />
      <img
        className='w-10 h-10 rounded-full'
        src={user.avatar}
        alt={user.name}
      />
      <span className='font-medium text-2xl'>{user.name}</span>
    </div>
  )
}
