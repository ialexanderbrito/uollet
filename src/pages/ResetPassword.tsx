import { Eye, EyeClosed } from '@phosphor-icons/react';

import { useResetPassword } from 'hooks/useResetPassword';

export function ResetPassword() {
  const { formikResetPassword, passwordType, togglePassword } =
    useResetPassword();

  return (
    <div className="flex w-full flex-col items-center bg-background dark:bg-backgroundDark">
      <div className="flex h-24 w-full flex-row bg-primary dark:bg-primaryDark">
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
              className={`h-14 w-full rounded-lg bg-white p-4 text-title outline-none dark:bg-backgroundCardDark dark:text-titleDark ${
                formikResetPassword.errors.password &&
                formikResetPassword.touched.password
                  ? 'border-[1.5px] border-red-500'
                  : ''
              }`}
              placeholder="Digite sua nova senha"
              {...formikResetPassword.getFieldProps('password')}
            />
            <button
              type="button"
              className="h-14 w-14 rounded-lg bg-white p-4 text-title outline-none dark:bg-backgroundCardDark dark:text-titleDark"
              onClick={togglePassword}
            >
              {passwordType === 'password' ? (
                <EyeClosed
                  size={20}
                  className="text-title dark:text-titleDark"
                />
              ) : (
                <Eye size={20} className="text-title dark:text-titleDark" />
              )}
            </button>
          </div>

          <input
            type={passwordType}
            className={`h-14 w-full rounded-lg bg-white p-4 text-title outline-none dark:bg-backgroundCardDark dark:text-titleDark ${
              formikResetPassword.errors.confirmPassword &&
              formikResetPassword.touched.confirmPassword
                ? 'border-[1.5px] border-red-500'
                : ''
            }`}
            placeholder="Confirme sua nova senha"
            {...formikResetPassword.getFieldProps('confirmPassword')}
          />
          <div className="flex flex-col items-center justify-end gap-4">
            <button
              type="submit"
              className="h-14 w-full rounded-lg bg-secondary p-4 text-white dark:bg-secondaryDark"
            >
              Alterar senha
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
