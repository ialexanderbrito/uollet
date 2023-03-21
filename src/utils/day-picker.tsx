import * as React from 'react';
import {
  DayPicker as OriDayPicker,
  DayPickerDefaultProps,
} from 'react-day-picker';

export const DayPicker = (
  props: React.ComponentPropsWithoutRef<typeof OriDayPicker>,
) => <OriDayPicker classNames={classNames} {...props} />;

const classNames: DayPickerDefaultProps['classNames'] = {
  vhidden: 'sr-only',
  caption: 'flex justify-center items-center h-10',
  root: 'text-title bg-backgroundCard rounded-md shadow-md dark:text-textDark dark:bg-backgroundCardDark dark:textDark',
  months: 'flex gap-4 relative px-4',
  caption_label: 'text-xl px-1',
  nav_button:
    'inline-flex justify-center items-center absolute top-0 w-10 h-10 rounded-full text-text hover:bg-secondary dark:text-textDark dark:hover:bg-secondaryDark',
  nav_button_next: 'right-0',
  nav_button_previous: 'left-0',
  table: 'border-collapse border-spacing-0',
  head_cell: 'w-10 h-10 uppercase align-middle text-center',
  cell: 'w-10 h-10 align-middle text-center border-0 px-0',
  day: 'rounded-full w-10 h-10 transition-colors hover:bg-secondary focus:outline-none focus-visible:ring focus-visible:ring-secondary focus-visible:ring-opacity-50 active:bg-secondary active:text-white dark:hover:bg-secondaryDark dark:focus-visible:ring-secondaryDark dark:active:bg-secondaryDark',
  day_selected:
    'text-title bg-secondary hover:bg-secondary dark:bg-secondaryDark dark:hover:bg-secondaryDark dark:text-textDark',
  day_today: 'font-bold',
  day_disabled:
    'opacity-25 hover:bg-white active:bg-white active:text-gray-800',
  day_outside: 'enabled:opacity-50',
  day_range_middle: 'rounded-none',
  day_range_end: 'rounded-l-none rounded-r-full',
  day_range_start: 'rounded-r-none rounded-l-full',
  day_hidden: 'hidden',
};
