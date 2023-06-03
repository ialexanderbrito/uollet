import CurrencyInput from 'react-currency-input-field';
import { useNavigate } from 'react-router-dom';
import { BottomSheet } from 'react-spring-bottom-sheet';

import { RadioGroup, Switch } from '@headlessui/react';
import { CaretLeft, CheckCircle } from '@phosphor-icons/react';
import incomeIcon from 'assets/income.svg';
import outcomeIcon from 'assets/outcome.svg';

import { Autocomplete } from 'components/Autocomplete';
import { BottomNavigator } from 'components/BottomNavigator';

import { category } from 'utils/category';

import { useToast } from 'contexts/Toast';

import { useRegister } from 'hooks/useRegister';

import 'react-spring-bottom-sheet/dist/style.css';

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
  const { toast } = useToast();
  const {
    formik,
    isRecurring,
    handleSwitch,
    openBottomSheet,
    setOpenBottomSheet,
  } = useRegister();
  const navigate = useNavigate();

  function openToastAlert() {
    toast.error('Em breve, você poderá cadastrar transações recorrentes!', {
      id: 'recurring',
    });
  }

  return (
    <div className="flex w-full flex-col items-center bg-background dark:bg-backgroundDark">
      <div className="flex h-24 w-full flex-row bg-primary dark:bg-primaryDark">
        <div className="flex w-1/4 items-center justify-center">
          <CaretLeft
            size={20}
            weight="light"
            className="cursor-pointer text-white"
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="flex w-2/4 items-center justify-center">
          <p className="text-lg font-normal text-white">Cadastro</p>
        </div>
      </div>

      <form className="flex w-full flex-col" onSubmit={formik.handleSubmit}>
        <div className="flex min-h-[90vh] w-full flex-col gap-4 p-4">
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
            options={category}
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

          <div
            className="switch flex w-full flex-row items-center justify-end"
            onClick={() => openToastAlert()}
          >
            <Switch
              disabled
              checked={isRecurring}
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
              onClick={() => {}}
            >
              Receita recorrente
            </span>
          </div>

          <BottomSheet
            open={openBottomSheet}
            defaultSnap={0}
            onDismiss={() => setOpenBottomSheet(false)}
            snapPoints={({ maxHeight }) => [maxHeight - 400, maxHeight - 400]}
            className="bg-backgroundCard dark:bg-backgroundCardDark"
          >
            <div className="flex flex-col items-center justify-center gap-4 bg-backgroundCard dark:bg-backgroundCardDark">
              <p className="ml-4 text-lg font-normal text-text">
                A receita se repete a cada quanto tempo?
              </p>
              <div className="flex w-full flex-row items-center justify-evenly gap-4">
                <RadioGroup
                  onChange={(value) => {
                    formik.setFieldValue('recurrency', value);
                    setOpenBottomSheet(false);
                  }}
                  className={`mb-1 mt-1 flex w-full flex-col items-center justify-center gap-4`}
                  value={formik.values.recurrency}
                >
                  <RadioGroup.Option
                    value="day"
                    className={({ active, checked }) => `${
                      active
                        ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-secondary'
                        : ''
                    } ${
                      checked
                        ? 'bg-secondary bg-opacity-75 text-white'
                        : 'bg-white'
                    }
                    relative flex w-11/12 cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none
                  `}
                  >
                    {({ active, checked }) => (
                      <>
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center">
                            <div className="text-sm">
                              <RadioGroup.Label
                                as="p"
                                className={`font-medium  ${
                                  checked ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                Diariamente
                              </RadioGroup.Label>
                            </div>
                          </div>
                          {checked && (
                            <div className="flex-shrink-0 text-white">
                              <CheckCircle className="h-6 w-6" />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>

                  <RadioGroup.Option
                    value="week"
                    className={({ active, checked }) => `${
                      active
                        ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-secondary'
                        : ''
                    } ${
                      checked
                        ? 'bg-secondary bg-opacity-75 text-white'
                        : 'bg-white'
                    }
                    relative flex w-11/12 cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none
                  `}
                  >
                    {({ active, checked }) => (
                      <>
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center">
                            <div className="text-sm">
                              <RadioGroup.Label
                                as="p"
                                className={`font-medium  ${
                                  checked ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                Semanalmente
                              </RadioGroup.Label>
                            </div>
                          </div>
                          {checked && (
                            <div className="flex-shrink-0 text-white">
                              <CheckCircle className="h-6 w-6" />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>

                  <RadioGroup.Option
                    value="month"
                    className={({ active, checked }) => `${
                      active
                        ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-secondary'
                        : ''
                    } ${
                      checked
                        ? 'bg-secondary bg-opacity-75 text-white'
                        : 'bg-white'
                    }
                    relative flex w-11/12 cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none
                  `}
                  >
                    {({ active, checked }) => (
                      <>
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center">
                            <div className="text-sm">
                              <RadioGroup.Label
                                as="p"
                                className={`font-medium  ${
                                  checked ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                Mensalmente
                              </RadioGroup.Label>
                            </div>
                          </div>
                          {checked && (
                            <div className="flex-shrink-0 text-white">
                              <CheckCircle className="h-6 w-6" />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>
                </RadioGroup>
              </div>
            </div>
          </BottomSheet>
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
