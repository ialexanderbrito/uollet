import { Pie } from 'react-chartjs-2';
import { Link, useNavigate } from 'react-router-dom';

import { CaretLeft } from '@phosphor-icons/react';
import incomeIcon from 'assets/income.svg';
import outcomeIcon from 'assets/outcome.svg';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { BottomNavigator } from 'components/BottomNavigator';
import { Filter } from 'components/Filter';
import { Loading } from 'components/Loading';

import { formatCurrency } from 'utils/formatCurrency';

import { useResume } from 'hooks/useResume';

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

export function Resume() {
  const {
    dataChart,
    categories,
    values,
    colors,
    actualYear,
    newMonthLong,
    handlePreviousMonth,
    handleNextMonth,
    loading,
    type,
    setType,
  } = useResume();
  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex w-full flex-col items-center justify-center bg-background dark:bg-backgroundDark">
            <div className="flex h-24 w-full flex-row bg-primary dark:bg-primaryDark">
              <div className="flex w-1/4 items-center justify-center">
                <CaretLeft
                  size={20}
                  weight="light"
                  className="cursor-pointer text-white"
                  onClick={() => navigate(-1)}
                />
              </div>
              <div className="flex w-2/4 items-center justify-center">
                <p className="text-lg font-normal text-white">
                  Resumos - {type === 'income' ? 'Entradas' : 'Saídas'}
                </p>
              </div>
            </div>

            <div className="flex h-screen w-full flex-col items-center justify-start gap-2 p-4">
              <div className="flex w-full items-center justify-end gap-2 ">
                <img
                  src={incomeIcon}
                  alt="Entradas"
                  className={
                    type === 'income'
                      ? 'h-8 w-8 cursor-pointer opacity-25'
                      : 'h-8 w-8 cursor-pointer opacity-100'
                  }
                  onClick={() => setType('income')}
                />
                <img
                  src={outcomeIcon}
                  alt="Saidas"
                  className={
                    type === 'outcome'
                      ? 'h-8 w-8 cursor-pointer opacity-25'
                      : 'h-8 w-8 cursor-pointer opacity-100'
                  }
                  onClick={() => setType('outcome')}
                />
              </div>

              <Filter
                newMonthLong={newMonthLong}
                actualYear={actualYear}
                handlePreviousMonth={handlePreviousMonth}
                handleNextMonth={handleNextMonth}
              />
              <div className="mb-8 h-64 w-64">
                {categories.length === 0 ? (
                  <div className="flex h-full w-full items-center justify-center">
                    <p className="text-center text-lg font-medium text-title dark:text-titleDark">
                      Nenhum registro encontrado
                    </p>
                  </div>
                ) : (
                  <Pie
                    data={dataChart}
                    options={{
                      responsive: true,
                      plugins: {
                        datalabels: {
                          formatter: (value: number) => `${value}%`,
                          color: 'white',
                          labels: {
                            title: {
                              font: {
                                weight: 'bold',
                              },
                            },
                            value: {
                              color: 'white',
                            },
                          },
                        },
                      },
                    }}
                  />
                )}
              </div>
              <div className="flex w-full flex-col gap-2">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    className="flex h-12 w-full cursor-pointer items-center gap-2 rounded-md border-[1px] border-transparent bg-backgroundCard hover:border-current hover:border-secondary hover:transition-all dark:bg-backgroundCardDark dark:hover:border-secondaryDark"
                    to={`/category/${category}&type=${type}`}
                  >
                    <div
                      className="h-full w-2 rounded-l-md"
                      style={{ backgroundColor: colors[index] }}
                    />
                    <p className="w-full text-left text-base font-normal text-title dark:text-titleDark">
                      {category}
                    </p>
                    <p className="mr-4 w-full text-right text-lg font-medium text-title dark:text-titleDark">
                      {formatCurrency(values[index])}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <BottomNavigator />
          </div>
        </>
      )}
    </>
  );
}
