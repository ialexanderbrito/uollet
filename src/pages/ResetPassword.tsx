import { Eye, EyeClosed } from '@phosphor-icons/react';

import { cn } from 'utils/cn';

import { useResetPassword } from 'hooks/useResetPassword';

export function ResetPassword() {
  const { formikResetPassword, passwordType, togglePassword } =
    useResetPassword();

  return (
    <div className="flex w-full flex-col items-center bg-background dark:bg-background-dark">
      <div className="flex h-24 w-full flex-row bg-primary dark:bg-primary-dark">
        <div className="flex w-full items-center justify-center">
          <p className="text-lg font-normal text-white">Redefinir senha</p>
        </div>
      </div>

      <form
        className="flex w-full flex-col"
        onSubmit={formikResetPassword.handleSubmit}
      >
        <div className="flex h-screen w-full flex-col gap-4 p-4">
          <div className="flex items-center gap-2">
            <input
              type={passwordType}
              className={cn(
                'h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark',
                formikResetPassword.errors.password &&
                  formikResetPassword.touched.password &&
                  'border-[1.5px] border-danger',
              )}
              placeholder="Digite sua nova senha"
              {...formikResetPassword.getFieldProps('password')}
            />
            <button
              type="button"
              className="h-14 w-14 rounded-lg bg-background-card p-4 text-title outline-none hover:bg-gray-200 hover:transition-all dark:bg-background-card-dark dark:text-title-dark dark:hover:bg-gray-700"
              onClick={togglePassword}
            >
              {passwordType === 'password' ? (
                <EyeClosed
                  size={20}
                  className="text-title dark:text-title-dark"
                />
              ) : (
                <Eye size={20} className="text-title dark:text-title-dark" />
              )}
            </button>
          </div>

          <input
            type={passwordType}
            className={cn(
              'h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark',
              formikResetPassword.errors.confirmPassword &&
                formikResetPassword.touched.confirmPassword &&
                'border-[1.5px] border-danger',
            )}
            placeholder="Confirme sua nova senha"
            {...formikResetPassword.getFieldProps('confirmPassword')}
          />
          <div className="flex flex-col items-center justify-end gap-4">
            <button
              type="submit"
              className="h-14 w-full rounded-lg bg-primary p-4 text-white dark:bg-primary-dark"
            >
              Alterar senha
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
