import { useNavigate } from 'react-router-dom';

import {
  CaretLeft,
  Info,
  Key,
  LockKey,
  Question,
  SignOut,
  Sun,
  UserMinus,
} from '@phosphor-icons/react';
import defaultAvatar from 'assets/default_user_avatar.png';

import { BottomNavigator } from 'components/BottomNavigator';
import { Loading } from 'components/Loading';
import { MyDialog } from 'components/Modal';
import { Submenu } from 'components/Submenu';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

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
  const { toast } = useToast();
  const { user, logOut } = useAuth();
  const { deleteUser } = useProfile();

  const { loading, handleCloseModal, openModal, handleOpenModal } =
    useTransactions();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex w-full flex-col items-center justify-center bg-background dark:bg-backgroundDark">
          <div className="flex h-24 w-full flex-row bg-primary dark:bg-primaryDark">
            <div className="flex w-1/4 items-center justify-center">
              <CaretLeft
                size={20}
                weight="light"
                className="cursor-pointer text-white"
                onClick={() => navigate(-1)}
              />
            </div>
            <div className="flex w-2/4 items-center justify-center">
              <p className="text-lg font-normal text-white">Minha conta</p>
            </div>
          </div>

          <div className="flex min-h-[85vh] w-full flex-col gap-4 p-4">
            <div className="flex h-16 flex-row items-center justify-start gap-4 rounded-lg bg-backgroundCard dark:bg-backgroundCardDark">
              <img
                src={user?.user_metadata.avatar_url || defaultAvatar}
                alt={user?.user_metadata.name}
                className="ml-3 h-10 w-10 rounded-lg"
              />

              <div>
                <span className="font-medium text-title dark:text-titleDark">
                  {user?.user_metadata.full_name}
                </span>
                <p className="text-xs font-normal text-text dark:text-textDark">
                  Perfil
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col items-start justify-center gap-4 text-title dark:text-titleDark">
              <Submenu
                icon={<LockKey size={20} weight="light" />}
                title="Segurança"
                onClick={() => navigate('/otp')}
                arrow
                divider
              />

              <Submenu
                icon={<Key size={20} weight="light" />}
                title="Senha"
                onClick={() => {
                  toast.error('Em breve você poderá alterar sua senha!', {
                    id: 'toast',
                  });
                }}
                arrow
                divider
              />

              <Submenu
                icon={<Info size={20} weight="light" />}
                title="Ajuda"
                onClick={() => {
                  toast.error(
                    'Em breve você poderá entrar em contato com o suporte!',
                    {
                      id: 'toast',
                    },
                  );
                }}
                arrow
                divider
              />

              <Submenu
                icon={<Question size={20} weight="light" />}
                title="Sobre"
                onClick={() => {
                  toast.error(
                    'Em breve você poderá ver informações sobre o app!',
                    {
                      id: 'toast',
                    },
                  );
                }}
                arrow
                divider
              />

              <Submenu
                icon={<Sun size={20} weight="light" />}
                title="Tema do app"
                divider
                switchTheme
              />

              <Submenu
                icon={<UserMinus size={20} weight="light" />}
                title="Apagar a conta"
                onClick={() => handleOpenModal()}
                arrow
                divider
              />

              <Submenu
                icon={<SignOut size={20} weight="light" />}
                title="Sair"
                onClick={() => logOut()}
              />
            </div>

            <MyDialog
              isOpen={openModal}
              closeModal={handleCloseModal}
              title="Deletar Conta"
              description="Tem certeza que deseja deletar sua conta? Essa ação não poderá ser desfeita e todos os seus dados serão perdidos."
              deleteTransaction={() => deleteUser(user?.id || '')}
              terms
            />
          </div>

          <BottomNavigator />
        </div>
      )}
    </>
  );
}
