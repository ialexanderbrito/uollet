import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { RWebShare } from 'react-web-share';

import {
  ChartLine,
  Confetti,
  CreditCard,
  Eye,
  EyeClosed,
  Info,
  Key,
  Keyhole,
  LockKey,
  Question,
  SealCheck,
  SignOut,
  Sun,
  UserMinus,
} from '@phosphor-icons/react';
import connectionImg from 'assets/connection.svg';
import creditCardImg from 'assets/credit_card.svg';
import defaultAvatar from 'assets/default_user_avatar.png';
import goalsImg from 'assets/goals.svg';
import incomeImg from 'assets/income.svg';
import outcomeImg from 'assets/outcome.svg';
import savingsImg from 'assets/savings.svg';
import welcomeImg from 'assets/welcome.svg';

import { Banner } from 'components/Banner';
import { BottomNavigator } from 'components/BottomNavigator';
import { EnrollMFA } from 'components/EnrollMFA';
import { EnrollOtp } from 'components/EnrollOtp';
import { Header } from 'components/Header';
import { Loading } from 'components/Loading';
import { MyDialog } from 'components/Modal';
import { About } from 'components/Modal/About';
import { useModal } from 'components/Modal/useModal';
import { Submenu } from 'components/Submenu';

import { cn } from 'utils/cn';
import { formatCurrency } from 'utils/formatCurrency';
import { verifyLoginLastSevenDays } from 'utils/verifyLoginLastSevenDays';

import { useAuth } from 'contexts/Auth';
import { useTheme } from 'contexts/Theme';

import { useInvestments } from 'hooks/useInvestments';
import { useOtp } from 'hooks/useOtp';
import { useProfile } from 'hooks/useProfile';
import { useTransactions } from 'hooks/useTransactions';

