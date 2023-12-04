import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Combobox, Transition } from '@headlessui/react';
import { CaretUpDown, Check } from '@phosphor-icons/react';

import { cn } from 'utils';

interface AutocompleteProps<T> {
  selected: T;
  setSelected: (value: T) => void;
  options: T[];
  className?: string;
  placeholder?: string;
  isNavigate?: boolean;
  displayValue: (value: T) => string;
}

export function Autocomplete<T>({
  selected,
  setSelected,
  options,
  className,
  placeholder = 'Digite sua conta: Ex: Bradesco',
  isNavigate = false,
  displayValue,
}: AutocompleteProps<T>) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const filteredOptions =
    query === ''
      ? options
      : options.filter((item) =>
          displayValue(item)
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        );

  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <div
          className={`focus-visible:ring-offset-orange-30 relative h-14 w-full cursor-default  rounded-lg bg-background-card p-4 py-2 pl-3 pr-10 text-left text-title outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 dark:bg-background-card-dark dark:text-title-dark sm:text-sm ${className}`}
        >
          <Combobox.Input
            className="w-full border-none bg-background-card py-2 pl-3 pr-10 text-sm leading-5 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark"
            displayValue={(value: T) => displayValue(value)}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <CaretUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-background-card py-1 text-base text-title shadow-lg ring-1 ring-black ring-opacity-5  scrollbar-thin scrollbar-track-background-card scrollbar-thumb-primary focus:outline-none dark:bg-background-card-dark dark:text-title-dark dark:scrollbar-track-background-dark sm:text-sm">
            {filteredOptions.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none px-4 py-2 text-title dark:text-title-dark">
                Nenhum resultado encontrado
              </div>
            ) : (
              filteredOptions.map((item) => (
                <Combobox.Option
                  key={displayValue(item)}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active
                        ? 'bg-primary text-title dark:bg-primary-dark dark:text-title-dark'
                        : 'text-text dark:text-title-dark'
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={cn(
                          'block truncate text-title hover:text-white focus:text-white dark:text-title-dark',
                          selected ? 'font-medium' : 'font-normal',
                        )}
                        onClick={() => {
                          isNavigate &&
                            navigate(`/stock/${displayValue(item)}`);
                        }}
                      >
                        {displayValue(item)}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary dark:text-title-dark">
                          <Check className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
