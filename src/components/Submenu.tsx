import { CaretRight } from '@phosphor-icons/react';

import { SwitchTheme } from 'components/SwitchTheme';

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
  return (
    <>
      <div
        className="flex h-24 w-full cursor-pointer flex-row items-center justify-center gap-2 rounded-lg border border-gray-200 bg-background-card transition hover:bg-background-card/95 dark:border-gray-700 dark:bg-background-card-dark"
        onClick={onClick}
      >
        <div className="text-md ml-4 flex w-full flex-row items-center justify-start gap-2">
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
              className="mr-4 text-primary dark:text-white"
            />
          )}
        </div>
        {switchTheme && (
          <div className="flex w-52">
            <SwitchTheme />
          </div>
        )}
      </div>
      {divider && (
        <div className="h-[0.5px] w-full bg-text/30 dark:bg-text-dark/30" />
      )}
    </>
  );
}
