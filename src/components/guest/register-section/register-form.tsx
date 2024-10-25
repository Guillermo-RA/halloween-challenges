import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { handleSubmit } from '@/components/guest/register-section/actions/handle-submit'
import { NameInput } from '@/components/guest/register-section/fields/name-input'

export function RegisterForm () {
  const [error, setError] = useState('')

  return (
    <form
      onSubmit={(...args) =>
        handleSubmit(...args).catch(err => setError(err.message))
      }
      className='flex flex-col gap-5 w-full p-4 flex-1'
    >
      <NameInput error={error} setError={setError} />
      <ButtonContainer />
    </form>
  )
}

function ButtonContainer () {
  return (
    <div className='flex flex-col justify-end flex-1'>
      <Button size='lg' type='submit' className='text-lg font-bold'>
        Enviar
      </Button>
    </div>
  )
}
