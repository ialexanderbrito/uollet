import { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from 'utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isInvestiment?: boolean;
  variant?: 'primary' | 'outline';
  inline?: boolean;
}

export function Button({
  children,
  isInvestiment,
  variant = 'primary',
  inline,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        'flex h-14 w-full items-center justify-center rounded-lg bg-primary p-4 text-center text-sm text-white disabled:cursor-not-allowed disabled:opacity-25 dark:bg-primary-dark',
        isInvestiment && 'bg-investments-primary dark:bg-investments-primary',
        variant === 'outline' &&
          'border-[1.5px] border-solid border-primary bg-transparent text-primary dark:border-primary-dark dark:text-white',
        inline && 'w-32',
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
