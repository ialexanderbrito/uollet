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
        <span className="mt-2 text-text dark:text-textDark">
          {selectedYear === new Date().getFullYear()
            ? 'Ano atual'
            : 'Ano selecionado'}
        </span>
        <div className="flex w-52 items-center justify-between font-bold text-text dark:text-textDark">
          <ArrowLeft
            className={cn(
              'cursor-pointer text-secondary dark:text-secondaryDark',
              isInvestiment && 'text-primaryDark dark:text-primary',
            )}
            size={28}
            onClick={() => handleChangeYear?.(-1)}
          />
          {selectedYear}
          <ArrowRight
            className={cn(
              'cursor-pointer text-secondary dark:text-secondaryDark',
              isInvestiment && 'text-primaryDark dark:text-primary',
            )}
            size={28}
            onClick={() => handleChangeYear?.(+1)}
          />
        </div>
      </div>
    </>
  );
}
