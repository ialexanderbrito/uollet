import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Eye, EyeSlash } from '@phosphor-icons/react';
import defaultAvatar from 'assets/default_user_avatar.png';

import { BottomNavigator } from 'components/BottomNavigator';
import { Loading } from 'components/Loading';
import { MyDialog } from 'components/Modal';

import { formatCurrency } from 'utils/formatCurrency';

import { useAuth } from 'contexts/Auth';

import { useProfile } from 'hooks/useProfile';
import { useTransactions } from 'hooks/useTransactions';

export interface FinancesProps {
  id: number;
  created_at: Date;
  title: string;
  value: number;
  category: string;
  user_id: string;
  type: string;
  date: string;
}

export function Profile() {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const { deleteUser } = useProfile();

  const {
    loading,
    totalIncome,
    allTotal,
    totalOutcome,
    handleCloseModal,
    openModal,
    handleOpenModal,
  } = useTransactions();

  const [visible, setVisible] = useState(false);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex w-full flex-col items-center justify-center bg-background dark:bg-backgroundDark">
          <div className="flex h-24 w-full flex-row bg-primary dark:bg-primaryDark">
            <div className="flex w-full items-center justify-center gap-4">
              <p className="text-lg font-normal text-white">
                Olá,{' '}
                <span className="font-medium">{user?.user_metadata.name}</span>
              </p>
              <div className="flex flex-row items-center justify-center gap-2">
                <span className="font-medium">
                  {visible ? (
                    <Eye
                      size={20}
                      className="cursor-pointer text-secondary"
                      onClick={() => setVisible(!visible)}
                    />
                  ) : (
                    <EyeSlash
                      size={20}
                      className="cursor-pointer text-secondary"
                      onClick={() => setVisible(!visible)}
                    />
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="flex min-h-[85vh] w-full flex-col gap-4 p-4">
            <div className="flex flex-row items-center justify-center gap-4">
              <img
                src={user?.user_metadata.avatar_url || defaultAvatar}
                alt={user?.user_metadata.name}
                className="h-20 w-20 rounded-lg"
              />
            </div>

            <div className="flex flex-col items-start justify-center gap-4 text-title dark:text-titleDark">
              <span className="flex flex-row items-center justify-center gap-2">
                Email: <span className="font-medium">{user?.email}</span>
              </span>

              <span className="flex flex-row items-center justify-center gap-2">
                Entradas do mês:
                <span className="font-medium">
                  {visible ? formatCurrency(totalIncome) : '*****'}
                </span>
              </span>

              <span className="flex flex-row items-center justify-center gap-2">
                Saídas do mês:
                <span className="font-medium">
                  {visible ? formatCurrency(totalOutcome) : '*****'}
                </span>
              </span>

              <span className="flex flex-row items-center justify-center gap-2">
                Total:
                <span className="font-medium">
                  {visible ? formatCurrency(allTotal) : '*****'}
                </span>
              </span>
            </div>

            <div className="flex flex-col items-center justify-end gap-4">
              <button
                onClick={() => navigate('/otp')}
                type="button"
                className="h-14 w-full rounded-lg bg-secondary p-4 text-white dark:bg-secondaryDark"
              >
                Adicionar senha de acesso
              </button>
              <button
                onClick={() => logOut()}
                type="button"
                className="h-14 w-full rounded-lg bg-secondary p-4 text-white dark:bg-secondaryDark"
              >
                Sair
              </button>
              <button
                onClick={() => handleOpenModal()}
                type="button"
                className="h-14 w-full rounded-lg bg-danger p-4 text-white dark:bg-danger"
              >
                Deletar Conta
              </button>
            </div>

            <MyDialog
              isOpen={openModal}
              closeModal={handleCloseModal}
              title="Deletar Conta"
              description="Tem certeza que deseja deletar sua conta? Essa ação não poderá ser desfeita e todos os seus dados serão perdidos."
              deleteTransaction={() => deleteUser(user?.id || '')}
            />
          </div>

          <BottomNavigator />
        </div>
      )}
    </>
  );
}
