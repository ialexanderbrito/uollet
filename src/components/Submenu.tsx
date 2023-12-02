import { Switch } from '@headlessui/react';
import { CaretRight } from '@phosphor-icons/react';

import { useTheme } from 'contexts/Theme';

interface SubmenuProps {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
  arrow?: boolean;
  divider?: boolean;
  switchTheme?: boolean;
  beta?: boolean;
}

export function Submenu({
  icon,
  title,
  onClick,
  arrow,
  divider,
  switchTheme,
  beta,
}: SubmenuProps) {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <div
        className="flex w-full cursor-pointer flex-row items-center justify-center gap-2"
        onClick={onClick}
      >
        <div className="text-md flex w-full flex-row items-center justify-start gap-2">
          {icon}
          {title}

          {beta && (
            <p className="rounded-md bg-primary px-1 py-0.5 text-xs text-white dark:bg-primary-dark">
              beta
            </p>
          )}
        </div>
        <div>
          {arrow && (
            <CaretRight
              size={20}
              weight="light"
              className="text-primary dark:text-white"
            />
          )}
        </div>
        <div>
          {switchTheme && (
            <Switch
              checked={theme === 'dark'}
              onChange={() => toggleTheme()}
              className={`${
                theme === 'dark' ? 'bg-primary' : 'bg-primary-dark'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white`}
              />
            </Switch>
          )}
        </div>
      </div>
      {divider && (
        <div className="h-[0.5px] w-full bg-text/30 dark:bg-text-dark/30" />
      )}
    </>
  );
}
