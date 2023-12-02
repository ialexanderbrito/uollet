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
  root: 'text-title bg-background-card rounded-md shadow-md dark:text-text-dark dark:bg-background-card-dark dark:text-dark',
  months: 'flex gap-4 relative px-4',
  caption_label: 'text-xl px-1',
  nav_button:
    'inline-flex justify-center items-center absolute top-0 w-10 h-10 rounded-full text-text hover:bg-primary dark:text-text-dark dark:hover:bg-primary-dark',
  nav_button_next: 'right-0',
  nav_button_previous: 'left-0',
  table: 'border-collapse border-spacing-0',
  head_cell: 'w-10 h-10 uppercase align-middle text-center',
  cell: 'w-10 h-10 align-middle text-center border-0 px-0',
  day: 'rounded-full w-10 h-10 transition-colors hover:bg-primary focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-50 active:bg-primary active:text-white dark:hover:bg-primary-dark dark:focus-visible:ring-primary-dark dark:active:bg-primary-dark',
  day_selected:
    'text-white bg-primary hover:bg-primary dark:bg-primary-dark dark:hover:bg-primary-dark dark:text-text-dark',
  day_today: 'font-bold',
  day_disabled:
    'opacity-25 hover:bg-white active:bg-white active:text-gray-800',
  day_outside: 'enabled:opacity-50',
  day_range_middle: 'rounded-none',
  day_range_end: 'rounded-l-none rounded-r-full',
  day_range_start: 'rounded-r-none rounded-l-full',
  day_hidden: 'hidden',
};
