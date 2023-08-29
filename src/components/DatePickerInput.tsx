import { Fragment } from 'react';

import { Popover, Transition } from '@headlessui/react';
import { Calendar } from '@phosphor-icons/react';
import { ptBR } from 'date-fns/locale';

import { cn } from 'utils/cn';
import { DayPicker } from 'utils/day-picker';

interface DatePickerInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean | string;
  className?: string;
}

export function DatePickerInput({
  value,
  onChange,
  error,
  className,
}: DatePickerInputProps) {
  function addOneDayInValue(value: string) {
    const date = new Date(value);

    date.setDate(date.getDate());

    return date.toISOString();
  }

  return (
    <div>
      <Popover className="relative">
        <Popover.Button
          className={cn(
            'flex h-14 w-full justify-between rounded-lg bg-white p-4 text-left text-title outline-none dark:bg-backgroundCardDark dark:text-titleDark',
            error && 'border-[1.5px] border-red-500',
            className,
          )}
        >
          <span className="text-sm">
            {value
              ? addOneDayInValue(value)
                  .split('T')[0]
                  .split('-')
                  .reverse()
                  .join('/')
              : new Date().toLocaleDateString('pt-BR')}
          </span>

          <Calendar className="h-6 w-6" />
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="w-80 ">
            <div>
              <DayPicker
                mode="single"
                onDayClick={(day) => {
                  onChange(day.toISOString());
                }}
                selected={value ? new Date(value) : new Date()}
                locale={ptBR}
                className="flex h-80 w-80 items-center justify-center"
              />
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}
