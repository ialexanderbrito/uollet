import CurrencyInput from 'react-currency-input-field';

import incomeIcon from 'assets/income.svg';
import outcomeIcon from 'assets/outcome.svg';

import { BottomNavigator } from 'components/BottomNavigator';

import { category } from 'utils/category';

import { useRegister } from 'hooks/useRegister';

export interface FinancesProps {
  id: number;
  created_at: Date;
  title: string;
  value: number;
  category: string;
  user_id: string;
  type: string;
  date: string;
}

export function Register() {
  const { formik } = useRegister();

  return (
    <div className="flex w-full flex-col items-center bg-background dark:bg-backgroundDark">
      <div className="flex h-24 w-full flex-row bg-primary dark:bg-primaryDark">
        <div className="flex w-full items-center justify-center">
          <p className="text-lg font-normal text-white">Cadastro</p>
        </div>
      </div>

      <form className="flex w-full flex-col" onSubmit={formik.handleSubmit}>
        <div className="flex min-h-[85vh] w-full flex-col gap-4 p-4">
          <input
            type="text"
            className={`h-14 w-full rounded-lg bg-white p-4 text-title outline-none dark:bg-backgroundCardDark dark:text-titleDark ${
              formik.errors.title && formik.touched.title
                ? 'border-[1.5px] border-red-500'
                : ''
            }`}
            placeholder="Nome"
            {...formik.getFieldProps('title')}
          />
          <CurrencyInput
            prefix="R$ "
            placeholder="R$ 0,00"
            decimalsLimit={2}
            decimalSeparator=","
            groupSeparator="."
            value={formik.values.value}
            onValueChange={(value) => {
              formik.setFieldValue('value', value);
            }}
            className={`h-14 w-full rounded-lg bg-white p-4 text-title outline-none dark:bg-backgroundCardDark dark:text-titleDark ${
              formik.errors.value && formik.touched.value
                ? 'border-[1.5px] border-red-500'
                : ''
            }`}
          />

          <div className="flex w-full flex-row justify-around gap-4 p-1">
            <div
              className={`flex h-16 w-full cursor-pointer flex-row items-center justify-evenly rounded-md border-[1.5px] border-solid border-text ${
                formik.values.type === 'income'
                  ? 'border-none bg-[#e7f5e7]'
                  : ''
              }`}
              onClick={() => {
                formik.setFieldValue('type', 'income');
              }}
            >
              <img src={incomeIcon} alt="Entrada" className="h-6 w-6" />
              <p
                className={`
                text-text ${formik.values.type === 'income' ? 'text-title' : ''}
              `}
              >
                Entrada
              </p>
            </div>

            <div
              className={`flex h-16  w-full cursor-pointer flex-row items-center justify-evenly rounded-md border-[1.5px] border-solid border-text ${
                formik.values.type === 'outcome'
                  ? 'border-none bg-[#fddede]'
                  : ''
              }`}
              onClick={() => {
                formik.setFieldValue('type', 'outcome');
              }}
            >
              <img src={outcomeIcon} alt="Saída" className="h-6 w-6" />
              <p
                className={`text-text ${
                  formik.values.type === 'outcome' ? 'text-title' : ''
                }`}
              >
                Saída
              </p>
            </div>
          </div>
          <div className="mt-[-1rem] flex w-full flex-col gap-4 pl-2">
            {formik.errors.type && formik.touched.type ? (
              <span className="text-xs text-red-500">{formik.errors.type}</span>
            ) : null}
          </div>
          <select
            id="category"
            className={`h-14 w-full rounded-lg bg-white p-4 text-title outline-none dark:bg-backgroundCardDark dark:text-titleDark ${
              formik.errors.category && formik.touched.category
                ? 'border-[1.5px] border-red-500'
                : ''
            }`}
            {...formik.getFieldProps('category')}
          >
            <option
              value=""
              disabled
              className="h-14 w-full rounded-lg bg-white p-4 text-title dark:bg-backgroundCardDark dark:text-titleDark"
            >
              Categoria
            </option>
            {category.map((item) => (
              <option
                key={item.name}
                value={item.name}
                className="h-14 w-full rounded-lg bg-white p-4 text-title dark:bg-backgroundCardDark dark:text-titleDark"
              >
                {item.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            className={`h-14 w-full rounded-lg bg-white p-4 text-title outline-none dark:bg-backgroundCardDark dark:text-titleDark ${
              formik.errors.date && formik.touched.date
                ? 'border-[1.5px] border-red-500'
                : ''
            }`}
            placeholder="DD/MM/AAAA"
            {...formik.getFieldProps('date')}
          />
          <div className="flex flex-col items-center justify-end gap-4">
            <button
              type="submit"
              className="h-14 w-full rounded-lg bg-secondary p-4 text-white dark:bg-secondaryDark"
            >
              Enviar
            </button>
          </div>
        </div>
      </form>

      <BottomNavigator />
    </div>
  );
}
