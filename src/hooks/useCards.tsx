import { useState } from 'react';

import { useModal } from 'components/Modal/useModal';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { supabase } from 'services/supabase';

interface TotalCreditCardCategoriesProps {
  category: string;
  value: number | any;
}

export function useCards() {
  const { selectedYear } = useModal();
  const { toast } = useToast();
  const { user } = useAuth();

  const [finances, setFinances] = useState<any[]>([]);
  const [creditCards, setCreditCards] = useState<any[]>([]);

  const [openModal, setOpenModal] = useState(false);
  const [openModalCreditCard, setOpenModalCreditCard] = useState(false);
  const [openModalFilter, setOpenModalFilter] = useState(false);

  const [totalCreditCardCategories, setTotalCreditCardCategories] = useState<
    TotalCreditCardCategoriesProps[]
  >([]);

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [lastDayOfTheMonth, setLastDayOfTheMonth] = useState(
    new Date(new Date().getFullYear(), currentMonth, 0).getDate(),
  );

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

  function handleCloseModalFilter() {
    setOpenModalFilter(false);
  }

  function handleOpenModalFilter() {
    setOpenModalFilter(true);
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
    } finally {
      setLoading(false);
    }
  }

  async function getAllTransactionsCreditCardForTheCurrentMonth(year: number) {
    try {
      const { data, error } = await supabase
        .from('finances_db')
        .select('*')
        .eq('user_id', user?.id)
        .gte('date', `${year}-${currentMonth}-01`)
        .lte('date', `${year}-${currentMonth}-${lastDayOfTheMonth}`)
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
        (a, b) => Number(b.value) - Number(a.value),
      );

      setTotalCreditCardCategories(totalPerCategoryArraySorted);

      setFinances(newData);
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao buscar transações', { id: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function getAllTransactionsCreditCardForTheMonthAndYear(
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
        (a, b) => Number(b.value) - Number(a.value),
      );

      setTotalCreditCardCategories(totalPerCategoryArraySorted);

      setFinances(newData);
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao buscar transações', { id: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function searchAllTransactionsCreditCard() {
    try {
      const { data, error } = await supabase
        .from('finances_db')
        .select('*')
        .eq('user_id', user?.id)
        .ilike('title', `%${search}%`)
        .order('created_at', { ascending: false })
        .ilike('category', '%Cartão%');

      if (error) {
        toast.error('Erro ao pesquisar por transações de cartão de crédito', {
          id: 'error',
        });
        setLoading(false);
        return;
      }

      if (!data) return;

      setFinances(data);
    } catch (error) {
      toast.error('Erro ao pesquisar por transações de cartão de crédito', {
        id: 'error',
      });
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

      if (search.length >= 2) {
        searchAllTransactionsCreditCard();
      }

      const year = Number(sessionStorage.getItem('@uollet:selectedYear'));

      getAllTransactionsCreditCardForTheCurrentMonth(year);

      setLoading(false);
    } catch (error) {
      toast.error('Erro ao duplicar transação!', { id: 'error' });
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

      if (search.length >= 2) {
        searchAllTransactionsCreditCard();
      }

      const year = Number(sessionStorage.getItem('@uollet:selectedYear'));

      getAllTransactionsCreditCardForTheCurrentMonth(year);

      setLoading(false);
    } catch (error) {
      toast.error('Erro ao deletar transação!', { id: 'error' });
    } finally {
      setLoading(false);
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

      if (search.length >= 2) {
        searchAllTransactionsCreditCard();
      }

      const year = Number(sessionStorage.getItem('@uollet:selectedYear'));

      getAllTransactionsCreditCardForTheCurrentMonth(year);
      setCreditCards(newCreditCards);
    } catch (error) {
      toast.error('Erro ao deletar cartão de crédito', { id: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function filterTransactionsCreditCardByYear(
    year: number,
    month: number,
  ) {
    try {
      const { data, error } = await supabase
        .from('finances_db')
        .select('*')
        .eq('user_id', user?.id)
        .gte('date', `${year}-${month}-01`)
        .lte('date', `${year}-${month}-${lastDayOfTheMonth}`)
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
        (a, b) => Number(b.value) - Number(a.value),
      );

      setTotalCreditCardCategories(totalPerCategoryArraySorted);
      setFinances(newData);
      handleCloseModalFilter();
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao buscar transações', { id: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function handleChangeFilterMonthCreditCard(month: number) {
    if (selectedYear) {
      const year = Number(sessionStorage.getItem('@uollet:selectedYear'));
      setCurrentMonth(month);
      const lastDayOfMonth = new Date(year, month, 0).getDate();
      setLastDayOfTheMonth(lastDayOfMonth);

      getAllTransactionsCreditCardForTheMonthAndYear(
        year,
        month,
        lastDayOfMonth,
      );
    } else {
      setCurrentMonth(month);
      const lastDayOfMonth = new Date(selectedYear, month, 0).getDate();
      setLastDayOfTheMonth(lastDayOfMonth);

      getAllTransactionsCreditCardForTheMonthAndYear(
        selectedYear,
        month,
        lastDayOfMonth,
      );
    }
  }

  return {
    finances,
    loading,
    search,
    setSearch,
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
    getAllCreditCard,
    searchAllTransactionsCreditCard,
    filterTransactionsCreditCardByYear,
    currentMonth,
    handleCloseModalFilter,
    openModalFilter,
    handleOpenModalFilter,
    handleChangeFilterMonthCreditCard,
  };
}
