import { ChangeEvent } from 'react';

import { Pencil } from '@phosphor-icons/react';
import { Jelly } from '@uiball/loaders';
import { FormikErrors, FormikTouched } from 'formik';

import { Button } from 'components/Button';
import { InputError } from 'components/InputError';

import { cn, formatCep } from 'utils';

import { useAuth } from 'contexts/Auth';

import { usePayments } from 'hooks/usePayments';

interface FormikProps {
  values: {
    cep: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    complement: string;
  };
  errors: FormikErrors<{
    cep: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    complement: string;
  }>;
  touched: FormikTouched<{
    cep: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    complement: string;
  }>;
  getFieldProps: (field: string) => {
    onChange: (e: ChangeEvent) => void;
    onBlur: (e: ChangeEvent) => void;
    value: string;
  };
}

interface AddressProps {
  formik: FormikProps;
  loading: boolean;
  searchCEP: (cep: string) => Promise<void>;
}

export function Address({ formik, loading, searchCEP }: AddressProps) {
  const { user } = useAuth();
  const { disabledStreet, isEditAddress, setIsEditAddress } = usePayments();

  async function handleSearchCEP() {
    await searchCEP(formik.values.cep);
  }

  return (
    <div className="flex w-full flex-col items-center justify-between gap-2">
      {user?.user_metadata.address && !isEditAddress && (
        <div className="grid w-full auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex h-full min-h-[9.5rem] w-full items-start gap-3 rounded-md bg-background-card p-3 dark:bg-background-card-dark">
            <div className="dark:text-textDark w-full overflow-hidden text-title dark:text-title-dark">
              <div className="relative flex flex-col items-start gap-3 text-sm leading-3">
                <p className="line-clamp-1 w-[80%] leading-4">
                  Rua: {user?.user_metadata.address.street}
                </p>
                <p className="line-clamp-1 leading-4">
                  Número: {user?.user_metadata.address.number}
                </p>
                <p className="line-clamp-1 leading-4">
                  Bairro: {user?.user_metadata.address.district}
                </p>
                <p className="line-clamp-1 leading-4">
                  Cidade: {user?.user_metadata.address.city}
                </p>
                <p className="line-clamp-1 leading-4">
                  CEP: {user?.user_metadata.address.zipCode}
                </p>

                <p className="line-clamp-1 leading-4">
                  Complemento: {user?.user_metadata.address.reference}
                </p>

                <button
                  type="button"
                  className="text-14 absolute right-0 top-0 cursor-pointer select-none overflow-hidden  px-4 py-3 font-bold transition"
                  onClick={() => setIsEditAddress(true)}
                >
                  <span className="relative z-10 ">
                    <Pencil
                      size={20}
                      className="text-primary dark:text-text-dark"
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {(!user?.user_metadata.address || isEditAddress) && (
        <>
          <div className="flex w-full justify-between gap-2">
            <div className="flex w-full flex-col">
              <input
                type="text"
                className={cn(
                  'h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-40 dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark',
                  formik.errors.cep &&
                    formik.touched.cep &&
                    'border-[1.5px] border-danger',
                )}
                placeholder="CEP"
                maxLength={9}
                {...formik.getFieldProps('cep')}
                value={formatCep(formik.values.cep)}
              />
              {formik.errors.cep && formik.touched.cep && (
                <InputError
                  message={formik.errors.cep}
                  error
                  className="mt-1"
                />
              )}
            </div>

            <Button inline type="button" onClick={() => handleSearchCEP()}>
              {loading ? (
                <div className="flex items-center justify-center">
                  <Jelly size={20} color="#fff" />
                </div>
              ) : (
                'Buscar'
              )}
            </Button>
          </div>

          <div className="flex w-full justify-between gap-2">
            <div className="flex w-full flex-col">
              <input
                type="text"
                className={cn(
                  'h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-40 dark:bg-background-dark dark:text-title-dark focus:dark:ring-primary-dark',
                  formik.errors.street &&
                    formik.touched.street &&
                    'border-[1.5px] border-danger',
                )}
                placeholder="Rua"
                maxLength={255}
                disabled={disabledStreet}
                {...formik.getFieldProps('street')}
              />
              {formik.errors.street && formik.touched.street && (
                <InputError
                  message={formik.errors.street}
                  error
                  className="mt-1"
                />
              )}
            </div>

            <div className="flex w-40 flex-col">
              <input
                type="text"
                className={cn(
                  'h-14 w-40 rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-40 dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark',
                  formik.errors.number &&
                    formik.touched.number &&
                    'border-[1.5px] border-danger',
                )}
                placeholder="Número"
                maxLength={50}
                {...formik.getFieldProps('number')}
              />
              {formik.errors.number && formik.touched.number && (
                <InputError
                  message={formik.errors.number}
                  error
                  className="mt-1"
                />
              )}
            </div>
          </div>

          <input
            type="text"
            className={cn(
              'h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-40 dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark',
              formik.errors.neighborhood &&
                formik.touched.neighborhood &&
                'border-[1.5px] border-danger',
            )}
            placeholder="Bairro"
            disabled={disabledStreet}
            {...formik.getFieldProps('neighborhood')}
          />
          {formik.errors.neighborhood && formik.touched.neighborhood && (
            <InputError
              message={formik.errors.neighborhood}
              error
              className="mt-0"
            />
          )}

          <div className="flex w-full justify-between gap-2">
            <div className="flex w-full flex-col">
              <input
                type="text"
                className={cn(
                  'h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-40 dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark',
                  formik.errors.city &&
                    formik.touched.city &&
                    'border-[1.5px] border-danger',
                )}
                placeholder="Cidade"
                disabled
                {...formik.getFieldProps('city')}
              />
              {formik.errors.city && formik.touched.city && (
                <InputError
                  message={formik.errors.city}
                  error
                  className="mt-1"
                />
              )}
            </div>

            <div className="flex w-40 flex-col">
              <input
                type="text"
                className={cn(
                  'h-14 w-40 rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-40 dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark',
                  formik.errors.state &&
                    formik.touched.state &&
                    'border-[1.5px] border-danger',
                )}
                placeholder="Estado"
                maxLength={2}
                disabled
                {...formik.getFieldProps('state')}
              />
              {formik.errors.state && formik.touched.state && (
                <InputError
                  message={formik.errors.state}
                  error
                  className="mt-1"
                />
              )}
            </div>
          </div>

          <input
            type="text"
            className={cn(
              'dark:text-titleDark h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-40 dark:bg-background-card-dark focus:dark:ring-primary-dark',
              formik.errors.complement &&
                formik.touched.complement &&
                'border-[1.5px] border-danger',
            )}
            placeholder="Complemento"
            maxLength={255}
            {...formik.getFieldProps('complement')}
          />
        </>
      )}
    </div>
  );
}
