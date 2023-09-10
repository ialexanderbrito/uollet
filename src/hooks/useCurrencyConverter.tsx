import { useEffect, useState } from 'react';

import axios from 'axios';

export function useCurrencyConverter() {
  const [currencyOrigin, setCurrencyOrigin] = useState('BRL');
  const [currencyDestination, setCurrencyDestination] = useState('USD');
  const [currencyValue, setCurrencyValue] = useState('');
  const [currencyTotal, setCurrencyTotal] = useState(0);
  const [updateCurrencyDate, setUpdateCurrencyDate] = useState('');
  const [changeCurrency, setChangeCurrency] = useState(false);

  async function getCurrencyConverter() {
    if (changeCurrency) {
      const currencyOriginTemp = currencyOrigin;
      const currencyDestinationTemp = currencyDestination;

      setCurrencyOrigin(currencyDestinationTemp);
      setCurrencyDestination(currencyOriginTemp);
    }

    const { data } = await axios.get(
      `https://economia.awesomeapi.com.br/json/last/${currencyOrigin}-${currencyDestination}`,
    );

    const value = data[`${currencyOrigin}${currencyDestination}`].bid;
    const date = data[`${currencyOrigin}${currencyDestination}`].create_date;

    const newCurrencyValue = parseFloat(
      String(currencyValue).replace(',', '.'),
    );

    const total = value * newCurrencyValue;

    setCurrencyTotal(total);
    setUpdateCurrencyDate(date);
  }

  useEffect(() => {
    const currencyOriginTemp = currencyOrigin;
    const currencyDestinationTemp = currencyDestination;

    setCurrencyOrigin(currencyDestinationTemp);
    setCurrencyDestination(currencyOriginTemp);
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
  };
}
