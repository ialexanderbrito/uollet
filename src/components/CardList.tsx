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
      className={`flex flex-col p-4 justify-center gap-4 w-full h-32 rounded-md bg-backgroundCard ${className} dark:bg-backgroundCardDark`}
    >
      <div className="flex flex-row justify-between">
        <span className="text-title font-normal text-sm dark:text-titleDark">
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
        } font-normal text-xl`}
      >
        {formatCurrency(value)}
      </span>
      <div className="flex flex-row justify-between">
        <span className="text-text font-normal text-sm flex gap-2">
          <img
            src={verifyIcon(category)}
            alt={category}
            className="w-5 h-5 fill-text"
          />
          {category}
        </span>
        <span className="text-text font-normal text-sm gap-2">
          {format(new Date(newDate), 'dd/MM/yyyy')}
        </span>
      </div>
    </li>
  );
}
