import { handleEdit } from '@/components/guest/waiting-section/actions/handle-edit'
import { BaseCard } from '@/components/guest/waiting-section/player-card/base-card'
import { Button } from '@/components/ui/button'
import type { User } from '@/lib/types/User'
import { Save, X } from 'lucide-react'
import { useState } from 'react'

export function PlayerEditCard({
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

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!name) return

    handleEdit(player.id, name)
  }

  return (
    <form onSubmit={handleSave}>
      <BaseCard>
        <BaseCard.NameAndImage>
          <BaseCard.Image player={player} />
          <BaseCard.Input
            value={name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </BaseCard.NameAndImage>
        <EditActions handleEditMode={handleEditMode} />
      </BaseCard>
    </form>
  )
}

function EditActions({
  handleEditMode
}: {
  handleEditMode: (value: boolean) => void
}) {
  return (
    <div className='flex justify-center gap-4 w-full'>
      <Button type='submit'>
        <Save className='w-6 h-6' />
      </Button>
      <Button type='button' onClick={() => handleEditMode(false)}>
        <X className='w-6 h-6' />
      </Button>
    </div>
  )
}
