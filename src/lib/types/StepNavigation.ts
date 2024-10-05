export type StepNavigationProps = {
    step: number;
    handleNextStep: () => void;
    handlePreviousStep: () => void;
    disableFinish: boolean;
};