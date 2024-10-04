import { StepNavigation } from "@/components/admin/wizard/components/step-navigation";
import { PreparationStep } from "@/components/admin/wizard/sections/preparation-section";
import { ReadyStep } from "@/components/admin/wizard/sections/ready-section";
import { UsersConnectionProvider } from "@/lib/contexts/users-connection-context";
import { useState } from "react";

export const STEPS = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
};

export function ChallengeWizard(): JSX.Element {
  const [step, setStep] = useState(STEPS.ONE);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <UsersConnectionProvider>
      <section className="flex-grow flex flex-col justify-between gap-14 max-w-screen-2xl mx-auto px-4">
        <CurrentStep step={step} />
        <StepNavigation
          step={step}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
        />
      </section>
    </UsersConnectionProvider>
  );
}

function CurrentStep({ step }: { step: number }) {
  switch (step) {
    case STEPS.ONE:
      return <PreparationStep />;
    case STEPS.TWO:
      return <ReadyStep />;
    // case STEPS.THREE:
    //     return <StepThree />
    default:
      return <PreparationStep />;
  }
}
