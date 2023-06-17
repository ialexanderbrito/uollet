import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { supabase } from 'services/supabase';

interface TotalCreditCardCategoriesProps {
  category: string;
  value: number;
}

export function useCards() {
  const { id } = useParams();
  const { toast } = useToast();
  const { user } = useAuth();

  const [finances, setFinances] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalCreditCard, setOpenModalCreditCard] = useState(false);
  const [creditCards, setCreditCards] = useState<any[]>([]);

  const [totalCreditCardCategories, setTotalCreditCardCategories] = useState<
    TotalCreditCardCategoriesProps[]
  >([]);

  const [actualMonth, setActualMonth] = useState(new Date().getMonth() + 1);
  const [actualYear, setActualYear] = useState(new Date().getFullYear());
  const endOfDays = new Date(actualYear, actualMonth, 0).getDate();
  const newMonthLong = format(new Date(actualYear, actualMonth - 1), 'MMM', {
    locale: pt,
  });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

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

  function handleOpenModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleCloseModalCreditCard() {
    setOpenModalCreditCard(false);
  }

  function handleOpenModalCreditCard() {
    setOpenModalCreditCard(true);
  }

  function limitCreditCard(category: string) {
    const total = totalCreditCardCategories
      .filter((item) => item.category === `Cartão ${category}`)
      .reduce((acc, item) => acc + item.value, 0);

    return total;
  }

  async function getAllTransactions() {
    try {
      const { data, error } = await supabase
        .from('finances_db')
        .select('*')
        .eq('user_id', user?.id)
        .ilike('category', '%Cartão%');

      if (error) {
        toast.error('Erro ao buscar transações', { id: 'error' });
        setLoading(false);
        return;
      }
      if (!data) return;

      const newData = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

      const totalPerCategory = data.reduce((acc, curr) => {
        const { category, value } = curr;

        if (!acc[category]) {
          acc[category] = 0;
        }

        acc[category] += value;

        return acc;
      }, {});

      const totalPerCategoryArray = Object.entries(totalPerCategory).map(
        ([key, value]) => ({
          category: key,
          value,
        }),
      );

      const totalPerCategoryArraySorted = totalPerCategoryArray.sort(
        (a, b) => b.value - a.value,
      );

      setTotalCreditCardCategories(totalPerCategoryArraySorted);

      setFinances(newData);
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao buscar transações', { id: 'error' });
      setLoading(false);
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
        .ilike('category', '%Cartão%');

      if (error) {
        toast.error('Erro ao buscar compras', { id: 'error' });
        setLoading(false);
        return;
      }

      if (!data) return;

      const newData = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

      const totalPerCategory = data.reduce((acc, curr) => {
        const { category, value } = curr;

        if (!acc[category]) {
          acc[category] = 0;
        }

        acc[category] += value;

        return acc;
      }, {});

      const totalPerCategoryArray = Object.entries(totalPerCategory).map(
        ([key, value]) => ({
          category: key,
          value,
        }),
      );

      const totalPerCategoryArraySorted = totalPerCategoryArray.sort(
        (a, b) => b.value - a.value,
      );

      setFinances(newData);
      setTotalCreditCardCategories(totalPerCategoryArraySorted);
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao buscar compras', { id: 'error' });
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
        .ilike('category', '%Cartão%');

      if (!data) return;

      if (error) {
        toast.error('Erro ao buscar transações', { id: 'error' });
        setLoading(false);
        return;
      }

      const newData = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

      const totalPerCategory = data.reduce((acc, curr) => {
        const { category, value } = curr;

        if (!acc[category]) {
          acc[category] = 0;
        }

        acc[category] += value;

        return acc;
      }, {});

      const totalPerCategoryArray = Object.entries(totalPerCategory).map(
        ([key, value]) => ({
          category: key,
          value,
        }),
      );

      const totalPerCategoryArraySorted = totalPerCategoryArray.sort(
        (a, b) => b.value - a.value,
      );

      setFinances(newData);
      setTotalCreditCardCategories(totalPerCategoryArraySorted);
      setFinances(newData);
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

      setLoading(false);
    } catch (error) {
      toast.error('Erro ao duplicar transação!', { id: 'error' });
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
          .ilike('category', '%Cartão%');

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
          .ilike('category', '%Cartão%');

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

  async function deleteCreditCard(id: number, cardName: string) {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('credit_card_db')
        .delete()
        .eq('id', id);

      if (error) {
        toast.error('Erro ao deletar cartão de crédito', { id: 'error' });
        return;
      }

      const { error: errorTransaction, status } = await supabase
        .from('finances_db')
        .delete()
        .match({ user_id: user?.id, category: `Cartão ${cardName}` });

      if (errorTransaction) {
        toast.error('Erro ao deletar transação', { id: 'error' });
        return;
      }

      if (status === 204) {
        handleCloseModalCreditCard();
        toast.success('Cartão de crédito deletado com sucesso', {
          id: 'success',
        });
        setLoading(false);
      }

      const newCreditCards = creditCards.filter((item) => item.id !== id);

      setCreditCards(newCreditCards);

      getAllTransactions();
    } catch (error) {
      toast.error('Erro ao deletar cartão de crédito', { id: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function getAllCreditCard() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('credit_card_db')
        .select('*')
        .eq('user_id', user?.id);

      if (error) {
        toast.error('Erro ao buscar cartões de crédito', { id: 'error' });
        return;
      }

      if (!data) return;

      setCreditCards(data);
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao buscar cartões de crédito', { id: 'error' });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      const category = id.split('&')[0];
      const type = id.split('&')[1].split('=')[1];

      getTransactionsByCategory(category, type);
    } else {
      getAllTransactionsPerMonth();
    }
  }, [id]);

  useEffect(() => {
    if (id !== undefined) {
      const category = id.split('&')[0];
      const type = id.split('&')[1].split('=')[1];

      getTransactionsByCategory(category, type);
    } else {
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

  useEffect(() => {
    getAllCreditCard();
  }, []);

  return {
    getAllTransactions,
    finances,
    setFinances,
    loading,
    newMonthLong,
    actualYear,
    handlePreviousMonth,
    handleNextMonth,
    actualMonth,
    endOfDays,
    setSearch,
    totalCreditCardCategories,
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
  };
}
