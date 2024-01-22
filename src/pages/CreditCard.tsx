import { TwitterPicker } from 'react-color';
import { CurrencyInput as CurrencyInputMask } from 'react-currency-mask';

import { Button } from 'components/Button';
import { CreditCard as CreditCardComponent } from 'components/CreditCard';
import { Header } from 'components/Header';
import { InputError } from 'components/InputError';
import { Select } from 'components/Select';

import { cn } from 'utils/cn';
import { formatCurrency } from 'utils/formatCurrency';

import { useTheme } from 'contexts/Theme';

import { useCreditCard } from 'hooks/useCreditCard';

export function CreditCard() {
  const { theme } = useTheme();
  const { formik, days, defaultsColors } = useCreditCard();

  return (
    <div className="flex w-full flex-col items-center bg-background dark:bg-background-dark">
      <Header title="Cadastrar cartão" />

      <div className="mt-4 flex w-full flex-col items-center">
        <CreditCardComponent
          creditNumber={formik.values.cardNumber}
          cardName={formik.values.cardName}
          bgColor={formik.values.backgroundColorCreditCard || '#262d3d'}
          textColor={formik.values.textColorCreditCard || '#fff'}
          limit={formatCurrency(Number(formik.values.limit) || 0)}
          closure={Number(formik.values.dayClosure.name) || 1}
          maturity={Number(formik.values.dayMaturity.name) || 1}
          visible={false}
        />
      </div>

      <form className="flex w-full flex-col" onSubmit={formik.handleSubmit}>
        <div className="flex h-screen w-full flex-col gap-4 p-4">
          <input
            type="text"
            className={cn(
              'h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark',
              formik.errors.cardNumber &&
                formik.touched.cardNumber &&
                'border-[1.5px] border-danger',
            )}
            placeholder="Os 6 primeiros dígitos do cartão"
            {...formik.getFieldProps('cardNumber')}
            maxLength={6}
          />
          {formik.errors.cardNumber && formik.touched.cardNumber && (
            <InputError error={true} message={formik.errors.cardNumber} />
          )}

          <input
            type="text"
            className={cn(
              'h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark',
              formik.errors.cardName &&
                formik.touched.cardName &&
                'border-[1.5px] border-danger',
            )}
            placeholder="Nome do cartão"
            {...formik.getFieldProps('cardName')}
          />
          {formik.errors.cardName && formik.touched.cardName && (
            <InputError error={true} message={formik.errors.cardName} />
          )}

          <CurrencyInputMask
            value={formik.values.limit}
            onChangeValue={(event, originalValue, maskedValue) => {
              formik.setFieldValue('limit', originalValue);
            }}
            onBlur={formik.handleBlur}
            InputElement={
              <input
                type="tel"
                className={cn(
                  'h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark',
                  formik.errors.limit &&
                    formik.touched.limit &&
                    'border-[1.5px] border-danger',
                )}
                placeholder="Adicione o limite do seu cartão R$ 0,00"
                onBlur={formik.handleBlur}
              />
            }
          />

          {formik.errors.limit && formik.touched.limit && (
            <InputError error={true} message={formik.errors.limit} />
          )}

          <Select
            options={days}
            selected={formik.values.dayClosure}
            setSelected={(value) => formik.setFieldValue('dayClosure', value)}
            placeholder="Dia de fechamento"
            className={cn(
              'h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none dark:bg-background-card-dark dark:text-title-dark',
              formik.errors.dayClosure &&
                formik.touched.dayClosure &&
                'border-[1.5px] border-danger',
            )}
          />
          {formik.errors.dayClosure && formik.touched.dayClosure && (
            <InputError
              error={true}
              message={formik.errors.dayClosure.name as string}
            />
          )}

          <Select
            options={days}
            selected={formik.values.dayMaturity}
            setSelected={(value) => formik.setFieldValue('dayMaturity', value)}
            placeholder="Dia de vencimento"
            className={`h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none dark:bg-background-card-dark dark:text-title-dark ${
              formik.errors.dayMaturity && formik.touched.dayMaturity
                ? 'border-[1.5px] border-danger'
                : ''
            }`}
          />
          {formik.errors.dayMaturity && formik.touched.dayMaturity && (
            <InputError
              error={true}
              message={formik.errors.dayMaturity.name as string}
            />
          )}

          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-row items-center gap-4">
              <p className="text-title dark:text-gray-500">Cor do cartão</p>

              <TwitterPicker
                triangle="hide"
                color={formik.values.backgroundColorCreditCard}
                colors={defaultsColors}
                width="100%"
                onChangeComplete={(color) => {
                  formik.setFieldValue('backgroundColorCreditCard', color.hex);
                }}
                styles={{
                  default: {
                    card: {
                      background: theme === 'light' ? '#fff' : '#2D2D2D',
                    },
                  },
                }}
              />
            </div>
            <div className="flex flex-row items-center gap-7">
              <p className="text-title dark:text-gray-500">Cor da fonte</p>

              <TwitterPicker
                triangle="hide"
                color={formik.values.textColorCreditCard}
                colors={defaultsColors}
                width="100%"
                onChangeComplete={(color) => {
                  formik.setFieldValue('textColorCreditCard', color.hex);
                }}
                styles={{
                  default: {
                    card: {
                      background: theme === 'light' ? '#fff' : '#2D2D2D',
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-end gap-4">
            <Button type="submit">Salvar Cartão</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
