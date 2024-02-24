import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RWebShare } from 'react-web-share';

import {
  ChatText,
  Confetti,
  CreditCard,
  Crown,
  Eye,
  EyeClosed,
  Info,
  Keyhole,
  LockKey,
  Power,
  SketchLogo,
  Sun,
} from '@phosphor-icons/react';
import defaultAvatar from 'assets/default_user_avatar.png';
import { income, outcome } from 'assets/icons';
import {
  goalsIllustration,
  connectionIllustration,
  creditCardIllustration,
  savingsIllustration,
  welcomeIllustration,
} from 'assets/illustrations';
import { useFeatureFlag } from 'configcat-react';
import { Crisp } from 'crisp-sdk-web';

import { Banner } from 'components/Banner';
import { BottomNavigator } from 'components/BottomNavigator';
import { EnrollMFA } from 'components/EnrollMFA';
import { EnrollOtp } from 'components/EnrollOtp';
import { Header } from 'components/Header';
import { Loading } from 'components/Loading';
import { MyDialog } from 'components/Modal';
import { useModal } from 'components/Modal/useModal';
import { Submenu } from 'components/Submenu';

import { cn } from 'utils/cn';
import { formatCurrency } from 'utils/formatCurrency';

import { useAuth } from 'contexts/Auth';

import { useInvestments } from 'hooks/useInvestments';
import { useOtp } from 'hooks/useOtp';
import { useTransactions } from 'hooks/useTransactions';

import { Payments } from './Payments';

