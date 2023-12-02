import { Eye, EyeClosed } from '@phosphor-icons/react';
import { Ring } from '@uiball/loaders';

import { Alert } from 'components/Alert';
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
    hasSuccessImage,
    setHasSuccessImage,
  } = useProfile();

  return (
    <div className="flex w-full flex-col items-center justify-center bg-background dark:bg-background-dark">
      <Header title={`Olá, ${user?.user_metadata.name}`} />

      <form
        className="flex w-full flex-col"
        onSubmit={formikUpdateUser.handleSubmit}
      >
        <div className="flex h-screen w-full flex-col gap-4 p-4">
          {hasSuccessImage && (
            <Alert
              alertName="picture"
              description="Sua foto de perfil foi atualizada. A atualização em todo o site pode levar alguns minutos."
              title="Foto de perfil atualizada!"
              variant="info"
              onClick={() => setHasSuccessImage(false)}
            />
          )}
          {loadingImage ? (
            <div className="flex animate-pulse flex-row items-center justify-center space-x-5">
              <div className="h-40 w-40 rounded-lg bg-gray-300 "></div>
            </div>
          ) : (
            <Dropzone onFileUploaded={handleUpload} />
          )}
          <input
            type="text"
            className="h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary disabled:opacity-40 dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark"
            placeholder="Nome"
            {...formikUpdateUser.getFieldProps('name')}
            disabled={user?.app_metadata.provider === 'google'}
          />
          <input
            type="email"
            className="h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary disabled:opacity-40 dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark"
            placeholder="E-mail"
            {...formikUpdateUser.getFieldProps('email')}
            disabled={user?.app_metadata.provider === 'google'}
          />
          <input
            type="text"
            className="h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary disabled:opacity-40 dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark"
            placeholder="Telefone"
            {...formikUpdateUser.getFieldProps('phone')}
            value={formatCellPhone(formikUpdateUser.values.phone)}
            maxLength={15}
          />

          <div className="flex items-center gap-2">
            <input
              type={passwordType}
              className="h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark"
              placeholder="Nova senha"
              {...formikUpdateUser.getFieldProps('password')}
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
            className="h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark"
            placeholder="Confirmar nova senha"
            {...formikUpdateUser.getFieldProps('confirmPassword')}
          />

          <button
            type="submit"
            className="flex h-14 w-full items-center justify-center rounded-lg bg-primary p-4 text-center text-sm text-background-card disabled:cursor-not-allowed disabled:opacity-25 dark:bg-primary-dark"
          >
            {loading ? <Ring size={20} color="#fff" /> : 'Salvar alterações'}
          </button>
        </div>
      </form>

      <BottomNavigator />
    </div>
  );
}
