import { StepNavigation } from '@/components/admin/wizard/components/step-navigation'
import { PreparationStep } from '@/components/admin/wizard/sections/preparation-section'
import { ReadyStep } from '@/components/admin/wizard/sections/ready-section'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  UsersConnectionProvider,
  useUsersConnection
} from '@/lib/contexts/users-connection-context'
import type { User } from '@/lib/types/User'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'

export const STEPS = {
  ONE: 1,
  TWO: 2,
  THREE: 3
}

export function ChallengeWizard(): JSX.Element {
  const [isLogged, setIsLogged] = useState(getIsLogged())

  if (!isLogged) {
    return <Login setIsLogged={setIsLogged} />
  }


  return (
    <UsersConnectionProvider>
      <Wizard />
    </UsersConnectionProvider>
  )
}

function Wizard() {
  const [step, setStep] = useState(STEPS.ONE)
  const { users } = useUsersConnection()

  const handleNextStep = () => {
    setStep(prevStep => prevStep + 1)
  }

  const handlePreviousStep = () => {
    setStep(prevStep => prevStep - 1)
  }

  return (
    <section className='flex-grow flex flex-col justify-between gap-14 max-w-screen-2xl mx-auto px-4'>
      <CurrentStep step={step} />
      <StepNavigation
        step={step}
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePreviousStep}
        disableFinish={!users.every((user: User) => user.ready)}
        disableNext={!users.length}
      />
    </section>
  )
}

function CurrentStep({ step }: { step: number }) {
  switch (step) {
    case STEPS.ONE:
      return <PreparationStep />
    case STEPS.TWO:
      return <ReadyStep />
    // case STEPS.THREE:
    //     return <StepThree />
    default:
      return <PreparationStep />
  }
}

function Login({ setIsLogged }: { setIsLogged: (value: boolean) => void }) {
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  const handleLogin = () => {
    if (password === '!admin.55@') {
      localStorage.setItem('isLogged', 'true')
      setIsLogged(true)
    } else {
      setErrorMessage('Contraseña incorrecta')
    }
  }

  return (
    <div className='flex flex-col gap-5 justify-center items-center'>
      <div className='flex flex-col gap-1 relative'>
        <Input
          placeholder='Password'
          type={showPassword ? 'text' : 'password'}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          value={password}
          className='w-80 h-12 text-xl'
        />
        <span className='text-red-500 text-sm'>{errorMessage}</span>
        <Button variant='link' onClick={() => setShowPassword(prev => !prev)} className='absolute right-0 top-2'>
          {showPassword ? <EyeIcon className='w-7 h-7' /> : <EyeOffIcon className='w-7 h-7' />}
        </Button>
      </div>
      <Button
        size='lg'
        onClick={handleLogin}
        className='text-lg font-bold'
      >
        Iniciar sesión
      </Button>
    </div>
  )
}


function getIsLogged() {
  return localStorage.getItem('isLogged') === 'true'
}