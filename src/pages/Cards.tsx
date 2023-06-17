import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CreditCardProps } from 'interfaces/CreditCardProps';
import { FinancesProps } from 'interfaces/FinancesProps';

import { BottomNavigator } from 'components/BottomNavigator';
import { CardList } from 'components/CardList';
import { CreditCard } from 'components/CreditCard';
import { Filter } from 'components/Filter';
import { Header } from 'components/Header';
import { Loading } from 'components/Loading';
import { MyDialog } from 'components/Modal';

import { formatCurrency } from 'utils/formatCurrency';

import { useAuth } from 'contexts/Auth';

import { useCards } from 'hooks/useCards';
import { useCrypto } from 'hooks/useCrypto';

export function Cards() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { decryptNumberCreditCard } = useCrypto();

  const {
    finances,
    loading,
    newMonthLong,
    actualYear,
    handlePreviousMonth,
    handleNextMonth,
    setSearch,
    limitCreditCard,
    duplicateTransaction,
    deleteTransaction,
    openModal,
    handleOpenModal,
    handleCloseModal,
    deleteCreditCard,
    creditCards,
    handleOpenModalCreditCard,
    handleCloseModalCreditCard,
    openModalCreditCard,
  } = useCards();

  const [idTransaction, setIdTransaction] = useState(0);
  const [visible, setVisible] = useState(false);
  const [openModalName, setOpenModalName] = useState(false);

  function handleCloseModalName() {
    setOpenModalName(false);
  }

  function handleOpenModalName() {
    setOpenModalName(true);
  }

  useEffect(() => {
    if (!user) return;

    if (!user.user_metadata.name || !user.user_metadata.full_name) {
      handleOpenModalName();
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex w-full flex-col items-center justify-center bg-background dark:bg-backgroundDark">
          <Header
            user={user}
            primary={true}
            visible={visible}
            setVisible={() => setVisible(!visible)}
          />

          <div className="absolute top-20 flex w-full min-w-full snap-x gap-4 overflow-x-scroll p-4 scrollbar-hide md:justify-center">
            {creditCards.map((card: CreditCardProps) => (
              <>
                <CreditCard
                  key={card.id}
                  creditNumber={decryptNumberCreditCard(card.card_number)}
                  cardName={card.card_name}
                  limit={
                    visible
                      ? formatCurrency(
                          card.limit - limitCreditCard(card.card_name),
                        )
                      : '*****'
                  }
                  maturity={card.maturity}
                  closure={card.closure}
                  isDeletable={true}
                  onDelete={() => {
                    handleOpenModalCreditCard();
                    setIdTransaction(card.id);
                  }}
                  bgColor={card.background}
                  textColor={card.color}
                />

                <MyDialog
                  closeModal={handleCloseModalCreditCard}
                  isOpen={openModalCreditCard}
                  title="Deseja realmente excluir o cartão?"
                  description='Ao clicar em "Excluir" o cartão e todos os seus registros serão excluídos permanentemente e não poderão ser recuperados.'
                  deleteTransaction={() => {
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
              className="h-14 w-full rounded-lg bg-white p-4 text-title outline-none dark:bg-backgroundCardDark dark:text-titleDark"
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex items-center justify-between text-lg font-normal text-black dark:text-textDark">
              <span>Compras</span>

              <div className="flex w-56 flex-col gap-4">
                <Filter
                  newMonthLong={newMonthLong}
                  actualYear={actualYear}
                  handlePreviousMonth={handlePreviousMonth}
                  handleNextMonth={handleNextMonth}
                  textSize="text-xs"
                />
              </div>
            </div>
            <ul className="flex flex-col gap-4">
              {finances.length === 0 && (
                <div className="flex flex-col items-center justify-center">
                  <p className="text-lg font-medium text-black dark:text-textDark">
                    Nenhuma compra cadastrada
                  </p>
                </div>
              )}
              {finances.map((item: FinancesProps) => (
                <>
                  {item === finances[finances.length - 1] ? (
                    <CardList
                      key={item.id}
                      title={item.title}
                      value={item.value}
                      category={item.category}
                      date={item.date}
                      className="mb-10"
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
                  ) : (
                    <CardList
                      key={item.id}
                      title={item.title}
                      value={item.value}
                      category={item.category}
                      date={item.date}
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
                  )}

                  <MyDialog
                    closeModal={handleCloseModal}
                    isOpen={openModal}
                    title="Deseja realmente excluir registro?"
                    description='Ao clicar em "Excluir" o registro será excluído permanentemente e não poderá ser recuperado. '
                    deleteTransaction={() => {
                      deleteTransaction(idTransaction);
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

          <BottomNavigator />
        </div>
      )}
    </>
  );
}
