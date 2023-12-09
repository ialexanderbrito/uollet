import { Link } from 'react-router-dom';

import {
  House,
  Wallet,
  ChartPie,
  ChartLine,
  ArrowsDownUp,
} from '@phosphor-icons/react';

import { cn } from 'utils/cn';

export function BottomNavigator() {
  function isActive(path: string) {
    return window.location.pathname === path;
  }

  return (
    <section
      id="bottom-navigation"
      className="fixed bottom-5 z-10 w-80 rounded-full bg-background-card opacity-95 shadow-lg dark:bg-background-card-dark dark:shadow-xl sm:w-[40rem]"
    >
      <div
        id="tabs"
        className="border-t-[1px]-background flex h-16 items-center justify-between border-solid text-title dark:text-title-dark"
      >
        <Link
          to="/"
          className={cn(
            'flex w-full items-center justify-center gap-2 pb-1 pt-2 hover:text-primary focus:text-primary hover:dark:text-white focus:dark:text-white sm:ml-2',
            isActive('/') &&
              'ml-2 h-14 w-72 rounded-full bg-primary/10 text-primary hover:text-primary focus:text-primary dark:bg-primary-dark/10 hover:dark:text-white focus:dark:text-white sm:w-full',
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
            'flex w-full items-center justify-center gap-2 pb-1 pt-2 hover:text-primary focus:text-primary hover:dark:text-white focus:dark:text-white sm:mr-2',
            isActive('/wallet') &&
              'mr-2 h-14 w-72 rounded-full bg-primary/10 text-primary hover:text-primary focus:text-primary dark:bg-primary-dark/10 hover:dark:text-white focus:dark:text-white sm:w-full',
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
            'flex h-full w-full items-center justify-center gap-2 rounded-full bg-primary pb-1 pt-2 text-white hover:text-primary focus:text-primary dark:bg-primary-dark/10 dark:text-title-dark hover:dark:text-white focus:dark:text-white',
            isActive('/register') &&
              'h-16 rounded-full bg-primary/10 text-primary hover:text-primary focus:text-primary dark:bg-primary-dark/10 hover:dark:text-white focus:dark:text-white sm:w-full',
          )}
        >
          <ArrowsDownUp
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
          to="/investments"
          className={cn(
            'flex w-full items-center justify-center gap-2 pb-1 pt-2 hover:text-primary focus:text-primary hover:dark:text-white focus:dark:text-white sm:ml-2',
            isActive('/investments') &&
              'ml-2 h-14 w-72 rounded-full bg-primary/10 text-primary hover:text-primary focus:text-primary dark:bg-primary-dark/10 hover:dark:text-white focus:dark:text-white sm:w-full',
          )}
        >
          <ChartLine
            size={25}
            className={cn(
              'inline-block ',
              isActive('/investments') && 'text-primary',
            )}
            weight={isActive('/investments') ? 'fill' : 'light'}
          />
          <span className="tab tab-explore hidden text-sm sm:block">
            Investimentos
          </span>
        </Link>

        <Link
          to="/resume"
          className={cn(
            'flex w-full items-center justify-center gap-2 pb-1 pt-2 hover:text-primary focus:text-primary hover:dark:text-white focus:dark:text-white sm:mr-2',
            isActive('/resume') &&
              'mr-2 h-14 w-72 rounded-full bg-primary/10 text-primary hover:text-primary focus:text-primary dark:bg-primary-dark/10 hover:dark:text-white focus:dark:text-white sm:w-full',
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
