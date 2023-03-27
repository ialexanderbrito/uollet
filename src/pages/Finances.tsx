import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Eye, EyeSlash } from '@phosphor-icons/react';
import defaultAvatar from 'assets/default_user_avatar.png';
import incomeIcon from 'assets/income.svg';
import outcomeIcon from 'assets/outcome.svg';
import totalIcon from 'assets/total.svg';

import { BottomNavigator } from 'components/BottomNavigator';
import { Card } from 'components/Card';
import { CardList } from 'components/CardList';
import { Filter } from 'components/Filter';
import { Loading } from 'components/Loading';
import { Menu } from 'components/Menu';
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
  const { user } = useAuth();
  const { theme } = useTheme();

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
    setSearch,
  } = useTransactions();

  const [idTransaction, setIdTransaction] = useState(0);
  const [visible, setVisible] = useState(false);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex w-full flex-col items-center justify-center bg-background dark:bg-backgroundDark">
          <div className="flex h-52 w-full flex-row bg-primary dark:bg-primaryDark">
            <div className=" mt-4 flex w-full items-start justify-between ">
              <div className="flex w-full items-center justify-between gap-4">
                <div className="flex items-center justify-between gap-4 ">
                  <img
                    src={user?.user_metadata.avatar_url || defaultAvatar}
                    alt={user?.user_metadata.full_name}
                    className="ml-4 h-12 w-12 rounded-lg"
                  />
                  <p className="text-sm font-medium text-white">
                    Olá, <br />
                    <b>{user?.user_metadata.name}</b>
                  </p>
                </div>
                <div className="mr-4 flex items-center justify-between gap-4">
                  {visible ? (
                    <Eye
                      size={30}
                      weight="light"
                      onClick={() => setVisible(false)}
                      className="cursor-pointer text-secondary"
                    />
                  ) : (
                    <EyeSlash
                      size={30}
                      weight="light"
                      onClick={() => setVisible(true)}
                      className="cursor-pointer text-secondary"
                    />
                  )}
                  <Menu />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-20 flex w-full min-w-full snap-x gap-4 overflow-x-scroll p-4 scrollbar-hide md:justify-center">
            <Card
              title="Entradas"
              icon={incomeIcon}
              value={visible ? formatCurrency(totalIncome) : '*****'}
              lastEntry={`De 01/${actualMonth}/${actualYear} até ${endOfDays}/${actualMonth}/${actualYear}`}
              bgColor={
                theme === 'light' ? 'backgroundCard' : 'backgroundCardDark'
              }
              textColor={theme === 'light' ? 'title' : 'textDark'}
            />

            <Card
              title="Saidas"
              icon={outcomeIcon}
              value={visible ? formatCurrency(totalOutcome) : '*****'}
              lastEntry={`De 01/${actualMonth}/${actualYear} até ${endOfDays}/${actualMonth}/${actualYear}`}
              bgColor={
                theme === 'light' ? 'backgroundCard' : 'backgroundCardDark'
              }
              textColor={theme === 'light' ? 'title' : 'textDark'}
            />

            <Card
              title="Total"
              icon={totalIcon}
              value={visible ? formatCurrency(allTotal) : '*****'}
              lastEntry={allTotal > 0 ? 'Saldo Positivo' : 'Saldo Negativo'}
              bgColor={theme === 'light' ? 'secondary' : 'secondaryDark'}
              textColor={theme === 'light' ? 'white' : 'white'}
              alternativeTextColor={theme === 'light' ? 'title' : 'textDark'}
            />
          </div>

          <div className="h-20" />

          <div className="flex min-h-screen w-full flex-col gap-4 p-4">
            <input
              type="text"
              placeholder="Pesquisar por alguma transação"
              className="h-14 w-full rounded-lg bg-white p-4 text-title outline-none dark:bg-backgroundCardDark dark:text-titleDark"
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex items-center justify-between text-lg font-normal text-black dark:text-textDark">
              <span>Listagem</span>

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
                    Nenhuma transação encontrada
                  </p>
                </div>
              )}
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
                      onEdit={() => {
                        navigate(`/edit/${item.id}`);
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
