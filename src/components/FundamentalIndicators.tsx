import { cn } from 'utils';

interface FundamentalIndicatorsProps {
  fields: {
    label: string;
    value: string | number | undefined;
  }[];
  fiis?: boolean;
  className?: string;
}

export function FundamentalIndicators({
  fields,
  fiis = false,
  className,
}: FundamentalIndicatorsProps) {
  return (
    <div className={cn('mt-4 grid grid-cols-2 gap-2', className)}>
      {fields?.map((field, index) => (
        <div
          className={cn(
            'flex flex-col items-center justify-center rounded-md bg-backgroundCard p-2 text-center shadow-sm dark:bg-backgroundCardDark',
            fields.length % 2 && index === fields.length - 1 && 'col-span-2',
            fiis && index === fields.length - 1 && 'col-span-2',
          )}
          key={field.label}
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs opacity-80">{field.label}</span>
            <span className="text-sm">{field.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
