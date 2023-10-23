import { Fragment, useState } from 'react';

import { Combobox, Transition } from '@headlessui/react';
import { CaretUpDown, Check } from '@phosphor-icons/react';

interface AutocompleteProps {
  selected: {
    name: string;
    icon: string;
  };
  setSelected: (value: any) => void;
  options: {
    name: string;
    icon?: string;
    code?: string;
  }[];
  className?: string;
  placeholder?: string;
}

interface Option {
  name: string;
}

export function Autocomplete({
  selected,
  setSelected,
  options,
  className,
  placeholder = 'Digite uma categoria: Ex: Bradesco',
}: AutocompleteProps) {
  const [query, setQuery] = useState('');

  const filteredPeople =
    query === ''
      ? options
      : options.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        );

  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <div
          className={`focus-visible:ring-offset-orange-30 relative h-14 w-full cursor-default  rounded-lg bg-backgroundCard p-4 py-2 pl-3 pr-10 text-left text-title outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 dark:bg-backgroundCardDark dark:text-titleDark sm:text-sm ${className}`}
        >
          <Combobox.Input
            className="w-full border-none bg-backgroundCard py-2 pl-3 pr-10 text-sm leading-5 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundCardDark dark:text-titleDark focus:dark:ring-primaryDark"
            displayValue={(value: Option) => value.name}
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
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-backgroundCard py-1 text-base text-title shadow-lg ring-1 ring-black ring-opacity-5 scrollbar scrollbar-thin scrollbar-track-backgroundCard scrollbar-thumb-secondary focus:outline-none dark:bg-backgroundCardDark dark:text-titleDark dark:scrollbar-track-backgroundDark sm:text-sm">
            {filteredPeople.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none px-4 py-2 text-title dark:text-titleDark">
                Nenhum resultado encontrado
              </div>
            ) : (
              filteredPeople.map((person) => (
                <Combobox.Option
                  key={person.name}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active
                        ? 'bg-secondary text-title dark:bg-secondaryDark dark:text-titleDark'
                        : 'text-text dark:text-titleDark'
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate text-title dark:text-titleDark ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
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
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
