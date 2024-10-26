import { cn } from '@/lib/utils'

export function UserBadgeConnected ({
  ready
}: {
  ready: boolean | undefined
}): JSX.Element {
  return <Badge ready={ready}>{ready ? 'Listo' : 'Esperando'}</Badge>
}

function Badge ({
  ready,
  children
}: {
  ready: boolean | undefined
  children: string
}): JSX.Element {
  return (
    <span
      className={cn(
        'text-start font-medium text-sm ring-2 rounded-full px-3 py-1 w-[6.8rem]',
        {
          'text-green-900 bg-green-200 ring-green-900 text-center': ready,
          'text-amber-900 bg-amber-200 ring-amber-900 loading-dots': !ready
        }
      )}
    >
      {children}
    </span>
  )
}
