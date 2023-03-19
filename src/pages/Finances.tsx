import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FileCsv, Moon, Sun } from '@phosphor-icons/react';
import defaultAvatar from 'assets/default_user_avatar.png';
import incomeIcon from 'assets/income.svg';
import outcomeIcon from 'assets/outcome.svg';
import powerIcon from 'assets/power.svg';
import totalIcon from 'assets/total.svg';

import { BottomNavigator } from 'components/BottomNavigator';
import { Card } from 'components/Card';
import { CardList } from 'components/CardList';
import { Filter } from 'components/Filter';
import { Loading } from 'components/Loading';
import { MyDialog } from 'components/Modal';

import { formatCurrency } from 'utils/formatCurrency';

import { useAuth } from 'contexts/Auth';
import { useTheme } from 'contexts/Theme';

import { useTransactions } from 'hooks/useTransactions';

export interface FinancesProps {
  id: number;
  created_at: Date;
  title: string;
  value: number;
  category: string;
  user_id: string;
  type: string;
  date: string;
}

export function Finances() {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const { toggleTheme, theme } = useTheme();
  const {
    finances,
    loading,
    totalIncome,
    allTotal,
    totalOutcome,
    handleCloseModal,
    openModal,
    handleOpenModal,
    deleteTransaction,
    newMonthLong,
    actualYear,
    handlePreviousMonth,
    handleNextMonth,
    actualMonth,
    endOfDays,
  } = useTransactions();

  const [idTransaction, setIdTransaction] = useState(0);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex w-full flex-col items-center justify-center bg-background dark:bg-backgroundDark">
          <div className="bg-primary flex w-full h-52 flex-row dark:bg-primaryDark">
            <div className="flex mt-4 w-full items-start justify-between ">
              <div className="flex items-center justify-between gap-4 w-full">
                <div className="flex items-center justify-between gap-4 ">
                  <img
                    src={user?.user_metadata.avatar_url || defaultAvatar}
                    alt={user?.user_metadata.full_name}
                    className="w-12 h-12 rounded-lg ml-4"
                  />
                  <p className="text-white font-medium text-sm">
                    Olá, <br />
                    <b>{user?.user_metadata.name}</b>
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 mr-4">
                  {theme === 'light' ? (
                    <Moon
                      size={30}
                      weight="light"
                      onClick={() => {
                        toggleTheme();
                      }}
                      className="cursor-pointer  text-secondary"
                    />
                  ) : (
                    <Sun
                      size={30}
                      weight="light"
                      onClick={() => {
                        toggleTheme();
                      }}
                      className="cursor-pointer  text-secondary"
                    />
                  )}
                  <FileCsv
                    size={30}
                    weight="light"
                    className="cursor-pointer  text-secondary"
                    onClick={() => {
                      navigate('/import');
                    }}
                  />
                  <img
                    src={powerIcon}
                    alt="Deslogar"
                    className="cursor-pointer "
                    onClick={() => {
                      logOut();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 absolute top-20 w-full min-w-full overflow-x-scroll snap-x scrollbar-hide p-4 md:justify-center">
            <Card
              title="Entradas"
              icon={incomeIcon}
              value={formatCurrency(totalIncome)}
              lastEntry={`De 01/${actualMonth}/${actualYear} até ${endOfDays}/${actualMonth}/${actualYear}`}
              bgColor={
                theme === 'light' ? 'backgroundCard' : 'backgroundCardDark'
              }
              textColor={theme === 'light' ? 'title' : 'textDark'}
            />

            <Card
              title="Saidas"
              icon={outcomeIcon}
              value={formatCurrency(totalOutcome)}
              lastEntry={`De 01/${actualMonth}/${actualYear} até ${endOfDays}/${actualMonth}/${actualYear}`}
              bgColor={
                theme === 'light' ? 'backgroundCard' : 'backgroundCardDark'
              }
              textColor={theme === 'light' ? 'title' : 'textDark'}
            />

            <Card
              title="Total"
              icon={totalIcon}
              value={formatCurrency(allTotal)}
              lastEntry={allTotal > 0 ? 'Saldo Positivo' : 'Saldo Negativo'}
              bgColor={theme === 'light' ? 'secondary' : 'secondaryDark'}
              textColor={theme === 'light' ? 'white' : 'white'}
              alternativeTextColor={theme === 'light' ? 'title' : 'textDark'}
            />
          </div>

          <div className="h-20" />

          <div className="flex w-full flex-col gap-4 p-4 min-h-screen">
            <div className="text-black font-normal text-lg flex justify-between items-center dark:text-textDark">
              <span>Listagem</span>

              <div className="flex flex-col gap-4 w-56">
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
              {finances.map((item) => (
                <>
                  {item === finances[finances.length - 1] ? (
                    <CardList
                      key={item.id}
                      title={item.title}
                      value={item.value}
                      category={item.category}
                      date={item.date}
                      className="mb-20"
                      income={item.type === 'income'}
                      onClick={() => {
                        setIdTransaction(item.id);
                        handleOpenModal();
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

          <BottomNavigator />
        </div>
      )}
    </>
  );
}
