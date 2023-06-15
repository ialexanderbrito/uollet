import { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

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

  const [dataChart, setDataChart] = useState<DataProps>(database);

  const [categories, setCategories] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [type, setType] = useState<'income' | 'outcome'>('outcome');

  const [actualMonth, setActualMonth] = useState(new Date().getMonth() + 1);
  const [actualYear, setActualYear] = useState(new Date().getFullYear());
  const endOfDays = new Date(actualYear, actualMonth, 0).getDate();
  const newMonthLong = format(new Date(actualYear, actualMonth - 1), 'MMMM', {
    locale: pt,
  });

  const [loading, setLoading] = useState(true);

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

  function handlePreviousMonth() {
    if (actualMonth === 1) {
      setActualMonth(12);

      setActualYear(actualYear - 1);
    } else {
      setActualMonth(actualMonth - 1);
    }
  }

  function handleNextMonth() {
    if (actualMonth === 12) {
      setActualMonth(1);

      setActualYear(actualYear + 1);
    } else {
      setActualMonth(actualMonth + 1);
    }
  }

  async function getValuesCategory() {
    try {
      const { data, error } = await supabase
        .from('finances_db')
        .select('category, value, date')
        .eq('type', type)
        .eq('user_id', user?.id)
        .gte('date', `${actualYear}-${actualMonth}-01`)
        .lte('date', `${actualYear}-${actualMonth}-${endOfDays}`)
        .not('category', 'ilike', '%Cartão%');

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

      const colors = uniqueCategories.map((category) => {
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

  useEffect(() => {
    getValuesCategory();
  }, [actualMonth, actualYear, type]);

  return {
    dataChart,
    categories,
    values,
    colors,
    actualMonth,
    actualYear,
    newMonthLong,
    handlePreviousMonth,
    handleNextMonth,
    loading,
    type,
    setType,
  };
}
