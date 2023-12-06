import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';

import { cn } from 'utils/cn';

interface ModalFilterProps {
  selectedYear: number;
  handleChangeYear: (step: number) => void;
  isInvestiment?: boolean;
}

export function ModalFilter({
  selectedYear,
  handleChangeYear,
  isInvestiment,
}: ModalFilterProps) {
  return (
    <>
      <div className="mt-2 flex flex-col items-center justify-center gap-2">
        <span className="mt-2 text-text dark:text-text-dark">
          {selectedYear === new Date().getFullYear()
            ? 'Ano atual'
            : 'Ano selecionado'}
        </span>
        <div className="flex w-52 items-center justify-between font-bold text-text dark:text-text-dark">
          <ArrowLeft
            className={cn(
              'cursor-pointer text-primary dark:text-primary-dark',
              isInvestiment &&
                'text-investments-primary dark:text-investments-primary',
            )}
            size={28}
            onClick={() => handleChangeYear?.(-1)}
          />
          {selectedYear}
          <ArrowRight
            className={cn(
              'cursor-pointer text-primary dark:text-primary-dark',
              isInvestiment &&
                'text-investments-primary dark:text-investments-primary',
            )}
            size={28}
            onClick={() => handleChangeYear?.(+1)}
          />
        </div>
      </div>
    </>
  );
}
