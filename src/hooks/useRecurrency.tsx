import { useState } from 'react';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { supabase } from 'services/supabase';

export function useRecurrency() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [recurrencyList, setRecurrencyList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  function handleOpenModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  function recurrencyName(recurrency: string) {
    switch (recurrency) {
      case 'day':
        return 'Diário';
      case 'week':
        return 'Semanal';
      case 'month':
        return 'Mensal';
      default:
        return 'Não definido';
    }
  }

  async function getRecurrencyList() {
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('finances_recurrency_db')
        .select('*')
        .eq('user_id', user?.id);

      if (error) {
        toast.error('Erro ao buscar cartões de crédito', { id: 'error' });
        return;
      }

      if (!data) return;

      setRecurrencyList(data);
    } catch (error) {
      console.error('Erro ao buscar cartões de crédito', error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteRecurrency(id: number) {
    try {
      const { error } = await supabase
        .from('finances_recurrency_db')
        .delete()
        .eq('id', id);

      if (error) {
        toast.error('Erro ao deletar recorrência', { id: 'error' });
        return;
      }

      toast.success('Recorrência deletada com sucesso', { id: 'success' });
      handleCloseModal();
      getRecurrencyList();
    } catch (error) {
      console.error('Erro ao deletar recorrência', error);
    }
  }

  return {
    getRecurrencyList,
    recurrencyList,
    loading,
    recurrencyName,
    openModal,
    handleCloseModal,
    handleOpenModal,
    deleteRecurrency,
  };
}
