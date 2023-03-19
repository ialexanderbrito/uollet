import { Link } from 'react-router-dom';

import { CurrencyDollar, ListDashes, ChartPie } from '@phosphor-icons/react';

export function BottomNavigator() {
  function isActive(path: string) {
    return window.location.pathname === path;
  }

  return (
    <section
      id="bottom-navigation"
      className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow dark:bg-backgroundCardDark"
    >
      <div
        id="tabs"
        className="flex justify-between h-16 text-title border-solid border-t-[1px]-background dark:text-titleDark"
      >
        <Link
          to="/"
          className={`flex items-center gap-2 w-full focus:text-secondary hover:text-secondary justify-center pt-2 pb-1 ${
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
          to="/cadastro"
          className={`flex items-center gap-2 w-full focus:text-secondary hover:text-secondary justify-center pt-2 pb-1 ${
            isActive('/cadastro') && 'text-secondary'
          }`}
        >
          <CurrencyDollar
            size={25}
            className="inline-block"
            color={isActive('/cadastro') ? '#ff872c' : '#363F5F'}
          />
          <span className="tab tab-home block text-sm">Cadastrar</span>
        </Link>
        <Link
          to="/resume"
          className={`flex items-center gap-2 w-full focus:text-secondary hover:text-secondary justify-center pt-2 pb-1 ${
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
