import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, ...rest }: InputProps) {
  return (
    <div className="flex w-full flex-col">
      <label
        htmlFor={label}
        className="mb-1 ml-1 text-sm text-title dark:text-title-dark"
      >
        {label}
      </label>
      <input
        type="text"
        className="h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary disabled:opacity-40 dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark"
        placeholder={label}
        {...rest}
      />
    </div>
  );
}
