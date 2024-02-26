import { CurrencyInput as CurrencyInputMask } from 'react-currency-mask';

import { Jelly } from '@uiball/loaders';

import { formatCurrency } from 'utils';

import { useCalculator } from 'hooks/useCalculator';

import { Button } from '../Button';
import { Input } from '../Input';
import { MyDialog } from '../Modal';

interface CompoundInterestProps {
  openModalCalculator: boolean;
  setOpenModalCalculator: (value: boolean) => void;
}

export function CompoundInterest({
  openModalCalculator,
  setOpenModalCalculator,
}: CompoundInterestProps) {
  const { formik, montante, loading, totalJuros, totalInvestido, resetForm } =
    useCalculator();

  return (
    <MyDialog
      closeModal={() => {
        setOpenModalCalculator(false);
        resetForm();
      }}
      isOpen={openModalCalculator}
      title="Calculadora de Juros Compostos"
      description="Calcule o valor final de um investimento com juros compostos."
      size="2xl"
    >
      <div className="mt-8 flex flex-col gap-2">
        <label
          htmlFor="typeOfInvestment"
          className="text-xs font-bold uppercase text-text dark:text-text-dark"
        >
          Selecione o período do investimento
        </label>
        <select
          className="h-14 rounded-md bg-background-card pl-2 dark:bg-background-card-dark dark:text-text-dark"
          {...formik.getFieldProps('typeOfInvestment')}
        >
          <option value="mensal">Mensal</option>
          <option value="anual">Anual</option>
        </select>
        <div className="flex flex-col items-center justify-center sm:flex-row sm:gap-2">
          <div className="flex w-full flex-col justify-center gap-2">
            <CurrencyInputMask
              onChangeValue={(event, originalValue, maskedValue) => {
                formik.setFieldValue('initialValue', originalValue);
              }}
              InputElement={
                <Input
                  label="Valor inicial"
                  type="tel"
                  className="h-14 rounded-md bg-background-card pl-2 text-title dark:bg-background-card-dark dark:text-title-dark"
                  placeholder="R$ 0,00"
                />
              }
            />
          </div>
          <div className="mt-5 flex items-center justify-center"></div>

          <div className="flex w-full flex-col gap-2">
            <CurrencyInputMask
              onChangeValue={(event, originalValue, maskedValue) => {
                formik.setFieldValue('monthlyContributions', originalValue);
              }}
              InputElement={
                <Input
                  label="Aportes mensais"
                  type="tel"
                  className="h-14 rounded-md bg-background-card pl-2 text-title dark:bg-background-card-dark dark:text-title-dark"
                  placeholder="R$ 0,00"
                />
              }
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-2"></div>

        <div className="flex flex-col items-center justify-center sm:flex-row sm:gap-2">
          <div className="flex w-full flex-col gap-2">
            <Input
              label={`Taxa de juros ${
                formik.values.typeOfInvestment === 'anual' ? '(ano)' : '(mês)'
              }`}
              type="number"
              placeholder="0%"
              required
              {...formik.getFieldProps('interestRate')}
              name="interestRate"
            />
          </div>
          <div className="mt-5 flex items-center justify-center"></div>
          <div className="flex w-full flex-col gap-2">
            <Input
              label={`Período ${
                formik.values.typeOfInvestment === 'anual'
                  ? '(anos)'
                  : '(meses)'
              } `}
              type="number"
              placeholder="0"
              required
              {...formik.getFieldProps('period')}
              name="period"
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2"></div>

        {montante > 0 && !loading && (
          <div className="flex w-full flex-col gap-2">
            <p className="text-xs text-text dark:text-text-dark">
              Quanto vou receber no final do período?
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <p className="rounded border border-title p-2 text-xl font-bold text-text dark:text-text-dark">
                Total de juros: <br />
                <span className="text-success">
                  {formatCurrency(totalJuros)}
                </span>
              </p>
              <p className="rounded border border-title p-2 text-xl font-bold text-text dark:text-text-dark">
                Total investido: <br />
                <span className="text-success">
                  {formatCurrency(totalInvestido)}
                </span>
              </p>
              <p className="rounded border border-title p-2 text-xl font-bold text-text dark:text-text-dark">
                Valor total: <br />
                <span className="text-success">{formatCurrency(montante)}</span>
              </p>
            </div>
          </div>
        )}

        <div className="-mb-4 mt-2 flex w-full flex-col gap-2">
          <Button
            type="button"
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            {loading ? <Jelly size={20} color="#fff" /> : 'Calcular'}
          </Button>
        </div>
      </div>
    </MyDialog>
  );
}
