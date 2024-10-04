import { STEPS } from "@/components/admin/wizard/challenge-wizard";
import { Button, type ButtonProps } from "@/components/ui/button";
import type { StepNavigationProps } from "@/lib/types/StepNavigation";

export function StepNavigation({
  step,
  handleNextStep,
  handlePreviousStep,
}: StepNavigationProps): JSX.Element {
  const handleFinish = () => {
    console.log("Finish");
  };

  return (
    <div className="flex gap-3 self-center">
      {step > STEPS.ONE && <PreviousStepButton onClick={handlePreviousStep} />}
      {step < STEPS.TWO && <NextStepButton onClick={handleNextStep} />}
      {step === STEPS.TWO && <FinishButton onClick={handleFinish} />}
    </div>
  );
}

function PreviousStepButton({ onClick }: ButtonProps): JSX.Element {
  return (
    <StepButton onClick={onClick} variant="secondary">
      Volver
    </StepButton>
  );
}

function NextStepButton({ onClick }: ButtonProps): JSX.Element {
  return <StepButton onClick={onClick}>Siguiente</StepButton>;
}

function FinishButton({ onClick }: ButtonProps): JSX.Element {
  return <StepButton onClick={onClick}>Comenzar</StepButton>;
}

function StepButton({ onClick, variant, children }: ButtonProps): JSX.Element {
  return (
    <Button
      size="lg"
      variant={variant}
      className="text-lg font-bold w-40"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
