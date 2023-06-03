import { Link } from 'react-router-dom';

import { CurrencyDollar, ChartPie, House } from '@phosphor-icons/react';

export function BottomNavigator() {
  function isActive(path: string) {
    return window.location.pathname === path;
  }

  return (
    <section
      id="bottom-navigation"
      className="fixed bottom-5 z-10 w-72 rounded-2xl border border-secondary/40 bg-white shadow dark:border-secondaryDark/40 dark:bg-backgroundDark sm:w-96"
    >
      <div
        id="tabs"
        className="border-t-[1px]-background flex h-16 items-center justify-between border-solid text-title dark:text-titleDark"
      >
        <Link
          to="/"
          className={`flex w-full items-center justify-center gap-2 pb-1 pt-2 hover:text-secondary focus:text-secondary ${
            isActive('/') &&
            'h-16 rounded-2xl bg-secondary/10 text-secondary dark:bg-secondaryDark/10'
          }`}
        >
          <House
            size={25}
            className="inline-block"
            color={isActive('/') ? '#ff872c' : '#363F5F'}
            weight={isActive('/') ? 'fill' : 'light'}
          />
          <span className="tab tab-explore hidden text-sm sm:block">
            Início
          </span>
        </Link>
        <Link
          to="/register"
          className={`flex w-full items-center justify-center gap-2 pb-1 pt-2 hover:text-secondary focus:text-secondary  ${
            isActive('/register') &&
            'h-16 rounded-2xl bg-secondary/10 text-secondary dark:bg-secondaryDark/10'
          }`}
        >
          <CurrencyDollar
            size={25}
            className="inline-block"
            color={isActive('/register') ? '#ff872c' : '#363F5F'}
            weight={isActive('/register') ? 'fill' : 'light'}
          />
          <span className="tab tab-explore hidden text-sm sm:block">
            Cadastrar
          </span>
        </Link>
        <Link
          to="/resume"
          className={`flex w-full items-center justify-center gap-2 pb-1 pt-2 hover:text-secondary focus:text-secondary  ${
            isActive('/resume') &&
            'h-16 rounded-2xl bg-secondary/10 text-secondary dark:bg-secondaryDark/10'
          }`}
        >
          <ChartPie
            size={25}
            className="inline-block"
            color={isActive('/resume') ? '#ff872c' : '#363F5F'}
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
