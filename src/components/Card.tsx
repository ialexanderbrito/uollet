interface CardProps {
  title: string;
  icon: string;
  value: string;
  lastEntry: string;
  bgColor?: string;
  textColor?: string;
  alternativeTextColor?: string;
  visible?: boolean;
}

export function Card({
  title,
  icon,
  value,
  lastEntry,
  bgColor = 'backgroundCard',
  textColor = 'title',
  alternativeTextColor = 'text',
  visible = true,
}: CardProps) {
  return (
    <div
      className={`flex bg-${bgColor} relative h-48 min-w-[300px] snap-center flex-col rounded-md md:w-full dark:bg-${bgColor}`}
    >
      <div className="flex h-full w-full flex-row items-start justify-between p-4">
        <p
          className={`text-${textColor} mt-2 text-sm font-normal dark:text-${textColor}`}
        >
          {title}
        </p>
        <img src={icon} alt={title} />
      </div>
      <div className="flex h-full w-full flex-col items-start justify-between p-4">
        <b
          className={`text-${textColor} text-3xl font-medium dark:text-${textColor} ${
            visible && 'select-none blur-md'
          }`}
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
