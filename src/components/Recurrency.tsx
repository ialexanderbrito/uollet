import { RadioGroup } from '@headlessui/react';
import { CheckCircle } from '@phosphor-icons/react';
import {
  FieldInputProps,
  FormikErrors,
  FormikTouched,
  FormikValues,
} from 'formik';

import { cn } from 'utils/cn';

import { Button } from './Button';

interface RecurrencyProps {
  formik: {
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean,
    ) => void;
    getFieldProps: <Value = any>(props: any) => FieldInputProps<Value>;
    errors: FormikErrors<any>;
    touched: FormikTouched<any>;
    values: FormikValues;
  };
  setOpenRecurrency: (value: boolean) => void;
  isParcel?: boolean;
  isRecurring?: boolean;
  onClose?: () => void;
}

export function Recurrency({
  formik,
  setOpenRecurrency,
  isParcel,
  isRecurring,
  onClose,
}: RecurrencyProps) {
  return (
    <>
      {isParcel && (
        <div className="mt-2 rounded-t-3xl bg-background dark:bg-background-dark">
          <div className="flex flex-col items-center justify-center gap-4 rounded-t-3xl">
            <div className="flex w-11/12 flex-row items-center justify-evenly gap-4">
              <RadioGroup
                onChange={(value) => {
                  formik.setFieldValue('recurrency', value);
                  setOpenRecurrency(false);
                }}
                className={`mb-1 mt-1 flex w-full flex-col items-center justify-center gap-4`}
                value={'month'}
              >
                <input
                  type="number"
                  className={cn(
                    'h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark',
                    formik.errors.title &&
                      formik.touched.title &&
                      'border-[1.5px] border-danger',
                  )}
                  placeholder="Número de parcelas"
                  {...formik.getFieldProps('parcel')}
                  maxLength={2}
                />

                <RadioGroup.Option
                  value="month"
                  className={({ active, checked }) =>
                    cn(
                      'relative flex w-full cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none',
                      active &&
                        'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-primary',
                      checked
                        ? 'bg-primary text-white dark:bg-primary-dark'
                        : 'bg-background-card dark:bg-background-card-dark',
                    )
                  }
                >
                  {({ checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={cn(
                                'font-medium',
                                checked
                                  ? 'text-white'
                                  : 'text-title dark:text-title-dark',
                              )}
                            >
                              Mensal
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
        </div>
      )}

      {isRecurring && (
        <div className="mt-2 rounded-t-3xl bg-background dark:bg-background-dark">
          <div className="flex flex-col items-center justify-center gap-4 rounded-t-3xl">
            <div className="flex w-full flex-row items-center justify-evenly gap-4">
              <RadioGroup
                onChange={(value) => {
                  formik.setFieldValue('recurrency', value);
                  setOpenRecurrency(false);
                }}
                className="mb-1 mt-1 flex w-full flex-col items-center justify-center gap-4"
                value={formik.values.recurrency}
              >
                <RadioGroup.Option
                  value="day"
                  className={({ active, checked }) =>
                    cn(
                      'relative flex w-11/12 cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none',
                      active &&
                        'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-primary',
                      checked
                        ? 'bg-primary text-white dark:bg-primary-dark'
                        : 'bg-background-card dark:bg-background-card-dark',
                    )
                  }
                >
                  {({ checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={cn(
                                'font-medium',
                                checked
                                  ? 'text-white'
                                  : 'text-title dark:text-title-dark',
                              )}
                            >
                              Dia
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
                  className={({ active, checked }) =>
                    cn(
                      'relative flex w-11/12 cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none',
                      active &&
                        'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-primary',
                      checked
                        ? 'bg-primary text-white dark:bg-primary-dark'
                        : 'bg-background-card dark:bg-background-card-dark',
                    )
                  }
                >
                  {({ checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={cn(
                                'font-medium',
                                checked
                                  ? 'text-white'
                                  : 'text-title dark:text-title-dark',
                              )}
                            >
                              Semana
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
                  className={({ active, checked }) =>
                    cn(
                      'relative flex w-11/12 cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none',
                      active &&
                        'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-primary',
                      checked
                        ? 'bg-primary text-white dark:bg-primary-dark'
                        : 'bg-background-card dark:bg-background-card-dark',
                    )
                  }
                >
                  {({ checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={cn(
                                'font-medium',
                                checked
                                  ? 'text-white'
                                  : 'text-title dark:text-title-dark',
                              )}
                            >
                              Mês
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
        </div>
      )}

      <div className="-mb-8 flex flex-col items-center justify-center gap-4">
        <Button onClick={onClose} className="mt-4" variant="outline" inline>
          Fechar
        </Button>
      </div>
    </>
  );
}
