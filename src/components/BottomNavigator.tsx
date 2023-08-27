import { Link } from 'react-router-dom';

import {
  House,
  Coins,
  Wallet,
  ChartPie,
  ChartLine,
} from '@phosphor-icons/react';

import { cn } from 'utils/cn';

import { useTheme } from 'contexts/Theme';

interface BottomNavigatorProps {
  isInvestiment?: boolean;
}

export function BottomNavigator({ isInvestiment }: BottomNavigatorProps) {
  const { theme } = useTheme();
  function isActive(path: string) {
    return window.location.pathname === path;
  }

  function darkColorIcon(link: string) {
    if (isInvestiment && isActive(link)) {
      return '#3d24a2';
    }

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
      className="fixed bottom-5 z-10 w-80 rounded-full bg-backgroundCard shadow-lg dark:bg-backgroundCardDark dark:shadow-xl sm:w-[40rem]"
    >
      <div
        id="tabs"
        className="border-t-[1px]-background flex h-16 items-center justify-between border-solid text-title dark:text-titleDark"
      >
        <Link
          to="/"
          className={cn(
            'flex w-full items-center justify-center gap-2 pb-1 pt-2 hover:text-secondary focus:text-secondary',
            isActive('/') &&
              'h-16 rounded-full bg-secondary/10 text-secondary dark:bg-secondaryDark/10',
            isInvestiment &&
              isActive('/') &&
              'h-16 rounded-full bg-primary/10 text-primary hover:text-primary focus:text-primary dark:bg-primaryDark/10',
          )}
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
          className={cn(
            'flex w-full items-center justify-center gap-2 pb-1 pt-2 hover:text-secondary focus:text-secondary',
            isActive('/wallet') &&
              'h-16 rounded-full bg-secondary/10 text-secondary dark:bg-secondaryDark/10',
            isInvestiment &&
              isActive('/wallet') &&
              'h-16 rounded-full bg-primary/10 text-primary hover:text-primary focus:text-primary dark:bg-primaryDark/10',
          )}
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
          className={cn(
            'flex w-full items-center justify-center gap-2 pb-1 pt-2 hover:text-secondary focus:text-secondary',
            isActive('/register') &&
              'h-16 rounded-full bg-secondary/10 text-secondary dark:bg-secondaryDark/10',
            isInvestiment &&
              isActive('/register') &&
              'h-16 rounded-full bg-primary/10 text-primary hover:text-primary focus:text-primary dark:bg-primaryDark/10',
          )}
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
          to="/investiments"
          className={cn(
            'flex w-full items-center justify-center gap-2 pb-1 pt-2 hover:text-secondary focus:text-secondary',
            isActive('/investiments') &&
              'h-16 rounded-full bg-secondary/10 text-secondary dark:bg-secondaryDark/10',
            isInvestiment &&
              isActive('/investiments') &&
              'h-16 rounded-full bg-primary/10 text-primary hover:text-primary focus:text-primary dark:bg-primaryDark/10',
          )}
        >
          <ChartLine
            size={25}
            className="inline-block"
            color={darkColorIcon('/investiments')}
            weight={isActive('/investiments') ? 'fill' : 'light'}
          />
          <span className="tab tab-explore hidden text-sm sm:block">
            Investimento
          </span>
        </Link>

        <Link
          to="/resume"
          className={cn(
            'flex w-full items-center justify-center gap-2 pb-1 pt-2 hover:text-secondary focus:text-secondary',
            isActive('/resume') &&
              'h-16 rounded-full bg-secondary/10 text-secondary dark:bg-secondaryDark/10',
            isInvestiment &&
              isActive('/resume') &&
              'h-16 rounded-full bg-primary/10 text-primary hover:text-primary focus:text-primary dark:bg-primaryDark/10',
          )}
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
