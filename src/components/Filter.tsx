import { CaretLeft, CaretRight } from '@phosphor-icons/react';

interface FilterProps {
  handlePreviousMonth: () => void;
  handleNextMonth: () => void;
  newMonthLong: string;
  actualYear: number;
  textSize?: string;
}

export function Filter({
  handlePreviousMonth,
  handleNextMonth,
  newMonthLong,
  actualYear,
  textSize,
}: FilterProps) {
  return (
    <div className="flex w-full flex-row items-center justify-between gap-2 p-4 text-title dark:text-titleDark">
      <CaretLeft
        size={28}
        weight="light"
        onClick={() => {
          handlePreviousMonth();
        }}
      />

      <p className={`${textSize} font-medium`}>
        {newMonthLong} de {actualYear}
      </p>

      <CaretRight
        size={28}
        weight="light"
        onClick={() => {
          handleNextMonth();
        }}
      />
    </div>
  );
}
