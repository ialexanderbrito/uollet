import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import charLineDown from 'assets/chart-line-down.svg';
import charLineUp from 'assets/chart-line-up.svg';
import emptyImg from 'assets/empty.svg';
import totalIcon from 'assets/total.svg';
import { FinancesProps } from 'interfaces/FinancesProps';

import { BottomNavigator } from 'components/BottomNavigator';
import { Card } from 'components/Card';
import { CardList } from 'components/CardList';
import { Filter } from 'components/Filter';
import { Header } from 'components/Header';
import { Loading } from 'components/Loading';
import { MyDialog } from 'components/Modal';
import { ModalFilter } from 'components/Modal/Filter';
import { useModal } from 'components/Modal/useModal';

import { cn } from 'utils/cn';
import { formatCurrency } from 'utils/formatCurrency';

import { useAuth } from 'contexts/Auth';
import { useTheme } from 'contexts/Theme';

import { useInvestments } from 'hooks/useInvestments';

export function Investments() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user, areValueVisible, toggleValueVisibility } = useAuth();

  const { openModalName, handleCloseModalName, selectedYear, setSelectedYear } =
    useModal();

  const {
    investments,
    loading,
    totalIncome,
    allTotalInvestiments,
    totalOutcome,
    handleCloseModal,
    openModal,
    handleOpenModal,
    search,
    setSearch,
    balanceMessage,
    deleteTransaction,
    duplicateTransaction,
    handleChangeFilterMonth,
    searchAllTransactions,
    currentMonth,
    lastDayOfTheMonth,
    openModalFilter,
    handleCloseModalFilter,
    handleOpenModalFilter,
    filterTransactionsByYear,
    getTransactionsValuesTotal,
  } = useInvestments();

  const [idTransaction, setIdTransaction] = useState(0);

  useEffect(() => {
    getTransactionsValuesTotal();
  }, []);

  useEffect(() => {
    if (search.length > 2) {
      searchAllTransactions();
    }

    if (search.length === 0) {
      handleChangeFilterMonth(currentMonth);
    }
  }, [search]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex w-full flex-col items-center justify-center bg-background dark:bg-backgroundDark">
          <Header
            variant="primary"
            user={user}
            visible={areValueVisible}
            setVisible={toggleValueVisibility}
            isInvestiment
          />

          <div className="absolute top-20 flex w-full min-w-full snap-x gap-4 overflow-x-scroll p-4 scrollbar-hide md:justify-center">
            <Card
              title="Entradas"
              icon={charLineUp}
              value={formatCurrency(totalIncome)}
              lastEntry={`De 01/${currentMonth}/${selectedYear} até ${lastDayOfTheMonth}/${currentMonth}/${selectedYear}`}
              visible={areValueVisible}
              className={cn(
                theme === 'light' && 'bg-backgroundCard text-title',
                theme === 'dark' && 'bg-backgroundCardDark text-textDark',
              )}
            />

            <Card
              title="Saidas"
              icon={charLineDown}
              value={formatCurrency(totalOutcome)}
              lastEntry={`De 01/${currentMonth}/${selectedYear} até ${lastDayOfTheMonth}/${currentMonth}/${selectedYear}`}
              visible={areValueVisible}
              className={cn(
                theme === 'light' && 'bg-backgroundCard text-title',
                theme === 'dark' && 'bg-backgroundCardDark text-textDark',
              )}
            />

            <Card
              title="Rendimento Total"
              icon={totalIcon}
              value={formatCurrency(allTotalInvestiments)}
              lastEntry={balanceMessage(allTotalInvestiments)}
              textColor={theme === 'light' ? 'white' : 'white'}
              visible={areValueVisible}
              className={cn(
                theme === 'light' && 'bg-primaryDark text-white',
                theme === 'dark' && 'bg-primary text-textDark',
              )}
            />
          </div>

          <div className="h-20" />

          <div className="flex min-h-screen w-full flex-col gap-4 p-4">
            <input
              type="text"
              value={search}
              placeholder="Pesquisar por alguma transação"
              className="h-14 w-full rounded-lg bg-white p-4 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundCardDark dark:text-titleDark focus:dark:ring-primaryDark"
              onChange={(e) => setSearch(e.target.value)}
            />

            <Filter
              actualMonth={currentMonth}
              handleChangeFilterMonth={handleChangeFilterMonth}
              handleOpenModalFilter={handleOpenModalFilter}
              isInvestiment
            />

            <ul className="flex flex-col gap-4">
              {investments.length === 0 && (
                <div className="mt-4 flex flex-col items-center justify-center">
                  <img src={emptyImg} alt="Empty" className="mb-2 w-28" />
                  <p className="text-center text-lg font-medium text-black dark:text-textDark">
                    Não encontramos nenhum investimento
                  </p>

                  <div className="mt-2 flex w-full flex-col items-center justify-end gap-4">
                    <button
                      type="submit"
                      className="h-14 w-full rounded-lg bg-primaryDark p-4 text-white dark:bg-primary"
                      onClick={() => {
                        navigate('/register');
                      }}
                    >
                      Adicionar Investimento
                    </button>
                  </div>
                </div>
              )}
              {investments.map((item: FinancesProps, index) => (
                <>
                  <CardList
                    key={item.id}
                    title={item.title}
                    value={item.value}
                    category={item.category}
                    date={item.date}
                    className={index === investments.length - 1 ? 'mb-10' : ''}
                    income={item.type === 'income'}
                    isInvestiment
                    onClick={() => {
                      setIdTransaction(item.id);
                      handleOpenModal();
                    }}
                    onEdit={() => {
                      navigate(`/edit/${item.id}`);
                    }}
                    onDuplicate={() => {
                      duplicateTransaction(
                        item.id,
                        currentMonth,
                        lastDayOfTheMonth,
                      );
                    }}
                    visible={areValueVisible}
                  />

                  <MyDialog
                    closeModal={handleCloseModal}
                    isOpen={openModal}
                    title="Deseja realmente excluir registro?"
                    description='Ao clicar em "Excluir" o registro será excluído permanentemente e não poderá ser recuperado. '
                    buttonPrimary
                    buttonSecondary
                    textButtonSecondary="Excluir"
                    handleChangeButtonSecondary={() => {
                      deleteTransaction(
                        idTransaction,
                        currentMonth,
                        lastDayOfTheMonth,
                      );
                    }}
                  />
                </>
              ))}
            </ul>
          </div>

          <MyDialog
            closeModal={handleCloseModalName}
            isOpen={openModalName}
            title="Seja bem-vindo(a)"
            description="Antes de começar, queria saber como podemos te chamar?"
            name
          />

          <MyDialog
            closeModal={handleCloseModalFilter}
            isOpen={openModalFilter}
            title="Filtros"
            description="Aqui você pode filtrar suas transações por categorias e anos."
            buttonSecondary
            textButtonSecondary="Filtrar"
            handleChangeButtonSecondary={() => {
              sessionStorage.setItem(
                '@uollet:selectedYear',
                selectedYear.toString(),
              );
              filterTransactionsByYear(selectedYear, currentMonth);
            }}
            isInvestiment
          >
            <ModalFilter
              handleChangeYear={(step: number) => {
                setSelectedYear((prevState) => prevState + step);
              }}
              selectedYear={selectedYear}
              isInvestiment
            />
          </MyDialog>

          <BottomNavigator isInvestiment />
        </div>
      )}
    </>
  );
}
