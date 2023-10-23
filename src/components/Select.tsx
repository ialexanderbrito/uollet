import { Fragment } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { CaretUpDown, Check } from '@phosphor-icons/react';

import { cn } from 'utils/cn';

interface DaysProps {
  id: number;
  name: string;
}

interface SelectProps {
  className?: string;
  placeholder?: string;
  options: DaysProps[] | any[];
  selected: DaysProps | any;
  setSelected: (value: DaysProps | any) => void;
}

export function Select({
  className,
  placeholder = 'Selecione um dia',
  options,
  selected,
  setSelected,
}: SelectProps) {
  return (
    <Listbox value={selected.name} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button
          className={cn(
            'focus-visible:ring-offset-orange-30 relative h-14 w-full cursor-default rounded-lg bg-backgroundCard p-4 py-2 pl-3 pr-7 text-left text-title outline-none focus:ring-2 focus:ring-primary focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 dark:bg-backgroundCardDark dark:text-titleDark dark:focus:ring-primaryDark sm:text-sm',
            className,
          )}
        >
          {placeholder && selected.name === '' ? (
            <>
              <span className="block truncate text-text">{placeholder}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <CaretUpDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </>
          ) : (
            <>
              <span className="block truncate text-title">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <CaretUpDown
                  className="h-5 w-5 text-title"
                  aria-hidden="true"
                />
              </span>
            </>
          )}
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-backgroundCard py-1 text-base text-title shadow-lg ring-1 ring-black ring-opacity-5 scrollbar scrollbar-thin scrollbar-track-backgroundCard scrollbar-thumb-secondary focus:outline-none dark:bg-backgroundCardDark dark:text-titleDark dark:scrollbar-track-backgroundDark sm:text-sm">
            <Listbox.Option
              key={0}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  active
                    ? 'bg-secondary text-title dark:bg-secondaryDark dark:text-titleDark'
                    : 'text-text dark:text-titleDark'
                }`
              }
              value=""
              disabled
            >
              {placeholder}
            </Listbox.Option>

            {options.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  cn(
                    'relative cursor-default select-none py-2 pl-10 pr-4',
                    active
                      ? 'bg-secondary text-title dark:bg-secondaryDark dark:text-titleDark'
                      : 'text-title dark:text-titleDark',
                  )
                }
                value={person}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={cn(
                        'block truncate text-title dark:text-titleDark',
                        selected ? 'font-medium' : 'font-normal',
                      )}
                    >
                      {person.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
