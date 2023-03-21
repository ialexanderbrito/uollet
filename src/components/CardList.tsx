import { TrashSimple } from '@phosphor-icons/react';
import { format } from 'date-fns';

import { category as categoryList } from 'utils/category';
import { formatCurrency } from 'utils/formatCurrency';

interface CardListProps {
  title: string;
  value: number;
  category: string;
  date: string;
  className?: string;
  income?: boolean;
  onClick?: () => void;
}

export function CardList({
  title,
  value,
  category,
  date,
  className,
  income,
  onClick,
}: CardListProps) {
  function verifyIcon(category: string) {
    const icon = categoryList.find((item) => item.name === category);
    return icon?.icon;
  }

  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);

  return (
    <li
      className={`flex h-32 w-full flex-col justify-center gap-4 rounded-md bg-backgroundCard p-4 ${className} dark:bg-backgroundCardDark`}
    >
      <div className="flex flex-row justify-between">
        <span className="text-sm font-normal text-title dark:text-titleDark">
          {title}
        </span>
        <TrashSimple
          size={18}
          weight="light"
          color="#e83f5b"
          onClick={onClick}
          className="cursor-pointer"
        />
      </div>
      <span
        className={`${
          income ? 'text-success' : 'text-danger'
        } text-xl font-normal`}
      >
        {formatCurrency(value)}
      </span>
      <div className="flex flex-row justify-between">
        <span className="flex gap-2 text-sm font-normal text-text">
          <img
            src={verifyIcon(category)}
            alt={category}
            className="h-5 w-5 fill-text"
          />
          {category}
        </span>
        <span className="gap-2 text-sm font-normal text-text">
          {format(new Date(newDate), 'dd/MM/yyyy')}
        </span>
      </div>
    </li>
  );
}
