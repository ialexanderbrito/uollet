import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { supabase } from 'services/supabase';

export interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
}

export interface Data {
  category: string;
  value: number;
  date: string;
}

export interface DataProps {
  labels: string[];
  datasets: Dataset[];
}

export const database = {
  labels: ['Dinheiro', 'NuConta', 'Bradesco', 'NuInvest', 'C6Bank', 'Binance'],
  datasets: [
    {
      label: 'Gastos por categoria',
      data: [0, 0, 0, 0, 0, 0],
      backgroundColor: [
        '#12A454',
        '#7e0aca',
        '#cc092f',
        '#43126e',
        '#2b2a29',
        '#ebb42e',
        '#000000',
      ],
      borderColor: [
        '#12A454',
        '#7e0aca',
        '#cc092f',
        '#43126e',
        '#2b2a29',
        '#ebb42e',
        '#000000',
      ],

      borderWidth: 1,
    },
  ],
};

export function useResume() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [searchParams, setSearchParams] = useSearchParams();

  const [dataChart, setDataChart] = useState<DataProps>(database);

  const [categories, setCategories] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [type, setType] = useState<'income' | 'outcome'>('outcome');

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [lastDayOfTheMonth, setLastDayOfTheMonth] = useState(
    new Date(new Date().getFullYear(), currentMonth, 0).getDate(),
  );

  const [loading, setLoading] = useState(true);
  const [openModalFilter, setOpenModalFilter] = useState(false);

  const [exibitionMode, setExibitionMode] = useState(
    () => localStorage.getItem('@uollet:exibitionMode') || 'pie',
  );

  function handleCloseModalFilter() {
    setOpenModalFilter(false);
  }

  function handleOpenModalFilter() {
    setOpenModalFilter(true);
  }

  function saveExibitionMode(mode: string) {
    localStorage.setItem('@uollet:exibitionMode', mode);
    setExibitionMode(mode);
  }

  function removeDuplicateCategories(categories: string[]) {
    const uniqueCategories = categories.filter(
      (item, index) => categories.indexOf(item) === index,
    );
    return uniqueCategories;
  }

  function sumValuesCategory(category: string, data: Data[]) {
    const values = data
      ?.filter((item) => item.category === category)
      .map((item) => item.value);
    const sumValues = values?.reduce((acc, value) => acc + value, 0);
    return sumValues;
  }

  function getColorsBanks(uniqueCategories: string[]) {
    return uniqueCategories.map((category) => {
      switch (category) {
        case 'Dinheiro':
          return '#12A454';
        case 'NuConta':
          return '#7e0aca';
        case 'Bradesco':
          return '#cc092f';
        case 'NuInvest':
          return '#43126e';
        case 'C6Bank':
          return '#2b2a29';
        case 'Binance':
          return '#ebb42e';
        case 'Inter':
          return '#f77601';
        case 'Banco do Brasil':
          return '#f5f430';
        case 'Santander':
          return '#e30000';
        case 'Itaú':
          return '#ec7000';
        case 'Caixa':
          return '#0070b0';
        case 'BTG Pactual':
          return '#051229';
        case 'C6 Investimentos':
          return '#1f1f1f';
        case 'Inter Investimentos':
          return '#f77601';
        case 'XP Investimentos':
          return '#0d0e10';
        case 'Clear':
          return '#0100f2';
        case 'BTG Investimentos':
          return '#051229';
        case 'Rico':
          return '#f74f00';
        case 'Ágora Investimentos':
          return '#01444b';
        case 'Órama Investimentos':
          return '#34991d';
        case 'Mercado Bitcoin':
          return '#e84522';
        case 'Foxbit':
          return '#f77100';
        default:
          return '#000000';
      }
    });
  }

  async function getValuesCategory(month: number, endOfDays: number) {
    try {
      const { data, error } = await supabase
        .from('finances_db')
        .select('category, value, date')
        .eq('type', type)
        .eq('user_id', user?.id)
        .gte('date', `${currentYear}-${month}-01`)
        .lte('date', `${currentYear}-${month}-${endOfDays}`)
        .not('category', 'ilike', '%Cartão%')
        .not('category', 'ilike', '%Meta%');

      if (error) {
        toast.error('Erro ao carregar os dados', { id: 'error' });
        return;
      }

      if (!data) return;

      const categories = data.map((item) => item.category);
      const uniqueCategories = removeDuplicateCategories(categories);
      const valuesCategory = uniqueCategories.map((category) =>
        sumValuesCategory(category, data),
      );

      const sumValues = valuesCategory.reduce((acc, value) => acc + value, 0);
      const percentageValues = valuesCategory.map(
        (value) => (value / sumValues) * 100,
      );
      const percentageValuesRounded = percentageValues.map((value) =>
        Math.round(value),
      );

      const colors = getColorsBanks(uniqueCategories);

      setCategories(uniqueCategories);
      setValues(valuesCategory);
      setColors(colors);

      const newDataChart = {
        labels: uniqueCategories,
        datasets: [
          {
            label: 'Gastos por categoria',
            data: percentageValuesRounded,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
          },
        ],
      };

      setLoading(false);

      setDataChart(newDataChart);
    } catch (error) {
      toast.error('Erro ao carregar os dados', { id: 'error' });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function getAllTransactionsForTheMonthAndYearByCategory(
    year: number,
    month: number,
    day: number,
  ) {
    try {
      const { data, error } = await supabase
        .from('finances_db')
        .select('*')
        .eq('user_id', user?.id)
        .eq('type', type)
        .gte('date', `${year}-${month}-01`)
        .lte('date', `${year}-${month}-${day}`)
        .not('category', 'ilike', '%Cartão%')
        .not('category', 'ilike', '%Meta%');

      if (error) {
        toast.error('Erro ao carregar os dados', { id: 'error' });
        return;
      }

      if (!data) return;

      const categories = data.map((item) => item.category);
      const uniqueCategories = removeDuplicateCategories(categories);
      const valuesCategory = uniqueCategories.map((category) =>
        sumValuesCategory(category, data),
      );

      const sumValues = valuesCategory.reduce((acc, value) => acc + value, 0);
      const percentageValues = valuesCategory.map(
        (value) => (value / sumValues) * 100,
      );
      const percentageValuesRounded = percentageValues.map((value) =>
        Math.round(value),
      );

      const colors = getColorsBanks(uniqueCategories);

      setCategories(uniqueCategories);
      setValues(valuesCategory);
      setColors(colors);

      const newDataChart = {
        labels: uniqueCategories,
        datasets: [
          {
            label: 'Gastos por categoria',
            data: percentageValuesRounded,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
          },
        ],
      };

      setLoading(false);

      setDataChart(newDataChart);
    } catch (error) {
      toast.error('Erro ao carregar os dados', { id: 'error' });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function filterTransactionsByYearByCategory(
    year: number,
    month: number,
  ) {
    try {
      const { data, error } = await supabase
        .from('finances_db')
        .select('category, value, date')
        .eq('type', type)
        .eq('user_id', user?.id)
        .gte('date', `${year}-${month}-01`)
        .lte('date', `${year}-${month}-${lastDayOfTheMonth}`)
        .not('category', 'ilike', '%Cartão%')
        .not('category', 'ilike', '%Meta%');

      if (error) {
        toast.error('Erro ao carregar os dados', { id: 'error' });
        return;
      }

      if (!data) return;

      const categories = data.map((item) => item.category);
      const uniqueCategories = removeDuplicateCategories(categories);
      const valuesCategory = uniqueCategories.map((category) =>
        sumValuesCategory(category, data),
      );

      const sumValues = valuesCategory.reduce((acc, value) => acc + value, 0);
      const percentageValues = valuesCategory.map(
        (value) => (value / sumValues) * 100,
      );
      const percentageValuesRounded = percentageValues.map((value) =>
        Math.round(value),
      );

      const colors = getColorsBanks(uniqueCategories);

      setCategories(uniqueCategories);
      setValues(valuesCategory);
      setColors(colors);

      const newDataChart = {
        labels: uniqueCategories,
        datasets: [
          {
            label: 'Gastos por categoria',
            data: percentageValuesRounded,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
          },
        ],
      };

      setDataChart(newDataChart);
      handleCloseModalFilter();

      setLoading(false);
    } catch (error) {
      toast.error('Erro ao carregar os dados', { id: 'error' });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getValuesCategory(currentMonth, lastDayOfTheMonth);
  }, [type, currentYear, currentMonth]);

  useEffect(() => {
    localStorage.setItem('@uollet:exibitionMode', exibitionMode);
  }, [exibitionMode]);

  return {
    dataChart,
    categories,
    values,
    colors,
    currentYear,
    setCurrentYear,
    currentMonth,
    setCurrentMonth,
    lastDayOfTheMonth,
    setLastDayOfTheMonth,
    loading,
    type,
    setType,
    searchParams,
    setSearchParams,
    openModalFilter,
    handleCloseModalFilter,
    handleOpenModalFilter,
    filterTransactionsByYearByCategory,
    getAllTransactionsForTheMonthAndYearByCategory,
    getColorsBanks,
    exibitionMode,
    saveExibitionMode,
  };
}
