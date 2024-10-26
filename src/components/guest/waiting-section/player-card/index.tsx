import { PlayerEditCard } from '@/components/guest/waiting-section/player-card/player-edit'
import { PlayerShowCard } from '@/components/guest/waiting-section/player-card/player-show'
import type { User } from '@/lib/types/User'
import { useEffect, useState } from 'react'

export function PlayerDataCard ({ player }: { player: User }) {
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (player.ready) setEditMode(false)
  }, [player.ready])

  if (editMode) {
    return <PlayerEditCard player={player} handleEditMode={setEditMode} />
  }

  return <PlayerShowCard player={player} handleEditMode={setEditMode} />
}
