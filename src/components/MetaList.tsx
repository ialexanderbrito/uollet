import { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ClockCounterClockwise,
  Info,
  Pencil,
  TrashSimple,
} from '@phosphor-icons/react';
import { format, isAfter, isBefore } from 'date-fns';

import { cn } from 'utils/cn';

import { useGoals } from 'hooks/useGoals';

interface MetasProps {
  meta: {
    id: number;
    title: string;
    description: string;
    date_initial: string;
    date_final: string;
    value: number;
    emoji: string;
  };
  onDelete: () => void;
}

export const BACKGROUND_COLORS = [
  '#F7F9FC',
  '#EEEDFD',
  '#FFEBEE',
  '#FDEFE2',
  '#E7F9F3',
  '#EDEEFD',
  '#ECFAFE',
  '#F2FFD1',
  '#FFF7E0',
  '#FDF1F7',
  '#EAEFE6',
  '#E0E6EB',
  '#E4E2F3',
  '#E6DFEC',
  '#E2F4E8',
  '#E6EBEF',
  '#EBE6EF',
  '#E8DEF6',
  '#D8E8F3',
  '#ECE1FE',
];

export function MetaList({ meta, onDelete }: MetasProps) {
  const navigate = useNavigate();
  const { detailsGoals } = useGoals();

  function separeteGoalsByCategory(category: string) {
    const goalsByCategory = detailsGoals.filter(
      (goal) => goal.category === category,
    );

    return goalsByCategory;
  }

  function calculateTotalValueByCategory(category: string) {
    const goalsByCategory = separeteGoalsByCategory(category);

    const totalValue = goalsByCategory.reduce(
      (acc, goal) => acc + goal.value,
      0,
    );

    return totalValue;
  }

  function calcularPorcentagemConclusao(value: number) {
    const totalValue = calculateTotalValueByCategory(`Meta ${meta.title}`);

    const porcentagem = (totalValue / value) * 100;

    if (porcentagem > 100) return 100;

    return porcentagem;
  }

  function renderEmojiAvatar(emoji?: string) {
    const patternStyle: CSSProperties = {
      backgroundImage: `url('https://emojicdn.elk.sh/${emoji}')`,
      backgroundSize: 'contain',
      backgroundRepeat: 'repeat',
    };

    return (
      <div className="flex flex-row items-center gap-2">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-md"
          style={{ backgroundColor: `${BACKGROUND_COLORS[meta.id % 20]}` }}
        >
          <div
            className="flex h-8 w-8 items-center justify-center"
            style={patternStyle}
          />
        </div>
        <span className="ml-2 mt-2 block font-medium tracking-[-0.5px] text-title dark:text-title-dark">
          {meta.title}
        </span>
      </div>
    );
  }

  function dateFinalExpired() {
    const date = new Date(meta.date_final);
    const today = new Date();

    if (isBefore(date, today)) return true;

    if (isAfter(date, today)) return false;
  }

  const newDateStarted = new Date(meta.date_initial);
  newDateStarted.setDate(newDateStarted.getDate() + 1);

  return (
    <>
      <div
        className="flex w-full flex-col justify-between rounded-2xl border-b-4 bg-background-card p-4 text-left shadow-md dark:bg-background-card-dark"
        style={{
          borderBottomColor: `${BACKGROUND_COLORS[meta.id % 20]}`,
        }}
      >
        <header className="flex w-full items-center justify-between">
          {renderEmojiAvatar(meta.emoji)}

          <div className="flex flex-row gap-2">
            <Pencil
              size={18}
              weight="light"
              onClick={() => {
                navigate(`/edit/goals/${meta.id}`);
              }}
              className="cursor-pointer text-primary dark:text-white"
            />

            <TrashSimple
              size={18}
              weight="light"
              onClick={onDelete}
              className="cursor-pointer text-danger"
            />
          </div>
        </header>
        <div>
          <span className="mb-2 mt-2 block font-normal tracking-[-0.5px] text-title dark:text-title-dark">
            {meta.description}
          </span>
          <span className="block font-medium tracking-[-0.5px] text-title dark:text-title-dark">
            Valor da Meta:{' '}
            {meta.value.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}{' '}
            | Valor Atual:{' '}
            {calculateTotalValueByCategory(`Meta ${meta.title}`).toLocaleString(
              'pt-BR',
              {
                style: 'currency',
                currency: 'BRL',
              },
            )}
          </span>

          <small className="text-sm text-text dark:text-text-dark">
            {dateFinalExpired() ? (
              <span className="text-danger">
                Meta finalizada, não é possível adicionar novos valores. Para
                reabrir a meta, edite a data final.
              </span>
            ) : (
              <>
                A meta foi iniciada em{' '}
                {format(new Date(newDateStarted), 'dd/MM/yyyy')} e termina em{' '}
                {format(new Date(`${meta.date_final} `), 'dd/MM/yyyy')}
              </>
            )}
          </small>

          <br />

          <small className="text-sm text-text dark:text-text-dark">
            Progresso: {calcularPorcentagemConclusao(meta.value).toFixed(2)}%
            concluído
          </small>
        </div>
        <div className="h-2 w-full rounded bg-background dark:bg-background-dark">
          <div
            className={cn('h-2 rounded bg-primary dark:bg-primary-dark')}
            style={{ width: `${calcularPorcentagemConclusao(meta.value)}%` }}
          ></div>
        </div>
      </div>

      {separeteGoalsByCategory(`Meta ${meta.title}`).length !== 0 ? (
        <div
          className="z-10 -mt-7 flex cursor-pointer justify-center rounded-md bg-primary p-2 text-xs text-white dark:bg-primary-dark"
          onClick={() => {
            navigate(`/goal/${meta.title}`);
          }}
        >
          <ClockCounterClockwise
            size={18}
            weight="light"
            className="mr-2 cursor-pointer"
          />
          Ver Histórico
        </div>
      ) : (
        <div
          className="z-10 -mt-7 flex cursor-pointer justify-center rounded-md bg-primary p-2 text-xs text-white dark:bg-primary-dark"
          onClick={() => {
            navigate(`/goal/${meta.title}`);
          }}
        >
          <Info size={18} weight="light" className="mr-2 cursor-pointer" />
          Detalhes
        </div>
      )}
    </>
  );
}
