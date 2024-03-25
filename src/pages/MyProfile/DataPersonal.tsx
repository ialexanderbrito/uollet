import { User } from '@phosphor-icons/react';
import { Jelly } from '@uiball/loaders';
import { useFeatureFlag } from 'configcat-react';

import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { InputError } from 'components/InputError';
import { Loading } from 'components/Loading';

import { formatCPF, formatCep } from 'utils';

import { useAuth } from 'contexts/Auth';

import { useProfile } from 'hooks/useProfile';

export function DataPersonal() {
  const { loading: loadindConfigCat, value: showPaymentsFeature } =
    useFeatureFlag('page_payments', false);

  const { user } = useAuth();
  const {
    formikUpdateUser,
    formikAddress,
    handleChangeCEP,
    disabledStreet,
    loading,
    updateUserAddress,
  } = useProfile();

  if (loadindConfigCat) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-row items-center gap-2 text-xl font-semibold text-title dark:text-title-dark">
        <span className="flex flex-row items-center gap-2">
          <User size={20} className="text-title dark:text-title-dark" />
          Dados pessoais
        </span>
      </div>

      <Input
        label="Nome"
        type="text"
        {...formikUpdateUser.getFieldProps('name')}
        disabled={user?.app_metadata.provider === 'google'}
      />

      {showPaymentsFeature && (
        <Input
          label="CPF"
          type="text"
          value={formatCPF(user?.user_metadata.identification_number || '')}
          disabled
        />
      )}

      <div className="flex flex-row items-center gap-2 text-lg font-bold text-title dark:text-title-dark">
        <span className="flex flex-row items-center gap-2">Endereço</span>
      </div>

      <Input
        label="CEP"
        type="text"
        {...formikAddress.getFieldProps('zipCode')}
        maxLength={9}
        value={formatCep(formikAddress.values.zipCode)}
        onChange={(e) => {
          formikAddress.handleChange(e);
          handleChangeCEP(e.target.value);
        }}
        onBlur={formikAddress.handleBlur}
      />
      <InputError
        error={Boolean(
          formikAddress.errors.zipCode && formikAddress.touched.zipCode,
        )}
        message={formikAddress.errors.zipCode}
      />

      <Input
        label="Rua"
        type="text"
        {...formikAddress.getFieldProps('street')}
        disabled={disabledStreet}
      />
      <div className="flex flex-row gap-2">
        <Input
          label="Número"
          type="text"
          {...formikAddress.getFieldProps('number')}
        />
        <Input
          label="Complemento"
          type="text"
          {...formikAddress.getFieldProps('reference')}
        />
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <Input
          label="Bairro"
          type="text"
          {...formikAddress.getFieldProps('district')}
          disabled={disabledStreet}
        />
        <Input
          label="Cidade"
          type="text"
          {...formikAddress.getFieldProps('city')}
          disabled
        />
        <Input
          label="Estado"
          type="text"
          {...formikAddress.getFieldProps('state')}
          disabled
        />
      </div>
      <div className="flex w-full flex-col items-center justify-end gap-4">
        <Button onClick={() => updateUserAddress()}>
          {loading ? <Jelly size={20} color="#fff" /> : 'Salvar alterações'}
        </Button>
      </div>
    </>
  );
}
