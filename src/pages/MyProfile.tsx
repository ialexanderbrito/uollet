import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import defaultAvatar from 'assets/default_user_avatar.png';
import { useFeatureFlag } from 'configcat-react';

import { DataAccess } from 'pages/MyProfile/DataAccess';
import { DataPersonal } from 'pages/MyProfile/DataPersonal';
import { DataSubscription } from 'pages/MyProfile/DataSubscription';
import { Payments } from 'pages/Payments';

import { BottomNavigator } from 'components/BottomNavigator';
import { CardMyProfile } from 'components/CardMyProfile';
import { Header } from 'components/Header';
import { Loading } from 'components/Loading';
import { MenuProfile } from 'components/MenuProfile';
import { MyDialog } from 'components/Modal';
import { DeleteAccount } from 'components/Modal/DeleteAccount';
import { AddCreditCard } from 'components/Payments/AddCreditCard';

import { useAuth } from 'contexts/Auth';

import { useProfile } from 'hooks/useProfile';

import { DeleteAccountInfo } from './MyProfile/DeleteAccount';

export function MyProfile() {
  const { loading: loadindConfigCat, value: showPaymentsFeature } =
    useFeatureFlag('page_payments', false);

  const { user } = useAuth();
  const { formikUpdateUser, formikAddress, deleteUser } = useProfile();

  const [openModalCancelPlan, setOpenModalCancelPlan] = useState(false);
  const [openModalDeleteAccount, setOpenModalDeleteAccount] = useState(false);
  const [isOpenAddCreditCard, setIsOpenAddCreditCard] = useState(false);
  const [openModalChangePlan, setOpenModalChangePlan] = useState(false);

  const location = useLocation();

  const hasAccess = location.pathname.includes('access');
  const hasPersonal = location.pathname.includes('personal');
  const hasSubscription = location.pathname.includes('subscription');

  if (loadindConfigCat) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center  bg-background dark:bg-background-dark">
      <Header
        title={`Olá, ${user?.user_metadata.name}`}
        navigateLink="/profile"
      />

      <form
        className="flex w-full flex-col"
        onSubmit={(e) => {
          e.preventDefault();

          formikUpdateUser.handleSubmit();
          formikAddress.handleSubmit();
        }}
      >
        <div className="flex  w-full flex-col gap-4 p-4">
          {!hasAccess && !hasPersonal && !hasSubscription && (
            <div className="flex flex-col gap-4">
              <div className="ml-1 flex flex-row items-center gap-2">
                <img
                  src={user?.user_metadata.picture || defaultAvatar}
                  alt="Foto de perfil"
                  className="h-20 w-20 rounded-md object-cover"
                />
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold text-title dark:text-title-dark">
                    Minha conta
                  </h1>
                  <span className="text-sm font-normal text-gray-400 dark:text-gray-500">
                    Gerencie as informações de conta, dados pessoais e
                    assinaturas.
                  </span>
                </div>
              </div>
            </div>
          )}

          <MenuProfile />

          {!hasAccess && !hasPersonal && !hasSubscription && (
            <div className="flex flex-col gap-4">
              <CardMyProfile dataAccess />
              <CardMyProfile dataPersonal />
              {showPaymentsFeature && <CardMyProfile dataSubscription />}
            </div>
          )}

          {hasAccess && <DataAccess />}

          {hasPersonal && <DataPersonal />}

          {hasSubscription && (
            <DataSubscription
              setIsOpenAddCreditCard={setIsOpenAddCreditCard}
              setOpenModalCancelPlan={setOpenModalCancelPlan}
              setOpenModalChangePlan={setOpenModalChangePlan}
            />
          )}

          {!hasAccess && !hasPersonal && !hasSubscription && (
            <DeleteAccountInfo
              setOpenModalDeleteAccount={setOpenModalDeleteAccount}
            />
          )}
        </div>

        <div className="mb-14 flex h-6" />
      </form>

      <MyDialog
        closeModal={() => setOpenModalCancelPlan(false)}
        isOpen={openModalCancelPlan}
        title="Cancelar assinatura"
        description="Tem certeza que deseja cancelar sua assinatura?"
        textButtonSecondary="Cancelar"
        buttonPrimary
        textPrimary="Voltar"
        buttonSecondary
      >
        {/* TODO ESCREVER PERGUNTANDO PQ ELE QUER CANCELAR A ASSINATURA */}
      </MyDialog>

      <Payments
        isOpen={openModalChangePlan}
        closeModal={() => setOpenModalChangePlan(false)}
        initialStep={4}
      />

      <DeleteAccount
        openModalDeleteAccount={openModalDeleteAccount}
        setOpenModalDeleteAccount={setOpenModalDeleteAccount}
        user={user}
        deleteUser={deleteUser}
      />

      {isOpenAddCreditCard && (
        <AddCreditCard
          isOpen={isOpenAddCreditCard}
          closeModal={() => {
            setIsOpenAddCreditCard(false);
          }}
        />
      )}

      <BottomNavigator />
    </div>
  );
}
