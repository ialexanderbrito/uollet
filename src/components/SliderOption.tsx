import { useSwiper } from 'swiper/react';

interface SliderOptionProps {
  isActive: boolean;
  month: string;
  index: number;
}

export function SliderOption({ isActive, month, index }: SliderOptionProps) {
  const swiper = useSwiper();

  return (
    <button
      className={`h-12 w-full rounded-full text-sm font-medium tracking-[-0.5px] transition-colors ${
        isActive
          ? 'bg-primary text-white dark:bg-primaryDark'
          : 'bg-backgroundCard text-gray-800 dark:bg-backgroundCardDark dark:text-textDark'
      }`}
      onClick={() => {
        swiper.slideTo(index);
      }}
    >
      {month}
    </button>
  );
}
