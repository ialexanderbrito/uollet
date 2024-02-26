import { Link } from 'react-router-dom';

import { cn } from 'utils/cn';
import { formatCurrency } from 'utils/formatCurrency';

import { StockProps } from 'hooks/useStocks';

import { Loading } from './Loading';

interface RecommendedStocksProps {
  recommendedStocks: StockProps[];
  loading: boolean;
}

export function RecommendedStocks({
  recommendedStocks,
  loading,
}: RecommendedStocksProps) {
  if (loading) {
    return <Loading />;
  }

  if (recommendedStocks?.length === 0) {
    return (
      <div className="flex w-full flex-col justify-start gap-0 space-y-2 md:space-y-0 lg:flex-row">
        <div className="flex w-full flex-col text-title dark:text-text-dark">
          <span className="text-sm font-bold text-title dark:text-text-dark">
            Nenhuma ação relacionada encontrada
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1">
      {recommendedStocks.map((recommendedStock) => (
        <div key={recommendedStock.symbol}>
          <Link
            to={`/stock/${recommendedStock.symbol}`}
            className="hover:bg-foreground/10 flex items-center rounded-md p-2"
            title={recommendedStock.longName}
          >
            <img
              className="h-10 w-10 rounded-md"
              width={40}
              height={40}
              src={recommendedStock.logourl}
              alt={recommendedStock.symbol}
            />

            <div className="ml-4">
              <p className="text-lg font-medium text-title dark:text-text-dark md:w-52 md:truncate">
                {recommendedStock.longName}
              </p>
              <p className="text-sm text-title dark:text-text-dark">
                <span>{recommendedStock.symbol}</span>
                <span
                  className={cn(
                    (recommendedStock.regularMarketChangePercent || 0) > 0
                      ? 'text-success'
                      : 'text-danger',
                  )}
                >
                  {(recommendedStock.regularMarketChangePercent || 0) > 0
                    ? '▲'
                    : '▼'}
                  (
                  {(recommendedStock.regularMarketChangePercent || 0).toFixed(
                    2,
                  )}
                  %)
                </span>{' '}
                |{' '}
                <span>
                  {formatCurrency(
                    recommendedStock.regularMarketPrice,
                    recommendedStock.currency,
                  )}
                </span>
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
