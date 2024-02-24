import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Menu as MenuComponent,
  Transition,
  Disclosure,
} from '@headlessui/react';
import {
  Calculator as CalculatorIcon,
  CaretDown,
  CaretUp,
  Confetti,
  CreditCard,
  CurrencyCircleDollar,
  DotsThreeVertical,
  FileCsv,
  FileXls,
  FirstAid,
  Percent,
  Power,
  User,
  UserFocus,
} from '@phosphor-icons/react';

import { verifyWebView } from 'utils/verifyWebView';

import { useAuth } from 'contexts/Auth';

import { Calculator } from './Calculator';
import { CalculatorCompoundInterest } from './CalculatorCompoundInterest';
import { CurrencyConverter } from './CurrencyConverter';
import { EmergencyReserve } from './EmergencyReserve';
import { InvestorProfile } from './InvestorProfile';
import { SwitchTheme } from './SwitchTheme';

export function Menu() {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  const [moreOptions, setMoreOptions] = useState(false);
  const [moreSheets, setMoreSheets] = useState(false);
  const [moreCards, setMoreCards] = useState(false);

  const [openModalCurrency, setOpenModalCurrency] = useState(false);
  const [openModalCalculator, setOpenModalCalculator] = useState(false);
  const [openModalCompoundInterest, setOpenModalCompoundInterest] =
    useState(false);
  const [openModalEmergencyReserve, setOpenModalEmergencyReserve] =
    useState(false);
  const [openModalInvestorProfile, setOpenModalInvestorProfile] =
    useState(false);

  return (
    <>
      <div className="z-50 flex items-center justify-center  text-right">
        <MenuComponent as="div" className="relative inline-block text-center">
          <div>
            <MenuComponent.Button className="flex w-full items-center justify-center">
              <DotsThreeVertical
                size={30}
                weight="light"
                className="cursor-pointer text-white"
              />
            </MenuComponent.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuComponent.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-background-dark dark:text-text-dark">
              <div className="px-1 py-1 ">
                <MenuComponent.Item>
                  <button
                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                    onClick={() => {
                      navigate('/profile');
                    }}
                  >
                    <User
                      size={20}
                      weight="light"
                      className="mr-2 h-5 w-5 text-primary dark:text-white"
                    />
                    Minha conta
                  </button>
                </MenuComponent.Item>

                <MenuComponent.Item>
                  <button
                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                    onClick={() => {
                      navigate('/goals');
                    }}
                  >
                    <Confetti
                      size={20}
                      weight="light"
                      className="mr-2 h-5 w-5 text-primary dark:text-white"
                    />
                    Metas
                  </button>
                </MenuComponent.Item>

                <Disclosure as={Fragment}>
                  <Disclosure.Button
                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                    onClick={() => {
                      setMoreCards(!moreCards);
                    }}
                  >
                    {moreCards ? (
                      <CaretUp
                        size={20}
                        weight="light"
                        className="mr-2 h-5 w-5 text-primary dark:text-white"
                      />
                    ) : (
                      <CaretDown
                        size={20}
                        weight="light"
                        className="mr-2 h-5 w-5 text-primary dark:text-white"
                      />
                    )}
                    <span>Cartões</span>
                  </Disclosure.Button>
                </Disclosure>

                {moreCards && (
                  <>
                    <MenuComponent.Item>
                      <button
                        className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                        onClick={() => {
                          navigate('/cards');
                        }}
                      >
                        <CreditCard
                          size={20}
                          weight="light"
                          className="mr-2 h-5 w-5 text-primary dark:text-white"
                        />
                        Cartões de crédito
                      </button>
                    </MenuComponent.Item>
                    <MenuComponent.Item>
                      <button
                        className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                        onClick={() => {
                          navigate('/credit-card');
                        }}
                      >
                        <CreditCard
                          size={20}
                          weight="light"
                          className="mr-2 h-5 w-5 text-primary dark:text-white"
                        />
                        Adicionar cartão
                      </button>
                    </MenuComponent.Item>
                  </>
                )}

                {!verifyWebView() && (
                  <Disclosure as={Fragment}>
                    <Disclosure.Button
                      className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                      onClick={() => {
                        setMoreSheets(!moreSheets);
                      }}
                    >
                      {moreSheets ? (
                        <CaretUp
                          size={20}
                          weight="light"
                          className="mr-2 h-5 w-5 text-primary dark:text-white"
                        />
                      ) : (
                        <CaretDown
                          size={20}
                          weight="light"
                          className="mr-2 h-5 w-5 text-primary dark:text-white"
                        />
                      )}
                      <span>Planilhas</span>
                    </Disclosure.Button>
                  </Disclosure>
                )}

                {moreSheets && (
                  <>
                    <MenuComponent.Item>
                      <button
                        className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                        onClick={() => {
                          navigate('/import');
                        }}
                      >
                        <FileCsv
                          size={20}
                          weight="light"
                          className="mr-2 h-5 w-5 text-primary dark:text-white"
                        />
                        Importar CSV
                      </button>
                    </MenuComponent.Item>
                    <MenuComponent.Item>
                      <button
                        className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                        onClick={() => {
                          navigate('/export');
                        }}
                      >
                        <FileXls
                          size={20}
                          weight="light"
                          className="mr-2 h-5 w-5 text-primary dark:text-white"
                        />
                        Exportar Planilha
                      </button>
                    </MenuComponent.Item>
                  </>
                )}

                <Disclosure as={Fragment}>
                  <Disclosure.Button
                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                    onClick={() => {
                      setMoreOptions(!moreOptions);
                    }}
                  >
                    {moreOptions ? (
                      <CaretUp
                        size={20}
                        weight="light"
                        className="mr-2 h-5 w-5 text-primary dark:text-white"
                      />
                    ) : (
                      <CaretDown
                        size={20}
                        weight="light"
                        className="mr-2 h-5 w-5 text-primary dark:text-white"
                      />
                    )}
                    <span>Ferramentas</span>
                  </Disclosure.Button>
                </Disclosure>

                {moreOptions && (
                  <>
                    <MenuComponent.Item>
                      <button
                        className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                        onClick={() => {
                          setOpenModalCurrency(true);
                        }}
                      >
                        <CurrencyCircleDollar
                          size={32}
                          weight="light"
                          className="mr-2 h-5 w-5 text-primary dark:text-white"
                        />
                        Conversor de moedas
                      </button>
                    </MenuComponent.Item>

                    <MenuComponent.Item>
                      <button
                        className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                        onClick={() => {
                          setOpenModalCalculator(true);
                        }}
                      >
                        <CalculatorIcon
                          size={32}
                          weight="light"
                          className="mr-2 h-5 w-5 text-primary dark:text-white"
                        />
                        Calculadora
                      </button>
                    </MenuComponent.Item>

                    <MenuComponent.Item>
                      <button
                        className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                        onClick={() => {
                          setOpenModalCompoundInterest(true);
                        }}
                      >
                        <Percent
                          size={32}
                          weight="light"
                          className="mr-2 h-5 w-5 text-primary dark:text-white"
                        />
                        Juros compostos
                      </button>
                    </MenuComponent.Item>

                    <MenuComponent.Item>
                      <button
                        className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                        onClick={() => {
                          setOpenModalEmergencyReserve(true);
                        }}
                      >
                        <FirstAid
                          size={32}
                          weight="light"
                          className="mr-2 h-5 w-5 text-primary dark:text-white"
                        />
                        Reserva de emergência
                      </button>
                    </MenuComponent.Item>

                    <MenuComponent.Item>
                      <button
                        className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                        onClick={() => {
                          setOpenModalInvestorProfile(true);
                        }}
                      >
                        <UserFocus
                          size={32}
                          weight="light"
                          className="mr-2 h-5 w-5 text-primary dark:text-white"
                        />
                        Perfil do investidor
                      </button>
                    </MenuComponent.Item>
                  </>
                )}

                <MenuComponent.Item>
                  <SwitchTheme />
                </MenuComponent.Item>

                <MenuComponent.Item>
                  <button
                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                    onClick={() => {
                      logOut();
                    }}
                  >
                    <Power
                      size={32}
                      weight="light"
                      className="mr-2 h-5 w-5 text-danger dark:text-danger"
                    />
                    Sair
                  </button>
                </MenuComponent.Item>
              </div>
            </MenuComponent.Items>
          </Transition>
        </MenuComponent>
      </div>

      <CurrencyConverter
        openModalCurrency={openModalCurrency}
        setOpenModalCurrency={setOpenModalCurrency}
      />

      <Calculator
        openModalCalculator={openModalCalculator}
        setOpenModalCalculator={setOpenModalCalculator}
      />

      <CalculatorCompoundInterest
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
