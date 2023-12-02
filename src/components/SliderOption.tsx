import { useSwiper } from 'swiper/react';

import { cn } from 'utils/cn';

interface SliderOptionProps {
  isActive: boolean;
  month: string;
  index: number;
  isInvestiment?: boolean;
}

export function SliderOption({
  isActive,
  month,
  index,
  isInvestiment,
}: SliderOptionProps) {
  const swiper = useSwiper();

  return (
    <button
      className={cn(
        'h-12 w-full rounded-full text-sm font-medium tracking-[-0.5px] transition-colors',
        isActive
          ? 'bg-primary text-white dark:bg-primary-dark'
          : 'bg-background-card text-gray-800 dark:bg-background-card-dark dark:text-text-dark',
        isInvestiment &&
          isActive &&
          'bg-investments-primary dark:bg-investments-primary',
      )}
      onClick={() => {
        swiper.slideTo(index);
      }}
    >
      {month}
    </button>
  );
}
