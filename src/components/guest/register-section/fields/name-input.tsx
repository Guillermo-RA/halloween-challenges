import { Input } from '@/components/ui/input'

export function NameInput ({
  error,
  setError
}: {
  error: string
  setError: (error: string) => void
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) setError('')
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!event.target.value) setError('El nombre es requerido')
  }

  return (
    <label className='text-lg flex flex-col gap-1 h-24'>
      <span className='font-medium'> Nombre * </span>
      <Input
        type='text'
        name='name'
        placeholder='Nombre'
        className='h-10 text-lg font-bold bg-secondary shrink-0'
        onChange={handleChange}
        onBlur={handleChange}
        autoComplete='given-name'
      />
      <span className='text-red-500 text-sm pl-2'> {error} </span>
    </label>
  )
}
