import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import emptyImg from 'assets/empty.svg';
import incomeIcon from 'assets/income.svg';
import outcomeIcon from 'assets/outcome.svg';
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

import { formatCurrency } from 'utils/formatCurrency';

import { useAuth } from 'contexts/Auth';
import { useTheme } from 'contexts/Theme';

import { useTransactions } from 'hooks/useTransactions';

export function Finances() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user, areValueVisible, toggleValueVisibility } = useAuth();

  const { openModalName, handleCloseModalName, selectedYear, setSelectedYear } =
    useModal();

  const {
    finances,
    loading,
    totalIncome,
    allTotal,
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
  } = useTransactions();

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
            primary={true}
            user={user}
            visible={areValueVisible}
            setVisible={toggleValueVisibility}
          />

          <div className="absolute top-20 flex w-full min-w-full snap-x gap-4 overflow-x-scroll p-4 scrollbar-hide md:justify-center">
            <Card
              title="Entradas"
              icon={incomeIcon}
              value={formatCurrency(totalIncome)}
              lastEntry={`De 01/${currentMonth}/${selectedYear} até ${lastDayOfTheMonth}/${currentMonth}/${selectedYear}`}
              bgColor={
                theme === 'light' ? 'backgroundCard' : 'backgroundCardDark'
              }
              textColor={theme === 'light' ? 'title' : 'textDark'}
              visible={areValueVisible}
            />

            <Card
              title="Saidas"
              icon={outcomeIcon}
              value={formatCurrency(totalOutcome)}
              lastEntry={`De 01/${currentMonth}/${selectedYear} até ${lastDayOfTheMonth}/${currentMonth}/${selectedYear}`}
              bgColor={
                theme === 'light' ? 'backgroundCard' : 'backgroundCardDark'
              }
              textColor={theme === 'light' ? 'title' : 'textDark'}
              visible={areValueVisible}
            />

            <Card
              title="Total"
              icon={totalIcon}
              value={formatCurrency(allTotal)}
              lastEntry={balanceMessage(allTotal)}
              bgColor={theme === 'light' ? 'secondary' : 'secondaryDark'}
              textColor={theme === 'light' ? 'white' : 'white'}
              alternativeTextColor={theme === 'light' ? 'title' : 'textDark'}
              visible={areValueVisible}
            />
          </div>

          <div className="h-20" />

          <div className="flex min-h-screen w-full flex-col gap-4 p-4">
            <input
              type="text"
              value={search}
              placeholder="Pesquisar por alguma transação"
              className="h-14 w-full rounded-lg bg-white p-4 text-title outline-none dark:bg-backgroundCardDark dark:text-titleDark"
              onChange={(e) => setSearch(e.target.value)}
            />

            <Filter
              actualMonth={currentMonth}
              handleChangeFilterMonth={handleChangeFilterMonth}
              handleOpenModalFilter={handleOpenModalFilter}
            />

            <ul className="flex flex-col gap-4">
              {finances.length === 0 && (
                <div className="mt-4 flex flex-col items-center justify-center">
                  <img src={emptyImg} alt="Empty" className="mb-2 w-28" />
                  <p className="text-center text-lg font-medium text-black dark:text-textDark">
                    Não encontramos nenhuma transação
                  </p>
                </div>
              )}
              {finances.map((item: FinancesProps, index) => (
                <>
                  <CardList
                    key={item.id}
                    title={item.title}
                    value={item.value}
                    category={item.category}
                    date={item.date}
                    className={index === finances.length - 1 ? 'mb-10' : ''}
                    income={item.type === 'income'}
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
                '@finance:selectedYear',
                selectedYear.toString(),
              );
              filterTransactionsByYear(selectedYear, currentMonth);
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
      )}
    </>
  );
}
