import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MagnifyingGlass, Star, TrendUp } from '@phosphor-icons/react';
import { Jelly } from '@uiball/loaders';
import charLineDown from 'assets/chart-line-down.svg';
import charLineUp from 'assets/chart-line-up.svg';
import emptyImg from 'assets/empty.svg';
import totalIcon from 'assets/total.svg';
import { FinancesProps } from 'interfaces/FinancesProps';

import { BottomNavigator } from 'components/BottomNavigator';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { CardList } from 'components/CardList';
import { CardStock } from 'components/CardStock';
import { Filter } from 'components/Filter';
import { Header } from 'components/Header';
import { Loading } from 'components/Loading';
import { MyDialog } from 'components/Modal';
import { ModalFilter } from 'components/Modal/Filter';
import { useModal } from 'components/Modal/useModal';
import { SearchInput } from 'components/SearchInput';
import { StockScroll } from 'components/StockScroll';

import { formatCurrency } from 'utils/formatCurrency';

import { useAuth } from 'contexts/Auth';
import { useTheme } from 'contexts/Theme';

import { useInvestments } from 'hooks/useInvestments';
import { useStocks } from 'hooks/useStocks';

export function Investments() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user, areValueVisible, toggleValueVisibility } = useAuth();
  const {
    stocks,
    savedStocks,
    isFavorite,
    setIsFavorite,
    saveFavoriteStock,
    verifyIsFavorite,
    loading: loadingStocks,
    setSearchStock,
    stocksResultSearch,
    isSearch,
    setIsSearch,
    searchStock,
    setStocksResultSearch,
  } = useStocks();
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
    if (search.length >= 2) {
      searchAllTransactions();
    }

    if (search.length === 0) {
      handleChangeFilterMonth(currentMonth);
    }
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSearch(false);
      setStocksResultSearch([]);
      setSearchStock('');
    }, 20000);

    return () => clearTimeout(timer);
  }, [isSearch]);

  if (loading) {
    return <Loading color="#170e39" />;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center bg-background dark:bg-background-dark">
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
          className="bg-background-card text-title dark:bg-background-card-dark dark:text-title-dark"
        />

        <Card
          title="Saidas"
          icon={charLineDown}
          value={formatCurrency(totalOutcome)}
          lastEntry={`De 01/${currentMonth}/${selectedYear} até ${lastDayOfTheMonth}/${currentMonth}/${selectedYear}`}
          visible={areValueVisible}
          className="bg-background-card text-title dark:bg-background-card-dark dark:text-title-dark"
        />

        <Card
          title="Rendimento Total"
          icon={totalIcon}
          value={formatCurrency(allTotalInvestiments)}
          lastEntry={balanceMessage(allTotalInvestiments)}
          textColor={theme === 'light' ? 'white' : 'white'}
          visible={areValueVisible}
          className="bg-investments-primary text-white dark:bg-investments-primary"
        />
      </div>

      <div className="h-20" />

      <div className="mt-2 flex w-full flex-row items-center justify-between">
        <p className="ml-5 text-sm font-bold text-title dark:text-text-dark">
          {isFavorite ? 'Ações mais procuradas' : 'Minhas ações favoritas'}
        </p>

        <div className="flex flex-row items-center justify-center">
          <p className="mr-5 flex items-center justify-center text-sm font-bold text-title dark:text-text-dark">
            <button
              type="button"
              className=" text-title dark:text-text-dark"
              onClick={() => {
                setIsSearch(!isSearch);
              }}
            >
              <MagnifyingGlass size={25} />
            </button>
          </p>

          <p className="mr-5 flex items-center justify-center text-sm font-bold text-title dark:text-text-dark">
            {isFavorite ? (
              <button
                type="button"
                className=" text-title dark:text-text-dark"
                onClick={() => {
                  setIsFavorite(false);
                }}
              >
                <Star size={25} weight="fill" />
              </button>
            ) : (
              <button
                type="button"
                className="text-title dark:text-text-dark"
                onClick={() => {
                  setIsFavorite(true);
                }}
              >
                <TrendUp size={25} />
              </button>
            )}
          </p>
        </div>
      </div>

      {isSearch && (
        <SearchInput
          searchStock={searchStock}
          setSearchStock={setSearchStock}
          stocksResultSearch={stocksResultSearch}
          navigate={navigate}
          saveFavoriteStock={saveFavoriteStock}
          verifyIsFavorite={verifyIsFavorite}
        />
      )}

      {loadingStocks ? (
        <div className="mt-2 flex w-full items-center justify-center">
          <Jelly color="#170e39" size={30} />
        </div>
      ) : (
        <StockScroll>
          {isFavorite ? (
            <>
              {stocks.map((stock) => (
                <div key={stock.stock} className="scroll-snap-align-start ">
                  <CardStock
                    stock={stock.stock}
                    name={stock.name}
                    close={stock.close}
                    change={stock.change}
                    logo={stock.logo}
                    saveFavoriteStock={() => {
                      saveFavoriteStock(stock.stock);
                    }}
                    verifyIsFavorite={verifyIsFavorite}
                    onClick={() => {
                      navigate(`/stock/${stock.stock}`);
                    }}
                  />
                </div>
              ))}
            </>
          ) : (
            <>
              {savedStocks.length === 0 &&
                savedStocks.map((stock) => (
                  <div key={stock.symbol} className="scroll-snap-align-start">
                    <CardStock
                      stock={stock.symbol}
                      name={stock.shortName}
                      close={stock.regularMarketPrice}
                      currency={stock.currency}
                      change={stock.regularMarketChangePercent}
                      logo={stock.logourl}
                      saveFavoriteStock={() => {
                        saveFavoriteStock(stock.symbol);
                      }}
                      verifyIsFavorite={verifyIsFavorite}
                      onClick={() => {
                        navigate(`/stock/${stock.symbol}`);
                      }}
                    />
                  </div>
                ))}

              {savedStocks.length === 0 && (
                <div className="mt-4 flex w-full flex-col items-center justify-center">
                  <p className="w-72 text-center text-base font-medium text-black dark:text-text-dark">
                    Você ainda não possui nenhuma ação favorita
                  </p>
                </div>
              )}
            </>
          )}
        </StockScroll>
      )}

      <div className="flex min-h-screen w-full flex-col gap-4 p-4">
        <input
          type="text"
          value={search}
          placeholder="Pesquisar por alguma transação"
          className="h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-investments-primary dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-investments-primary"
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
              <p className="text-center text-lg font-medium text-black dark:text-text-dark">
                Não encontramos nenhum investimento
              </p>

              <div className="mt-2 flex w-full flex-col items-center justify-end gap-4">
                <Button
                  type="submit"
                  isInvestiment
                  onClick={() => {
                    navigate('/register');
                  }}
                >
                  Adicionar Investimento
                </Button>
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
                isInvestiment
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
      <BottomNavigator />
    </div>
  );
}
