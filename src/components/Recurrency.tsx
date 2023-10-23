import { RadioGroup } from '@headlessui/react';
import { CheckCircle } from '@phosphor-icons/react';
import {
  FieldInputProps,
  FormikErrors,
  FormikTouched,
  FormikValues,
} from 'formik';

import { cn } from 'utils/cn';

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
  setOpenBottomSheet: (value: boolean) => void;
  isParcel?: boolean;
  isRecurring?: boolean;
}

export function Recurrency({
  formik,
  setOpenBottomSheet,
  isParcel,
  isRecurring,
}: RecurrencyProps) {
  return (
    <>
      {isParcel && (
        <div className="mt-2 rounded-t-3xl bg-backgroundCard dark:bg-backgroundCardDark">
          <div className="flex flex-col items-center justify-center gap-4 rounded-t-3xl bg-backgroundCard dark:bg-backgroundCardDark">
            <div className="flex w-11/12 flex-row items-center justify-evenly gap-4">
              <RadioGroup
                onChange={(value) => {
                  formik.setFieldValue('recurrency', value);
                  setOpenBottomSheet(false);
                }}
                className={`mb-1 mt-1 flex w-full flex-col items-center justify-center gap-4`}
                value={'month'}
              >
                <input
                  type="number"
                  className={cn(
                    'h-14 w-full rounded-lg bg-background p-4 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundDark dark:text-titleDark focus:dark:ring-primaryDark',
                    formik.errors.title &&
                      formik.touched.title &&
                      'border-[1.5px] border-red-500',
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
                        'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-secondary',
                      checked
                        ? 'bg-secondary text-white dark:bg-secondaryDark'
                        : 'bg-backgroundCard dark:bg-backgroundCardDark',
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
                                checked ? 'text-white' : 'dark:text text-title',
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
        <div className="mt-2 rounded-t-3xl bg-backgroundCard dark:bg-backgroundCardDark">
          <div className="flex flex-col items-center justify-center gap-4 rounded-t-3xl bg-backgroundCard dark:bg-backgroundCardDark">
            <div className="flex w-full flex-row items-center justify-evenly gap-4">
              <RadioGroup
                onChange={(value) => {
                  formik.setFieldValue('recurrency', value);
                  setOpenBottomSheet(false);
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
                        'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-secondary',
                      checked
                        ? 'bg-secondary text-white dark:bg-secondaryDark'
                        : 'bg-background dark:bg-backgroundDark',
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
                                checked ? 'text-white' : 'dark:text text-title',
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
                        'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-secondary',
                      checked
                        ? 'bg-secondary text-white dark:bg-secondaryDark'
                        : 'bg-background dark:bg-backgroundDark',
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
                                checked ? 'text-white' : 'dark:text text-title',
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
                        'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-secondary',
                      checked
                        ? 'bg-secondary text-white dark:bg-secondaryDark'
                        : 'bg-background dark:bg-backgroundDark',
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
                                checked ? 'text-white' : 'dark:text text-title',
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
    </>
  );
}
