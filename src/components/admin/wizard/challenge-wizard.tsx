import { StepNavigation } from "@/components/admin/wizard/components/step-navigation";
import { PreparationStep } from "@/components/admin/wizard/sections/preparation-section";
import { ReadyStep } from "@/components/admin/wizard/sections/ready-section";
import {
  UsersConnectionProvider,
  useUsersConnection,
} from "@/lib/contexts/users-connection-context";
import type { User } from "@/lib/types/User";
import { useState } from "react";

export const STEPS = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
};

export function ChallengeWizard(): JSX.Element {
  return (
    <UsersConnectionProvider>
      <Wizard />
    </UsersConnectionProvider>
  );
}

function Wizard() {
  const [step, setStep] = useState(STEPS.ONE);
  const { users } = useUsersConnection();

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <section className="flex-grow flex flex-col justify-between gap-14 max-w-screen-2xl mx-auto px-4">
      <CurrentStep step={step} />
      <StepNavigation
        step={step}
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePreviousStep}
        disableFinish={!users.every((user: User) => user.ready)}
      />
    </section>
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
