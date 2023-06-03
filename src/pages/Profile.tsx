import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RWebShare } from 'react-web-share';

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
import connectionImg from 'assets/connection.svg';
import defaultAvatar from 'assets/default_user_avatar.png';
import puzzleImg from 'assets/quiz.svg';
import savingsImg from 'assets/savings.svg';
import welcomeImg from 'assets/welcome.svg';

import { Banner } from 'components/Banner';
import { BottomNavigator } from 'components/BottomNavigator';
import { Loading } from 'components/Loading';
import { MyDialog } from 'components/Modal';
import { Submenu } from 'components/Submenu';

import { useAuth } from 'contexts/Auth';
import { useTheme } from 'contexts/Theme';
import { useToast } from 'contexts/Toast';

import { useProfile } from 'hooks/useProfile';
import { useTransactions } from 'hooks/useTransactions';

export function Profile() {
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();
  const { toast } = useToast();
  const { user, logOut } = useAuth();
  const { deleteUser } = useProfile();
  const { loading, handleCloseModal, openModal, handleOpenModal } =
    useTransactions();

  const [openModalSuport, setOpenModalSuport] = useState(false);

  function handleOpenModalSuport() {
    setOpenModalSuport(true);
  }

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

          <div className="flex min-h-[90vh] w-full flex-col gap-4 p-4">
            <Link
              to={`/profile/${user?.id}`}
              className="flex h-16 cursor-pointer flex-row items-center justify-start gap-4 rounded-lg bg-backgroundCard dark:bg-backgroundCardDark"
            >
              <img
                src={user?.user_metadata.avatar_url || defaultAvatar}
                alt={user?.user_metadata.name}
                className="ml-3 h-10 w-10 rounded-lg object-cover"
              />

              <div>
                <span className="font-medium text-title dark:text-titleDark">
                  {user?.user_metadata.full_name}
                </span>
                <p className="text-sm font-normal text-text dark:text-textDark">
                  Perfil
                </p>
              </div>
            </Link>

            <div className="flex w-full min-w-full snap-x gap-4 overflow-x-scroll p-1 scrollbar-hide md:flex-row md:justify-center md:gap-4 md:overflow-x-auto md:overflow-y-hidden md:pb-4">
              <Banner
                title="Seja bem vindo(a) ao Finances!"
                color="#1da1f3"
                img={welcomeImg}
              />

              <Banner
                title="Comece a controlar suas finanças agora mesmo!"
                color="#01eefe"
                img={savingsImg}
                onClick={() => navigate('/register')}
              />

              <RWebShare
                data={{
                  text: 'Conheça o Finances, um app para controle de finanças pessoais!',
                  url: 'https://finance-oficial.netlify.app/',
                  title: 'Finances',
                }}
              >
                <Banner
                  title=" Convide seus amigos para usar o Finances!"
                  color="#fbbb02"
                  img={connectionImg}
                />
              </RWebShare>

              <Banner
                title="Aprenda a mexer no app!"
                color="#01e59a"
                img={puzzleImg}
                onClick={() =>
                  toast.error('Em breve você poderá ver o tutorial!', {
                    id: 'toast',
                  })
                }
              />
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
                  navigate(`/profile/${user?.id}`);
                }}
                arrow
                divider
              />

              <Submenu
                icon={<Info size={20} weight="light" />}
                title="Suporte"
                onClick={() => {
                  handleOpenModalSuport();
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
                onClick={() => {
                  toggleTheme();
                }}
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

              <div className="mb-14 flex h-6" />
            </div>

            <MyDialog
              isOpen={openModal}
              closeModal={handleCloseModal}
              title="Deletar Conta"
              description="Tem certeza que deseja deletar sua conta? Essa ação não poderá ser desfeita e todos os seus dados serão perdidos."
              deleteAccount={() => deleteUser(user?.id || '')}
              terms
            />

            <MyDialog
              isOpen={openModalSuport}
              closeModal={() => setOpenModalSuport(false)}
              title="Suporte"
              description="Email para contato: "
              email="eu@ialexanderbrito.dev"
              support
            />
          </div>

          <BottomNavigator />
        </div>
      )}
    </>
  );
}
