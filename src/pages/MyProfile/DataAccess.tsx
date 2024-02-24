import { useNavigate } from 'react-router-dom';

import { Crown, Eye, EyeClosed, GoogleLogo, Key } from '@phosphor-icons/react';
import { Jelly } from '@uiball/loaders';

import { Alert } from 'components/Alert';
import { Button } from 'components/Button';
import Dropzone from 'components/Dropzone';
import { Input } from 'components/Input';

import { formatCellPhone } from 'utils';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { useProfile } from 'hooks/useProfile';

import { supabase } from 'services/supabase';

export function DataAccess() {
  const { toast } = useToast();

  const { user, isPlanActive } = useAuth();
  const {
    formikUpdateUser,
    togglePassword,
    passwordType,
    loadingImage,
    handleUpload,
    hasSuccessImage,
    setHasSuccessImage,
    loading,
  } = useProfile();
  const navigate = useNavigate();

  async function linkProviderGoogle() {
    if (!user) return;

    try {
      const { error } = await supabase.auth.linkIdentity({
        provider: 'google',
      });

      if (error) {
        toast.error('Não foi possível vincular sua conta do Google', {
          id: 'linkProviderGoogle',
        });
      }
    } catch (error) {
      toast.error('Não foi possível vincular sua conta do Google', {
        id: 'linkProviderGoogle',
      });
    }
  }

  async function unlinkProviderGoogle() {
    if (!user) return;

    try {
      const { data: dataIdentities } = await supabase.auth.getUserIdentities();

      const googleIdentity = dataIdentities?.identities.find(
        (identity) => identity.provider === 'google',
      );

      if (!googleIdentity) return;

      const { data, error } =
        await supabase.auth.unlinkIdentity(googleIdentity);

      if (error) {
        toast.error('Não foi possível desvincular sua conta do Google', {
          id: 'unlinkProviderGoogle',
        });
        return;
      }

      if (data) {
        toast.success('Conta do Google desvinculada com sucesso', {
          id: 'unlinkProviderGoogle',
        });

        supabase.auth.refreshSession();

        setTimeout(() => {
          navigate(0);
        }, 1000);
      }
    } catch (error) {
      toast.error('Não foi possível desvincular sua conta do Google', {
        id: 'unlinkProviderGoogle',
      });
    }
  }

  return (
    <>
      <div className="flex flex-row items-center gap-2 text-xl font-semibold text-title dark:text-title-dark">
        <span className="flex flex-row items-center gap-2">
          <Key size={20} className="text-title dark:text-title-dark" />
          Dados de acesso
        </span>
      </div>
      {hasSuccessImage && (
        <Alert
          alertName="picture"
          description="Sua foto de perfil foi atualizada. A atualização em todo o site pode levar alguns minutos."
          title="Foto de perfil atualizada!"
          variant="info"
          onClick={() => setHasSuccessImage(false)}
        />
      )}
      {isPlanActive ? (
        <div className="-mb-4 flex flex-row items-center justify-center text-xl font-bold text-title">
          <Crown size={40} className="text-[#ffd700]" weight="duotone" />
        </div>
      ) : null}
      {loadingImage ? (
        <div className="flex animate-pulse flex-row items-center justify-center space-x-5">
          <div className="h-40 w-40 rounded-lg bg-gray-300 "></div>
        </div>
      ) : (
        <Dropzone onFileUploaded={handleUpload} />
      )}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Input
          label="E-mail"
          type="email"
          {...formikUpdateUser.getFieldProps('email')}
          disabled={user?.app_metadata.provider === 'google'}
        />

        <Input
          label="Telefone"
          type="text"
          {...formikUpdateUser.getFieldProps('phone')}
          value={formatCellPhone(formikUpdateUser.values.phone)}
          maxLength={15}
        />
      </div>
      <div className="flex items-center gap-2">
        <Input
          label="Nova senha"
          type={passwordType}
          {...formikUpdateUser.getFieldProps('password')}
        />

        <button
          type="button"
          className="mt-6 h-14 w-14 rounded-lg bg-background-card p-4 text-title outline-none hover:bg-gray-200 hover:transition-all dark:bg-background-card-dark dark:text-title-dark dark:hover:bg-gray-700"
          onClick={togglePassword}
        >
          {passwordType === 'password' ? (
            <EyeClosed size={20} className="text-title dark:text-title-dark" />
          ) : (
            <Eye size={20} className="text-title dark:text-title-dark" />
          )}
        </button>
      </div>
      <Input
        label="Confirmar nova senha"
        type={passwordType}
        {...formikUpdateUser.getFieldProps('confirmPassword')}
      />

      <p className="mb-1 ml-1 text-sm text-title dark:text-title-dark">
        Google vinculada:
      </p>
      <div className="flex w-full flex-row items-center gap-2 rounded-md bg-background-card p-4 text-title dark:bg-background-card-dark dark:text-title-dark">
        <div className="flex w-full flex-row justify-between">
          <div className="flex flex-row items-center gap-2">
            <GoogleLogo size={20} className="text-title dark:text-title-dark" />
            {user?.app_metadata.providers?.includes('google') ? (
              <p className="text-sm font-normal text-text dark:text-text-dark">
                {user?.email}
              </p>
            ) : (
              <p className="text-sm font-normal text-text dark:text-text-dark">
                Não vinculada
              </p>
            )}
          </div>
          <div>
            {user?.app_metadata.providers?.includes('google') ? (
              <button
                type="button"
                className="text-danger dark:text-danger"
                onClick={() => {
                  unlinkProviderGoogle();
                }}
              >
                Desvincular
              </button>
            ) : (
              <button
                type="button"
                className="text-success dark:text-success"
                onClick={() => {
                  linkProviderGoogle();
                }}
              >
                Vincular
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-end gap-4">
        <Button type="submit">
          {loading ? <Jelly size={20} color="#fff" /> : 'Salvar alterações'}
        </Button>
      </div>
    </>
  );
}
