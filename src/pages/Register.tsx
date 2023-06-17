import CurrencyInput from 'react-currency-input-field';
import { useParams } from 'react-router-dom';
import { BottomSheet } from 'react-spring-bottom-sheet';

import { Switch } from '@headlessui/react';
import incomeIcon from 'assets/income.svg';
import outcomeIcon from 'assets/outcome.svg';

import { Autocomplete } from 'components/Autocomplete';
import { BottomNavigator } from 'components/BottomNavigator';
import { Header } from 'components/Header';
import { Recurrency } from 'components/Recurrency';

import { useRegister } from 'hooks/useRegister';

export function Register() {
  const { id } = useParams();
  const {
    formik,
    isRecurring,
    handleSwitch,
    openBottomSheet,
    setOpenBottomSheet,
    categories,
    isCategoryCreditCard,
    verifyOpenBottomSheet,
  } = useRegister();

  return (
    <div className="flex w-full flex-col items-center bg-background dark:bg-backgroundDark">
      <Header title="Cadastro" />

      <form className="flex w-full flex-col" onSubmit={formik.handleSubmit}>
        <div className="flex h-screen w-full flex-col gap-4 p-4">
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
          <Autocomplete
            selected={formik.values.category}
            setSelected={(value) => {
              formik.setFieldValue('category', value);
            }}
            options={categories}
            className={`${
              formik.errors.category && formik.touched.category
                ? 'border-[1.5px] border-red-500'
                : ''
            }`}
          />
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

          <div className="switch flex w-full flex-row items-center justify-end">
            <Switch
              checked={Boolean(formik.values.recurrency)}
              onChange={() => handleSwitch()}
              className={`${
                isRecurring ? 'bg-success' : 'bg-danger'
              } switch relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  isRecurring ? 'translate-x-6' : 'translate-x-1'
                } switch inline-block h-4 w-4 transform rounded-full bg-white`}
              />
            </Switch>

            <span
              className="switch ml-2 cursor-pointer text-sm text-text"
              onClick={() => {
                setOpenBottomSheet(!openBottomSheet);
              }}
            >
              {!isCategoryCreditCard(formik.values.category.name)
                ? 'Compra parcelada'
                : 'Receita recorrente'}
            </span>
          </div>

          <BottomSheet
            open={openBottomSheet}
            defaultSnap={0}
            onDismiss={() => {
              verifyOpenBottomSheet(formik.values.category.name);
              setOpenBottomSheet(false);
            }}
            snapPoints={({ maxHeight }) =>
              isCategoryCreditCard(formik.values.category.name)
                ? [maxHeight - 480]
                : [maxHeight - 540]
            }
          >
            {!isCategoryCreditCard(formik.values.category.name) ? (
              <>
                <Recurrency
                  formik={formik}
                  setOpenBottomSheet={setOpenBottomSheet}
                  isParcel={true}
                />
              </>
            ) : (
              <Recurrency
                formik={formik}
                setOpenBottomSheet={setOpenBottomSheet}
                isRecurring={true}
              />
            )}
          </BottomSheet>
          <div className="flex flex-col items-center justify-end gap-4">
            <button
              type="submit"
              className="h-14 w-full rounded-lg bg-secondary p-4 text-white dark:bg-secondaryDark"
            >
              {id ? 'Editar' : 'Cadastrar'}
            </button>
          </div>
        </div>
      </form>

      <BottomNavigator />
    </div>
  );
}
