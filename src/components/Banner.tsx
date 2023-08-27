import { cn } from 'utils/cn';

interface BannerProps {
  img: string;
  title: string;
  onClick?: () => void;
  className?: string;
}

export function Banner({ img, title, onClick, className }: BannerProps) {
  return (
    <div
      className={cn(
        'relative flex h-56 min-w-[208px] snap-center flex-col items-center justify-center  rounded-md md:w-full',
        onClick && 'cursor-pointer',
        className,
      )}
      onClick={onClick}
    >
      <div className="mt-4 flex h-full w-full flex-row items-center justify-center">
        <img src={img} alt={title} className="h-36 w-36" />
      </div>
      <div className="flex w-full flex-col items-start justify-between p-4">
        <span className="text-background-dark dark:text-background-dark text-xs">
          {title}
        </span>
      </div>
    </div>
  );
}
