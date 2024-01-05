import { useNavigate } from 'react-router-dom';

import emptyImg from 'assets/empty.svg';

import { Alert } from 'components/Alert';
import { BottomNavigator } from 'components/BottomNavigator';
import { Button } from 'components/Button';
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex  w-full flex-col items-center justify-center bg-background dark:bg-background-dark">
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

        <Alert
          title="Atenção"
          description="Os valores das metas não são adicionados ao saldo total da carteira."
          variant="warning"
          alertName="goals-warning"
          disabledOnClick
        />

        {goals.length === 0 ? (
          <div className="mt-4 flex flex-col items-center justify-center">
            <img src={emptyImg} alt="Empty" className="mb-2 w-28" />
            <p className="text-center text-lg font-medium text-black dark:text-text-dark">
              Não encontramos nenhuma meta cadastrada
            </p>
          </div>
        ) : (
          <>
            {goals.map((item) => (
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
          <Button
            type="submit"
            onClick={() => {
              navigate('/register/goals');
            }}
          >
            Adicionar Meta
          </Button>
        </div>
      </div>

      <BottomNavigator />
    </div>
  );
}
