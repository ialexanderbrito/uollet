import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import emptyImg from 'assets/empty.svg';
import { CreditCardProps } from 'interfaces/CreditCardProps';
import { FinancesProps } from 'interfaces/FinancesProps';

import { BottomNavigator } from 'components/BottomNavigator';
import { CardList } from 'components/CardList';
import { CreditCard } from 'components/CreditCard';
import { Filter } from 'components/Filter';
import { Header } from 'components/Header';
import { Loading } from 'components/Loading';
import { MyDialog } from 'components/Modal';
import { ModalFilter } from 'components/Modal/Filter';
import { useModal } from 'components/Modal/useModal';

import { formatCurrency } from 'utils/formatCurrency';

import { useAuth } from 'contexts/Auth';

import { useCards } from 'hooks/useCards';
import { useCrypto } from 'hooks/useCrypto';

export function Cards() {
  const navigate = useNavigate();
  const { user, areValueVisible, toggleValueVisibility } = useAuth();
  const { decryptNumberCreditCard } = useCrypto();
  const { openModalName, handleCloseModalName, selectedYear, setSelectedYear } =
    useModal();

  const {
    finances,
    loading,
    search,
    setSearch,
    duplicateTransaction,
    deleteTransaction,
    openModal,
    handleOpenModal,
    handleCloseModal,
    deleteCreditCard,
    limitCreditCard,
    creditCards,
    handleOpenModalCreditCard,
    handleCloseModalCreditCard,
    openModalCreditCard,
    getAllCreditCard,
    searchAllTransactionsCreditCard,
    filterTransactionsCreditCardByYear,
    currentMonth,
    handleCloseModalFilter,
    openModalFilter,
    handleOpenModalFilter,
    handleChangeFilterMonthCreditCard,
  } = useCards();

  const [idTransaction, setIdTransaction] = useState(0);

  useEffect(() => {
    getAllCreditCard();
  }, []);

  useEffect(() => {
    if (search.length > 2) {
      searchAllTransactionsCreditCard();
    }
  }, [search]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex w-full flex-col items-center justify-center bg-background dark:bg-backgroundDark">
          <Header
            user={user}
            variant="primary"
            visible={areValueVisible}
            setVisible={toggleValueVisibility}
          />

          <div className="absolute top-20 flex w-full min-w-full snap-x gap-4 overflow-x-scroll p-4 scrollbar-hide md:justify-center">
            {creditCards.map((card: CreditCardProps) => (
              <>
                <CreditCard
                  key={card.id}
                  creditNumber={decryptNumberCreditCard(card.card_number)}
                  cardName={card.card_name}
                  limit={formatCurrency(
                    card.limit - limitCreditCard(card.card_name),
                  )}
                  maturity={card.maturity}
                  closure={card.closure}
                  isDeletable={true}
                  onDelete={() => {
                    handleOpenModalCreditCard();
                    setIdTransaction(card.id);
                  }}
                  bgColor={card.background}
                  textColor={card.color}
                  visible={areValueVisible}
                />

                <MyDialog
                  closeModal={handleCloseModalCreditCard}
                  isOpen={openModalCreditCard}
                  title="Deseja realmente excluir o cartão?"
                  description='Ao clicar em "Excluir" o cartão e todos os seus registros serão excluídos permanentemente e não poderão ser recuperados.'
                  buttonPrimary
                  buttonSecondary
                  textButtonSecondary="Excluir"
                  handleChangeButtonSecondary={() => {
                    deleteCreditCard(card.id, card.card_name);
                  }}
                />
              </>
            ))}
            <CreditCard
              creditNumber="***"
              cardName="******"
              create={true}
              onCreate={() => navigate('/credit-card')}
              closure={5}
              maturity={15}
            />
          </div>

          <div className="h-28" />

          <div className="flex min-h-screen w-full flex-col gap-4 p-4">
            <input
              type="text"
              placeholder="Pesquisar por alguma compra no cartão"
              className="h-14 w-full rounded-lg bg-white p-4 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundCardDark dark:text-titleDark dark:focus:ring-primaryDark"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Filter
              actualMonth={currentMonth}
              handleChangeFilterMonth={handleChangeFilterMonthCreditCard}
              handleOpenModalFilter={handleOpenModalFilter}
            />

            <ul className="flex flex-col gap-4">
              {finances.length === 0 && (
                <div className="mt-4 flex flex-col items-center justify-center">
                  <img src={emptyImg} alt="Empty" className="mb-2 w-28" />
                  <p className="text-center text-lg font-medium text-black dark:text-textDark">
                    Não encontramos nenhuma compra
                  </p>

                  <div className="mt-2 flex w-full flex-col items-center justify-end gap-4">
                    <button
                      type="submit"
                      className="h-14 w-full rounded-lg bg-secondary p-4 text-white dark:bg-secondaryDark"
                      onClick={() => {
                        navigate('/register');
                      }}
                    >
                      Adicionar Compra
                    </button>
                  </div>
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
                      duplicateTransaction(item.id);
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
                      deleteTransaction(idTransaction);
                    }}
                  />
                </>
              ))}
            </ul>
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
                '@uollet:selectedYear',
                selectedYear.toString(),
              );
              filterTransactionsCreditCardByYear(selectedYear, currentMonth);
            }}
          >
            <ModalFilter
              handleChangeYear={(step: number) => {
                setSelectedYear((prevState) => prevState + step);
              }}
              selectedYear={selectedYear}
            />
          </MyDialog>

          <MyDialog
            closeModal={handleCloseModalName}
            isOpen={openModalName}
            title="Seja bem-vindo(a)"
            description="Antes de começar, queria saber como podemos te chamar?"
            name
          />

          <BottomNavigator />
        </div>
      )}
    </>
  );
}
