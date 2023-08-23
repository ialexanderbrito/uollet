import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { useSwiper } from 'swiper/react';

export function SliderNavigation() {
  const swiper = useSwiper();

  return (
    <>
      <button
        type="button"
        className="absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-r from-gray-100 to-transparent dark:from-backgroundCardDark dark:to-transparent"
        onClick={() => {
          swiper.slidePrev();
        }}
      >
        <CaretLeft
          size={24}
          className="text-title dark:text-titleDark"
          weight="light"
        />
      </button>

      <button
        type="button"
        className="absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-l from-gray-100 to-transparent dark:from-backgroundCardDark dark:to-transparent"
        onClick={() => {
          swiper.slideNext();
        }}
      >
        <CaretRight
          size={24}
          className="text-title dark:text-titleDark"
          weight="light"
        />
      </button>
    </>
  );
}