export function Profile() {
  const { loading: loadindConfigCat, value: showPaymentsFeature } =
    useFeatureFlag('page_payments', false);
  const navigate = useNavigate();
  const {
    user,
    logOut,
    areValueVisible,
    toggleValueVisibility,
    hasOtp,
    isPlanActive,
  } = useAuth();

  const { deleteOtp } = useOtp();
  const { copyToClipboard } = useModal();
  const { loading, allTotal, getTransactionsValuesTotal } = useTransactions();
  const {
    allTotalInvestiments,
    getTransactionsValuesTotal: getTransactionsValuesTotalInvestiments,
  } = useInvestments();

  const [openModalSuport, setOpenModalSuport] = useState(false);
  const [openModalMFA, setOpenModalMFA] = useState(false);
  const [openModalOtp, setOpenModalOtp] = useState(false);
  const [openModalPayments, setOpenModalPayments] = useState(false);

  function handleOpenModalSuport() {
    setOpenModalSuport(true);
  }

  function handleOpenCrisp() {
    Crisp.setHideOnMobile(false);
    Crisp.chat.open();
  }

  Crisp.chat.onChatClosed(() => {
    Crisp.setHideOnMobile(true);
  });

  useEffect(() => {
    getTransactionsValuesTotal();
    getTransactionsValuesTotalInvestiments();
  }, []);

  if (loading || loadindConfigCat) {
    return <Loading />;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center bg-background dark:bg-background-dark">
      <Header title="Minha conta" />

      <div className="flex min-h-[95vh] w-full flex-col gap-4 p-4">
        <Link
          to={`/profile/${user?.id}`}
          className="flex h-16 cursor-pointer flex-row items-center justify-start gap-4 rounded-lg bg-background-card dark:bg-background-card-dark"
        >
          <img
            src={user?.user_metadata.avatar_url || defaultAvatar}
            alt={user?.user_metadata.name}
            className="ml-3 h-10 w-10 rounded-lg object-cover"
          />

          <div>
            <span className="flex items-center font-medium text-title dark:text-title-dark">
              {user?.user_metadata.full_name}

              {isPlanActive && (
                <span className="ml-1 text-xs font-normal text-yellow-500 dark:text-yellow-400">
                  <Crown size={16} weight="duotone" />
                </span>
              )}
            </span>
            <p className="text-sm font-normal text-text dark:text-text-dark">
              Gerencie sua conta
            </p>
          </div>
        </Link>
        <div className="flex h-16 flex-row items-center justify-start gap-4 rounded-lg bg-background-card dark:bg-background-card-dark">
          <img
            src={allTotal + allTotalInvestiments < 0 ? outcome : income}
            alt={allTotal + allTotalInvestiments < 0 ? 'Saidas' : 'Entradas'}
            className="ml-3 h-8 w-8 rounded-lg object-cover"
          />

          <div>
            <p className="text-sm font-normal text-text dark:text-text-dark">
              Saldo total na carteira
            </p>
            <span
              className={cn(
                'font-medium text-text dark:text-text-dark',
                allTotal + allTotalInvestiments < 0 && 'text-danger',
                allTotal + allTotalInvestiments > 0 && 'text-success',
                areValueVisible &&
                  'select-none text-title blur-md dark:text-title-dark',
              )}
            >
              {formatCurrency(allTotal + allTotalInvestiments)}
            </span>
          </div>
        </div>

        {showPaymentsFeature && (
          // {!isPlanActive && (
          <div
            className="flex h-20 cursor-pointer flex-row items-center justify-start gap-4 rounded-lg border border-primary bg-background-card transition-all hover:bg-background-card-dark/5 dark:bg-background-card-dark dark:hover:border-primary-dark"
            onClick={() => setOpenModalPayments(true)}
          >
            <SketchLogo className="ml-3 h-8 w-8 rounded-lg object-cover text-primary dark:text-white" />

            <div>
              <span className="text-lg font-bold text-primary dark:text-white">
                Vire um uollet+!
              </span>
              <p className="text-xs font-normal text-title dark:text-text-dark">
                Assine o uollet+ e tenha acesso a mais funcionalidades e mais{' '}
                <br />
                controle sobre suas finanças!
              </p>
            </div>
          </div>
        )}

        <div className="flex w-full min-w-full gap-4 overflow-y-hidden overflow-x-scroll p-1 scrollbar-hide md:overflow-x-auto">
          <Banner
            title="Seja bem vindo(a) ao uollet!"
            img={welcomeIllustration}
            className="bg-[#1da1f3]"
          />

          <Banner
            title="Comece a controlar suas finanças agora mesmo!"
            img={savingsIllustration}
            onClick={() => navigate('/register')}
            className="bg-[#01eefe]"
          />

          <Banner
            title="Cadastre suas metas financeiras e alcance seus objetivos!"
            img={goalsIllustration}
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
              img={connectionIllustration}
              className="bg-[#fbbb02]"
            />
          </RWebShare>

          <Banner
            title="Gerencie suas compras feitas no cartão de crédito!"
            img={creditCardIllustration}
            onClick={() => navigate('/cards')}
            className="bg-[#01e59a]"
          />
        </div>
        <div className="mt-4 flex flex-col items-start justify-center gap-4 text-title dark:text-title-dark">
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
            icon={<ChatText size={20} weight="light" />}
            title="Chat"
            onClick={() => {
              handleOpenCrisp();
            }}
            arrow
            divider
            beta
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
            icon={<Sun size={20} weight="light" />}
            title="Tema do app"
            divider
            switchTheme
          />

          <Submenu
            icon={<Power size={20} weight="light" className="text-danger" />}
            title="Sair"
            onClick={() => logOut()}
          />

          <div className="mb-14 flex h-6" />
        </div>

        <MyDialog
          isOpen={openModalSuport}
          closeModal={() => setOpenModalSuport(false)}
          title="Suporte"
          description="Email para contato: "
          email="oi@uollet.com.br"
          buttonPrimary
          buttonSecondary
          textButtonSecondary="Copiar email"
          handleChangeButtonSecondary={() => {
            copyToClipboard();
          }}
        />

        <Payments
          closeModal={() => setOpenModalPayments(false)}
          isOpen={openModalPayments}
        />

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
  );
}
