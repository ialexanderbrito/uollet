import { useEffect, useState } from 'react';

import { useToast } from 'contexts/Toast';

import { api } from 'services/api';

export function useCurrencyConverter() {
  const { toast } = useToast();
  const [currencyOrigin, setCurrencyOrigin] = useState('BRL');
  const [currencyDestination, setCurrencyDestination] = useState('USD');
  const [currencyValue, setCurrencyValue] = useState('');
  const [currencyTotal, setCurrencyTotal] = useState(0);
  const [updateCurrencyDate, setUpdateCurrencyDate] = useState('');
  const [changeCurrency, setChangeCurrency] = useState(false);
  const [swapCurrency, setSwapCurrency] = useState(false);
  const [loading, setLoading] = useState(false);

  async function getCurrencyConverter() {
    setLoading(true);

    if (changeCurrency) {
      const currencyOriginTemp = currencyOrigin;
      const currencyDestinationTemp = currencyDestination;

      setCurrencyOrigin(currencyDestinationTemp);
      setCurrencyDestination(currencyOriginTemp);
    }

    if (!currencyValue || currencyValue === '0') {
      toast.error('Preencha o campo de valor para converter.', {
        id: 'error',
      });

      return;
    }

    try {
      const { data } = await api.get(
        `currency/${currencyOrigin}-${currencyDestination}`,
      );

      const value = data[`${currencyOrigin}${currencyDestination}`].bid;
      const date = data[`${currencyOrigin}${currencyDestination}`].create_date;

      const newCurrencyValue = parseFloat(
        String(currencyValue).replace(',', '.'),
      );

      const total = value * newCurrencyValue;

      setCurrencyTotal(total);
      setUpdateCurrencyDate(date);
    } catch (error) {
      toast.error('Erro ao converter moedas. Tente novamente.', {
        id: 'error',
      });
    } finally {
      setLoading(false);
    }
  }

  function handleSwapCurrency() {
    setSwapCurrency((prevState) => !prevState);

    let actualCurrencyOrigin = currencyOrigin;
    let actualCurrencyDestination = currencyDestination;

    actualCurrencyOrigin = currencyDestination;
    actualCurrencyDestination = currencyOrigin;

    setCurrencyOrigin(actualCurrencyOrigin);
    setCurrencyDestination(actualCurrencyDestination);
  }

  useEffect(() => {
    if (changeCurrency) {
      let actualCurrencyOrigin = currencyOrigin;
      let actualCurrencyDestination = currencyDestination;

      actualCurrencyOrigin = currencyDestination;
      actualCurrencyDestination = currencyOrigin;

      setCurrencyOrigin(actualCurrencyOrigin);
      setCurrencyDestination(actualCurrencyDestination);
    }
  }, [changeCurrency]);

  useEffect(() => {
    setCurrencyTotal(0);
  }, [currencyOrigin, currencyDestination, currencyValue]);

  return {
    currencyOrigin,
    currencyDestination,
    currencyValue,
    currencyTotal,
    updateCurrencyDate,
    setCurrencyOrigin,
    setCurrencyDestination,
    setCurrencyValue,
    getCurrencyConverter,
    setCurrencyTotal,
    changeCurrency,
    setChangeCurrency,
    swapCurrency,
    setSwapCurrency,
    handleSwapCurrency,
    loading,
  };
}
