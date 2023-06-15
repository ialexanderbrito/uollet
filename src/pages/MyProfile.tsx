import { Eye, EyeClosed } from '@phosphor-icons/react';
import { Ring } from '@uiball/loaders';

import { BottomNavigator } from 'components/BottomNavigator';
import { Dropzone } from 'components/Dropzone';
import { Header } from 'components/Header';

import { formatCellPhone } from 'utils/formatCellPhone';

import { useAuth } from 'contexts/Auth';

import { useProfile } from 'hooks/useProfile';

export function MyProfile() {
  const { user } = useAuth();
  const {
    formikUpdateUser,
    togglePassword,
    passwordType,
    loadingImage,
    handleUpload,
    loading,
  } = useProfile();

  return (
    <div className="flex w-full flex-col items-center justify-center bg-background dark:bg-backgroundDark">
      <Header title={`Olá, ${user?.user_metadata.name}`} />

      <form
        className="flex w-full flex-col"
        onSubmit={formikUpdateUser.handleSubmit}
      >
        <div className="flex h-screen w-full flex-col gap-4 p-4">
          {loadingImage ? (
            <div className="flex h-full animate-pulse flex-row items-center justify-center space-x-5">
              <div className="h-40 w-40 rounded-lg bg-gray-300 "></div>
            </div>
          ) : (
            <Dropzone onFileUploaded={handleUpload} />
          )}
          <input
            type="text"
            className={`h-14 w-full rounded-lg bg-white p-4 text-title outline-none disabled:opacity-40 dark:bg-backgroundCardDark dark:text-titleDark `}
            placeholder="Nome"
            {...formikUpdateUser.getFieldProps('name')}
            disabled={user?.app_metadata.provider === 'google'}
          />
          <input
            type="email"
            className={`h-14 w-full rounded-lg bg-white p-4 text-title outline-none disabled:opacity-40 dark:bg-backgroundCardDark dark:text-titleDark`}
            placeholder="E-mail"
            {...formikUpdateUser.getFieldProps('email')}
            disabled={user?.app_metadata.provider === 'google'}
          />
          <input
            type="text"
            className={`h-14 w-full rounded-lg bg-white p-4 text-title outline-none dark:bg-backgroundCardDark dark:text-titleDark`}
            placeholder="Telefone"
            {...formikUpdateUser.getFieldProps('phone')}
            value={formatCellPhone(formikUpdateUser.values.phone)}
            maxLength={15}
          />

          <div className="flex items-center gap-2">
            <input
              type={passwordType}
              className={`h-14 w-full rounded-lg bg-white p-4 text-title outline-none dark:bg-backgroundCardDark dark:text-titleDark`}
              placeholder="Nova senha"
              {...formikUpdateUser.getFieldProps('password')}
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
            className={`h-14 w-full rounded-lg bg-white p-4 text-title outline-none dark:bg-backgroundCardDark dark:text-titleDark`}
            placeholder="Confirmar nova senha"
            {...formikUpdateUser.getFieldProps('confirmPassword')}
          />

          <button
            type="submit"
            className="flex h-14 w-full items-center justify-center rounded-lg bg-secondary p-4 text-center text-sm text-white disabled:cursor-not-allowed disabled:opacity-25 dark:bg-secondaryDark"
          >
            {loading ? <Ring size={20} color="#fff" /> : 'Salvar alterações'}
          </button>
        </div>
      </form>

      <BottomNavigator />
    </div>
  );
}