export function Profile() {
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();
  const { user, logOut, areValueVisible, toggleValueVisibility, hasOtp } =
    useAuth();

  const { deleteOtp } = useOtp();
  const { deleteUser } = useProfile();
  const { copyToClipboard } = useModal();
  const {
    loading,
    handleCloseModal,
    openModal,
    handleOpenModal,
    allTotal,
    getTransactionsValuesTotal,
  } = useTransactions();
  const {
    allTotalInvestiments,
    getTransactionsValuesTotal: getTransactionsValuesTotalInvestiments,
  } = useInvestments();

  const [openModalSuport, setOpenModalSuport] = useState(false);
  const [openModalAbout, setOpenModalAbout] = useState(false);
  const [openModalMFA, setOpenModalMFA] = useState(false);
  const [openModalOtp, setOpenModalOtp] = useState(false);

  function handleOpenModalSuport() {
    setOpenModalSuport(true);
  }

  function handleOpenModalAbout() {
    setOpenModalAbout(true);
  }

  useEffect(() => {
    getTransactionsValuesTotal();
    getTransactionsValuesTotalInvestiments();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex w-full flex-col items-center justify-center bg-background dark:bg-backgroundDark">
          <Header title="Minha conta" />

          <div className="flex min-h-[95vh] w-full flex-col gap-4 p-4">
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
                <span className="flex items-center font-medium text-title dark:text-titleDark">
                  {user?.user_metadata.full_name}

                  {verifyLoginLastSevenDays(
                    user?.updated_at,
                    user?.user_metadata.phone,
                  ) && (
                    <>
                      <Tooltip
                        content="Seu número de telefone foi verificado e você logou nos últimos 7 dias"
                        anchorSelect=".verify"
                        className="rounded-md bg-backgroundCard p-2 text-title dark:bg-backgroundCardDark dark:text-titleDark"
                        noArrow
                        place="right"
                      />
                      <span className="verify ml-1 text-xs font-normal text-blue-500 dark:text-blue-400">
                        <SealCheck size={16} weight="fill" />
                      </span>
                    </>
                  )}
                </span>
                <p className="text-sm font-normal text-text dark:text-textDark">
                  Perfil
                </p>
              </div>
            </Link>
            <div className="flex h-16 flex-row items-center justify-start gap-4 rounded-lg bg-backgroundCard dark:bg-backgroundCardDark">
              <img
                src={
                  allTotal + allTotalInvestiments < 0 ? outcomeImg : incomeImg
                }
                alt={
                  allTotal + allTotalInvestiments < 0 ? 'Saidas' : 'Entradas'
                }
                className="ml-3 h-8 w-8 rounded-lg object-cover"
              />

              <div>
                <p className="text-sm font-normal text-text dark:text-textDark">
                  Saldo total na carteira
                </p>
                <span
                  className={cn(
                    'font-medium ',
                    allTotal + allTotalInvestiments < 0 && 'text-danger',
                    allTotal + allTotalInvestiments > 0 && 'text-success',
                    areValueVisible &&
                      'select-none text-title blur-md dark:text-titleDark',
                  )}
                >
                  {formatCurrency(allTotal + allTotalInvestiments)}
                </span>
              </div>
            </div>

            <div className="flex w-full min-w-full gap-4 overflow-y-hidden overflow-x-scroll p-1 scrollbar-hide md:overflow-x-auto">
              <Banner
                title="Seja bem vindo(a) ao uollet!"
                img={welcomeImg}
                className="bg-[#1da1f3]"
              />

              <Banner
                title="Comece a controlar suas finanças agora mesmo!"
                img={savingsImg}
                onClick={() => navigate('/register')}
                className="bg-[#01eefe]"
              />

              <Banner
                title="Cadastre suas metas financeiras e alcance seus objetivos!"
                img={goalsImg}
                onClick={() => navigate('/register/goals')}
                className="bg-[#c8a2c8]"
              />

              <RWebShare
                data={{
                  text: 'Conheça o uollet, um app para controle de finanças pessoais!',
                  url: import.meta.env.VITE_URL_LANDING_PAGE,
                  title: 'uollet',
                }}
              >
                <Banner
                  title=" Convide seus amigos para usar o uollet!"
                  img={connectionImg}
                  className="bg-[#fbbb02]"
                />
              </RWebShare>

              <Banner
                title="Gerencie suas compras feitas no cartão de crédito!"
                img={creditCardImg}
                onClick={() => navigate('/cards')}
                className="bg-[#01e59a]"
              />
            </div>
            <div className="mt-4 flex flex-col items-start justify-center gap-4 text-title dark:text-titleDark">
              <Submenu
                onClick={() => toggleValueVisibility()}
                icon={
                  areValueVisible ? (
                    <EyeClosed size={20} weight="light" />
                  ) : (
                    <Eye size={20} weight="light" />
                  )
                }
                title={areValueVisible ? 'Mostrar saldo' : 'Ocultar saldo'}
                divider
              />

              <Submenu
                onClick={() => navigate('/investments')}
                icon={<ChartLine size={20} weight="light" />}
                title="Área do investidor"
                divider
              />

              <Submenu
                icon={<CreditCard size={20} weight="light" />}
                title="Cartões de crédito"
                onClick={() => navigate('/cards')}
                arrow
                divider
              />

              <Submenu
                icon={<Confetti size={20} weight="light" />}
                title="Metas"
                onClick={() => navigate('/goals')}
                arrow
                divider
              />

              <Submenu
                icon={<Keyhole size={20} weight="light" />}
                title="Autenticação de dois fatores"
                onClick={() => {
                  setOpenModalMFA(true);
                }}
                arrow
                divider
                beta
              />

              <Submenu
                icon={<LockKey size={20} weight="light" />}
                title="PIN de acesso rápido"
                onClick={() => setOpenModalOtp(true)}
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
                onClick={() => {
                  toggleTheme();
                }}
                icon={<Sun size={20} weight="light" />}
                title="Tema do app"
                divider
                switchTheme
              />
              <Submenu
                icon={<Question size={20} weight="light" />}
                title="Sobre"
                onClick={() => {
                  handleOpenModalAbout();
                }}
                arrow
                divider
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
              buttonPrimary
              deleteAccount={() => {
                if (!user) return;
                deleteUser(user.id);
              }}
              terms
            />

            <MyDialog
              isOpen={openModalSuport}
              closeModal={() => setOpenModalSuport(false)}
              title="Suporte"
              description="Email para contato: "
              email="eu@ialexanderbrito.dev"
              buttonPrimary
              buttonSecondary
              textButtonSecondary="Copiar email"
              handleChangeButtonSecondary={() => {
                copyToClipboard();
              }}
            />

            <MyDialog
              isOpen={openModalAbout}
              closeModal={() => setOpenModalAbout(false)}
              title="uollet app"
              about
              buttonSecondary
              textButtonSecondary="Fechar"
              handleChangeButtonSecondary={() => setOpenModalAbout(false)}
            >
              <About />
            </MyDialog>

            {hasOtp ? (
              <MyDialog
                isOpen={openModalMFA}
                closeModal={() => setOpenModalMFA(false)}
                title="Autenticação de dois fatores"
                description="Para usar a autenticação de dois fatores, você precisa primeiro desativar o PIN de acesso rápido, para que não haja conflito entre os dois. Deseja desativar o PIN de acesso rápido?"
                buttonPrimary
                buttonSecondary
                textButtonSecondary="Desativar PIN"
                handleChangeButtonSecondary={() => {
                  deleteOtp();
                  setOpenModalMFA(false);
                }}
              />
            ) : (
              <EnrollMFA
                openModalMFA={openModalMFA}
                setOpenModalMFA={setOpenModalMFA}
              />
            )}

            <EnrollOtp
              openModalOtp={openModalOtp}
              setOpenModalOtp={setOpenModalOtp}
            />
          </div>

          <BottomNavigator />
        </div>
      )}
    </>
  );
}
