import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ChartData } from 'chart.js';

import {
  createGradientColor,
  formatCurrency,
  numberToSI,
  numberToSIMoney,
} from 'utils';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { api } from 'services/api';
import { supabase } from 'services/supabase';

export interface FundamentusProps {
  stock: string;
  pPorL: number;
  psr?: any;
  pPorVp: number;
  divYield: number;
  margLiquida: number;
  margBruta: number;
  margEbit: number;
  margEbitda?: any;
  evPorEbitda?: any;
  evPorEbit?: any;
  pPorEbit?: any;
  pPorAtivo?: any;
  pPorCapGiro?: any;
  pPorAtivCircLiq?: any;
  patrimLiq: number;
  vpa: number;
  lpa: number;
  giroAtivos?: any;
  roe: number;
  roic: number;
  divLiquidaPorPatrim?: any;
  divLiquidaPorEbitda?: any;
  divLiquidaPorEbit?: any;
  divBrutaPorPatrim?: any;
  patrimPorAtivo: number;
  cagr5Anos: number;
  type: string;
  vpPorCota?: number;
  segmento?: string;
}

export interface StocksProps {
  stock: string;
  name: string;
  close: number;
  change: number;
  volume: number;
  market_cap?: number;
  logo: string;
  sector?: string;
}

export interface HistoricalDataPrice {
  date: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjustedClose: number;
}

export interface StockProps {
  symbol: string;
  currency: string;
  twoHundredDayAverage?: number;
  twoHundredDayAverageChange?: number;
  twoHundredDayAverageChangePercent?: number;
  marketCap?: number;
  shortName: string;
  longName?: string;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketTime: string;
  regularMarketPrice: number;
  regularMarketDayHigh: number;
  regularMarketDayRange: string;
  regularMarketDayLow: number;
  regularMarketVolume: number;
  regularMarketPreviousClose: number;
  regularMarketOpen: number;
  averageDailyVolume3Month?: number;
  averageDailyVolume10Day?: number;
  fiftyTwoWeekLowChange: number;
  fiftyTwoWeekLowChangePercent: number;
  fiftyTwoWeekRange: string;
  fiftyTwoWeekHighChange: number;
  fiftyTwoWeekHighChangePercent: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  priceEarnings?: number;
  earningsPerShare?: number;
  logourl: string;
  updatedAt: string;
  usedInterval: string;
  usedRange: string;
  historicalDataPrice: HistoricalDataPrice[];
  validRanges: string[];
  validIntervals: string[];
  fundamentalIndicators?: FundamentusProps;
}

export interface StocksResultSearch {
  id: string;
  name: string;
}

