import { BaseCard } from '@/components/guest/waiting-section/player-card/base-card'
import { Button } from '@/components/ui/button'
import { UserBadgeConnected } from '@/components/ui/user-badge-ready'
import type { User } from '@/lib/types/User'
import { Pencil } from 'lucide-react'

export function PlayerShowCard ({
  player,
  handleEditMode
}: {
  player: User
  handleEditMode: (value: boolean) => void
}) {
  return (
    <BaseCard>
      <BaseCard.NameAndImage>
        <BaseCard.Image player={player} />
        <BaseCard.Name>{player.name}</BaseCard.Name>
        <UserBadgeConnected ready={player.ready} />
      </BaseCard.NameAndImage>
      <ShowActions handleEditMode={handleEditMode} ready={!!player.ready} />
    </BaseCard>
  )
}

function ShowActions ({
  handleEditMode,
  ready
}: {
  handleEditMode: (value: boolean) => void
  ready: boolean
}) {
  return (
    <div className='flex gap-4'>
      <Button onClick={() => handleEditMode(true)} disabled={ready}>
        <Pencil className='w-6 h-6' />
      </Button>
    </div>
  )
}
