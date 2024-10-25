import { handleEdit } from '@/components/guest/waiting-section/actions/handle-edit'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserBadgeConnected } from '@/components/ui/user-badge-ready'
import type { User } from '@/lib/types/User'
import { Pencil, Save, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export function PlayerDataCard ({ player }: { player: User }) {
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (player.ready) {
      setEditMode(false)
    }
  }, [player.ready])

  if (editMode) {
    return <PlayerEditCard player={player} handleEditMode={setEditMode} />
  }

  return <PlayerShowCard player={player} handleEditMode={setEditMode} />
}

function PlayerEditCard ({
  player,
  handleEditMode
}: {
  player: User
  handleEditMode: (value: boolean) => void
}) {
  const [name, setName] = useState(player.name)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setName(e.target.value.trim())
  }

  const handleSave = () => {
    if (!name) return

    handleEdit(player.id, name)
  }

  return (
    <div className='flex gap-5 justify-between items-center w-full h-28'>
      <div className='flex items-center gap-8'>
        <img
          src={player.avatar}
          alt={player.name}
          className='w-20 h-20 rounded-full'
        />
        <Input
          type='text'
          value={name}
          onChange={handleChange}
          onBlur={handleBlur}
          className='h-10 text-foreground font-medium text-2xl'
          autoComplete='given-name'
          autoFocus
        />
      </div>
      <EditActions handleSave={handleSave} handleEditMode={handleEditMode} />
    </div>
  )
}

function EditActions ({
  handleSave,
  handleEditMode
}: {
  handleSave: () => void
  handleEditMode: (value: boolean) => void
}) {
  return (
    <div className='flex gap-4'>
      <Button onClick={handleSave}>
        <Save className='w-6 h-6' />
      </Button>
      <Button onClick={() => handleEditMode(false)}>
        <X className='w-6 h-6' />
      </Button>
    </div>
  )
}

function PlayerShowCard ({
  player,
  handleEditMode
}: {
  player: User
  handleEditMode: (value: boolean) => void
}) {
  return (
    <div className='flex gap-5 justify-between items-center w-full h-28'>
      <div className='flex items-center gap-8'>
        <img
          src={player.avatar}
          alt={player.name}
          className='w-20 h-20 rounded-full'
        />
        <p className='text-foreground font-medium text-2xl'>{player.name}</p>
        <UserBadgeConnected ready={player.ready} />
      </div>
      <PlayerActions handleEditMode={handleEditMode} ready={!!player.ready} />
    </div>
  )
}

function PlayerActions ({
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
