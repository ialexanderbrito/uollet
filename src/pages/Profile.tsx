import { useNavigate, Link } from 'react-router-dom';
import { RWebShare } from 'react-web-share';

import {
  Crown,
  Eye,
  EyeClosed,
  Power,
  SketchLogo,
} from '@phosphor-icons/react';
import defaultAvatar from 'assets/default_user_avatar.png';
import { income, outcome } from 'assets/icons';
import {
  goalsIllustration,
  connectionIllustration,
  creditCardIllustration,
  savingsIllustration,
  welcomeIllustration,
  supportIllustration,
} from 'assets/illustrations';
import { useFeatureFlag } from 'configcat-react';

import { Banner } from 'components/Banner';
import { BottomNavigator } from 'components/BottomNavigator';
import { EnrollMFA } from 'components/EnrollMFA';
import { EnrollOtp } from 'components/EnrollOtp';
import { Header } from 'components/Header';
import { Loading } from 'components/Loading';
import { MyDialog } from 'components/Modal';
import { useModal } from 'components/Modal/useModal';
import { StockScroll } from 'components/StockScroll';
import { Submenu } from 'components/Submenu';
import { Tools } from 'components/Tools';

import { cn } from 'utils/cn';
import { formatCurrency } from 'utils/formatCurrency';

import { useAuth } from 'contexts/Auth';

import { useOtp } from 'hooks/useOtp';
import { useProfile } from 'hooks/useProfile';

import { Payments } from './Payments';

export function Profile() {
  const navigate = useNavigate();

  const { loading: loadindConfigCat, value: showPaymentsFeature } =
    useFeatureFlag('page_payments', false);

  const { copyToClipboard } = useModal();
  const { deleteOtp } = useOtp();

  const {
    handleOpenModalSuport,
    loading,
    allTotal,
    allTotalInvestiments,
    openModalSuport,
    openModalMFA,
    openModalOtp,
    openModalPayments,
    setOpenModalPayments,
    openModalTools,
    menus,
    setOpenModalSuport,
    setOpenModalMFA,
    setOpenModalOtp,
    setOpenModalTools,
  } = useProfile();
  const {
    user,
    logOut,
    areValueVisible,
    toggleValueVisibility,
    isPlanActive,
    hasOtp,
  } = useAuth();

  if (loading || loadindConfigCat) {
    return <Loading />;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center bg-background dark:bg-background-dark">
      <Header title="Minha conta" />

      <div className="flex min-h-[95vh] w-full flex-col gap-4 p-4">
        <Link
          to={`/profile/${user?.id}`}
          className="flex h-16 cursor-pointer flex-row items-center justify-start gap-4 rounded-lg border border-gray-200 bg-background-card dark:border-gray-700 dark:bg-background-card-dark"
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
        <div className="flex h-16 flex-row items-center justify-start gap-4 rounded-lg border border-gray-200 bg-background-card dark:border-gray-700 dark:bg-background-card-dark">
          <div
            className="ml-4 flex cursor-pointer items-center gap-2 text-title dark:text-title-dark"
            onClick={() => toggleValueVisibility()}
          >
            {areValueVisible ? (
              <EyeClosed size={20} weight="light" />
            ) : (
              <Eye size={20} weight="light" />
            )}
          </div>

          <img
            src={allTotal + allTotalInvestiments < 0 ? outcome : income}
            alt={allTotal + allTotalInvestiments < 0 ? 'Saidas' : 'Entradas'}
            className="h-8 w-8 rounded-lg object-cover"
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

        <div className="flex w-full min-w-full overflow-y-hidden overflow-x-scroll scrollbar-hide md:overflow-x-auto">
          <StockScroll className="flex md:hidden">
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
              title="Veja sua carteira e sua evolução financeira!"
              img={welcomeIllustration}
              className="bg-[#1da1f3]"
              onClick={() => navigate('/wallet')}
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

            <Banner
              title="Gerencie suas compras feitas no cartão de crédito!"
              img={creditCardIllustration}
              onClick={() => navigate('/cards')}
              className="bg-[#01e59a]"
            />

            <Banner
              title="Precisa de ajuda? Fale com a gente! Mande um email para suporte!"
              img={supportIllustration}
              onClick={() => handleOpenModalSuport()}
              className="bg-[#ff725e]"
            />
          </StockScroll>
        </div>
        <div className="grid w-full grid-cols-1 gap-2 text-title dark:text-title-dark sm:grid-cols-2 md:grid-cols-3">
          {menus.map((menu) => (
            <Submenu
              key={menu.id}
              icon={menu.icon}
              title={menu.title}
              onClick={menu.onClick}
              arrow={menu.arrow}
              switchTheme={menu.switchTheme}
              beta={menu.beta}
            />
          ))}
        </div>
        <div className="text-title dark:text-title-dark">
          <Submenu
            icon={<Power size={20} weight="light" className="text-danger" />}
            title="Sair"
            onClick={() => logOut()}
          />
        </div>
        <div className="mb-10 flex h-6" />

        <Tools
          openModalTools={openModalTools}
          setOpenModalTools={setOpenModalTools}
        />

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
