import { forwardRef, Fragment, useMemo, Ref, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  CreditCard,
  House,
  User,
  Moon,
  Sun,
  ChartLineUp,
  Calculator as CalculatorIcon,
  CurrencyCircleDollar,
  FileCsv,
  FileXls,
  Percent,
  FirstAid,
  Confetti,
  EyeClosed,
  Eye,
  ChartPie,
  Wallet,
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

import { cn } from 'utils';

import { useAuth } from 'contexts/Auth';
import { useTheme } from 'contexts/Theme';

import { Calculator } from './Calculators/Calculator';
import { CompoundInterest } from './Calculators/CompoundInterest';
import { EmergencyReserve } from './Calculators/EmergencyReserve';
import { CurrencyConverter } from './CurrencyConverter';
import { InvestorProfile } from './InvestorProfile';

function RenderResults() {
  const { results, rootActionId } = useMatches();

  return (
    <KBarResults
      maxHeight={500}
      key={rootActionId}
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div className="px-4 pb-1 pt-4 font-normal uppercase text-text dark:text-text-dark">
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

      return action.ancestors.slice(index + 1);
    }, [action.ancestors, currentRootActionId]);

    return (
      <div
        ref={ref}
        className={cn(
          'flex cursor-pointer items-center justify-between p-2 pl-6 pr-6',
          active
            ? 'bg-primary text-white dark:bg-primary-dark'
            : 'transparent text-text dark:text-text-dark',
        )}
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
                className={cn(
                  'flex cursor-pointer items-center justify-between rounded-md px-3 py-2',
                  active
                    ? 'bg-background text-text dark:bg-background-dark dark:text-text-dark'
                    : 'bg-background-card text-text dark:bg-background-card-dark dark:text-text-dark',
                )}
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
  const { areValueVisible, toggleValueVisibility } = useAuth();
  const [openModalCurrency, setOpenModalCurrency] = useState(false);
  const [openModalCalculator, setOpenModalCalculator] = useState(false);
  const [openModalCompoundInterest, setOpenModalCompoundInterest] =
    useState(false);
  const [openModalEmergencyReserve, setOpenModalEmergencyReserve] =
    useState(false);
  const [openModalInvestorProfile, setOpenModalInvestorProfile] =
    useState(false);

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
      id: 'wallet',
      name: 'Carteira',
      icon: <Wallet size={18} weight="regular" />,
      shortcut: ['c'],
      keywords: 'carteira, wallet',
      perform: () => {
        navigate('/wallet');
      },
      section: 'Acesso Rápido',
    },
    {
      id: 'goals',
      name: 'Metas',
      icon: <Confetti size={18} weight="regular" />,
      shortcut: ['m'],
      keywords: 'metas, objetivos, goals',
      perform: () => {
        navigate('/goals');
      },
      section: 'Acesso Rápido',
    },
    {
      id: 'resume',
      name: 'Resumo',
      icon: <ChartPie size={18} weight="regular" />,
      shortcut: ['r'],
      keywords: 'resumo, summary',
      perform: () => {
        navigate('/resume');
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
      shortcut: ['c', 'c'],
      keywords: 'cartão, meus cartões, cartões',
      perform: () => {
        navigate('/cards');
      },
    },
    {
      section: 'Planilhas',
      id: 'import-csv',
      name: 'Importar CSV',
      icon: <FileCsv size={18} weight="regular" />,
      shortcut: ['i', 'p'],
      keywords: 'importar, planilha, importar planilha, csv, importar csv',
      perform: () => {
        navigate('/import');
      },
    },
    {
      section: 'Planilhas',
      id: 'export-sheet',
      name: 'Exportar Planilha',
      icon: <FileXls size={18} weight="regular" />,
      shortcut: ['e', 'p'],
      keywords: 'exportar, planilha, exportar planilha',
      perform: () => {
        navigate('/export');
      },
    },
    {
      section: 'Planilhas',
      id: 'import-csv',
      name: 'Importar CSV',
      icon: <FileCsv size={18} weight="regular" />,
      shortcut: ['i', 'p'],
      keywords: 'importar, planilha, importar planilha, csv, importar csv',
      perform: () => {
        navigate('/import');
      },
    },
    {
      section: 'Ferramentas',
      id: 'conversor-currency',
      name: 'Conversor de Moedas',
      icon: <CurrencyCircleDollar size={18} weight="regular" />,
      shortcut: ['c', 'm'],
      keywords: 'conversor, moedas, conversor de moedas',
      perform: () => {
        setOpenModalCurrency(true);
      },
    },
    {
      section: 'Ferramentas',
      id: 'calculator',
      name: 'Calculadora',
      icon: <CalculatorIcon size={18} weight="regular" />,
      shortcut: ['c', 'a'],
      keywords: 'calculadora',
      perform: () => {
        setOpenModalCalculator(true);
      },
    },
    {
      section: 'Ferramentas',
      id: 'calculator-compound-interest',
      name: 'Calculadora de Juros Compostos',
      icon: <Percent size={18} weight="regular" />,
      shortcut: ['j', 'c'],
      keywords: 'calculadora, juros compostos',
      perform: () => {
        setOpenModalCompoundInterest(true);
      },
    },
    {
      section: 'Ferramentas',
      id: 'calculator-emergency-reserve',
      name: 'Calculadora de Reserva de Emergência',
      icon: <FirstAid size={18} weight="regular" />,
      shortcut: ['j', 's'],
      keywords: 'calculadora, reserva de emergência',
      perform: () => {
        setOpenModalEmergencyReserve(true);
      },
    },
    {
      section: 'Ferramentas',
      id: 'investor-profile',
      name: 'Perfil do Investidor',
      icon: <ChartLineUp size={18} weight="regular" />,
      shortcut: ['p', 'i'],
      keywords: 'perfil, investidor, perfil do investidor',
      perform: () => {
        setOpenModalInvestorProfile(true);
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
    {
      section: 'Preferências',
      id: 'show-balance',
      name: 'Mostrar/Ocultar Saldo',
      keywords: 'saldo, mostrar saldo, balance',
      shortcut: ['m', 's'],
      perform: () => {
        toggleValueVisibility();
      },
      icon: areValueVisible ? (
        <EyeClosed size={18} weight="regular" />
      ) : (
        <Eye size={18} weight="regular" />
      ),
    },
  ];

  return (
    <>
      <KBarProvider actions={actions}>
        <KBarPortal>
          <KBarPositioner className="z-50 flex items-center bg-black/80 p-2">
            <KBarAnimator className="w-max-500px w-2/4 overflow-hidden rounded-lg border-[1.5px] border-primary bg-background dark:border-primary-dark dark:bg-background-dark">
              <KBarSearch
                className="flex h-14 w-full bg-background px-4 outline-none dark:bg-background-dark dark:text-title-dark"
                defaultPlaceholder="Digite um comando ou pesquise por algo"
              />
              <RenderResults />
            </KBarAnimator>
          </KBarPositioner>
        </KBarPortal>

        {children}
      </KBarProvider>

      <CurrencyConverter
        openModalCurrency={openModalCurrency}
        setOpenModalCurrency={setOpenModalCurrency}
      />

      <Calculator
        openModalCalculator={openModalCalculator}
        setOpenModalCalculator={setOpenModalCalculator}
      />

      <CompoundInterest
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
