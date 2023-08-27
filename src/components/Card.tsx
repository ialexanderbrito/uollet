import { cn } from 'utils/cn';

interface CardProps {
  title: string;
  icon: string;
  value: string;
  lastEntry: string;
  textColor?: string;
  visible?: boolean;
  className?: string;
}

export function Card({
  title,
  icon,
  value,
  lastEntry,
  visible = true,
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        'relative flex h-48 min-w-[300px] snap-center flex-col rounded-md md:w-full',
        className,
      )}
    >
      <div className="flex h-full w-full flex-row items-start justify-between p-4">
        <p className="mt-2 text-sm font-normal">{title}</p>
        <img src={icon} alt={title} />
      </div>
      <div className="flex h-full w-full flex-col items-start justify-between p-4">
        <b
          className={cn(
            'text-3xl font-medium',
            visible && 'select-none blur-md',
          )}
        >
          {value}
        </b>
        <span className="text-xs">{lastEntry}</span>
      </div>
    </div>
  );
}
