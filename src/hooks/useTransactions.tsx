import { useState } from 'react';

import { useModal } from 'components/Modal/useModal';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { supabase } from 'services/supabase';

import { useResume } from './useResume';

export function useTransactions() {
  const { toast } = useToast();
  const { user } = useAuth();
  const { searchParams } = useResume();
  const { selectedYear } = useModal();

  const [finances, setFinances] = useState<any[]>([]);
  const [allTotal, setAllTotal] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalOutcome, setTotalOutcome] = useState(0);

  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openModalFilter, setOpenModalFilter] = useState(false);

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [lastDayOfTheMonth, setLastDayOfTheMonth] = useState(
    new Date(new Date().getFullYear(), currentMonth, 0).getDate(),
  );

  const [loading, setLoading] = useState(true);
  const typeParams = searchParams.get('type');
  const categoryParams = searchParams.get('category');

  function handleOpenModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleCloseModalFilter() {
    setOpenModalFilter(false);
  }

  function handleOpenModalFilter() {
    setOpenModalFilter(true);
  }

  function balanceMessage(allTotal: number): string {
    if (allTotal > 0) {
      return 'Saldo Positivo';
    } else if (allTotal < 0) {
      return 'Saldo Negativo';
    } else {
      return 'Saldo Neutro';
    }
  }

  async function getTransactionsValuesTotal() {
    try {
      const { data: dataTotal, error: errorTotal } = await supabase
        .from('finances_db')
        .select('*')
        .eq('user_id', user?.id)
        .not('category', 'ilike', '%Invest%')
        .not('category', 'ilike', '%Cartão%');

      if (errorTotal) {
        toast.error('Erro ao buscar valor total das transações', {
          id: 'error',
        });
        setLoading(false);
        return;
      }

      if (!dataTotal) return;

      const totalGeralIncomes = dataTotal
        .filter((item) => item.type === 'income')
        .reduce((acc, curr) => acc + curr.value, 0);

      const totalGeralOutcomes = dataTotal
        .filter((item) => item.type === 'outcome')
        .reduce((acc, curr) => acc + curr.value, 0);

      const allTotalTransactions = totalGeralIncomes - totalGeralOutcomes;

      setAllTotal(allTotalTransactions);
    } catch (error) {
      toast.error('Erro ao buscar valor total das transações', { id: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function getTransactionsValues(
    year: number,
    month: number,
    endOfDays: number,
  ) {
    try {
      const { data: dataIncomes, error: errorIncomes } = await supabase
        .from('finances_db')
        .select('value, created_at')
        .eq('user_id', user?.id)
        .eq('type', 'income')
        .gte('date', `${year}-${month}-01`)
        .lte('date', `${year}-${month}-${endOfDays}`)
        .not('category', 'ilike', '%Invest%')
        .not('category', 'ilike', '%Cartão%');

      const { data: dataOutcomes, error: errorOutcomes } = await supabase
        .from('finances_db')
        .select('value, created_at')
        .eq('user_id', user?.id)
        .eq('type', 'outcome')
        .gte('date', `${year}-${month}-01`)
        .lte('date', `${year}-${month}-${endOfDays}`)
        .not('category', 'ilike', '%Invest%')
        .not('category', 'ilike', '%Cartão%');

      if (errorIncomes || errorOutcomes) {
        toast.error('Erro ao buscar valores das transações', { id: 'error' });
        setLoading(false);
        return;
      }

      if (!dataIncomes) return;
      if (!dataOutcomes) return;

      const totalIncomes = dataIncomes.reduce(
        (acc, curr) => acc + curr.value,
        0,
      );

      const totalOutcomes = dataOutcomes.reduce(
        (acc, curr) => acc + curr.value,
        0,
      );

      setTotalIncome(totalIncomes);
      setTotalOutcome(totalOutcomes);

      setLoading(false);
    } catch (error) {
      toast.error('Erro ao buscar transações', { id: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function getAllTransactionsForTheCurrentMonth(year: number) {
    try {
      const { data, error } = await supabase
        .from('finances_db')
        .select('*')
        .eq('user_id', user?.id)
        .gte('date', `${year}-${currentMonth}-01`)
        .lte('date', `${year}-${currentMonth}-${lastDayOfTheMonth}`)
        .not('category', 'ilike', '%Invest%')
        .not('category', 'ilike', '%Cartão%');

      if (error) {
        toast.error('Erro ao buscar transações', { id: 'error' });
        setLoading(false);
        return;
      }

      if (!data) return;

      const newData = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

      setFinances(newData);
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao buscar transações', { id: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function getAllTransactionsForTheMonthAndYear(
    year: number,
    month: number,
    day: number,
  ) {
    try {
      const { data, error } = await supabase
        .from('finances_db')
        .select('*')
        .eq('user_id', user?.id)
        .gte('date', `${year}-${month}-01`)
        .lte('date', `${year}-${month}-${day}`)
        .not('category', 'ilike', '%Invest%')
        .not('category', 'ilike', '%Cartão%');

      if (error) {
        toast.error('Erro ao buscar transações', { id: 'error' });
        setLoading(false);
        return;
      }

      if (!data) return;

      const newData = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

      setFinances(newData);
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao buscar transações', { id: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function getTransactionsValuesTotalByCategory(category: string) {
    try {
      const { data: dataTotal, error: errorTotal } = await supabase
        .from('finances_db')
        .select('*')
        .eq('user_id', user?.id)
        .eq('category', category)
        .not('category', 'ilike', '%Cartão%');

      if (errorTotal) {
        toast.error('Erro ao buscar valor total das transações', {
          id: 'error',
        });
        setLoading(false);
        return;
      }

      if (!dataTotal) return;

      const totalGeralIncomes = dataTotal
        .filter((item) => item.type === 'income')
        .reduce((acc, curr) => acc + curr.value, 0);

      const totalGeralOutcomes = dataTotal
        .filter((item) => item.type === 'outcome')
        .reduce((acc, curr) => acc + curr.value, 0);

      const allTotalTransactions = totalGeralIncomes - totalGeralOutcomes;

      setAllTotal(allTotalTransactions);
    } catch (error) {
      toast.error('Erro ao buscar valor total das transações', { id: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function getAllTransactionsForTheCurrentMonthByCategory(
    category: string,
    type: string,
    year: number,
    month: number,
    day: number,
  ) {
    try {
      const { data, error } = await supabase
        .from('finances_db')
        .select('*')
        .eq('user_id', user?.id)
        .eq('category', category)
        .eq('type', type)
        .gte('date', `${year}-${month}-01`)
        .lte('date', `${year}-${month}-${day}`)
        .not('category', 'ilike', '%Cartão%');

      if (error) {
        toast.error('Erro ao buscar transações', { id: 'error' });
        setLoading(false);
        return;
      }

      if (!data) return;

      const newData = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

      const totalIncome = data
        .filter((item) => item.type === 'income')
        .reduce((acc, curr) => acc + curr.value, 0);

      const totalOutcome = data
        .filter((item) => item.type === 'outcome')
        .reduce((acc, curr) => acc + curr.value, 0);

      setFinances(newData);
      setTotalIncome(totalIncome);
      setTotalOutcome(totalOutcome);

      if (!data) return;

      setFinances(newData);
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao buscar transações', { id: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function duplicateTransaction(
    id: number,
    month: number,
    endOfDays: number,
  ) {
    const transaction = finances.find((transaction) => transaction.id === id);

    if (!transaction) return;

    const { title, value, category, type, date } = transaction;

    const newTransaction = {
      title: `${title} (cópia)`,
      value,
      category,
      type,
      date,
      user_id: user?.id,
    };

    try {
      const { error, status } = await supabase
        .from('finances_db')
        .insert(newTransaction);

      if (error) {
        toast.error('Erro ao duplicar transação!', { id: 'error' });
        return;
      }

      if (status === 201) {
        toast.success('Transação duplicada com sucesso!', { id: 'success' });
        setLoading(false);
      }

      if (search.length >= 2) {
        searchAllTransactions();
      }

      const year = Number(sessionStorage.getItem('@uollet:selectedYear'));

      getAllTransactionsForTheCurrentMonth(year);
      getTransactionsValues(currentYear, month, endOfDays);
      getTransactionsValuesTotal();
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao duplicar transação!', { id: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function deleteTransaction(
    id: number,
    month: number,
    endOfDays: number,
  ) {
    try {
      const { status, error } = await supabase
        .from('finances_db')
        .delete()
        .eq('id', id);

      if (error) {
        toast.error('Erro ao deletar transação!', { id: 'error' });
        setLoading(false);
        return;
      }

      if (status === 204) {
        handleCloseModal();
        toast.success('Transação deletada com sucesso!', { id: 'success' });
        setLoading(false);
      }

      if (search.length >= 2) {
        searchAllTransactions();
      }

      const year = Number(sessionStorage.getItem('@uollet:selectedYear'));

      getAllTransactionsForTheCurrentMonth(year);
      getTransactionsValues(currentYear, month, endOfDays);
      getTransactionsValuesTotal();
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao deletar transação!', { id: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function searchAllTransactions() {
    try {
      const { data, error } = await supabase
        .from('finances_db')
        .select('*')
        .eq('user_id', user?.id)
        .ilike('title', `%${search}%`)
        .order('created_at', { ascending: false })
        .not('category', 'ilike', '%Invest%')
        .not('category', 'ilike', '%Cartão%');

      if (error) {
        toast.error('Erro ao buscar transações', { id: 'error' });
        setLoading(false);
        return;
      }

      if (!data) return;

      setFinances(data);
    } catch (error) {
      toast.error('Erro ao pesquisar transações', { id: 'error' });
    }
  }

  async function filterTransactionsByYear(year: number, month: number) {
    try {
      const { data, error } = await supabase
        .from('finances_db')
        .select('*')
        .eq('user_id', user?.id)
        .gte('date', `${year}-${month}-01`)
        .lte('date', `${year}-${month}-${lastDayOfTheMonth}`)
        .not('category', 'ilike', '%Invest%')
        .not('category', 'ilike', '%Cartão%');

      if (error) {
        toast.error('Erro ao buscar transações', { id: 'error' });
        setLoading(false);
        return;
      }

      if (!data) return;

      const newData = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

      setFinances(newData);
      handleCloseModalFilter();
      getTransactionsValues(year, month, lastDayOfTheMonth);
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao buscar transações', { id: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function handleChangeFilterMonth(month: number) {
    const year = Number(sessionStorage.getItem('@uollet:selectedYear'));
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    setLastDayOfTheMonth(lastDayOfMonth);

    if (typeParams && categoryParams) {
      getAllTransactionsForTheCurrentMonthByCategory(
        categoryParams,
        typeParams,
        year,
        month,
        lastDayOfMonth,
      );

      getTransactionsValuesTotalByCategory(categoryParams);
      return;
    }

    if (selectedYear) {
      setCurrentYear(year);
      setCurrentMonth(month);

      getTransactionsValues(year, month, lastDayOfMonth);
      getAllTransactionsForTheMonthAndYear(year, month, lastDayOfMonth);
    } else {
      setCurrentMonth(month);
      const lastDayOfMonth = new Date(selectedYear, month, 0).getDate();
      setLastDayOfTheMonth(lastDayOfMonth);

      getTransactionsValues(selectedYear, month, lastDayOfMonth);
      getAllTransactionsForTheMonthAndYear(selectedYear, month, lastDayOfMonth);
    }
  }

  return {
    finances,
    loading,
    setLoading,
    totalIncome,
    totalOutcome,
    handleCloseModal,
    openModal,
    openModalFilter,
    handleOpenModal,
    allTotal,
    search,
    setSearch,
    balanceMessage,
    handleCloseModalFilter,
    handleOpenModalFilter,
    duplicateTransaction,
    deleteTransaction,
    filterTransactionsByYear,
    handleChangeFilterMonth,
    searchAllTransactions,
    currentMonth,
    lastDayOfTheMonth,
    getTransactionsValuesTotal,
    getAllTransactionsForTheCurrentMonthByCategory,
  };
}
