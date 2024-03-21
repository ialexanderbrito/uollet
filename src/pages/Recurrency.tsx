import { useEffect, useState } from 'react';

import emptyImg from 'assets/empty.svg';

import { Alert } from 'components/Alert';
import { BottomNavigator } from 'components/BottomNavigator';
import { CardList } from 'components/CardList';
import { Header } from 'components/Header';
import { Loading } from 'components/Loading';
import { MyDialog } from 'components/Modal';

import { useAuth } from 'contexts/Auth';

import { useRecurrency } from 'hooks/useRecurrency';

export function Recurrency() {
  const { user, areValueVisible, toggleValueVisibility } = useAuth();
  const {
    getRecurrencyList,
    loading,
    recurrencyList,
    recurrencyName,
    handleOpenModal,
    handleCloseModal,
    openModal,
    deleteRecurrency,
  } = useRecurrency();

  const [idTransaction, setIdTransaction] = useState(0);

  useEffect(() => {
    getRecurrencyList();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center bg-background dark:bg-background-dark">
      <Header
        user={user}
        variant="secondary"
        visible={areValueVisible}
        setVisible={toggleValueVisibility}
      />

      <div className="flex min-h-screen w-full flex-col items-center justify-start gap-3 p-4">
        <Alert
          title="Atenção"
          description="Ao apagar uma recorrência, ela não será mais adicionada a lista de transações futuras."
          variant="warning"
          alertName="recurrency-warning"
          disabledOnClick
        />

        {recurrencyList.length === 0 ? (
          <div className="mt-4 flex flex-col items-center justify-center">
            <img src={emptyImg} alt="Empty" className="mb-2 w-28" />
            <p className="text-center text-lg font-medium text-black dark:text-text-dark">
              Não encontramos nenhuma meta cadastrada
            </p>
          </div>
        ) : (
          <>
            {recurrencyList.map((item, index) => (
              <>
                <CardList
                  key={item.id}
                  title={`${item.title} - ${recurrencyName(item.recurrency)}`}
                  value={item.value}
                  category={item.category}
                  date={item.date}
                  className={index === recurrencyList.length - 1 ? 'mb-10' : ''}
                  income={item.type === 'income'}
                  onClick={() => {
                    setIdTransaction(item.id);
                    handleOpenModal();
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
                    deleteRecurrency(idTransaction);
                  }}
                />
              </>
            ))}
          </>
        )}
      </div>

      <BottomNavigator />
    </div>
  );
}
