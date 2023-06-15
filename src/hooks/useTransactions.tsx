import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

import { formatDate } from 'utils/formatDate';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { supabase } from 'services/supabase';

export function useTransactions() {
  const { id } = useParams();
  const { toast } = useToast();
  const { user } = useAuth();

  const [finances, setFinances] = useState<any[]>([]);
  const [allTotal, setAllTotal] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [lastDateIncome, setLastDateIncome] = useState('');
  const [totalOutcome, setTotalOutcome] = useState(0);
  const [lastDateOutcome, setLastDateOutcome] = useState('');
  const [actualMonth, setActualMonth] = useState(new Date().getMonth() + 1);
  const [actualYear, setActualYear] = useState(new Date().getFullYear());
  const endOfDays = new Date(actualYear, actualMonth, 0).getDate();
  const newMonthLong = format(new Date(actualYear, actualMonth - 1), 'MMM', {
    locale: pt,
  });
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const [loading, setLoading] = useState(true);

  function handleOpenModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handlePreviousMonth() {
    if (actualMonth === 1) {
      setActualMonth(12);

      setActualYear(actualYear - 1);
    } else {
      setActualMonth(actualMonth - 1);
    }
  }

  function handleNextMonth() {
    if (actualMonth === 12) {
      setActualMonth(1);

      setActualYear(actualYear + 1);
    } else {
      setActualMonth(actualMonth + 1);
    }
  }

  function totalMessage() {
    if (allTotal > 0) {
      return 'Saldo Positivo';
    }
    if (allTotal < 0) {
      return 'Saldo Negativo';
    }
    return 'Saldo Neutro';
  }

  async function getAllTransactions() {
    try {
      const { data, error } = await supabase
        .from('finances_db')
        .select('*')
        .eq('user_id', user?.id)
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

      const allTotalTransactions = totalIncome - totalOutcome;

      setFinances(newData);
      setAllTotal(allTotalTransactions);
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao buscar transações', { id: 'error' });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function getTotal() {
    try {
      const { data, error } = await supabase
        .from('finances_db')
        .select('*')
        .eq('user_id', user?.id);

      if (error) {
        toast.error('Erro ao buscar transações', { id: 'error' });
        setLoading(false);
        return;
      }
      if (!data) return;

      const totalIncome = data
        .filter((item) => item.type === 'income')
        .reduce((acc, curr) => acc + curr.value, 0);

      const totalOutcome = data
        .filter((item) => item.type === 'outcome')
        .reduce((acc, curr) => acc + curr.value, 0);

      const allTotalTransactions = totalIncome - totalOutcome;

      setAllTotal(allTotalTransactions);
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao buscar transações', { id: 'error' });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function getIncomesAndTotalIncomes() {
    try {
      const { data, error } = await supabase
        .from('finances_db')
        .select('value, created_at')
        .eq('user_id', user?.id)
        .eq('type', 'income')
        .gte('date', `${actualYear}-${actualMonth}-01`)
        .lte('date', `${actualYear}-${actualMonth}-${endOfDays}`);

      if (error) {
        toast.error('Erro ao buscar transações', { id: 'error' });
        setLoading(false);
        return;
      }

      if (!data) return;

      const total = data.reduce((acc, curr) => acc + curr.value, 0);

      const lastDate = data.reduce(
        (acc, curr) => (acc > curr.created_at ? acc : curr.created_at),
        0,
      );

      const formattedDate = formatDate(new Date(lastDate));

      setLastDateIncome(formattedDate);
      setTotalIncome(total);
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao buscar transações', { id: 'error' });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function getOutcomesAndTotalOutcomes() {
    try {
      const { data, error } = await supabase
        .from('finances_db')
        .select('value, created_at, date, category')
        .eq('user_id', user?.id)
        .eq('type', 'outcome')
        .gte('date', `${actualYear}-${actualMonth}-01`)
        .lte('date', `${actualYear}-${actualMonth}-${endOfDays}`);

      if (error) {
        toast.error('Erro ao buscar transações', { id: 'error' });
        setLoading(false);
        return;
      }

      if (!data) return;

      const newData = data.filter(
        (item) => item.category !== 'NuInvest' && item.category !== 'Inter',
      );

      const total = newData.reduce((acc, curr) => acc + curr.value, 0);

      const lastDate = newData.reduce(
        (acc, curr) => (acc > curr.created_at ? acc : curr.created_at),
        0,
      );

      const formattedDate = formatDate(new Date(lastDate));

      setLastDateOutcome(formattedDate);
      setTotalOutcome(total);
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao buscar transações', { id: 'error' });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTransaction(id: number) {
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

      getAllTransactions();

      getIncomesAndTotalIncomes();
      getOutcomesAndTotalOutcomes();

      setLoading(false);
    } catch (error) {
      toast.error('Erro ao deletar transação!', { id: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function duplicateTransaction(id: number) {
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

      getAllTransactions();

      getIncomesAndTotalIncomes();
      getOutcomesAndTotalOutcomes();

      setLoading(false);
    } catch (error) {
      toast.error('Erro ao duplicar transação!', { id: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function getAllTransactionsPerMonth() {
    try {
      const { data, error } = await supabase
        .from('finances_db')
        .select('*')
        .eq('user_id', user?.id)
        .gte('date', `${actualYear}-${actualMonth}-01`)
        .lte('date', `${actualYear}-${actualMonth}-${endOfDays}`)
        .not('category', 'ilike', '%Cartão%');

      if (error) {
        toast.error('Erro ao buscar transações', { id: 'error' });
        setLoading(false);
        return;
      }

      const newData = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

      if (!data) return;

      setFinances(newData);
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao buscar transações', { id: 'error' });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function getTransactionsByCategory(category: string, type: string) {
    try {
      const { data, error } = await supabase
        .from('finances_db')
        .select('*')
        .eq('user_id', user?.id)
        .eq('category', category)
        .eq('type', type)
        .gte('date', `${actualYear}-${actualMonth}-01`)
        .lte('date', `${actualYear}-${actualMonth}-${endOfDays}`)
        .not('category', 'ilike', '%Cartão%');

      if (error) {
        toast.error('Erro ao buscar transações', { id: 'error' });
        setLoading(false);
        return;
      }

      const newData = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

      const totalIncome = data
        .filter((item) => item.type === 'income')
        .reduce((acc, curr) => acc + curr.value, 0);

      const totalOutcome = data
        .filter((item) => item.type === 'outcome')
        .reduce((acc, curr) => acc + curr.value, 0);

      const allTotalTransactions = totalIncome - totalOutcome;

      if (!data) return;

      setFinances(newData);
      setAllTotal(allTotalTransactions);
      setTotalIncome(totalIncome);
      setTotalOutcome(totalOutcome);

      if (!data) return;

      setFinances(newData);
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao buscar transações', { id: 'error' });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function searchTransaction(category?: string) {
    if (category) {
      try {
        const { data, error } = await supabase
          .from('finances_db')
          .select('*')
          .eq('user_id', user?.id)
          .eq('category', category)
          .ilike('title', `%${search}%`)
          .order('created_at', { ascending: false })
          .not('category', 'ilike', '%Cartão%');

        if (error) {
          toast.error('Erro ao buscar transações', { id: 'error' });
          setLoading(false);
          return;
        }

        if (!data) return;

        setFinances(data);
      } catch (error) {
        toast.error('Erro ao buscar transações', { id: 'error' });
      }
    } else {
      try {
        const { data, error } = await supabase
          .from('finances_db')
          .select('*')
          .eq('user_id', user?.id)
          .ilike('title', `%${search}%`)
          .order('created_at', { ascending: false })
          .not('category', 'ilike', '%Cartão%');

        if (error) {
          toast.error('Erro ao buscar transações', { id: 'error' });
          setLoading(false);
          return;
        }

        if (!data) return;

        setFinances(data);
      } catch (error) {
        toast.error('Erro ao buscar transações', { id: 'error' });
      }
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      const category = id.split('&')[0];
      const type = id.split('&')[1].split('=')[1];

      getTransactionsByCategory(category, type);
    } else {
      getTotal();
      getAllTransactionsPerMonth();
    }
  }, [id]);

  useEffect(() => {
    if (id !== undefined) {
      const category = id.split('&')[0];
      const type = id.split('&')[1].split('=')[1];

      getTransactionsByCategory(category, type);
    } else {
      getIncomesAndTotalIncomes();
      getOutcomesAndTotalOutcomes();
      getTotal();
      getAllTransactionsPerMonth();
    }
  }, [actualMonth, actualYear]);

  useEffect(() => {
    if (id !== undefined) {
      searchTransaction(id);
    } else {
      if (search.length >= 2) {
        searchTransaction();
      }

      if (search.length === 0) {
        getAllTransactionsPerMonth();
      }
    }
  }, [search]);

  return {
    getAllTransactions,
    finances,
    setFinances,
    loading,
    totalIncome,
    lastDateIncome,
    getIncomesAndTotalIncomes,
    totalOutcome,
    lastDateOutcome,
    getOutcomesAndTotalOutcomes,
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
    allTotal,
    setSearch,
    totalMessage,
    duplicateTransaction,
  };
}
