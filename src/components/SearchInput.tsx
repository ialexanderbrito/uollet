import { Star } from '@phosphor-icons/react';

import { cn } from 'utils';

import { StocksResultSearch } from 'hooks/useStocks';

interface SearchInputProps {
  searchStock: string;
  setSearchStock: (stock: string) => void;
  stocksResultSearch: StocksResultSearch[];
  navigate: (path: string) => void;
  saveFavoriteStock: (stock: string) => void;
  verifyIsFavorite: (stock: string) => boolean;
}

export function SearchInput({
  searchStock,
  setSearchStock,
  stocksResultSearch,
  navigate,
  saveFavoriteStock,
  verifyIsFavorite,
}: SearchInputProps) {
  return (
    <div className="-mb-7 flex w-full flex-col p-4" id="autocomplete-container">
      <input
        type="text"
        value={searchStock}
        placeholder="Pesquisar por alguma ação"
        className="mb-4 h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-investments-primary dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-investments-primary"
        onChange={(e) => setSearchStock(e.target.value.toUpperCase())}
      />

      {stocksResultSearch.length > 0 && (
        <div className="absolute z-100 mt-10 w-[98.7%] rounded-lg bg-background-card shadow-md dark:bg-background-card-dark">
          <ul className="flex flex-col gap-2 p-4">
            {stocksResultSearch.map((stock) => (
              <li
                key={stock.id}
                className={cn(
                  'flex w-full cursor-pointer items-center justify-between rounded-md border-b border-gray-300 p-1 text-title transition-all hover:bg-investments-primary hover:text-white dark:border-gray-700 dark:text-text-dark dark:hover:bg-investments-primary',
                  stocksResultSearch.indexOf(stock) ===
                    stocksResultSearch.length - 1 && 'border-b-0',
                )}
              >
                <p
                  className="w-full "
                  onClick={() => {
                    navigate(`/stock/${stock.id}`);
                  }}
                >
                  {stock.name}
                </p>
                <button
                  type="button"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center text-center text-title dark:text-text-dark"
                  onClick={() => saveFavoriteStock(stock.id)}
                >
                  <Star
                    size={20}
                    weight={verifyIsFavorite(stock.id) ? 'fill' : 'regular'}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
