import { Pie } from 'react-chartjs-2';

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

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex w-full flex-col items-center justify-center bg-background dark:bg-backgroundDark">
            <div className="bg-primary flex w-full h-24 flex-row">
              <div className="flex w-full items-center justify-center">
                <p className="text-white font-normal text-lg">
                  Resumo por categoria -{' '}
                  {type === 'income' ? 'Entradas' : 'Saídas'}
                </p>
              </div>
            </div>

            <div className="flex w-full items-center justify-start flex-col gap-2 p-4 h-screen">
              <div className="flex items-center w-full justify-end gap-2 ">
                <img
                  src={incomeIcon}
                  alt="Entradas"
                  className={
                    type === 'income'
                      ? 'w-8 h-8 opacity-25'
                      : 'w-8 h-8 opacity-100'
                  }
                  onClick={() => setType('income')}
                />
                <img
                  src={outcomeIcon}
                  alt="Saidas"
                  className={
                    type === 'outcome'
                      ? 'w-8 h-8 opacity-25'
                      : 'w-8 h-8 opacity-100'
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
              <div className="w-64 h-64 mb-8">
                {categories.length === 0 ? (
                  <div className="flex w-full h-full items-center justify-center">
                    <p className="text-title font-medium text-lg text-center dark:text-titleDark">
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
              <div className="flex flex-col w-full gap-2">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-backgroundCard gap-2 w-full h-12 rounded-md dark:bg-backgroundCardDark"
                  >
                    <div
                      className="w-2 rounded-l-md h-full"
                      style={{ backgroundColor: colors[index] }}
                    />
                    <p className="font-normal text-left text-base w-full text-title dark:text-titleDark">
                      {category}
                    </p>
                    <p className="font-medium text-right text-lg mr-4 w-full text-title dark:text-titleDark">
                      {formatCurrency(values[index])}
                    </p>
                  </div>
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
