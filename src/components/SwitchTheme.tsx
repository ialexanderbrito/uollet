import { Moon, Sun } from '@phosphor-icons/react';

import { cn } from 'utils';

import { useTheme } from 'contexts/Theme';

export function SwitchTheme() {
  const { theme, handleChangeColorMode } = useTheme();
  return (
    <>
      <button
        className="group flex w-full items-center px-2 py-2 text-sm"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex w-full flex-row justify-between rounded-md border border-text dark:border-title">
          <button
            className={cn(
              'flex h-full w-full cursor-pointer items-center justify-center rounded-md border-0 border-transparent bg-transparent p-1 font-normal active:outline-none',
              theme === 'dark'
                ? 'bg-primary/90 text-white'
                : 'bg-transparent text-primary',
            )}
            onClick={() => {
              handleChangeColorMode('dark');
            }}
          >
            <Moon size={20} weight="light" />
          </button>

          <button
            className={cn(
              'h-full w-full cursor-pointer rounded-md border-0 border-transparent bg-transparent p-1 font-normal',
              theme === 'auto'
                ? 'bg-primary text-white'
                : 'bg-transparent text-primary',
            )}
            onClick={() => {
              handleChangeColorMode('auto');
            }}
          >
            Auto
          </button>

          <button
            className={cn(
              'flex h-full w-full cursor-pointer items-center justify-center rounded-md border-0 border-transparent bg-transparent p-1 font-normal active:outline-none',
              theme === 'light'
                ? 'bg-primary/90 text-white'
                : 'bg-transparent text-primary',
            )}
            onClick={() => {
              handleChangeColorMode('light');
            }}
          >
            <Sun size={20} weight="light" />
          </button>
        </div>
      </button>
    </>
  );
}
