import { forwardRef, Fragment, useMemo, Ref } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  CreditCard,
  House,
  User,
  Moon,
  Sun,
  ChartLineUp,
} from '@phosphor-icons/react';
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
  KBarResults,
  ActionImpl,
} from 'kbar';

import { useTheme } from 'contexts/Theme';

function RenderResults() {
  const { results, rootActionId } = useMatches();

  return (
    <KBarResults
      maxHeight={500}
      key={rootActionId}
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div className="px-4 pb-1 pt-4 font-normal uppercase text-gray-400 ">
            {item}
          </div>
        ) : (
          <ResultItem
            action={item}
            active={active}
            currentRootActionId={rootActionId}
          />
        )
      }
    />
  );
}

const ResultItem = forwardRef(
  (
    {
      action,
      active,
      currentRootActionId,
    }: {
      action: ActionImpl;
      active: boolean;
      currentRootActionId: string | null | undefined;
    },
    ref: Ref<HTMLDivElement>,
  ) => {
    const ancestors = useMemo(() => {
      if (!currentRootActionId) return action.ancestors;
      const index = action.ancestors.findIndex(
        (ancestor) => ancestor.id === currentRootActionId,
      );
      // +1 removes the currentRootAction; e.g.
      // if we are on the "Set theme" parent action,
      // the UI should not display "Set theme… > Dark"
      // but rather just "Dark"
      return action.ancestors.slice(index + 1);
    }, [action.ancestors, currentRootActionId]);

    return (
      <div
        ref={ref}
        className={`flex cursor-pointer items-center justify-between p-2 pl-6 pr-6 ${
          active
            ? 'bg-secondary text-gray-100 dark:bg-secondaryDark'
            : 'transparent text-gray-500'
        }`}
      >
        <div className="flex items-center gap-2 text-base">
          {action.icon && action.icon}
          <div className="flex flex-col">
            <div>
              {ancestors.length > 0 &&
                ancestors.map((ancestor) => (
                  <Fragment key={ancestor.id}>
                    <span className="mr-4 opacity-50">{ancestor.name}</span>
                    <span className="mr-4">&rsaquo;</span>
                  </Fragment>
                ))}
              <span>{action.name}</span>
            </div>
            {action.subtitle && (
              <span className="text-sm">{action.subtitle}</span>
            )}
          </div>
        </div>
        {action.shortcut?.length ? (
          <div aria-hidden className="grid grid-flow-col gap-2">
            {action.shortcut.map((sc) => (
              <kbd
                key={sc}
                className={`flex cursor-pointer items-center justify-between rounded-md px-3 py-2 ${
                  active
                    ? 'bg-background text-text dark:bg-backgroundDark dark:text-textDark'
                    : 'bg-backgroundCard text-text dark:bg-backgroundDark dark:text-textDark'
                } `}
              >
                {sc}
              </kbd>
            ))}
          </div>
        ) : null}
      </div>
    );
  },
);

export function KBar({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { toggleTheme, theme, removeDarkTheme } = useTheme();

  const actions = [
    {
      id: 'home',
      name: 'Inicio',
      icon: <House size={18} weight="regular" />,
      shortcut: ['h'],
      keywords: 'home, inicio, pagina principal',
      perform: () => {
        navigate('/');
      },
      section: 'Acesso Rápido',
    },
    {
      id: 'investments',
      name: 'Investimentos',
      icon: <ChartLineUp size={18} weight="regular" />,
      shortcut: ['i'],
      keywords: 'investimentos, invest, investimento',
      perform: () => {
        navigate('/investments');
      },
      section: 'Acesso Rápido',
    },
    {
      id: 'my-account',
      name: 'Minha Conta',
      icon: <User size={18} weight="regular" />,
      shortcut: ['m', 'c'],
      keywords: 'conta, minha conta, perfil',
      perform: () => {
        navigate('/profile');
      },
      section: 'Acesso Rápido',
    },
    {
      section: 'Cartões',
      id: 'add-card',
      name: 'Adicionar Cartão',
      icon: <CreditCard size={18} weight="regular" />,
      shortcut: ['a', 'c'],
      keywords: 'cartão, adicionar cartão, novo cartão',
      perform: () => {
        navigate('/credit-card');
      },
    },
    {
      section: 'Cartões',
      id: 'my-cards',
      name: 'Meus Cartões',
      icon: <CreditCard size={18} weight="regular" />,
      shortcut: ['c'],
      keywords: 'cartão, meus cartões, cartões',
      perform: () => {
        navigate('/cards');
      },
    },
    {
      section: 'Preferências',
      id: 'set-theme',
      name: 'Selecione o Tema',
      keywords: 'tema, escuro, dark, ligth, mode, theme',
      icon:
        theme === 'dark' ? (
          <Sun size={18} weight="regular" />
        ) : (
          <Moon size={18} weight="regular" />
        ),
      shortcut: ['t'],
    },
    {
      section: '',
      id: 'dark-theme',
      name: 'Tema Escuro',
      keywords: 'tema, escuro, dark, mode, theme',
      parent: 'set-theme',
      perform: () => {
        toggleTheme();
      },
      shortcut: ['d', 'm'],
    },
    {
      section: '',
      id: 'light-theme',
      name: 'Tema Claro',
      keywords: 'tema, claro, light, mode, theme',
      parent: 'set-theme',
      perform: () => {
        removeDarkTheme();
      },
      shortcut: ['l', 'm'],
    },
  ];

  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner className="z-50 flex items-center bg-black/80 p-2 ">
          <KBarAnimator className="w-max-500px w-2/4 overflow-hidden rounded-lg border-[1.5px] border-secondary bg-background dark:border-secondaryDark dark:bg-backgroundCardDark">
            <KBarSearch
              className="flex h-14 w-full px-4 outline-none dark:bg-backgroundCardDark dark:text-titleDark"
              defaultPlaceholder="Digite um comando ou pesquise por algo"
            />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>

      {children}
    </KBarProvider>
  );
}
