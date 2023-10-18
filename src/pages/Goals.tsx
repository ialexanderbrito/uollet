import { useNavigate } from 'react-router-dom';

import emptyImg from 'assets/empty.svg';

import { Alert } from 'components/Alert';
import { BottomNavigator } from 'components/BottomNavigator';
import { Header } from 'components/Header';
import { Loading } from 'components/Loading';
import { MetaList } from 'components/MetaList';
import { MyDialog } from 'components/Modal';

import { useAuth } from 'contexts/Auth';

import { useGoals } from 'hooks/useGoals';

export function Goals() {
  const navigate = useNavigate();
  const { user, areValueVisible, toggleValueVisibility } = useAuth();
  const {
    loading,
    goals,
    handleCloseModal,
    openModal,
    deleteGoal,
    handleOpenModal,
  } = useGoals();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex  w-full flex-col items-center justify-center bg-background dark:bg-backgroundDark">
          <Header
            user={user}
            variant="secondary"
            visible={areValueVisible}
            setVisible={toggleValueVisibility}
          />

          <div className="flex min-h-screen w-full flex-col items-center justify-start gap-3 p-4">
            <Alert
              title="Metas!"
              description="Aqui você pode cadastrar suas metas e acompanhar o progresso de cada uma delas."
              variant="info"
              alertName="goals"
            />
            {goals.length === 0 ? (
              <div className="mt-4 flex flex-col items-center justify-center">
                <img src={emptyImg} alt="Empty" className="mb-2 w-28" />
                <p className="text-center text-lg font-medium text-black dark:text-textDark">
                  Não encontramos nenhuma meta cadastrada
                </p>
              </div>
            ) : (
              <>
                {goals
                  .sort((a, b) => {
                    if (a.created_at < b.created_at) return 1;
                    if (a.created_at > b.created_at) return -1;
                    return 0;
                  })
                  .map((item) => (
                    <>
                      <MetaList
                        meta={item}
                        onDelete={() => {
                          handleOpenModal();
                        }}
                      />

                      <MyDialog
                        closeModal={handleCloseModal}
                        isOpen={openModal}
                        title="Deseja realmente excluir essa meta?"
                        description='Ao clicar em "Excluir" a meta e todo o seu histórico serão excluídos permanentemente.'
                        buttonPrimary
                        buttonSecondary
                        textButtonSecondary="Excluir"
                        handleChangeButtonSecondary={() => {
                          deleteGoal(item.id, item.title);
                        }}
                      />
                    </>
                  ))}
              </>
            )}
            <div className="flex w-full flex-col items-center justify-end gap-4">
              <button
                type="submit"
                className="mb-14 h-14 w-full rounded-lg bg-secondary p-4 text-white dark:bg-secondaryDark"
                onClick={() => {
                  navigate('/register/goals');
                }}
              >
                Adicionar Meta
              </button>
            </div>
          </div>

          <BottomNavigator />
        </div>
      )}
    </>
  );
}
