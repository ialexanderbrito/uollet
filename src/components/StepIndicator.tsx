import { ReactNode } from 'react';

import cn from 'classnames';

interface Step {
  icon: ReactNode;
  label: string;
}

interface StepIndicatorProps {
  stepsData: Step[];
  setSteps: (step: number) => void;
  completedSteps: number[];
  activeStep: number;
}

export function StepIndicator({
  stepsData,
  setSteps,
  completedSteps,
  activeStep,
}: StepIndicatorProps) {
  return (
    <div className="mb-4 mt-2">
      <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-background-card after:dark:bg-background-card-dark">
        <ol className="relative z-10 flex justify-between text-sm font-medium text-gray-500">
          {stepsData.map((step, index) => (
            <li
              key={index}
              className={cn(
                'flex cursor-pointer items-center gap-1 rounded-full bg-background-card p-2 dark:bg-background-card-dark',
                completedSteps.includes(index + 1)
                  ? 'bg-investments-primary text-white dark:bg-primary-dark'
                  : 'text-gray-500',
                index + 1 === activeStep &&
                  'bg-primary text-white dark:bg-primary-dark',
              )}
              onClick={() =>
                completedSteps.includes(index + 1) && setSteps(index + 1)
              }
            >
              <span
                className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-full bg-background text-center font-bold',
                  completedSteps.includes(index + 1)
                    ? 'bg-investments-primary text-white dark:bg-primary-dark'
                    : 'text-gray-500',
                  index + 1 === activeStep &&
                    'bg-primary text-white dark:bg-primary-dark',
                )}
              >
                {step.icon}
              </span>
              <span
                className={cn(
                  'hidden text-title dark:text-title-dark sm:block',
                  completedSteps.includes(index + 1) &&
                    'text-white dark:text-white',
                  index + 1 === activeStep && 'text-white dark:text-white',
                )}
              >
                {step.label}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
