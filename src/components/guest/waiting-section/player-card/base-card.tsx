import { Input } from '@/components/ui/input'
import type { User } from '@/lib/types/User'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export function BaseCard ({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex gap-5 justify-between items-center w-full h-28'>
      {children}
    </div>
  )
}

BaseCard.NameAndImage = NameAndImage
BaseCard.Image = Image
BaseCard.Name = Name
BaseCard.Input = NameInput

function NameAndImage ({ children }: { children: React.ReactNode }) {
  return <div className='flex items-center gap-8'>{children}</div>
}

function Image ({ player }: { player: User }) {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && (
        <div className='w-20 h-20 bg-gray-400 rounded-full animate-pulse'></div>
      )}
      <img
        src={player.avatar}
        alt={player.name}
        className={cn(
          'rounded-full invisible opacity-0 transition-opacity duration-[250ms] w-20 h-20 absolute',
          { 'relative opacity-100 visible': !loading }
        )}
        onLoad={() => setLoading(false)}
      />
    </>
  )
}

function Name ({ children }: { children: React.ReactNode }) {
  return <p className='text-foreground font-medium text-2xl'>{children}</p>
}

function NameInput (props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Input
      type='text'
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      className='h-10 text-foreground font-medium text-2xl'
      autoComplete='given-name'
      autoFocus
    />
  )
}
