import { useEffect } from 'react';
import { CurrencyInput as CurrencyInputMask } from 'react-currency-mask';

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
    swapCurrency,
    handleSwapCurrency,
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
              className="text-xs font-bold uppercase text-text dark:text-text-dark"
            >
              Converter de
            </label>
            <select
              className="h-14 w-full rounded-md border-[1.5px] border-solid bg-background-card text-sm accent-primary focus:border-primary dark:border-background-card-dark dark:bg-background-card-dark dark:text-text-dark dark:accent-primary-dark focus:dark:border-primary-dark"
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
                'h-6 w-6 cursor-pointer text-primary transition-colors dark:text-white',
                swapCurrency && 'rotate-180 transform transition-transform',
                !swapCurrency && 'transform transition-transform',
              )}
              onClick={() => handleSwapCurrency()}
            />
          </div>

          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor="moedaDestino"
              className="text-xs font-bold uppercase text-text dark:text-text-dark"
            >
              Para
            </label>
            <select
              className="h-14 w-full rounded-md border-[1.5px] border-solid bg-background-card text-sm accent-primary focus:border-primary dark:border-background-card-dark dark:bg-background-card-dark dark:text-text-dark dark:accent-primary-dark focus:dark:border-primary-dark"
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

        <CurrencyInputMask
          onChangeValue={(event, originalValue, maskedValue) => {
            setCurrencyValue(String(originalValue));
          }}
          InputElement={
            <input
              type="text"
              className="h-14 rounded-md bg-background-card pl-2 dark:bg-background-card-dark dark:text-text-dark"
              placeholder="Valor"
            />
          }
        />

        {currencyTotal > 0 && (
          <div className="mt-4 ">
            <p className="text-2xl text-title dark:text-title-dark">
              {nameCoins.todas.map((coin) => (
                <span key={coin.code}>
                  {coin.code === currencyDestination && coin['data-unit']}
                </span>
              ))}
              {currencyTotal.toFixed(2)}
            </p>
            <span className="text-xs text-text dark:text-text-dark">
              Cotação atualizada em{' '}
              {format(new Date(updateCurrencyDate), 'dd/MM/yyyy HH:mm')} | Fonte
              <a
                href="https://docs.awesomeapi.com.br/api-de-moedas"
                target="_blank"
                rel="noreferrer"
                className="text-primary dark:text-primary-dark"
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