export function useStocks() {
  const params = useParams();
  const { toast } = useToast();
  const { setUser, user } = useAuth();

  const [stocks, setStocks] = useState<StocksProps[]>([]);
  const [stock, setStock] = useState<StockProps>({} as StockProps);
  const [recommendedStocks, setRecommendedStocks] = useState<StockProps[]>([]);
  const [savedStocks, setSavedStocks] = useState<StockProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRecommendedStocks, setLoadingRecommendedStocks] =
    useState(true);
  const [error, setError] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(savedStocks.length > 0);
  const [searchStock, setSearchStock] = useState('');
  const [stocksResultSearch, setStocksResultSearch] = useState<
    StocksResultSearch[]
  >([]);
  const [isSearch, setIsSearch] = useState(false);

  const optionsChart = {
    responsive: true,
    maintainAspectRatio: false,
    radius: 0,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        formatter: (value: number) => '',
      },
    },
    elements: {
      line: {
        tension: 0.3,
      },
      point: {
        radius: 2,
      },
    },
  };

  const chartData: ChartData<'line'> = {
    labels: stock.historicalDataPrice?.map((data) =>
      new Date(data?.date * 1000).toLocaleDateString('pt-BR'),
    ),
    datasets: [
      {
        label: 'R$',
        data: stock.historicalDataPrice?.map((data) => data?.close) || [],
        fill: true,
        backgroundColor: createGradientColor(
          '#5636d3',
          'rgb(86, 54, 211, 0.6)',
          'rgb(86, 54, 211, 0.2)',
        ),
        borderColor: '#5636d3',
        borderWidth: 1,
      },
    ],
  };

  async function updateFavorites(newFavorites: string[]) {
    try {
      const { data } = await supabase.auth.updateUser({
        data: { stocks: newFavorites },
      });

      if (!data.user) return;

      setUser(data.user);

      setFavorites(newFavorites);
    } catch (error) {
      toast.error('Erro ao atualizar ações favoritas. Tente novamente.', {
        id: 'error',
      });
    }
  }

  async function handleSaveFavoriteStock(stock: string) {
    const newFavorites = [...favorites, stock];

    await updateFavorites(newFavorites);
  }

  async function removeFavoriteStock(stock: string) {
    const newFavorites = favorites.filter(
      (favorite: string) => favorite !== stock,
    );

    await updateFavorites(newFavorites);
  }

  function verifyIsFavorite(stock: string) {
    return favorites.includes(stock);
  }

  function saveFavoriteStock(stock: string) {
    verifyIsFavorite(stock)
      ? removeFavoriteStock(stock)
      : handleSaveFavoriteStock(stock);
  }

  async function getMultipleStocks(stocks: string[]) {
    const stocksString = stocks.join(',');

    if (stocks.length === 0) {
      setIsFavorite(true);
      setLoading(false);
      return;
    }

    if (favorites.length > 0 && !params.stock) {
      try {
        const { data } = await api.get(`stock/${stocksString}`);

        setIsFavorite(false);

        const stockData = data.results.map((stock: StockProps) => ({
          ...stock,
          logo: stock.logourl,
        }));

        setSavedStocks(stockData);
      } catch (error) {
        toast.error('Erro ao encontrar ações. Tente novamente.', {
          id: 'error',
        });
        setError(true);
      } finally {
        setLoading(false);
        setLoadingRecommendedStocks(false);
      }
    }
  }

  async function getStocksList() {
    try {
      const { data } = await api.get(`stock/list`);

      setStocks(data);
    } catch (error) {
      toast.error('Erro ao encontrar lista de ações. Tente novamente.', {
        id: 'error',
      });
      setError(true);
    } finally {
      setLoading(false);
      setLoadingRecommendedStocks(false);
    }
  }

  async function getStock(stock = params.stock, range = '5d') {
    try {
      const { data } = await api.get(`stock/${stock}?range=${range}`);

      const result = data.results[0];

      const language = data.results[0].currency === 'USD' ? 'USD' : 'BRL';

      if (language === 'USD') {
        setStock(data.results[0]);
        return;
      }

      try {
        const { data: stockData } = await api.get(`stock/${stock}/fundamentus`);

        if (!stockData) {
          setStock(result);
          return;
        }

        const newResults = {
          ...result,
          fundamentalIndicators: stockData,
        };

        setStock(newResults);
      } catch (fundamentusError) {
        setStock(result);
      }
    } catch (error) {
      toast.error(
        `Erro ao encontrar dados da ação ${stock}. Tente novamente.`,
        {
          id: 'error',
        },
      );
      setError(true);
    } finally {
      setLoading(false);
      setLoadingRecommendedStocks(false);
    }
  }

  async function getCurrentStock(recommendedSymbols: string[]) {
    const recommendedStocksString = recommendedSymbols.join(',');

    try {
      const { data } = await api.get(`stock/${recommendedStocksString}`);

      const recommendedStocks = data.results.map((stock: StockProps) => ({
        ...stock,
        logo: stock.logourl,
      }));

      return recommendedStocks;
    } catch (error) {
      toast.error(
        `Erro ao encontrar ações relacionadas à ${recommendedSymbols}. Tente novamente.`,
        {
          id: 'error',
        },
      );
      setError(true);
    } finally {
      setLoading(false);
      setLoadingRecommendedStocks(false);
    }
  }

  async function getRecommendedStocks(stockName = params.stock) {
    const language = stock.currency === 'USD' ? 'USD' : 'BRL';

    try {
      const { data } = await api.get(
        `stock/${stockName}/recommendations?lang=${language}`,
      );

      const recommendedStocks = await getCurrentStock(data);

      setRecommendedStocks(recommendedStocks);
    } catch (error) {
      toast.error(
        `Erro ao encontrar ações relacionadas à ${stockName}. Tente novamente.`,
        {
          id: 'error',
        },
      );
      setError(true);
    } finally {
      setLoading(false);
      setLoadingRecommendedStocks(false);
    }
  }

  async function getSearchStocks() {
    try {
      const { data } = await api.get(`stock/available?search=${searchStock}`);

      const stocks = data.map((stock: string) => ({
        id: stock,
        name: stock,
      }));

      const stocksResultSearch = stocks.slice(0, 7);

      setStocksResultSearch(stocksResultSearch);
    } catch (error) {
      toast.error('Erro ao buscar ações. Tente novamente.', { id: 'error' });
    }
  }

  const fields = [
    {
      label: 'Preço atual',
      value: formatCurrency(stock.regularMarketPrice, stock.currency),
    },
    {
      label: 'Valor de mercado',
      value: numberToSI(stock.marketCap),
    },
    {
      label: 'Abertura',
      value: formatCurrency(stock.regularMarketOpen, stock.currency),
    },
    {
      label: 'Preço máximo',
      value: formatCurrency(stock.regularMarketDayHigh, stock.currency),
    },
    {
      label: 'Preço mínimo',
      value: formatCurrency(stock.regularMarketDayLow, stock.currency),
    },
    {
      label: 'Volume',
      value: numberToSI(stock.regularMarketVolume),
    },
    {
      label: 'Fechamento anterior',
      value: formatCurrency(stock.regularMarketPreviousClose, stock.currency),
    },
  ];

  const fieldsStock = [
    {
      label: 'P/L',
      value: stock.fundamentalIndicators?.pPorL,
    },
    {
      label: 'P/Receita (PSR)',
      value: stock.fundamentalIndicators?.psr,
    },
    {
      label: 'P/VP',
      value: stock.fundamentalIndicators?.pPorVp,
    },
    {
      label: 'Dividend Yield',
      value: `${stock.fundamentalIndicators?.divYield?.toFixed(2)}%`,
    },
    {
      label: 'Margem Líquida',
      value: `${stock.fundamentalIndicators?.margLiquida?.toFixed(2)}%`,
    },
    {
      label: 'Margem Bruta',
      value: `${stock.fundamentalIndicators?.margBruta?.toFixed(2)}%`,
    },
    {
      label: 'Margem Ebit',
      value: `${stock.fundamentalIndicators?.margEbit?.toFixed(2)}%`,
    },
    {
      label: 'Ev/Ebitda',
      value: stock.fundamentalIndicators?.evPorEbitda,
    },
    {
      label: 'Ev/Ebit',
      value: stock.fundamentalIndicators?.evPorEbit,
    },
    {
      label: 'P/Ebit',
      value: stock.fundamentalIndicators?.pPorEbit,
    },
    {
      label: 'P/Ativo',
      value: stock.fundamentalIndicators?.pPorAtivo,
    },
    {
      label: 'P/Capital Giro',
      value: stock.fundamentalIndicators?.pPorCapGiro,
    },
    {
      label: 'P/Ativo Circ Liq',
      value: stock.fundamentalIndicators?.pPorAtivCircLiq,
    },
    {
      label: 'VPA',
      value: stock.fundamentalIndicators?.vpa,
    },
    {
      label: 'LPA',
      value: stock.fundamentalIndicators?.lpa,
    },
    {
      label: 'Giro Ativos',
      value: stock.fundamentalIndicators?.giroAtivos,
    },
    {
      label: 'ROE',
      value: `${stock.fundamentalIndicators?.roe?.toFixed(2)}%`,
    },
    {
      label: 'ROIC',
      value: `${stock.fundamentalIndicators?.roic?.toFixed(2)}%`,
    },
    {
      label: 'Dív.Liq/Patr.',
      value: stock.fundamentalIndicators?.divLiquidaPorPatrim?.toFixed(2),
    },
    {
      label: 'Dív.Liq/Ebit',
      value: stock.fundamentalIndicators?.divLiquidaPorEbit?.toFixed(2),
    },
    {
      label: 'Div.Bruta/Patr.',
      value: stock.fundamentalIndicators?.divBrutaPorPatrim?.toFixed(2),
    },
    {
      label: 'Patrimônio/Ativo',
      value: stock.fundamentalIndicators?.patrimPorAtivo?.toFixed(2),
    },
  ];

  const fieldsFiis = [
    {
      label: 'P/VP',
      value: stock.fundamentalIndicators?.pPorVp,
    },
    {
      label: 'Dividend Yield',
      value: `${stock.fundamentalIndicators?.divYield?.toFixed(2)}%`,
    },
    {
      label: 'Valor Patrimonial',
      value: numberToSIMoney(stock.fundamentalIndicators?.patrimLiq),
    },
    {
      label: 'Valor Patrimonial p/ Cota',
      value: formatCurrency(stock.fundamentalIndicators?.vpPorCota || 0, 'BRL'),
    },
    {
      label: 'Segmento',
      value: stock.fundamentalIndicators?.segmento,
    },
  ];

  useEffect(() => {
    if (params.stock) {
      Promise.all([getRecommendedStocks(), getStock(params.stock, '1mo')]);
    }
  }, [params.stock]);

  useEffect(() => {
    if (user && user.user_metadata && user.user_metadata.stocks) {
      const favoritesFromLocalStorage = user.user_metadata.stocks;
      setFavorites(favoritesFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (!params.stock) {
      getStocksList();
    }
  }, []);

  useEffect(() => {
    getMultipleStocks(favorites);
  }, [favorites]);

  useEffect(() => {
    if (searchStock.length >= 1) {
      getSearchStocks();
    } else {
      setStocksResultSearch([]);
    }
  }, [searchStock]);

  return {
    getMultipleStocks,
    stocks,
    savedStocks,
    loading,
    isFavorite,
    setIsFavorite,
    saveFavoriteStock,
    verifyIsFavorite,
    stock,
    recommendedStocks,
    loadingRecommendedStocks,
    setSearchStock,
    stocksResultSearch,
    isSearch,
    setIsSearch,
    searchStock,
    setStocksResultSearch,
    optionsChart,
    chartData,
    fields,
    fieldsStock,
    fieldsFiis,
    error,
  };
}
