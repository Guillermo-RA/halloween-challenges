import { STEPS } from '@/components/admin/wizard/challenge-wizard'
import { Button, type ButtonProps } from '@/components/ui/button'
import { STARTING_GAME } from '@/lib/constants/api-routes'
import type { StepNavigationProps } from '@/lib/types/StepNavigation'
import { fetcher } from '@/lib/utils/fetch'
import { navigate } from 'astro:transitions/client'

export function StepNavigation({
  step,
  handleNextStep,
  handlePreviousStep,
  disableFinish,
  disableNext
}: StepNavigationProps): JSX.Element {

  const handleFinish = () => {
    fetcher(STARTING_GAME, {}, { method: 'POST' }).then(() => {
      localStorage.setItem('game_starting', 'true')
      navigate('/admin/game')
    })
  }

  return (
    <div className='flex gap-3 self-center'>
      {step > STEPS.ONE && <PreviousStepButton onClick={handlePreviousStep} />}
      {step < STEPS.TWO && (
        <NextStepButton onClick={handleNextStep} disabled={disableNext} />
      )}
      {step === STEPS.TWO && (
        <FinishButton
          onClick={handleFinish}
          disabled={disableFinish || disableNext}
        />
      )}
    </div>
  )
}

function PreviousStepButton({ onClick }: ButtonProps): JSX.Element {
  return (
    <StepButton onClick={onClick} variant='secondary'>
      Volver
    </StepButton>
  )
}

function NextStepButton({ onClick, disabled }: ButtonProps): JSX.Element {
  return (
    <StepButton onClick={onClick} disabled={disabled}>
      Siguiente
    </StepButton>
  )
}

function FinishButton({ onClick, disabled }: ButtonProps): JSX.Element {
  return (
    <StepButton onClick={onClick} disabled={disabled}>
      Comenzar
    </StepButton>
  )
}

function StepButton({
  onClick,
  variant,
  children,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <Button
      size='lg'
      variant={variant}
      className='text-lg font-bold w-40 select-none'
      onClick={onClick}
      draggable={false}
      {...props}
    >
      {children}
    </Button>
  )
}
