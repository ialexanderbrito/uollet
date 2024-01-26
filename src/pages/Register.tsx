import { CurrencyInput as CurrencyInputMask } from 'react-currency-mask';
import { useParams } from 'react-router-dom';

import { Switch } from '@headlessui/react';
import incomeIcon from 'assets/income.svg';
import outcomeIcon from 'assets/outcome.svg';

import { Autocomplete } from 'components/Autocomplete';
import { BottomNavigator } from 'components/BottomNavigator';
import { Button } from 'components/Button';
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
    isGoal,
    setIsGoal,
    goalsList,
  } = useRegister();

  function handleIsGoalToggle() {
    setIsGoal(!isGoal);

    if (!isGoal) {
      formik.setFieldTouched('title', false);
      formik.setFieldTouched('title', false, false);
      formik.setFieldValue('title', formik.values.category.name);
      formik.setFieldValue('type', 'income');
    } else {
      formik.setFieldTouched('title', true);
      formik.setFieldTouched('title', true, false);
      formik.setFieldValue('category', {
        name: '',
        emoji: '',
        id: '',
      });
    }
  }

  const goalTitle = sessionStorage.getItem('@uollet:goal');

  if (goalTitle && !formik.values.title) {
    formik.setFieldValue('title', goalTitle);
    setIsGoal(true);
    formik.setFieldValue('type', 'income');
    formik.setFieldValue('category', {
      name: `${goalTitle}`,
      emoji: '🎯',
      id: '',
    });
    sessionStorage.removeItem('@uollet:goal');
  }

  return (
    <div className="flex w-full flex-col items-center bg-background dark:bg-background-dark">
      <Header title="Cadastro" />

      <form className="flex w-full flex-col" onSubmit={formik.handleSubmit}>
        <div className="flex h-screen w-full flex-col gap-4 p-4">
          <input
            type="text"
            className={cn(
              'h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-40 dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark',
              formik.errors.title &&
                formik.touched.title &&
                'border-[1.5px] border-danger',
            )}
            placeholder="Nome"
            disabled={isGoal}
            {...formik.getFieldProps('title')}
          />
          {formik.errors.title && formik.touched.title && (
            <InputError error={true} message={formik.errors.title} />
          )}

          <CurrencyInputMask
            value={formik.values.value}
            onChangeValue={(event, originalValue, maskedValue) => {
              formik.setFieldValue('value', originalValue);
            }}
            InputElement={
              <input
                type="tel"
                className={cn(
                  'h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark',
                  formik.errors.value &&
                    formik.touched.value &&
                    'border-[1.5px] border-danger',
                )}
                placeholder="Valor"
              />
            }
          />
          {formik.errors.value && formik.touched.value && (
            <InputError error={true} message={formik.errors.value} />
          )}

          <div className="ml-2 flex items-center gap-2">
            <p className="text-base text-text dark:text-text-dark">
              É uma meta
            </p>
            <input
              type="checkbox"
              className="h-4 w-4 rounded-md border-[1.5px] border-solid border-primary accent-primary dark:border-primary-dark dark:accent-primary-dark"
              checked={formik.values.category.name.includes('Meta') || isGoal}
              onChange={() => {
                handleIsGoalToggle();
              }}
            />
          </div>

          <div className="flex w-full flex-row justify-around gap-4 p-1">
            <button
              type="button"
              className={cn(
                'flex h-16 w-full cursor-pointer flex-row items-center justify-evenly rounded-md bg-background-card dark:bg-background-card-dark',
                formik.values.type === 'income' &&
                  'border-none bg-selected-income dark:bg-selected-income-dark',
                formik.errors.type &&
                  formik.touched.type &&
                  'border-[1.5px] border-danger',
              )}
              onClick={() => {
                formik.setFieldValue('type', 'income');
              }}
            >
              <img src={incomeIcon} alt="Entrada" className="h-6 w-6" />
              <p
                className={cn(
                  'text-text dark:text-text-dark',
                  formik.values.type === 'income' &&
                    'text-title dark:text-title-dark',
                )}
              >
                Entrada
              </p>
            </button>

            <button
              type="button"
              className={cn(
                'flex h-16 w-full cursor-pointer flex-row items-center justify-evenly rounded-md border-text bg-background-card disabled:cursor-not-allowed disabled:opacity-40 dark:bg-background-card-dark',
                formik.values.type === 'outcome' &&
                  'border-none bg-selected-outcome dark:bg-selected-outcome-dark',
                formik.errors.type &&
                  formik.touched.type &&
                  'border-[1.5px] border-danger',
              )}
              onClick={() => {
                formik.setFieldValue('type', 'outcome');
              }}
              disabled={isGoal}
            >
              <img src={outcomeIcon} alt="Saída" className="h-6 w-6" />
              <p
                className={cn(
                  'text-text dark:text-text-dark',
                  formik.values.type === 'outcome' &&
                    'text-title dark:text-title-dark',
                )}
              >
                Saída
              </p>
            </button>
          </div>

          {formik.errors.type && formik.touched.type && (
            <InputError error={true} message={formik.errors.type} />
          )}

          {isGoal ? (
            <>
              <Autocomplete
                placeholder='Ex: "Meta do carro"'
                selected={formik.values.category}
                setSelected={(value) => {
                  formik.setFieldValue('title', value.name);
                  formik.setFieldValue('category', value);
                }}
                options={goalsList}
                className={cn(
                  formik.errors.category &&
                    formik.touched.category &&
                    'border-[1.5px] border-danger',
                )}
                displayValue={(value) => value.name}
              />
              {formik.errors.category && formik.touched.category && (
                <InputError
                  error={true}
                  message={formik.errors.category.name as string}
                />
              )}
            </>
          ) : (
            <>
              <Autocomplete
                selected={formik.values.category}
                setSelected={(value) => {
                  formik.setFieldValue('category', value);
                }}
                options={categories}
                className={cn(
                  formik.errors.category &&
                    formik.touched.category &&
                    'border-[1.5px] border-danger',
                )}
                displayValue={(value) => value.name}
                displayImage={(value) => value.icon}
              />
              {formik.errors.category && formik.touched.category && (
                <InputError
                  error={true}
                  message={formik.errors.category.name as string}
                />
              )}
            </>
          )}
          <span className="ml-2 text-xs text-title dark:text-title-dark">
            Não achou sua conta?{' '}
            <a
              href="mailto:contato@uollet.com.br?subject=Adicionar%20conta%20no%20Uollet&body=Ol%C3%A1%2C%20gostaria%20de%20sugerir%20a%20conta%20%22%22%20no%20Uollet."
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer text-primary dark:text-primary-dark"
            >
              Sugira pra gente :)
            </a>
          </span>

          <DatePickerInput
            onChange={(date) => {
              formik.setFieldValue('date', date);
            }}
            value={formik.values.date}
            error={formik.errors.date && formik.touched.date}
            className="focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
          />
          {formik.errors.date && formik.touched.date && (
            <InputError error={true} message={formik.errors.date} />
          )}

          {isGoal ? (
            <></>
          ) : (
            <div className="switch hidden w-full flex-row items-center justify-end">
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
                    'switch inline-block h-5 w-5 transform rounded-full bg-background-card',
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
          )}

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
            <Button type="submit">{id ? 'Editar' : 'Cadastrar'}</Button>
          </div>
        </div>
      </form>

      <BottomNavigator />
    </div>
  );
}
