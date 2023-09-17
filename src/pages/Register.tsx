import CurrencyInput from 'react-currency-input-field';
import { useParams } from 'react-router-dom';

import { Switch } from '@headlessui/react';
import incomeIcon from 'assets/income.svg';
import outcomeIcon from 'assets/outcome.svg';

import { Autocomplete } from 'components/Autocomplete';
import { BottomNavigator } from 'components/BottomNavigator';
import { DatePickerInput } from 'components/DatePickerInput';
import { Header } from 'components/Header';
import { InputError } from 'components/InputError';
import { MyDialog } from 'components/Modal';
import { Recurrency } from 'components/Recurrency';

import { cn } from 'utils/cn';

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
  } = useRegister();

  return (
    <div className="flex w-full flex-col items-center bg-background dark:bg-backgroundDark">
      <Header title="Cadastro" />

      <form className="flex w-full flex-col" onSubmit={formik.handleSubmit}>
        <div className="flex h-screen w-full flex-col gap-4 p-4">
          <input
            type="text"
            className={cn(
              'h-14 w-full rounded-lg bg-white p-4 text-title outline-none dark:bg-backgroundCardDark dark:text-titleDark',
              formik.errors.title &&
                formik.touched.title &&
                'border-[1.5px] border-red-500',
            )}
            placeholder="Nome"
            {...formik.getFieldProps('title')}
          />
          {formik.errors.title && formik.touched.title && (
            <InputError error={true} message={formik.errors.title} />
          )}

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
            className={cn(
              'h-14 w-full rounded-lg bg-white p-4 text-title outline-none dark:bg-backgroundCardDark dark:text-titleDark',
              formik.errors.value &&
                formik.touched.value &&
                'border-[1.5px] border-red-500',
            )}
          />
          {formik.errors.value && formik.touched.value && (
            <InputError error={true} message={formik.errors.value} />
          )}

          <div className="flex w-full flex-row justify-around gap-4 p-1">
            <div
              className={cn(
                'flex h-16 w-full cursor-pointer flex-row items-center justify-evenly rounded-md bg-white dark:bg-backgroundCardDark',
                formik.values.type === 'income' &&
                  'border-none bg-[#e7f5e7] dark:bg-[#e7f5e7]',
                formik.errors.type &&
                  formik.touched.type &&
                  'border-[1.5px] border-red-500',
              )}
              onClick={() => {
                formik.setFieldValue('type', 'income');
              }}
            >
              <img src={incomeIcon} alt="Entrada" className="h-6 w-6" />
              <p
                className={cn(
                  'text-text',
                  formik.values.type === 'income' && 'text-title',
                )}
              >
                Entrada
              </p>
            </div>

            <div
              className={cn(
                'flex h-16  w-full cursor-pointer flex-row items-center justify-evenly rounded-md border-text bg-white dark:bg-backgroundCardDark',
                formik.values.type === 'outcome' &&
                  'border-none bg-[#fddede] dark:bg-[#fddede] ',
                formik.errors.type &&
                  formik.touched.type &&
                  'border-[1.5px] border-red-500',
              )}
              onClick={() => {
                formik.setFieldValue('type', 'outcome');
              }}
            >
              <img src={outcomeIcon} alt="Saída" className="h-6 w-6" />
              <p
                className={cn(
                  'text-text',
                  formik.values.type === 'outcome' && 'text-title',
                )}
              >
                Saída
              </p>
            </div>
          </div>

          {formik.errors.type && formik.touched.type && (
            <InputError error={true} message={formik.errors.type} />
          )}

          <Autocomplete
            selected={formik.values.category}
            setSelected={(value) => {
              formik.setFieldValue('category', value);
            }}
            options={categories}
            className={cn(
              formik.errors.category &&
                formik.touched.category &&
                'border-[1.5px] border-red-500',
            )}
          />
          {formik.errors.category && formik.touched.category && (
            <InputError
              error={true}
              message={formik.errors.category.name as string}
            />
          )}

          <DatePickerInput
            onChange={(date) => {
              formik.setFieldValue('date', date);
            }}
            value={formik.values.date}
            error={formik.errors.date && formik.touched.date}
          />
          {formik.errors.date && formik.touched.date && (
            <InputError error={true} message={formik.errors.date} />
          )}

          <div className="switch flex w-full flex-row items-center justify-end">
            <Switch
              checked={Boolean(formik.values.recurrency)}
              onChange={() => handleSwitch()}
              className={cn(
                'switch relative inline-flex h-6 w-11 items-center rounded-full',
                isRecurring ? 'bg-success' : 'bg-danger',
              )}
            >
              <span
                className={cn(
                  'switch inline-block h-5 w-5 transform rounded-full bg-white',
                  isRecurring ? 'translate-x-6' : 'translate-x-1',
                )}
              />
            </Switch>
            <span
              className="switch ml-2 cursor-pointer text-sm text-text"
              onClick={() => {
                setOpenBottomSheet(true);
              }}
            >
              {!isCategoryCreditCard(formik.values.category.name)
                ? 'Compra parcelada'
                : 'Receita recorrente'}
            </span>
          </div>

          <MyDialog
            isOpen={openBottomSheet}
            closeModal={() => {
              setOpenBottomSheet(false);
            }}
            title={
              !isCategoryCreditCard(formik.values.category.name)
                ? 'Quantas parcelas?'
                : 'A receita se repete a cada:'
            }
            buttonPrimary
          >
            {!isCategoryCreditCard(formik.values.category.name) ? (
              <Recurrency
                formik={formik}
                setOpenBottomSheet={setOpenBottomSheet}
                isParcel={true}
              />
            ) : (
              <Recurrency
                formik={formik}
                setOpenBottomSheet={setOpenBottomSheet}
                isRecurring={true}
              />
            )}
          </MyDialog>

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
