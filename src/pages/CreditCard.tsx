import { TwitterPicker } from 'react-color';
import CurrencyInput from 'react-currency-input-field';

import { CreditCard as CreditCardComponent } from 'components/CreditCard';
import { Header } from 'components/Header';
import { Select } from 'components/Select';

import { formatCurrency } from 'utils/formatCurrency';

import { useTheme } from 'contexts/Theme';

import { useCreditCard } from 'hooks/useCreditCard';

export function CreditCard() {
  const { theme } = useTheme();
  const { formik, days, defaultsColors } = useCreditCard();

  return (
    <div className="flex w-full flex-col items-center bg-background dark:bg-backgroundDark">
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
            className={`h-14 w-full rounded-lg bg-white p-4 text-title outline-none dark:bg-backgroundCardDark dark:text-titleDark ${
              formik.errors.cardNumber && formik.touched.cardNumber
                ? 'border-[1.5px] border-red-500'
                : ''
            }`}
            placeholder="Os 6 primeiros dígitos do cartão"
            {...formik.getFieldProps('cardNumber')}
            maxLength={6}
          />

          <input
            type="text"
            className={`h-14 w-full rounded-lg bg-white p-4 text-title outline-none dark:bg-backgroundCardDark dark:text-titleDark ${
              formik.errors.cardName && formik.touched.cardName
                ? 'border-[1.5px] border-red-500'
                : ''
            }`}
            placeholder="Nome do cartão"
            {...formik.getFieldProps('cardName')}
          />

          <CurrencyInput
            className={`h-14 w-full rounded-lg bg-white p-4 text-title outline-none dark:bg-backgroundCardDark dark:text-titleDark ${
              formik.errors.limit && formik.touched.limit
                ? 'border-[1.5px] border-red-500'
                : ''
            }`}
            placeholder="Adicione o limite do seu cartão"
            intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
            value={formik.values.limit}
            onValueChange={(value) => formik.setFieldValue('limit', value)}
            onBlur={formik.handleBlur}
          />

          <Select
            options={days}
            selected={formik.values.dayClosure}
            setSelected={(value) => formik.setFieldValue('dayClosure', value)}
            placeholder="Dia de fechamento"
            className={`h-14 w-full rounded-lg bg-white p-4 text-title outline-none dark:bg-backgroundCardDark dark:text-titleDark ${
              formik.errors.dayClosure && formik.touched.dayClosure
                ? 'border-[1.5px] border-red-500'
                : ''
            }`}
          />
          <Select
            options={days}
            selected={formik.values.dayMaturity}
            setSelected={(value) => formik.setFieldValue('dayMaturity', value)}
            placeholder="Dia de vencimento"
            className={`h-14 w-full rounded-lg bg-white p-4 text-title outline-none dark:bg-backgroundCardDark dark:text-titleDark ${
              formik.errors.dayMaturity && formik.touched.dayMaturity
                ? 'border-[1.5px] border-red-500'
                : ''
            }`}
          />

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
                      background: theme === 'light' ? '#fff' : '#181a1b',
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
                      background: theme === 'light' ? '#fff' : '#181a1b',
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-end gap-4">
            <button
              type="submit"
              className="h-14 w-full rounded-lg bg-secondary p-4 text-white dark:bg-secondaryDark"
            >
              Salvar Cartão
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
