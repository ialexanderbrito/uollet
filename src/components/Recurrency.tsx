import { RadioGroup } from '@headlessui/react';
import { CheckCircle } from '@phosphor-icons/react';
import {
  FieldInputProps,
  FormikErrors,
  FormikTouched,
  FormikValues,
} from 'formik';

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
        <div className="mt-2 h-[51vh] rounded-t-3xl bg-backgroundCard dark:bg-backgroundCardDark sm:h-[41.5vh]">
          <div className="flex flex-col items-center justify-center gap-4 rounded-t-3xl bg-backgroundCard dark:bg-backgroundCardDark">
            <p className="ml-4 mt-6 text-lg font-normal text-title dark:text-titleDark">
              A compra é parcelada?
            </p>
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
                  className={`h-14 w-full rounded-lg bg-background p-4 text-title outline-none dark:bg-backgroundDark dark:text-titleDark ${
                    formik.errors.title && formik.touched.title
                      ? 'border-[1.5px] border-red-500'
                      : ''
                  }`}
                  placeholder="Número de parcelas"
                  {...formik.getFieldProps('parcel')}
                  maxLength={2}
                />

                <RadioGroup.Option
                  value="month"
                  className={({ active, checked }) => `${
                    active
                      ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-secondary'
                      : ''
                  } ${
                    checked
                      ? 'bg-secondary text-white dark:bg-secondaryDark'
                      : 'bg-backgroundCard dark:bg-backgroundCardDark'
                  }
                    relative flex w-full cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none
                  `}
                >
                  {({ checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium text-white`}
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
        <div className="mt-2 h-[51vh] rounded-t-3xl bg-backgroundCard dark:bg-backgroundCardDark sm:h-[48vh]">
          <div className="flex flex-col items-center justify-center gap-4 rounded-t-3xl bg-backgroundCard dark:bg-backgroundCardDark">
            <p className="ml-4 mt-6 text-lg font-normal text-title dark:text-titleDark">
              A receita se repete a cada:
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
                      ? 'bg-secondary text-white dark:bg-secondaryDark'
                      : 'bg-background dark:bg-backgroundDark'
                  }
            relative flex w-11/12 cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none
          `}
                >
                  {({ checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium  ${
                                checked
                                  ? 'text-white'
                                  : 'text-title dark:text-titleDark'
                              }`}
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
                  className={({ active, checked }) => `${
                    active
                      ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-secondary'
                      : ''
                  } ${
                    checked
                      ? 'bg-secondary text-white dark:bg-secondaryDark'
                      : 'bg-background dark:bg-backgroundDark'
                  }
          relative flex w-11/12 cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none
        `}
                >
                  {({ checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium  ${
                                checked
                                  ? 'text-white'
                                  : 'text-title dark:text-titleDark'
                              }`}
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
                  className={({ active, checked }) => `${
                    active
                      ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-secondary'
                      : ''
                  } ${
                    checked
                      ? 'bg-secondary text-white dark:bg-secondaryDark'
                      : 'bg-background dark:bg-backgroundDark'
                  }
          relative flex w-11/12 cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none
        `}
                >
                  {({ checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium  ${
                                checked
                                  ? 'text-white'
                                  : 'text-title dark:text-titleDark'
                              }`}
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
