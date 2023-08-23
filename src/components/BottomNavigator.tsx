import { Link } from 'react-router-dom';

import {
  House,
  CreditCard,
  Coins,
  Wallet,
  ChartPie,
} from '@phosphor-icons/react';

import {} from 'pages/Wallet';

import { useTheme } from 'contexts/Theme';

export function BottomNavigator() {
  const { theme } = useTheme();
  function isActive(path: string) {
    return window.location.pathname === path;
  }

  function darkColorIcon(link: string) {
    if (isActive(link)) {
      return '#ff872c';
    }

    if (theme === 'dark') {
      return '#a5b7cc';
    }

    return '#363F5F';
  }

  return (
    <section
      id="bottom-navigation"
      className="fixed bottom-5 z-10 w-72 rounded-full  bg-backgroundCard shadow-lg dark:bg-backgroundCardDark dark:shadow-xl sm:w-[40rem]"
    >
      <div
        id="tabs"
        className="border-t-[1px]-background flex h-16 items-center justify-between border-solid text-title dark:text-titleDark"
      >
        <Link
          to="/"
          className={`flex w-full items-center justify-center gap-2 pb-1 pt-2 hover:text-secondary focus:text-secondary ${
            isActive('/') &&
            'h-16 rounded-full bg-secondary/10 text-secondary dark:bg-secondaryDark/10'
          }`}
        >
          <House
            size={25}
            className="inline-block"
            color={darkColorIcon('/')}
            weight={isActive('/') ? 'fill' : 'light'}
          />
          <span className="tab tab-explore hidden text-sm sm:block">
            Início
          </span>
        </Link>

        <Link
          to="/wallet"
          className={`flex w-full items-center justify-center gap-2 pb-1 pt-2 hover:text-secondary focus:text-secondary  ${
            isActive('/wallet') &&
            'h-16 rounded-full bg-secondary/10 text-secondary dark:bg-secondaryDark/10'
          }`}
        >
          <Wallet
            size={25}
            className="inline-block"
            color={darkColorIcon('/wallet')}
            weight={isActive('/wallet') ? 'fill' : 'light'}
          />
          <span className="tab tab-explore hidden text-sm sm:block">
            Carteira
          </span>
        </Link>

        <Link
          to="/register"
          className={`flex w-full items-center justify-center gap-2 pb-1 pt-2 hover:text-secondary focus:text-secondary  ${
            isActive('/register') &&
            'h-16 rounded-full bg-secondary/10 text-secondary dark:bg-secondaryDark/10'
          }`}
        >
          <Coins
            size={25}
            className="inline-block"
            color={darkColorIcon('/register')}
            weight={isActive('/register') ? 'fill' : 'light'}
          />
          <span className="tab tab-explore hidden text-sm sm:block">
            Cadastrar
          </span>
        </Link>

        <Link
          to="/cards"
          className={`flex w-full items-center justify-center gap-2 pb-1 pt-2 hover:text-secondary focus:text-secondary ${
            isActive('/cards') &&
            'h-16 rounded-full bg-secondary/10 text-secondary dark:bg-secondaryDark/10'
          }`}
        >
          <CreditCard
            size={25}
            className="inline-block"
            color={darkColorIcon('/cards')}
            weight={isActive('/cards') ? 'fill' : 'light'}
          />
          <span className="tab tab-explore hidden text-sm sm:block">
            Cartões
          </span>
        </Link>

        <Link
          to="/resume"
          className={`flex w-full items-center justify-center gap-2 pb-1 pt-2 hover:text-secondary focus:text-secondary  ${
            isActive('/resume') &&
            'h-16 rounded-full bg-secondary/10 text-secondary dark:bg-secondaryDark/10'
          }`}
        >
          <ChartPie
            size={25}
            className="inline-block"
            color={darkColorIcon('/resume')}
            weight={isActive('/resume') ? 'fill' : 'light'}
          />
          <span className="tab tab-explore hidden text-sm sm:block">
            Resumo
          </span>
        </Link>
      </div>
    </section>
  );
}
