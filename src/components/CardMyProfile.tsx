import { Link } from 'react-router-dom';

import {
  Envelope,
  IdentificationBadge,
  Key,
  MapPin,
  Password,
  SimCard,
  User,
  CreditCard as CreditCardIcon,
  Crown,
} from '@phosphor-icons/react';

import { formatCPF, formatCellPhone, formatCep } from 'utils';

import { useAuth } from 'contexts/Auth';

import { useAddCreditCard } from 'hooks/useAddCreditCard';

interface CardMyProfileProps {
  dataAccess?: boolean;
  dataPersonal?: boolean;
  dataSubscription?: boolean;
}

export function CardMyProfile({
  dataAccess,
  dataPersonal,
  dataSubscription,
}: CardMyProfileProps) {
  const { user, plan, isPlanActive } = useAuth();
  const { creditCards } = useAddCreditCard();

  return (
    <>
      {dataAccess && (
        <div className="flex w-full flex-col gap-2 rounded-md bg-background-card p-4 text-lg text-title  dark:bg-background-card-dark dark:text-title-dark">
          <div className="flex items-center gap-2">
            <div className="mt-1 flex self-start">
              <Key size={20} className="text-title dark:text-title-dark" />
            </div>
            <span className="font-bold text-title dark:text-title-dark">
              Dados de acesso
            </span>
            <Link
              className="cursor-pointer text-sm font-normal text-text hover:text-primary hover:underline hover:transition-all dark:text-text-dark"
              to="access"
            >
              Alterar
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex self-start">
              <Envelope size={20} className="text-title dark:text-title-dark" />
            </div>
            <span className="text-sm font-normal text-text dark:text-text-dark">
              {user?.email}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex self-start">
              <Password size={20} className="text-title dark:text-title-dark" />
            </div>
            <span className="text-sm font-normal text-text dark:text-text-dark">
              {user?.app_metadata.provider === 'google'
                ? 'Senha não definida'
                : 'Senha: ********'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex self-start">
              <SimCard size={20} className="text-title dark:text-title-dark" />
            </div>
            <span className="text-sm font-normal text-text dark:text-text-dark">
              {formatCellPhone(
                user?.user_metadata.phone ||
                  'Você não tem um telefone cadastrado',
              )}
            </span>
          </div>
        </div>
      )}

      {dataPersonal && (
        <div className="flex w-full flex-col gap-2 rounded-md bg-background-card p-4 text-lg text-title dark:bg-background-card-dark dark:text-title-dark">
          <div className="flex items-center gap-2">
            <div className="mt-1 flex self-start">
              <User size={20} className="text-title dark:text-title-dark" />
            </div>
            <span className="font-bold text-title dark:text-title-dark">
              Dados pessoais
            </span>
            <Link
              className="cursor-pointer text-sm font-normal text-text hover:text-primary hover:underline hover:transition-all dark:text-text-dark"
              to="personal"
            >
              Alterar
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex self-start">
              <IdentificationBadge
                size={20}
                className="text-title dark:text-title-dark"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-normal text-text dark:text-text-dark">
                {user?.user_metadata.name}
              </span>
              {user?.user_metadata.identification_number && (
                <span className="text-sm font-normal text-title dark:text-title-dark">
                  CPF:{' '}
                  {formatCPF(user?.user_metadata.identification_number || '')}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex self-start">
              <MapPin size={20} className="text-title dark:text-title-dark" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-normal text-text dark:text-text-dark">
                {!user?.user_metadata.address ? (
                  'Você ainda não cadastrou seu endereço'
                ) : (
                  <span className="flex flex-col text-text dark:text-text-dark">
                    {user?.user_metadata.address?.street},{' '}
                    {user?.user_metadata.address?.number} -{' '}
                    {user?.user_metadata.address?.reference}
                  </span>
                )}
              </span>
              {user?.user_metadata.address && (
                <span className="text-sm font-normal text-title dark:text-title-dark">
                  {user?.user_metadata.address?.district} -{' '}
                  {user?.user_metadata.address?.city} -{' '}
                  {user?.user_metadata.address?.state}. CEP{' '}
                  {formatCep(user?.user_metadata.address?.zipCode || '')}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {dataSubscription && (
        <div className="flex w-full flex-col gap-2 rounded-md bg-background-card p-4 text-lg text-title  dark:bg-background-card-dark dark:text-title-dark">
          <div className="flex items-center gap-2">
            <div className="mt-1 flex self-start">
              <Crown size={20} className="text-title dark:text-title-dark" />
            </div>
            <span className="font-bold text-title dark:text-title-dark">
              Assinaturas e cartões
            </span>
            <Link
              className="cursor-pointer text-sm font-normal text-text hover:text-primary hover:underline hover:transition-all dark:text-text-dark"
              to="subscriptions"
            >
              Gerenciar
            </Link>
          </div>

          <span className="flex flex-row gap-2 text-sm font-normal text-text dark:text-text-dark">
            {isPlanActive ? (
              'Você possui uma assinatura ativa. Clique em gerenciar para ver mais detalhes.'
            ) : (
              <p>
                Você não possui uma assinatura ativa.{' '}
                <Link
                  className="cursor-pointer text-sm font-normal text-gray-400 hover:text-primary hover:underline hover:transition-all dark:text-gray-500"
                  to="#"
                >
                  Clique aqui
                </Link>{' '}
                para ver nossos planos.
              </p>
            )}
          </span>

          {creditCards.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex self-start">
                <CreditCardIcon
                  size={20}
                  className="text-title dark:text-title-dark"
                />
              </div>
              <span className="text-sm font-normal text-text dark:text-text-dark">
                Você possui {creditCards.length} cartões cadastrados. Clique em
                gerenciar para ver mais detalhes.
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <div className="flex self-start">
              <Crown size={20} className="text-title dark:text-title-dark" />
            </div>
            <span className="text-sm font-normal text-text dark:text-text-dark">
              Você está no plano <b>{plan?.plan.name}</b>. Caso queira alterar
              seu plano, basta clicar em gerenciar.
            </span>
          </div>
        </div>
      )}
    </>
  );
}
