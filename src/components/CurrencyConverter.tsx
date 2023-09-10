import { useEffect } from 'react';
import CurrencyInput from 'react-currency-input-field';

import { Swap } from '@phosphor-icons/react';
import { format } from 'date-fns';

import { cn } from 'utils/cn';
import { nameCoins } from 'utils/nameCoins';

import { useCurrencyConverter } from 'hooks/useCurrencyConverter';

import { MyDialog } from './Modal';

interface CurrencyConverterProps {
  openModalCurrency: boolean;
  setOpenModalCurrency: (value: boolean) => void;
}

export function CurrencyConverter({
  openModalCurrency,
  setOpenModalCurrency,
}: CurrencyConverterProps) {
  const {
    currencyOrigin,
    currencyDestination,
    currencyTotal,
    updateCurrencyDate,
    setCurrencyOrigin,
    setCurrencyDestination,
    setCurrencyValue,
    getCurrencyConverter,
    setCurrencyTotal,
    changeCurrency,
    setChangeCurrency,
  } = useCurrencyConverter();

  useEffect(() => {
    setCurrencyTotal(0);
  }, [currencyOrigin, currencyDestination, openModalCurrency]);

  return (
    <MyDialog
      closeModal={() => setOpenModalCurrency(false)}
      isOpen={openModalCurrency}
      title="Conversor de moedas"
      description="Corverta moedas e veja o valor atualizado em tempo real. Para isso, basta preencher os campos abaixo."
      buttonSecondary
      textButtonSecondary="Converter"
      handleChangeButtonSecondary={() => {
        getCurrencyConverter();
      }}
      size="lg"
    >
      <div className="mt-8 flex flex-col gap-2">
        <div className="flex items-center justify-center gap-2">
          <div className="flex w-full flex-col justify-center gap-2">
            <label
              htmlFor="moedaOrigem"
              className="text-xs font-bold uppercase text-text dark:text-textDark"
            >
              Converter de
            </label>
            <select
              className="h-10 w-full rounded-md border-[1.5px] border-solid bg-background text-sm accent-secondary focus:border-secondary dark:border-backgroundCardDark dark:bg-backgroundDark dark:text-textDark dark:accent-secondaryDark focus:dark:border-secondaryDark"
              defaultValue={currencyOrigin}
              value={currencyOrigin}
              onChange={(event) => setCurrencyOrigin(event.target.value)}
            >
              <option value="" disabled className="font-bold">
                Principais moedas
              </option>
              {nameCoins.principais.map((coin) => (
                <option key={coin.code} value={coin.code}>
                  {coin.name}
                </option>
              ))}

              <option value="" disabled className="font-bold">
                Todas as moedas
              </option>
              {nameCoins.todas.map((coin) => (
                <option key={coin.code} value={coin.code}>
                  {coin.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-5 flex items-center justify-center">
            <Swap
              className={cn(
                'hover:text-secondaryHover dark:hover:text-secondaryHoverDark h-6 w-6 cursor-pointer text-secondary transition-colors dark:text-secondaryDark',
                changeCurrency && 'rotate-180 transform transition-transform',
                !changeCurrency && 'transform transition-transform',
              )}
              onClick={() => setChangeCurrency(!changeCurrency)}
            />
          </div>

          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor="moedaDestino"
              className="text-xs font-bold uppercase text-text dark:text-textDark"
            >
              Para
            </label>
            <select
              className="h-10 w-full rounded-md border-[1.5px] border-solid bg-background text-sm accent-secondary focus:border-secondary dark:border-backgroundCardDark dark:bg-backgroundDark dark:text-textDark dark:accent-secondaryDark focus:dark:border-secondaryDark"
              defaultValue={currencyDestination}
              value={currencyDestination}
              onChange={(event) => setCurrencyDestination(event.target.value)}
            >
              <option value="" disabled className="font-bold">
                Principais moedas
              </option>
              {nameCoins.principais.map((coin) => (
                <option key={coin.code} value={coin.code}>
                  {coin.name}
                </option>
              ))}

              <option value="" disabled className="font-bold">
                Todas as moedas
              </option>
              {nameCoins.todas.map((coin) => (
                <option key={coin.code} value={coin.code}>
                  {coin.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <CurrencyInput
          className="h-10 rounded-md bg-background pl-2 dark:bg-backgroundDark dark:text-textDark"
          placeholder="Valor"
          defaultValue={0}
          decimalsLimit={2}
          decimalSeparator=","
          groupSeparator="."
          prefix="R$ "
          onValueChange={(value) => setCurrencyValue(String(value))}
        />

        {currencyTotal > 0 && (
          <div className="mt-4 ">
            <p className="text-2xl text-title dark:text-titleDark">
              {nameCoins.todas.map((coin) => (
                <span key={coin.code}>
                  {coin.code === currencyDestination && coin['data-unit']}
                </span>
              ))}
              {currencyTotal.toFixed(2)}
            </p>
            <span className="text-xs text-text dark:text-textDark">
              Cotação atualizada em{' '}
              {format(new Date(updateCurrencyDate), 'dd/MM/yyyy HH:mm')} | Fonte
              <a
                href="https://docs.awesomeapi.com.br/api-de-moedas"
                target="_blank"
                rel="noreferrer"
                className="text-secondary dark:text-secondaryDark"
              >
                {' '}
                AwesomeAPI
              </a>
            </span>
          </div>
        )}
      </div>
    </MyDialog>
  );
}
