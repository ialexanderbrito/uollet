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
  Moon,
  Power,
  Sun,
  User,
} from '@phosphor-icons/react';

import { cn } from 'utils/cn';
import { verifyWebView } from 'utils/verifyWebView';

import { useAuth } from 'contexts/Auth';
import { useTheme } from 'contexts/Theme';

import { Calculator } from './Calculator';
import { CurrencyConverter } from './CurrencyConverter';

interface MenuProps {
  isInvestiment?: boolean;
}

export function Menu({ isInvestiment }: MenuProps) {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [moreOptions, setMoreOptions] = useState(false);
  const [moreSheets, setMoreSheets] = useState(false);

  const [openModalCurrency, setOpenModalCurrency] = useState(false);
  const [openModalCalculator, setOpenModalCalculator] = useState(false);

  return (
    <>
      <div className="z-50 flex items-center justify-center  text-right">
        <MenuComponent as="div" className="relative inline-block text-center">
          <div>
            <MenuComponent.Button className="flex w-full items-center justify-center">
              <DotsThreeVertical
                size={30}
                weight="light"
                className={cn(
                  'cursor-pointer text-secondary',
                  isInvestiment && 'text-white',
                )}
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
            <MenuComponent.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-backgroundCard shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-backgroundCardDark dark:text-textDark">
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
                      className={cn(
                        'mr-2 h-5 w-5 text-secondary',
                        isInvestiment && 'text-primary',
                      )}
                    />
                    Minha conta
                  </button>
                </MenuComponent.Item>

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
                      className={cn(
                        'mr-2 h-5 w-5 text-secondary',
                        isInvestiment && 'text-primary',
                      )}
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
                      className={cn(
                        'mr-2 h-5 w-5 text-secondary',
                        isInvestiment && 'text-primary',
                      )}
                    />
                    Adicionar cartão
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
                      className={cn(
                        'mr-2 h-5 w-5 text-secondary',
                        isInvestiment && 'text-primary',
                      )}
                    />
                    Metas
                  </button>
                </MenuComponent.Item>

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
                          className={cn(
                            'mr-2 h-5 w-5 text-secondary ',
                            isInvestiment && 'text-primary',
                          )}
                        />
                      ) : (
                        <CaretDown
                          size={20}
                          weight="light"
                          className={cn(
                            'mr-2 h-5 w-5 text-secondary',
                            isInvestiment && 'text-primary',
                          )}
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
                          weight="fill"
                          className={cn(
                            'mr-2 h-5 w-5 text-secondary dark:text-secondaryDark',
                            isInvestiment &&
                              'text-primary dark:text-primaryDark',
                          )}
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
                          weight="fill"
                          className={cn(
                            'mr-2 h-5 w-5 text-secondary dark:text-secondaryDark',
                            isInvestiment &&
                              'text-primary dark:text-primaryDark',
                          )}
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
                        className={cn(
                          'mr-2 h-5 w-5 text-secondary',
                          isInvestiment && 'text-primary',
                        )}
                      />
                    ) : (
                      <CaretDown
                        size={20}
                        weight="light"
                        className={cn(
                          'mr-2 h-5 w-5 text-secondary',
                          isInvestiment && 'text-primary',
                        )}
                      />
                    )}
                    <span>Mais opções</span>
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
                          weight="fill"
                          className={cn(
                            'mr-2 h-5 w-5 text-secondary dark:text-secondaryDark',
                            isInvestiment &&
                              'text-primary dark:text-primaryDark',
                          )}
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
                          weight="fill"
                          className={cn(
                            'mr-2 h-5 w-5 text-secondary dark:text-secondaryDark',
                            isInvestiment &&
                              'text-primary dark:text-primaryDark',
                          )}
                        />
                        Calculadora
                      </button>
                    </MenuComponent.Item>
                  </>
                )}

                <MenuComponent.Item>
                  <button
                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                    onClick={toggleTheme}
                  >
                    <>
                      {theme === 'light' ? (
                        <Moon
                          size={20}
                          weight="light"
                          className={cn(
                            'mr-2 h-5 w-5 text-secondary',
                            isInvestiment && 'text-primary',
                          )}
                        />
                      ) : (
                        <Sun
                          size={20}
                          weight="light"
                          className={cn(
                            'mr-2 h-5 w-5 text-secondary',
                            isInvestiment && 'text-primary',
                          )}
                        />
                      )}
                    </>
                    Tema - {theme === 'light' ? 'Escuro' : 'Claro'}
                  </button>
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
                      className={cn(
                        'mr-2 h-5 w-5 text-secondary',
                        isInvestiment && 'text-primary',
                      )}
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
    </>
  );
}
