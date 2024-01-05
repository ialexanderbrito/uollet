import { useState } from 'react';

import { X } from '@phosphor-icons/react';

import { cn } from 'utils/cn';

interface AlertProps {
  title: string;
  description: string;
  className?: string;
  variant: 'error' | 'success' | 'warning' | 'info' | 'default';
  alertName: string;
  onClick?: () => void;
  disabledOnClick?: boolean;
}

export function Alert({
  title,
  description,
  className,
  variant,
  alertName,
  onClick,
  disabledOnClick,
}: AlertProps) {
  const [visible, setVisible] = useState(true);

  function disableAlert() {
    setVisible(false);
    localStorage.setItem(`@uollet:alert${alertName}`, JSON.stringify(false));
  }

  if (localStorage.getItem(`@uollet:alert${alertName}`)) {
    const alert = JSON.parse(localStorage.getItem('@uollet:alert')!);

    if (!alert) {
      return null;
    }
  }

  return (
    <>
      {visible && (
        <div
          className={cn(
            'relative w-full rounded border px-4 py-3 ',
            variant === 'error' && 'border-red-400 text-red-700',
            variant === 'success' && 'border-green-400 text-green-700',
            variant === 'warning' && 'border-yellow-400 text-yellow-700',
            variant === 'info' && 'border-blue-400 text-blue-700',
            variant === 'default' && 'border-gray-400 text-gray-700',
            className,
          )}
          role="alert"
        >
          <strong className="font-bold">{title}</strong>
          <span className="block sm:ml-2 sm:inline">{description}</span>
          <span className="absolute bottom-0 right-0 top-0 px-4 py-3">
            {disabledOnClick ? null : (
              <X
                className={cn(
                  'h-6 w-6 cursor-pointer fill-current',
                  variant === 'error' && 'text-red-500',
                  variant === 'success' && 'text-green-500',
                  variant === 'warning' && 'text-yellow-500',
                  variant === 'info' && 'text-blue-500',
                  variant === 'default' && 'text-gray-500',
                )}
                onClick={() => {
                  if (onClick) {
                    onClick();
                  } else {
                    disableAlert();
                  }
                }}
              />
            )}
          </span>
        </div>
      )}
    </>
  );
}
