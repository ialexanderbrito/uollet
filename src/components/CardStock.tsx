import { Star } from '@phosphor-icons/react';

import { cn } from 'utils/cn';
import { formatCurrency } from 'utils/formatCurrency';

interface CardStockProps {
  stock: string;
  name: string;
  close: number;
  currency?: string;
  change: number;
  logo: string;
  saveFavoriteStock: (stock: string) => void;
  verifyIsFavorite: (stock: string) => boolean;
  onClick?: () => void;
}

export function CardStock({
  stock,
  name,
  close,
  currency,
  change,
  logo,
  saveFavoriteStock,
  verifyIsFavorite,
  onClick,
}: CardStockProps) {
  const isFavorite = verifyIsFavorite(stock);
  const formattedClose = formatCurrency(close, currency);
  const changeIndicator = change > 0 ? '▲' : '▼';
  const changeColor = change > 0 ? 'text-success' : 'text-danger';

  return (
    <div
      className="flex min-w-[300px] flex-grow cursor-pointer flex-col justify-center rounded-md bg-background-card px-4 py-4 text-sm font-medium tracking-[-0.5px] transition-all dark:bg-background-card-dark"
      onClick={onClick}
    >
      <div className="flex justify-between">
        <span className="text-xl font-bold text-title dark:text-text-dark">
          {stock}
        </span>
        <img
          src={logo}
          alt={stock}
          className="h-8 w-8 rounded-lg"
          width={32}
          height={32}
          loading="lazy"
        />
      </div>
      <span className="capitalize text-title dark:text-text-dark">{name}</span>
      <div className="flex justify-between">
        <p className="text-title dark:text-text-dark">{formattedClose}</p>
        <div className="flex gap-2">
          <p className={cn(changeColor)}>
            {changeIndicator}
            {change?.toFixed(2)}%
          </p>
          <p
            className="flex w-6 cursor-pointer items-center justify-center rounded-md bg-investments-primary text-center text-white dark:text-text-dark"
            onClick={() => {
              saveFavoriteStock(stock);
            }}
          >
            {isFavorite ? <Star weight="fill" /> : <Star />}
          </p>
        </div>
      </div>
    </div>
  );
}
