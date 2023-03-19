import incomeIcon from 'assets/income.svg';
import outcomeIcon from 'assets/outcome.svg';

import { BottomNavigator } from 'components/BottomNavigator';
import { InputMask } from 'components/InputMask';

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
  const { formik, setValor, valor } = useRegister();

  return (
    <div className="flex w-full flex-col items-center bg-background dark:bg-backgroundDark">
      <div className="bg-primary flex w-full h-24 flex-row">
        <div className="flex w-full items-center justify-center">
          <p className="text-white font-normal text-lg">Cadastro</p>
        </div>
      </div>

      <form className="flex flex-col w-full" onSubmit={formik.handleSubmit}>
        <div className="flex w-full flex-col gap-4 p-4 min-h-[85vh]">
          <input
            type="text"
            className={`bg-white rounded-lg p-4 w-full h-14 outline-none dark:bg-backgroundCardDark text-title dark:text-titleDark ${
              formik.errors.title && formik.touched.title
                ? 'border-[1.5px] border-red-500'
                : ''
            }`}
            placeholder="Nome"
            {...formik.getFieldProps('title')}
          />

          <InputMask
            id="value"
            setValor={setValor}
            {...formik.getFieldProps('value')}
            className={`bg-white rounded-lg p-4 w-full h-14 outline-none dark:bg-backgroundCardDark text-title dark:text-titleDark ${
              !valor && formik.errors.value && formik.touched.value
                ? 'border-[1.5px] border-red-500'
                : ''
            }`}
          />

          <div className="flex flex-row w-full justify-around gap-4 p-1">
            <div
              className={`flex flex-row w-full h-16 items-center justify-evenly rounded-md border-solid border-text border-[1.5px] ${
                formik.values.type === 'income'
                  ? 'bg-[#e7f5e7] border-none'
                  : ''
              }`}
              onClick={() => {
                formik.setFieldValue('type', 'income');
              }}
            >
              <img src={incomeIcon} alt="Entrada" className="w-6 h-6" />
              <p className="text-title dark:text-titleDark">Entrada</p>
            </div>

            <div
              className={`flex flex-row  w-full h-16 items-center justify-evenly rounded-md border-solid border-text border-[1.5px] ${
                formik.values.type === 'outcome'
                  ? 'bg-[#fddede] border-none'
                  : ''
              }`}
              onClick={() => {
                formik.setFieldValue('type', 'outcome');
              }}
            >
              <img src={outcomeIcon} alt="Saída" className="w-6 h-6" />
              <p className="text-title dark:text-titleDark">Saída</p>
            </div>
          </div>

          <div className="flex flex-col w-full gap-4 pl-2 mt-[-1rem]">
            {formik.errors.type && formik.touched.type ? (
              <span className="text-red-500 text-xs">{formik.errors.type}</span>
            ) : null}
          </div>

          <select
            id="category"
            className={`bg-white rounded-lg p-4 w-full h-14 outline-none dark:bg-backgroundCardDark text-title dark:text-titleDark ${
              formik.errors.category && formik.touched.category
                ? 'border-[1.5px] border-red-500'
                : ''
            }`}
            {...formik.getFieldProps('category')}
          >
            <option
              value=""
              disabled
              className="bg-white rounded-lg p-4 w-full h-14 dark:bg-backgroundCardDark text-title dark:text-titleDark"
            >
              Categoria
            </option>
            {category.map((item) => (
              <option
                key={item.name}
                value={item.name}
                className="bg-white rounded-lg p-4 w-full h-14 dark:bg-backgroundCardDark text-title dark:text-titleDark"
              >
                {item.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            className={`bg-white rounded-lg p-4 w-full h-14 outline-none dark:bg-backgroundCardDark text-title dark:text-titleDark ${
              formik.errors.date && formik.touched.date
                ? 'border-[1.5px] border-red-500'
                : ''
            }`}
            placeholder="Data"
            {...formik.getFieldProps('date')}
          />

          <div className="flex flex-col gap-4 items-center justify-end">
            <button
              type="submit"
              className="bg-secondary text-white rounded-lg p-4 w-full h-14 dark:bg-secondaryDark"
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
