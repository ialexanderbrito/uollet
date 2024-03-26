import { useState } from 'react';

import {
  Calculator as CalculatorIcon,
  CurrencyCircleDollar,
  FirstAid,
  Percent,
  UserFocus,
} from '@phosphor-icons/react';

import { Calculator } from './Calculators/Calculator';
import { CompoundInterest } from './Calculators/CompoundInterest';
import { EmergencyReserve } from './Calculators/EmergencyReserve';
import { CurrencyConverter } from './CurrencyConverter';
import { InvestorProfile } from './InvestorProfile';
import { MyDialog } from './Modal';

interface TourProps {
  openModalTools: boolean;
  setOpenModalTools: (value: boolean) => void;
}

export function Tools({ openModalTools, setOpenModalTools }: TourProps) {
  const [openModalCurrency, setOpenModalCurrency] = useState(false);
  const [openModalCalculator, setOpenModalCalculator] = useState(false);
  const [openModalCompoundInterest, setOpenModalCompoundInterest] =
    useState(false);
  const [openModalEmergencyReserve, setOpenModalEmergencyReserve] =
    useState(false);
  const [openModalInvestorProfile, setOpenModalInvestorProfile] =
    useState(false);

  const mock = [
    {
      id: 1,
      onClick: () => {
        setOpenModalTools(false);
        setOpenModalCurrency(true);
      },
      title: 'Conversor de moedas',
      description:
        'Converta moedas de forma rápida e fácil, veja a cotação do dólar, euro e outras moedas.',
      image: <CurrencyCircleDollar size={62} />,
    },
    {
      id: 2,
      onClick: () => {
        setOpenModalTools(false);
        setOpenModalCalculator(true);
      },
      title: 'Calculadora',
      description:
        'Faça cálculos de forma rápida e fácil, veja o resultado de suas operações.',
      image: <CalculatorIcon size={62} />,
    },
    {
      id: 3,
      onClick: () => {
        setOpenModalTools(false);
        setOpenModalCompoundInterest(true);
      },
      title: 'Calculadora de Juros Compostos',
      description:
        'Faça cálculos de juros compostos de forma rápida e fácil, veja o resultado de suas operações.',
      image: <Percent size={62} />,
    },
    {
      id: 4,
      onClick: () => {
        setOpenModalTools(false);
        setOpenModalEmergencyReserve(true);
      },
      title: 'Calculadora de Reserva de Emergência',
      description:
        'Faça cálculos de reserva de emergência de forma rápida e fácil, veja o resultado de suas operações.',
      image: <FirstAid size={62} />,
    },
    {
      id: 5,
      onClick: () => {
        setOpenModalTools(false);
        setOpenModalInvestorProfile(true);
      },
      title: 'Perfil de Investidor',
      description:
        'Descubra qual é o seu perfil de investidor e saiba como investir melhor.',
      image: <UserFocus size={62} />,
    },
  ];

  return (
    <>
      <MyDialog
        closeModal={() => setOpenModalTools(false)}
        isOpen={openModalTools}
        title="Ferramentas para você"
        description="Escolha uma das opções abaixo para começar a usar nossas ferramentas."
        size="3xl"
        closeButton
      >
        <div className="mt-6 flex flex-col gap-2">
          {mock.map((item) => (
            <div key={item.id} onClick={() => item.onClick()}>
              <button className="group grid w-full grid-cols-2 gap-2 rounded-md bg-background-card p-3 transition hover:bg-background-card/95 dark:bg-background-card-dark md:flex md:items-center md:gap-4 md:p-2 md:pr-5">
                <div className="-order-2 flex h-20 w-[142px] shrink-0 items-center justify-center overflow-hidden rounded bg-violet-950 text-white md:order-none">
                  {item.image}
                </div>
                <button className="cursor-pointer items-center justify-end text-end text-sm  text-primary disabled:cursor-not-allowed disabled:select-none disabled:opacity-50 md:hidden">
                  Acessar
                </button>
                <div className="col-span-full flex flex-col gap-1 text-left">
                  <h3 className="text-sm font-bold text-title dark:text-title-dark">
                    {item.title}
                  </h3>
                  <p className="line-clamp-2 text-xs text-text dark:text-text-dark">
                    {item.description}
                  </p>
                </div>

                <button className="relative hidden h-14 flex-shrink-0 cursor-pointer items-center justify-center rounded-lg border-none bg-primary px-4 py-2 text-base text-white transition-colors duration-200 ease-in-out hover:enabled:bg-primary-dark disabled:cursor-not-allowed disabled:select-none disabled:opacity-50 md:flex md:group-hover:block">
                  Acessar
                </button>
              </button>
            </div>
          ))}
        </div>
      </MyDialog>

      <CurrencyConverter
        openModalCurrency={openModalCurrency}
        setOpenModalCurrency={setOpenModalCurrency}
      />

      <Calculator
        openModalCalculator={openModalCalculator}
        setOpenModalCalculator={setOpenModalCalculator}
      />

      <CompoundInterest
        openModalCalculator={openModalCompoundInterest}
        setOpenModalCalculator={setOpenModalCompoundInterest}
      />

      <EmergencyReserve
        openModalEmergencyReserve={openModalEmergencyReserve}
        setOpenModalEmergencyReserve={setOpenModalEmergencyReserve}
      />

      <InvestorProfile
        openModalInvestorProfile={openModalInvestorProfile}
        setOpenModalInvestorProfile={setOpenModalInvestorProfile}
      />
    </>
  );
}
