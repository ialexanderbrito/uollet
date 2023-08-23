import { Pie } from 'react-chartjs-2';

import emptyImg from 'assets/empty.svg';
import incomeIcon from 'assets/income.svg';
import outcomeIcon from 'assets/outcome.svg';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { BottomNavigator } from 'components/BottomNavigator';
import { Filter } from 'components/Filter';
import { Header } from 'components/Header';
import { Loading } from 'components/Loading';
import { MyDialog } from 'components/Modal';
import { ModalFilter } from 'components/Modal/Filter';
import { useModal } from 'components/Modal/useModal';

import { formatCurrency } from 'utils/formatCurrency';

import { useResume } from 'hooks/useResume';

import { Finances } from './Finances';

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

export function Resume() {
  const { selectedYear, setSelectedYear } = useModal();
  const {
    dataChart,
    categories,
    values,
    colors,
    loading,
    type,
    setType,
    searchParams,
    setSearchParams,
    openModalFilter,
    handleCloseModalFilter,
    handleOpenModalFilter,
    currentMonth,
    setCurrentMonth,
    setCurrentYear,
    setLastDayOfTheMonth,
    filterTransactionsByYearByCategory,
    getAllTransactionsForTheMonthAndYearByCategory,
  } = useResume();

  async function handleChangeGraph(month: number) {
    const year = Number(sessionStorage.getItem('@finance:selectedYear'));
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    setLastDayOfTheMonth(lastDayOfMonth);

    if (selectedYear) {
      setCurrentYear(year);
      setCurrentMonth(month);

      getAllTransactionsForTheMonthAndYearByCategory(
        year,
        month,
        lastDayOfMonth,
      );
    } else {
      setCurrentMonth(month);
      getAllTransactionsForTheMonthAndYearByCategory(
        selectedYear,
        month,
        lastDayOfMonth,
      );
    }
  }

  const typeParams = searchParams.get('type');
  const categoryParams = searchParams.get('category');

  if (typeParams && categoryParams) {
    return <Finances />;
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex w-full flex-col items-center justify-center bg-background dark:bg-backgroundDark">
            <Header title="Resumo" />

            <div className="flex h-screen w-full flex-col items-center justify-start gap-2 p-4">
              <div className="mb-2 flex w-full items-center justify-center gap-2 sm:justify-end">
                <div className="mb-2 flex h-9 w-full items-center justify-around rounded-md border border-secondary dark:border-secondaryDark sm:w-64">
                  <span
                    onClick={() => setType('income')}
                    className={
                      type === 'income'
                        ? 'flex h-9 w-full cursor-pointer items-center justify-center gap-1 rounded-md rounded-r-none border-r border-secondary bg-secondary text-background dark:border-secondaryDark dark:bg-secondaryDark'
                        : 'flex w-full cursor-pointer items-center justify-center gap-1 text-title opacity-25 dark:text-titleDark'
                    }
                  >
                    <img
                      src={incomeIcon}
                      alt="Entradas"
                      className="h-6 w-6 cursor-pointer"
                    />
                    Entrada
                  </span>

                  <span
                    onClick={() => setType('outcome')}
                    className={
                      type === 'outcome'
                        ? 'flex h-9 w-full cursor-pointer items-center justify-center gap-1 rounded-md rounded-l-none border-r border-secondary bg-secondary text-background dark:border-secondaryDark dark:bg-secondaryDark'
                        : 'flex w-full cursor-pointer items-center justify-center gap-1 text-title opacity-25 dark:text-titleDark'
                    }
                  >
                    <img
                      src={outcomeIcon}
                      alt="Saidas"
                      className="h-6 w-6 cursor-pointer"
                    />
                    Saída
                  </span>
                </div>
              </div>

              <Filter
                actualMonth={currentMonth}
                handleChangeFilterMonth={handleChangeGraph}
                handleOpenModalFilter={() => {
                  handleOpenModalFilter();
                }}
              />

              <div className="mb-8 mt-8 flex h-64 items-center justify-center">
                {categories.length === 0 ? (
                  <div className="mt-4 flex flex-col items-center justify-center">
                    <img src={emptyImg} alt="Empty" className="mb-2 w-28" />
                    <p className="text-center text-lg font-medium text-black dark:text-textDark">
                      Não encontramos nenhum dado para esse mês
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
                  <div
                    key={index}
                    className="flex h-12 w-full cursor-pointer items-center gap-2 rounded-md border-[1px] border-transparent bg-backgroundCard hover:border-current hover:border-secondary hover:transition-all dark:bg-backgroundCardDark dark:hover:border-secondaryDark"
                    onClick={() => {
                      setSearchParams({
                        category,
                        type,
                      });
                    }}
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
                  </div>
                ))}
              </div>
            </div>

            <MyDialog
              closeModal={handleCloseModalFilter}
              isOpen={openModalFilter}
              title="Filtros"
              description="Aqui você pode filtrar suas transações por categorias e anos."
              buttonSecondary
              textButtonSecondary="Filtrar"
              handleChangeButtonSecondary={() => {
                sessionStorage.setItem(
                  '@finance:selectedYear',
                  selectedYear.toString(),
                );
                filterTransactionsByYearByCategory(selectedYear, currentMonth);
              }}
            >
              <ModalFilter
                handleChangeYear={(step: number) => {
                  setSelectedYear((prevState) => prevState + step);
                }}
                selectedYear={selectedYear}
              />
            </MyDialog>

            <BottomNavigator />
          </div>
        </>
      )}
    </>
  );
}
