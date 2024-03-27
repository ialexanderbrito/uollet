import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';

import { CaretDown, CaretUp, Star } from '@phosphor-icons/react';
import { Jelly } from '@uiball/loaders';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { format } from 'date-fns';

import { Error } from 'pages/Error';

import { BottomNavigator } from 'components/BottomNavigator';
import { FundamentalIndicators } from 'components/FundamentalIndicators';
import { Header } from 'components/Header';
import { Loading } from 'components/Loading';
import { RecommendedStocks } from 'components/RecommendedStocks';

import {
  cn,
  formatCurrency,
  numberToLocale,
  numberToPercent,
  numberToSIMoney,
} from 'utils';

import { useStocks } from 'hooks/useStocks';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export function Stock() {
  const params = useParams();
  const {
    stock,
    recommendedStocks,
    loading,
    loadingRecommendedStocks,
    saveFavoriteStock,
    verifyIsFavorite,
    optionsChart,
    chartData,
    fields,
    fieldsStock,
    fieldsFiis,
    error,
  } = useStocks();

  const isStock = stock.fundamentalIndicators?.type === 'stock' && true;
  const isFiis = stock.fundamentalIndicators?.type === 'fii' && true;

  if (loadingRecommendedStocks || loading) {
    return <Loading color="#170e39" />;
  }

  if (error) {
    return (
      <Error
        title={`Infelizmente não foi possível carregar as informações sobre ${params.stock?.toUpperCase()}`}
        description="Por favor, tente novamente mais tarde"
        buttonText="Voltar para investimentos"
        link="/investments"
      />
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-center bg-background dark:bg-background-dark">
      <Header
        variant="secondary"
        title={`Ação ${params.stock?.toUpperCase()}`}
        navigateLink="/investments"
        isInvestiment
      />

      <div className="flex min-h-screen w-full flex-col items-center justify-start gap-4 p-4">
        <div className="flex w-full flex-col items-start justify-between space-y-2 md:flex-row md:items-start md:space-y-0">
          <div className="flex items-center space-x-2">
            <img
              src={stock.logourl}
              className="h-12 w-12 rounded-md"
              width={48}
              height={48}
              alt={stock.longName}
            />
            <div className="flex flex-col">
              <span className="flex flex-row items-center gap-4 text-2xl font-bold text-title dark:text-text-dark">
                {stock.symbol?.toUpperCase() || stock.longName?.toUpperCase()}
                {verifyIsFavorite(stock.symbol) ? (
                  <Star
                    weight="fill"
                    className="h-6 w-6 cursor-pointer text-yellow-500"
                    onClick={() => saveFavoriteStock(stock.symbol)}
                  />
                ) : (
                  <Star
                    className="h-6 w-6 cursor-pointer"
                    onClick={() => saveFavoriteStock(stock.symbol)}
                  />
                )}
              </span>
              <h1 className="text-sm text-title dark:text-text-dark">
                {stock.longName || stock.symbol}
              </h1>
            </div>
          </div>

          <div className="flex flex-col md:items-end">
            <span className="w-fit text-sm text-title dark:text-text-dark">
              Última atualização
            </span>
            <span className="w-fit text-sm font-bold text-title dark:text-text-dark">
              {stock?.regularMarketTime && (
                <>
                  {format(
                    new Date(stock?.regularMarketTime),
                    'dd/MM/yyyy HH:mm:ss',
                  )}
                </>
              )}
            </span>
          </div>
        </div>

        <div className="mt-2 flex w-full flex-col justify-start gap-0 space-y-2 md:space-y-0 lg:flex-row">
          <div className="flex w-full flex-col text-title dark:text-text-dark">
            <span className="text-sm">Preço</span>
            <span className="text-xl font-bold">
              {formatCurrency(stock.regularMarketPrice, stock.currency)}
            </span>
          </div>

          {stock.regularMarketOpen !== 0 && (
            <div className="flex w-full flex-col text-title dark:text-text-dark">
              <span className="text-sm">Abertura (dia)</span>
              <span className="text-xl font-bold">
                {formatCurrency(stock.regularMarketOpen, stock.currency)}
              </span>
            </div>
          )}

          {stock.regularMarketVolume !== 0 && (
            <div className="flex w-full flex-col text-title dark:text-text-dark">
              <span className="text-sm">Alta (dia)</span>
              <span className="text-xl font-bold">
                {formatCurrency(stock.regularMarketDayHigh, stock.currency)}
              </span>
            </div>
          )}

          {stock.regularMarketVolume !== 0 && (
            <div className="flex w-full flex-col text-title dark:text-text-dark">
              <span className="text-sm">Baixa (dia)</span>
              <span className="text-xl font-bold">
                {formatCurrency(stock.regularMarketDayLow, stock.currency)}
              </span>
            </div>
          )}

          <div className="flex w-full flex-col">
            <span className="text-sm text-title dark:text-text-dark">
              Variação (dia)
            </span>
            <span
              className={cn(
                'text-xl font-bold',
                (stock.regularMarketChangePercent || 0) > 0
                  ? 'text-success'
                  : 'text-danger',
              )}
            >
              {formatCurrency(stock.regularMarketChange, stock.currency)} (
              {(stock.regularMarketChangePercent || 0).toFixed(2)}%)
              {(stock.regularMarketChangePercent || 0) > 0 ? '▲' : '▼'}
            </span>
          </div>

          <div className="flex w-full flex-col text-title dark:text-text-dark">
            <span className="text-sm">Min. 52 Semanas</span>
            <span className="text-xl font-bold">
              {stock.fiftyTwoWeekLow !== 0
                ? formatCurrency(stock.fiftyTwoWeekLow, stock.currency)
                : '--'}
            </span>
          </div>

          <div className="flex w-full flex-col text-title dark:text-text-dark">
            <span className="text-sm">Máx. 52 Semanas</span>
            <span className="text-xl font-bold">
              {formatCurrency(stock.fiftyTwoWeekHigh, stock.currency)}
            </span>
          </div>

          <div className="flex w-full flex-col text-title dark:text-text-dark">
            <span className="text-sm">Capitalização de mercado</span>
            <span
              className="text-xl font-bold"
              title={numberToSIMoney(stock.marketCap)}
            >
              {numberToSIMoney(stock.marketCap)}
            </span>
          </div>
        </div>

        {loadingRecommendedStocks ? (
          <div className="flex w-full items-center justify-center">
            <Jelly color="#170e39" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 text-title dark:text-text-dark md:grid-cols-3 lg:grid-cols-4">
            <div className="md:col-span-2 lg:col-span-3">
              <div className="flex h-auto min-h-full w-full flex-col p-2">
                <div className="flex flex-row gap-2">
                  <img
                    src={stock.logourl}
                    alt={stock.shortName}
                    className="h-12 w-12 rounded-md"
                  />

                  <div className="flex max-w-[180px] flex-col justify-center">
                    <span
                      className="text-md truncate font-semibold"
                      title={stock.longName}
                    >
                      {stock.shortName}
                    </span>
                    <span className="text-sm opacity-90">{stock.symbol}</span>
                  </div>
                </div>
                <div className="relative mt-4 w-full rounded-xl bg-background-card p-2 pt-4 dark:bg-background-card-dark">
                  <div className="ml-5 flex flex-col">
                    <div className="flex flex-row items-center justify-between">
                      <span
                        className="text-2xl font-semibold"
                        title={`Valor ${formatCurrency(
                          stock.regularMarketPrice,
                          stock.currency,
                        )}`}
                      >
                        {formatCurrency(
                          stock.regularMarketPrice,
                          stock.currency,
                        )}
                      </span>

                      <span className=" text-xs">
                        {stock?.regularMarketTime && (
                          <>
                            Última atualização{' '}
                            {format(
                              new Date(stock?.regularMarketTime),
                              `dd/MM/yyyy 'às' HH:mm:ss`,
                            )}
                          </>
                        )}
                      </span>
                    </div>

                    <div
                      className={cn({
                        'flex items-center gap-2 text-sm': true,
                        'text-green-700 dark:text-green-400 ':
                          stock.regularMarketChange > 0,
                        'text-red-700 dark:text-red-400':
                          stock.regularMarketChange < 0,
                      })}
                    >
                      {stock.regularMarketChange !== 0 && (
                        <>
                          <span
                            className="text-sm"
                            title={`${
                              stock.regularMarketChange > 0 ? 'Subiu' : 'Caiu'
                            } ${formatCurrency(
                              stock.regularMarketChange,
                              stock.currency,
                            )}`}
                          >
                            {stock?.regularMarketChange > 0 ? '+ ' : '- '}
                            {numberToLocale(
                              Math.abs(stock.regularMarketChange),
                            )}
                          </span>

                          <span
                            className="flex items-center"
                            title={`${
                              stock.regularMarketChange > 0 ? 'Subiu' : 'Caiu'
                            } ${numberToPercent(
                              Math.abs(stock.regularMarketChangePercent),
                            )}`}
                          >
                            {stock.regularMarketChangePercent > 0 ? (
                              <CaretUp className="h-3 w-3" />
                            ) : (
                              <CaretDown className="h-3 w-3" />
                            )}
                            {numberToPercent(
                              Math.abs(stock.regularMarketChangePercent),
                            )}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="h-[380px] w-full">
                    <h1 className="text-xl font-bold text-title dark:text-text-dark">
                      <Line
                        className="h-[350px] w-full"
                        options={optionsChart}
                        data={chartData}
                      />
                    </h1>
                  </div>
                </div>
                <FundamentalIndicators
                  fields={fields}
                  className={cn(!isStock && !isFiis && 'mb-14')}
                />

                {isStock && (
                  <>
                    <span className="text-md mt-4 font-semibold">
                      Indicadores fundamentalistas {stock.symbol}
                    </span>
                    <FundamentalIndicators
                      fields={fieldsStock}
                      className="mb-2 sm:mb-14"
                    />
                  </>
                )}

                {isFiis && (
                  <>
                    <span className="text-md mt-4 font-semibold">
                      Média do tipo e segmento
                    </span>
                    <FundamentalIndicators
                      fields={fieldsFiis}
                      fiis
                      className="mb-2 sm:mb-14"
                    />
                  </>
                )}
              </div>
            </div>

            <div className="mb-14 mt-0 flex flex-col space-y-2 md:mt-20">
              <h2 className="text-xl font-bold text-title dark:text-text-dark">
                Ações relacionadas
              </h2>
              <RecommendedStocks
                recommendedStocks={recommendedStocks}
                loading={loadingRecommendedStocks}
              />
            </div>
          </div>
        )}
      </div>

      <BottomNavigator />
    </div>
  );
}
