import { Link } from 'react-router-dom';

import { CurrencyDollar, ListDashes, ChartPie } from '@phosphor-icons/react';

export function BottomNavigator() {
  function isActive(path: string) {
    return window.location.pathname === path;
  }

  return (
    <section
      id="bottom-navigation"
      className="fixed inset-x-0 bottom-0 z-10 block bg-white shadow dark:bg-backgroundCardDark"
    >
      <div
        id="tabs"
        className="border-t-[1px]-background flex h-16 justify-between border-solid text-title dark:text-titleDark"
      >
        <Link
          to="/"
          className={`flex w-full items-center justify-center gap-2 pt-2 pb-1 focus:text-secondary hover:text-secondary ${
            isActive('/') && 'text-secondary'
          }`}
        >
          <ListDashes
            size={25}
            className="inline-block"
            color={isActive('/') ? '#ff872c' : '#363F5F'}
          />
          <span className="tab tab-home block text-sm">Listagem</span>
        </Link>
        <Link
          to="/register"
          className={`flex w-full items-center justify-center gap-2 pt-2 pb-1 focus:text-secondary hover:text-secondary ${
            isActive('/register') && 'text-secondary'
          }`}
        >
          <CurrencyDollar
            size={25}
            className="inline-block"
            color={isActive('/register') ? '#ff872c' : '#363F5F'}
          />
          <span className="tab tab-home block text-sm">Cadastrar</span>
        </Link>
        <Link
          to="/resume"
          className={`flex w-full items-center justify-center gap-2 pt-2 pb-1 focus:text-secondary hover:text-secondary ${
            isActive('/resume') && 'text-secondary'
          }`}
        >
          <ChartPie
            size={25}
            className="inline-block"
            color={isActive('/resume') ? '#ff872c' : '#363F5F'}
          />
          <span className="tab tab-explore block text-sm">Resumo</span>
        </Link>
      </div>
    </section>
  );
}
