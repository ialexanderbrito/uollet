import { Fragment, useState, useEffect } from 'react';

import { Popover, Transition } from '@headlessui/react';
import { Calendar } from '@phosphor-icons/react';
import { parseISO } from 'date-fns';
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
  const [selected, setSelected] = useState<Date | undefined>(
    value ? parseISO(value) : undefined,
  );

  useEffect(() => {
    if (value) {
      setSelected(parseISO(value));
    }
  }, [value]);

  const formattedValue = selected
    ? selected.toLocaleDateString()
    : 'Selecione uma data';

  const handleDayClick = (day: Date) => {
    setSelected(day);
    onChange(day.toISOString());
  };

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
          <span className="text-sm">{formattedValue}</span>
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
          <Popover.Panel className="w-80">
            <div>
              <DayPicker
                mode="single"
                onDayClick={handleDayClick}
                selected={selected}
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
