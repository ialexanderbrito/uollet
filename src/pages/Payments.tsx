import { useState } from 'react';

import {
  Barcode,
  Check,
  CreditCard,
  CurrencyDollar,
  MapPin,
  Sparkle,
  User,
} from '@phosphor-icons/react';
import { Jelly } from '@uiball/loaders';
import { pix } from 'assets/icons';

import { Button } from 'components/Button';
import { MyDialog } from 'components/Modal';
import { AddCreditCard } from 'components/Payments/AddCreditCard';
import { Address } from 'components/Payments/Address';
import { Checkout } from 'components/Payments/Checkout';
import { PaymentMethods } from 'components/Payments/MethodPayments';
import { PersonalData } from 'components/Payments/PersonalData';
import { Plans } from 'components/Payments/Plans';
import { Boleto } from 'components/Payments/Receipt/Boleto';
import { CC } from 'components/Payments/Receipt/Credit';
import { Pix } from 'components/Payments/Receipt/Pix';
import { StepIndicator } from 'components/StepIndicator';

import { usePayments } from 'hooks/usePayments';

const stepsData = [
  { icon: <MapPin size={16} />, label: 'Endereço' },
  { icon: <User size={16} />, label: 'Dados Pessoais' },
  { icon: <Sparkle size={16} />, label: 'Planos' },
  { icon: <CurrencyDollar size={16} />, label: 'Pagamento' },
  { icon: <Check size={16} />, label: 'Confirmação' },
];

const payments = [
  {
    id: 1,
    name: 'Cartão de Crédito',
    type: 'credit-card',
    description: 'Aprovado em até 20 minutos',
    icon: <CreditCard size={20} />,
  },
  {
    id: 2,
    name: 'Boleto',
    type: 'boleto',
    description: 'Aprovado em até 3 dias úteis',
    icon: <Barcode size={20} />,
  },
  {
    id: 3,
    name: 'Pix',
    type: 'pix',
    description: 'Aprovado em até 20 minutos',
    icon: <img src={pix} alt="Pix" className="h-5 w-5" />,
  },
];

interface PaymentsProps {
  isOpen: boolean;
  closeModal: () => void;
  initialStep?: number;
}

export function Payments({
  isOpen,
  closeModal,
  initialStep = 1,
}: PaymentsProps) {
  const {
    steps,
    setSteps,
    nextStep,
    previousStep,
    buttonSteps,
    formik,
    formikPersonalData,
    loading,
    searchCEP,
    plans,
    selectedPlan,
    setSelectedPlan,
    paymentType,
    setPaymentType,
    completedSteps,
    paymentOrder,
    buttonStepsPrevious,
    cardSelected,
    setCardSelected,
  } = usePayments();

  const [isOpenAddCreditCard, setIsOpenAddCreditCard] = useState(false);

  function addCard() {
    setIsOpenAddCreditCard(true);
  }

  return (
    <>
      <div>
        <MyDialog
          closeModal={() => closeModal()}
          isOpen={isOpen && !isOpenAddCreditCard}
          size="3xl"
          title="Seja PRO"
          description="Você está a um passo de ser PRO! Preencha os dados abaixo para finalizar a compra."
          className={isOpenAddCreditCard ? '-z-20' : ''}
        >
          {steps !== 6 && (
            <StepIndicator
              stepsData={stepsData}
              setSteps={setSteps}
              completedSteps={completedSteps}
              activeStep={steps}
            />
          )}

          {steps === 1 && (
            <Address formik={formik} loading={loading} searchCEP={searchCEP} />
          )}

          {steps === 2 && (
            <PersonalData formikPersonalData={formikPersonalData} />
          )}

          {steps === 3 && (
            <div className="flex flex-col gap-4">
              <span className="text-sm font-bold text-title dark:text-title-dark">
                Selecione um plano
              </span>

              {loading ? (
                <div className="flex items-center justify-center">
                  <Jelly color="#5636d3" size={40} />
                </div>
              ) : (
                <Plans
                  plans={plans}
                  selectedPlan={selectedPlan || 0}
                  setSelectedPlan={setSelectedPlan}
                />
              )}
            </div>
          )}

          {steps === 4 && (
            <PaymentMethods
              payments={payments}
              paymentType={paymentType}
              setPaymentType={setPaymentType}
              addCard={addCard}
              cardSelected={cardSelected}
              setCardSelected={setCardSelected}
            />
          )}

          {steps === 5 && (
            <Checkout
              setSteps={setSteps}
              formik={formik}
              selectedPlan={selectedPlan}
              paymentType={paymentType}
              plans={plans}
              payments={payments}
            />
          )}

          {steps === 6 && (
            <div className="flex flex-col gap-4">
              {paymentType === 'pix' && <Pix paymentOrder={paymentOrder} />}

              {paymentType === 'boleto' && (
                <Boleto paymentOrder={paymentOrder} />
              )}

              {paymentType === 'credit-card' && (
                <CC paymentOrder={paymentOrder} />
              )}
            </div>
          )}

          <div className="-mb-8 mt-4 flex w-full flex-row items-center justify-between gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                steps === 1 || steps === 6 ? closeModal() : previousStep();
              }}
            >
              {buttonStepsPrevious()}
            </Button>

            {steps !== 6 && (
              <Button type="submit" onClick={() => nextStep()}>
                {buttonSteps()}
              </Button>
            )}
          </div>
        </MyDialog>
      </div>

      {isOpenAddCreditCard && (
        <AddCreditCard
          isOpen={isOpenAddCreditCard}
          closeModal={() => {
            setIsOpenAddCreditCard(false);
          }}
        />
      )}
    </>
  );
}
