import { Fragment } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { CaretUpDown, Check } from '@phosphor-icons/react';

interface SelectProps {
  selected: {
    name: string;
    icon: string;
  };
  setSelected: (value: any) => void;
  options: {
    name: string;
    icon: string;
  }[];
  className?: string;
}

export function Select({
  selected,
  setSelected,
  options,
  className,
}: SelectProps) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button
          className={`focus-visible:ring-offset-orange-30 relative h-14 w-full cursor-default  rounded-lg bg-backgroundCard p-4 py-2 pl-3 pr-10 text-left text-title outline-none focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 dark:bg-backgroundCardDark dark:text-titleDark sm:text-sm ${className}`}
        >
          {selected.name === '' ? (
            <>
              <span className="block truncate">Selecione uma categoria</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <CaretUpDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </>
          ) : (
            <>
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <CaretUpDown
                  className="h-5 w-5 text-gray-400"
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
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-backgroundCard py-1 text-base text-title shadow-lg ring-1 ring-black ring-opacity-5 scrollbar scrollbar-thin scrollbar-track-backgroundCard scrollbar-thumb-secondary focus:outline-none dark:bg-backgroundCardDark dark:text-titleDark dark:scrollbar-track-backgroundDark sm:text-sm">
            {options.map((category, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active
                      ? 'bg-secondary text-title dark:bg-secondaryDark dark:text-titleDark'
                      : 'text-text dark:text-titleDark'
                  }`
                }
                value={category}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate text-title dark:text-titleDark ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {category.name}
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
