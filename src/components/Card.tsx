interface CardProps {
  title: string;
  icon: string;
  value: string;
  lastEntry: string;
  bgColor?: string;
  textColor?: string;
  alternativeTextColor?: string;
}

export function Card({
  title,
  icon,
  value,
  lastEntry,
  bgColor = 'backgroundCard',
  textColor = 'title',
  alternativeTextColor = 'text',
}: CardProps) {
  return (
    <div
      className={`flex bg-${bgColor} min-w-[300px] h-48 relative snap-center rounded-md flex-col md:w-full dark:bg-${bgColor}`}
    >
      <div className="flex flex-row items-start justify-between p-4 w-full h-full">
        <p
          className={`text-${textColor} font-normal text-sm mt-2 dark:text-${textColor}`}
        >
          {title}
        </p>
        <img src={icon} alt={title} />
      </div>
      <div className="flex flex-col items-start justify-between p-4 w-full h-full">
        <b
          className={`text-${textColor} font-medium text-3xl dark:text-${textColor}`}
        >
          {value}
        </b>
        <span
          className={`text-${alternativeTextColor} text-xs dark:text-${alternativeTextColor}`}
        >
          {lastEntry}
        </span>
      </div>
    </div>
  );
}
