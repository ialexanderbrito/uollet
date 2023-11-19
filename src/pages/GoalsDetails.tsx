import { CSSProperties, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import emptyImg from 'assets/empty.svg';

import { BottomNavigator } from 'components/BottomNavigator';
import { CardList } from 'components/CardList';
import { Header } from 'components/Header';
import { Loading } from 'components/Loading';
import { MyDialog } from 'components/Modal';

import { useAuth } from 'contexts/Auth';

import { useGoals } from 'hooks/useGoals';

export function GoalsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { areValueVisible, toggleValueVisibility } = useAuth();
  const {
    loading,
    detailsGoals,
    goals,
    deleteGoalTransaction,
    handleCloseModal,
    handleOpenModal,
    openModal,
  } = useGoals();

  const title = goalsDetailsId()?.title;
  const dataFinal = goalsDetailsId()?.date_final;

  function separeteGoalsByCategory(category: string) {
    const goalsByCategory = detailsGoals.filter(
      (goal) => goal.category === category,
    );

    return goalsByCategory;
  }

  function goalsDetailsId() {
    if (!goals) return;

    const goal = goals.find((goal) => goal.title === id);

    return goal;
  }

  function emojiPattern(emoji?: string) {
    const patternStyle: CSSProperties = {
      backgroundImage: `url('https://emojicdn.elk.sh/${emoji}')`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    };

    return (
      <div
        className="flex h-10 w-10 items-center justify-center"
        style={patternStyle}
      ></div>
    );
  }

  function calculatePorcentageGoal() {
    const values = goalsDetailsId()?.value;

    if (!values) return;

    const totalValue = separeteGoalsByCategory(`Meta ${id}`).reduce(
      (acc, goal) => acc + goal.value,
      0,
    );

    const porcentagem = (totalValue / values) * 100;

    if (porcentagem > 100) return 100;

    return porcentagem;
  }

  function dateFinalExpired() {
    const date = new Date(dataFinal || '');

    const today = new Date();

    if (date < today) return true;

    return false;
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex w-full flex-col items-center justify-center bg-background dark:bg-backgroundDark">
          <Header
            title={`Histórico de metas ${id}`}
            variant="secondary"
            visible={areValueVisible}
            setVisible={toggleValueVisibility}
          />

          <div className="flex w-full flex-col items-start justify-center gap-3 p-4">
            <h1 className="flex flex-row items-center justify-center gap-2 text-2xl text-title dark:text-titleDark">
              Meta {title} {emojiPattern(goalsDetailsId()?.emoji)}
            </h1>
            <span className="flex flex-row items-center justify-center text-4xl font-bold text-title dark:text-titleDark">
              {separeteGoalsByCategory(`Meta ${id}`)
                .reduce((acc, goal) => acc + goal.value, 0)
                .toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
            </span>
            <p className="flex flex-row items-center justify-center gap-2 text-lg text-title dark:text-titleDark">
              de{' '}
              {goalsDetailsId()?.value.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>

            <div className="h-2 w-full rounded bg-gray-200 dark:bg-backgroundCardDark">
              <div
                className="h-2 rounded bg-secondary dark:bg-secondaryDark"
                style={{
                  width: `${calculatePorcentageGoal()}%`,
                }}
              ></div>
            </div>

            {dateFinalExpired() && calculatePorcentageGoal() !== 100 && (
              <div className="flex flex-row items-center justify-center gap-2 text-xl font-bold text-title">
                <span className="flex flex-row items-center justify-center gap-2 text-danger dark:text-danger">
                  {emojiPattern('🤦‍♂️')}
                  Meta não atingida
                </span>
              </div>
            )}

            {calculatePorcentageGoal() !== 100 && dateFinalExpired() && (
              <button
                type="submit"
                className="h-14 w-full rounded-lg bg-secondary p-4 text-white disabled:cursor-not-allowed disabled:opacity-40 dark:bg-secondaryDark"
                onClick={() => {
                  navigate(`/edit/goals/${goalsDetailsId()?.id}`);
                  sessionStorage.setItem('@uollet:goal', `Meta ${id}`);
                }}
              >
                Editar meta
              </button>
            )}

            {calculatePorcentageGoal() === 100 && !dateFinalExpired() ? (
              <div className="flex flex-row items-center justify-center gap-2 text-xl font-bold text-title">
                <span className="flex flex-row items-center justify-center gap-2 text-green-500 dark:text-green-400">
                  {emojiPattern('🎉')} Meta concluída!
                </span>
              </div>
            ) : (
              <>
                <button
                  type="submit"
                  className="h-14 w-full rounded-lg bg-secondary p-4 text-white disabled:cursor-not-allowed disabled:opacity-40 dark:bg-secondaryDark"
                  onClick={() => {
                    navigate('/register');
                    sessionStorage.setItem('@uollet:goal', `Meta ${id}`);
                  }}
                  disabled={dateFinalExpired()}
                >
                  Adicionar novo valor
                </button>
              </>
            )}
          </div>

          <div className="flex min-h-screen w-full flex-col items-center justify-start gap-3 p-4">
            {separeteGoalsByCategory(`Meta ${id}`).length === 0 ? (
              <div className="mt-4 flex flex-col items-center justify-center">
                <img src={emptyImg} alt="Empty" className="mb-2 w-28" />
                <p className="text-center text-lg font-medium text-black dark:text-textDark">
                  Não encontramos seu histórico de metas
                </p>
              </div>
            ) : (
              <>
                <div className="flex w-full items-center justify-between">
                  <h1 className="text-2xl font-bold text-title dark:text-titleDark">
                    Histórico
                  </h1>
                </div>

                {detailsGoals
                  .filter((goal) => goal.category === `Meta ${id}`)
                  .map((goal, index) => (
                    <Fragment key={goal.id}>
                      <CardList
                        category={goal.category}
                        date={goal.date}
                        title={`${goal.title} | ${index + 1}`}
                        value={goal.value}
                        income={goal.type === 'income'}
                        visible={false}
                        onEdit={() => {
                          navigate(`/edit/${goal.id}`);
                        }}
                        onClick={() => {
                          handleOpenModal();
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
                          deleteGoalTransaction(goal.id);
                        }}
                      />
                    </Fragment>
                  ))}
              </>
            )}
          </div>

          <BottomNavigator />
        </div>
      )}
    </>
  );
}