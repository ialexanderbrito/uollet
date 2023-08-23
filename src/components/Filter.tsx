import { Funnel } from '@phosphor-icons/react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { MONTHS } from 'utils/month';

import { SliderNavigation } from './SliderNavigation';
import { SliderOption } from './SliderOption';

interface FilterProps {
  handleChangeFilterMonth: (month: number) => void;
  actualMonth: number;
  disabledFunnel?: boolean;
  handleOpenModalFilter?: () => void;
}

export function Filter({
  handleChangeFilterMonth,
  actualMonth,
  disabledFunnel = true,
  handleOpenModalFilter,
}: FilterProps) {
  return (
    <>
      <div className="flex w-full items-center justify-center">
        <Swiper
          spaceBetween={8}
          slidesPerView={3}
          centeredSlides
          initialSlide={actualMonth - 1}
          onSlideChange={(swiper) => {
            handleChangeFilterMonth(swiper.realIndex + 1);
          }}
        >
          <SliderNavigation />

          {MONTHS.map((month, monthIndex) => (
            <SwiperSlide key={month}>
              {({ isActive }) => (
                <SliderOption
                  isActive={isActive}
                  month={month}
                  index={monthIndex}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {disabledFunnel && (
          <div className="flex flex-1 justify-end">
            <Funnel
              className="ml-8 cursor-pointer text-secondary dark:text-secondaryDark"
              size={26}
              onClick={handleOpenModalFilter}
            />
          </div>
        )}
      </div>
    </>
  );
}
