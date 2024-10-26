import { UserBadgeConnected } from '@/components/ui/user-badge-ready'
import { useUsersConnection } from '@/lib/contexts/users-connection-context'
import type { User } from '@/lib/types/User'
import { cn } from '@/lib/utils'

export function UserList (): JSX.Element {
  const { users } = useUsersConnection()

  return (
    <div className='flex flex-col content-start flex-wrap h-96 gap-7 w-full items-center'>
      {users.map(user => (
        <UserListItem key={user.id} user={user} />
      ))}
    </div>
  )
}

function UserListItem ({ user }: { user: User }): JSX.Element {
  return (
    <div
      className={cn(
        'flex items-center gap-3 w-80 ring-1 ring-secondary pb-2 relative rounded-lg px-3 py-2 bg-secondary shadow shadow-foreground/20 select-none',
        {
          'opacity-60': !user.ready
        }
      )}
    >
      <img
        className='w-10 h-10 rounded-full'
        src={user.avatar}
        alt={user.name}
        draggable={false}
      />
      <span title={user.name} className='font-medium text-2xl truncate'>
        {user.name}
      </span>
      <div className='flex justify-end flex-grow'>
        <UserBadgeConnected ready={user.ready} />
      </div>
    </div>
  )
}
