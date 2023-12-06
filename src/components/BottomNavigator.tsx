import { Link } from 'react-router-dom';

import { House, Coins, Wallet, ChartPie } from '@phosphor-icons/react';

import { cn } from 'utils/cn';

interface BottomNavigatorProps {
  isInvestiment?: boolean;
}

export function BottomNavigator({ isInvestiment }: BottomNavigatorProps) {
  function isActive(path: string) {
    return window.location.pathname === path;
  }

  return (
    <section
      id="bottom-navigation"
      className="fixed bottom-5 z-10 w-60 rounded-full bg-background-card opacity-95 shadow-lg dark:bg-background-card-dark dark:shadow-xl sm:w-[30rem]"
    >
      <div
        id="tabs"
        className="border-t-[1px]-background flex h-16 items-center justify-between border-solid text-title dark:text-title-dark"
      >
        <Link
          to="/"
          className={cn(
            'flex w-full items-center justify-center gap-2 pb-1 pt-2 hover:text-primary focus:text-primary hover:dark:text-white focus:dark:text-white',
            isActive('/') &&
              'h-16 rounded-full bg-primary/10 text-primary dark:bg-primary-dark/10 dark:text-title-dark',
            isInvestiment &&
              isActive('/') &&
              'h-16 rounded-full bg-primary/10 text-primary hover:text-primary focus:text-primary dark:bg-primary-dark/10 hover:dark:text-white focus:dark:text-white',
          )}
        >
          <House
            size={25}
            className={cn('inline-block ', isActive('/') && 'text-primary')}
            weight={isActive('/') ? 'fill' : 'light'}
          />
          <span className="tab tab-explore hidden text-sm sm:block">
            Início
          </span>
        </Link>

        <Link
          to="/wallet"
          className={cn(
            'flex w-full items-center justify-center gap-2 pb-1 pt-2 hover:text-primary focus:text-primary hover:dark:text-white focus:dark:text-white',
            isActive('/wallet') &&
              'h-16 rounded-full bg-primary/10 text-primary dark:bg-primary-dark/10 dark:text-title-dark',
            isInvestiment &&
              isActive('/wallet') &&
              'h-16 rounded-full bg-primary/10 text-primary hover:text-primary focus:text-primary dark:bg-primary-dark/10 hover:dark:text-white focus:dark:text-white',
          )}
        >
          <Wallet
            size={25}
            className={cn(
              'inline-block ',
              isActive('/wallet') && 'text-primary',
            )}
            weight={isActive('/wallet') ? 'fill' : 'light'}
          />
          <span className="tab tab-explore hidden text-sm sm:block">
            Carteira
          </span>
        </Link>

        <Link
          to="/register"
          className={cn(
            'flex w-full items-center justify-center gap-2 pb-1 pt-2 hover:text-primary focus:text-primary hover:dark:text-white focus:dark:text-white',
            isActive('/register') &&
              'h-16 rounded-full bg-primary/10 text-primary dark:bg-primary-dark/10 dark:text-title-dark',
            isInvestiment &&
              isActive('/register') &&
              'h-16 rounded-full bg-primary/10 text-primary hover:text-primary focus:text-primary dark:bg-primary-dark/10 hover:dark:text-white focus:dark:text-white',
          )}
        >
          <Coins
            size={25}
            className={cn(
              'inline-block ',
              isActive('/register') && 'text-primary',
            )}
            weight={isActive('/register') ? 'fill' : 'light'}
          />
          <span className="tab tab-explore hidden text-sm sm:block">
            Cadastrar
          </span>
        </Link>

        <Link
          to="/resume"
          className={cn(
            'flex w-full items-center justify-center gap-2 pb-1 pt-2 hover:text-primary focus:text-primary hover:dark:text-white focus:dark:text-white',
            isActive('/resume') &&
              'h-16 rounded-full bg-primary/10 text-primary dark:bg-primary-dark/10 dark:text-title-dark',
            isInvestiment &&
              isActive('/resume') &&
              'h-16 rounded-full bg-primary/10 text-primary hover:text-primary focus:text-primary dark:bg-primary-dark/10 hover:dark:text-white focus:dark:text-white',
          )}
        >
          <ChartPie
            size={25}
            className={cn(
              'inline-block ',
              isActive('/resume') && 'text-primary',
            )}
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
