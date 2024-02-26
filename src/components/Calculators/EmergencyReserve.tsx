import { CurrencyInput as CurrencyInputMask } from 'react-currency-mask';

import { Jelly } from '@uiball/loaders';

import { useCalculator } from 'hooks/useCalculator';

import { Button } from '../Button';
import { Input } from '../Input';
import { MyDialog } from '../Modal';

interface EmergencyReserveProps {
  openModalEmergencyReserve: boolean;
  setOpenModalEmergencyReserve: (value: boolean) => void;
}

export function EmergencyReserve({
  openModalEmergencyReserve,
  setOpenModalEmergencyReserve,
}: EmergencyReserveProps) {
  const {
    formikEmergencyReserve,
    loading,
    montante,
    porcentagem,
    monthlySuccess,
  } = useCalculator();

  return (
    <MyDialog
      closeModal={() => setOpenModalEmergencyReserve(false)}
      isOpen={openModalEmergencyReserve}
      title="Reserva de emergência"
      description="Calcule quanto você precisa guardar para ter uma reserva de emergência."
      size="2xl"
    >
      <div className="mt-8 flex flex-col gap-2">
        <label
          htmlFor="profession"
          className="text-xs font-bold uppercase text-text dark:text-text-dark"
        >
          Selecione sua profissão
        </label>
        <div className="flex flex-row gap-2">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="funcionarioPublico"
              {...formikEmergencyReserve.getFieldProps('profession')}
              value="funcionarioPublico"
            />
            <label htmlFor="funcionarioPublico">Funcionário Público</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="CLT"
              {...formikEmergencyReserve.getFieldProps('profession')}
              value="CLT"
            />
            <label htmlFor="CLT">CLT</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="MEI"
              {...formikEmergencyReserve.getFieldProps('profession')}
              value="MEI"
            />
            <label htmlFor="MEI">MEI/Autônomo/Empreendedor</label>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <div className="flex w-full flex-col justify-center gap-2">
            <CurrencyInputMask
              onChangeValue={(event, originalValue, maskedValue) => {
                formikEmergencyReserve.setFieldValue(
                  'fixedCost',
                  originalValue,
                );
              }}
              InputElement={
                <Input
                  label="Custo fixo mensal"
                  type="tel"
                  className="h-14 rounded-md bg-background-card pl-2 dark:bg-background-card-dark dark:text-text-dark"
                  placeholder="R$ 0,00"
                />
              }
            />
          </div>
          <div className="mt-5 flex items-center justify-center"></div>

          <div className="flex w-full flex-col gap-2">
            <CurrencyInputMask
              onChangeValue={(event, originalValue, maskedValue) => {
                formikEmergencyReserve.setFieldValue(
                  'monthlySalary',
                  originalValue,
                );
              }}
              InputElement={
                <Input
                  label="Salário mensal"
                  type="tel"
                  className="h-14 rounded-md bg-background-card pl-2 dark:bg-background-card-dark dark:text-text-dark"
                  placeholder="R$ 0,00"
                />
              }
            />
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-2">
          <label
            htmlFor="percentageToSave"
            className="text-xs font-bold uppercase text-text dark:text-text-dark"
          >
            Quanto você guarda por mês?
          </label>
          <div className="flex flex-row gap-2">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="5"
                {...formikEmergencyReserve.getFieldProps('percentageToSave')}
                value="5"
              />
              <label htmlFor="5">5%</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="10"
                {...formikEmergencyReserve.getFieldProps('percentageToSave')}
                value="10"
              />
              <label htmlFor="10">10%</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="20"
                {...formikEmergencyReserve.getFieldProps('percentageToSave')}
                value="20"
              />
              <label htmlFor="20">20%</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="30"
                {...formikEmergencyReserve.getFieldProps('percentageToSave')}
                value="30"
              />
              <label htmlFor="30">30%</label>
            </div>
          </div>
        </div>

        {montante > 0 && !loading && (
          <div className="flex w-full flex-col gap-2">
            <p className="text-xs text-text dark:text-text-dark">
              Quanto vou receber no final do período?
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <p className="rounded border border-title p-2 text-base font-bold text-text dark:text-text-dark">
                Sua reserva de ser de: <br />
                <span>R$ {montante.toFixed(2)}</span>
              </p>
              <p className="rounded border border-title p-2 text-base font-bold text-text dark:text-text-dark">
                Guardando
                <br />
                <span>{porcentagem}% </span>
                do seu salário
              </p>
              <p className="rounded border border-title p-2 text-base font-bold text-text dark:text-text-dark">
                Em <span>{monthlySuccess} meses</span> atingirá sua reserva.
              </p>
            </div>
          </div>
        )}

        <div className="-mb-4 mt-2 flex w-full flex-col gap-2">
          <Button
            type="button"
            onClick={() => {
              formikEmergencyReserve.handleSubmit();
            }}
          >
            {loading ? <Jelly size={20} color="#fff" /> : 'Calcular'}
          </Button>
        </div>
      </div>
    </MyDialog>
  );
}
