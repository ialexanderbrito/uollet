import { ChangeEvent } from 'react';

import { Pencil } from '@phosphor-icons/react';
import { addDays, format } from 'date-fns';
import { FormikErrors, FormikTouched } from 'formik';

import { InputError } from 'components/InputError';

import { cn, formatCPF, formatCellPhone } from 'utils';

import { useAuth } from 'contexts/Auth';

import { usePayments } from 'hooks/usePayments';

interface FormikProps {
  values: {
    firstName: string;
    lastName: string;
    cpf: string;
    dateOfBirth: string;
    cellphone: string;
  };
  errors: FormikErrors<{
    firstName: string;
    lastName: string;
    cpf: string;
    dateOfBirth: string;
    cellphone: string;
  }>;
  touched: FormikTouched<{
    firstName: string;
    lastName: string;
    cpf: string;
    dateOfBirth: string;
    cellphone: string;
  }>;
  getFieldProps: (field: string) => {
    onChange: (e: ChangeEvent) => void;
    onBlur: (e: ChangeEvent) => void;
    value: string;
  };
}

interface PersonalDataProps {
  formikPersonalData: FormikProps;
}

export function PersonalData({ formikPersonalData }: PersonalDataProps) {
  const { user } = useAuth();
  const { setIsEditPersonalData, isEditPersonalData } = usePayments();

  if (!user) return null;
  if (!user?.user_metadata) return null;

  const dateOfBirthFormated = user.user_metadata.birthdate
    ? addDays(new Date(user?.user_metadata?.birthdate), 1)
    : new Date();

  const dateOfBirthFormatedString = format(dateOfBirthFormated, 'dd/MM/yyyy');

  return (
    <div className="flex w-full flex-col items-center justify-between gap-2">
      {user?.user_metadata.identification_number && !isEditPersonalData && (
        <div className="flex h-full min-h-[8rem] w-full items-start gap-3 rounded-md bg-background-card p-3 dark:bg-background-card-dark">
          <div className="dark:text-textDark w-full overflow-hidden text-title dark:text-title-dark">
            <div className="relative flex flex-col items-start gap-3 text-sm leading-3">
              <p className="line-clamp-1 w-[80%] leading-4">
                Nome: {user?.user_metadata.name}
              </p>
              <p className="line-clamp-1 leading-4">
                CPF: {formatCPF(user?.user_metadata.identification_number)}
              </p>
              <p className="line-clamp-1 leading-4">
                Data de Nascimento: {dateOfBirthFormatedString}
              </p>
              <p className="line-clamp-1 leading-4">
                Celular: {formatCellPhone(user?.user_metadata.phone)}
              </p>

              <button
                type="button"
                className="text-14 absolute right-0 top-0 cursor-pointer select-none overflow-hidden  px-4 py-3 font-bold transition"
                onClick={() => setIsEditPersonalData(true)}
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
      )}

      {!user?.user_metadata.identification_number && (
        <>
          <div className="flex w-full justify-between gap-2">
            <div className="flex w-full flex-col">
              <input
                type="text"
                className={cn(
                  'dark:text-titleDark h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-40 dark:bg-background-card-dark focus:dark:ring-primary-dark',
                  formikPersonalData.errors.firstName &&
                    formikPersonalData.touched.firstName &&
                    'border-[1.5px] border-danger',
                )}
                placeholder="Nome"
                maxLength={255}
                {...formikPersonalData.getFieldProps('firstName')}
              />
              {formikPersonalData.errors.firstName &&
                formikPersonalData.touched.firstName && (
                  <InputError
                    message={formikPersonalData.errors.firstName}
                    error
                    className="mt-1"
                  />
                )}
            </div>

            <div className="flex w-full flex-col">
              <input
                type="text"
                className={cn(
                  'dark:text-titleDark h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-40 dark:bg-background-card-dark focus:dark:ring-primary-dark',
                  formikPersonalData.errors.lastName &&
                    formikPersonalData.touched.lastName &&
                    'border-[1.5px] border-danger',
                )}
                placeholder="Sobrenome"
                maxLength={255}
                {...formikPersonalData.getFieldProps('lastName')}
              />
              {formikPersonalData.errors.lastName &&
                formikPersonalData.touched.lastName && (
                  <InputError
                    message={formikPersonalData.errors.lastName}
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
              formikPersonalData.errors.cpf &&
                formikPersonalData.touched.cpf &&
                'border-[1.5px] border-danger',
            )}
            placeholder="CPF"
            maxLength={14}
            disabled={Boolean(user?.user_metadata.identification_number)}
            {...formikPersonalData.getFieldProps('cpf')}
            value={formatCPF(formikPersonalData.values.cpf)}
          />
          {formikPersonalData.errors.cpf && formikPersonalData.touched.cpf && (
            <InputError
              message={formikPersonalData.errors.cpf}
              error
              className="mt-1"
            />
          )}
          <input
            type="date"
            className={cn(
              'dark:text-titleDark h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-40 dark:bg-background-card-dark focus:dark:ring-primary-dark',
              formikPersonalData.errors.dateOfBirth &&
                formikPersonalData.touched.dateOfBirth &&
                'border-[1.5px] border-danger',
            )}
            placeholder="Data de Nascimento"
            maxLength={14}
            {...formikPersonalData.getFieldProps('dateOfBirth')}
          />
          {formikPersonalData.errors.dateOfBirth &&
            formikPersonalData.touched.dateOfBirth && (
              <InputError
                message={formikPersonalData.errors.dateOfBirth}
                error
                className="mt-1"
              />
            )}

          <input
            type="text"
            className={cn(
              'dark:text-titleDark h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-40 dark:bg-background-card-dark focus:dark:ring-primary-dark',
              formikPersonalData.errors.cellphone &&
                formikPersonalData.touched.cellphone &&
                'border-[1.5px] border-danger',
            )}
            placeholder="Celular"
            maxLength={14}
            {...formikPersonalData.getFieldProps('cellphone')}
            value={formatCellPhone(formikPersonalData.values.cellphone)}
          />
          {formikPersonalData.errors.cellphone &&
            formikPersonalData.touched.cellphone && (
              <InputError
                message={formikPersonalData.errors.cellphone}
                error
                className="mt-1"
              />
            )}
        </>
      )}
    </div>
  );
}
