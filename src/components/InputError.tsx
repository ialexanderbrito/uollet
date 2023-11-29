import { XCircle } from '@phosphor-icons/react';

import { cn } from 'utils/cn';

interface InputErrorProps {
  error: boolean;
  message: string | undefined;
  className?: string;
}

export function InputError({ error, message, className }: InputErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <div
      className={cn('mt-[-0.5rem] flex w-full flex-col gap-4 pl-2', className)}
    >
      {error && (
        <div className="flex items-center gap-1 text-sm text-danger">
          <XCircle className="text-danger" />
          <span className="text-xs text-danger">{message}</span>
        </div>
      )}
    </div>
  );
}
