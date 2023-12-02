import { TrashSimple, Pencil, Copy } from '@phosphor-icons/react';
import creditCard from 'assets/categories/credit-card.svg';
import { format } from 'date-fns';

import { category as categoryList } from 'utils/category';
import { cn } from 'utils/cn';
import { formatCurrency } from 'utils/formatCurrency';

interface CardListProps {
  title: string;
  value: number;
  category: string;
  date: string;
  className?: string;
  income?: boolean;
  onClick?: () => void;
  onEdit?: () => void;
  onDuplicate?: () => void;
  visible?: boolean;
  isInvestiment?: boolean;
}

export function CardList({
  title,
  value,
  category,
  date,
  className,
  income,
  onClick,
  onEdit,
  onDuplicate,
  visible,
  isInvestiment,
}: CardListProps) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);

  function verifyIcon(category: string) {
    const icon = categoryList.find((item) => item.name === category);

    if (!icon) {
      return creditCard;
    }

    return icon?.icon;
  }

  return (
    <li
      className={cn(
        'flex h-32 w-full flex-col justify-center gap-4 rounded-md bg-background-card p-4 dark:bg-background-card-dark',
        className,
      )}
    >
      <div className="flex flex-row justify-between">
        <span className="text-sm font-normal text-title dark:text-title-dark">
          {title}
        </span>
        <div className="flex flex-row gap-2">
          {onDuplicate && (
            <Copy
              size={18}
              weight="light"
              onClick={onDuplicate}
              className={cn(
                'cursor-pointer text-primary dark:text-white',
                isInvestiment && 'text-primary-dark dark:text-primary',
              )}
            />
          )}

          <Pencil
            size={18}
            weight="light"
            onClick={onEdit}
            className={cn(
              'cursor-pointer text-primary dark:text-white',
              isInvestiment && 'text-primary-dark dark:text-primary',
            )}
          />

          <TrashSimple
            size={18}
            weight="light"
            onClick={onClick}
            className="cursor-pointer text-danger"
          />
        </div>
      </div>
      <span
        className={cn(
          'text-xl font-normal',
          income ? 'text-success' : 'text-danger',
          visible && 'select-none blur-md',
        )}
      >
        {formatCurrency(value)}
      </span>
      <div className="flex flex-row justify-between">
        <span className="flex gap-2 text-sm font-normal text-text">
          <img
            src={verifyIcon(category)}
            alt={category}
            className="h-5 w-5 rounded bg-[#12a454] bg-contain fill-text"
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
