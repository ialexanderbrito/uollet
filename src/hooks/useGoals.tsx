import { useEffect, useState } from 'react';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { supabase } from 'services/supabase';

interface GoalsProps {
  id: number;
  created_at: string;
  user_id: string;
  title: string;
  description: string;
  date_initial: string;
  date_final: string;
  value: number;
  emoji: string;
}

interface DetailsGoalsProps {
  id: number;
  created_at: string;
  title: string;
  value: number;
  category: string;
  user_id: string;
  type: string;
  date: string;
}

export function useGoals() {
  const { storageUser } = useAuth();
  const { toast } = useToast();

  const [goals, setGoals] = useState<GoalsProps[]>([]);
  const [detailsGoals, setDetailsGoals] = useState<DetailsGoalsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleOpenModal() {
    setOpenModal(true);
  }

  async function getGoalsUser() {
    try {
      const { data, error } = await supabase
        .from('goals_db')
        .select('*')
        .eq('user_id', storageUser?.id);

      if (error) {
        toast.error('Erro ao buscar dados das metas');
        setLoading(false);
        return;
      }

      if (!data) return;

      setGoals(data);
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao buscar dados das metas');
    } finally {
      setLoading(false);
    }
  }

  async function getValuesGoals() {
    try {
      const { data, error } = await supabase
        .from('finances_db')
        .select('*')
        .eq('user_id', storageUser?.id)
        .ilike('category', '%Meta%')
        .order('date', { ascending: false });

      if (error) {
        toast.error('Erro ao buscar dados das metas');
        setLoading(false);
        return;
      }

      if (!data) return;

      setDetailsGoals(data);
    } catch (error) {
      toast.error('Erro ao buscar dados das metas');
    } finally {
      setLoading(false);
    }
  }

  async function deleteGoal(id: number, category?: string) {
    try {
      const { status, error } = await supabase
        .from('goals_db')
        .delete()
        .eq('id', id)
        .eq('user_id', storageUser?.id);

      const { status: statusHistory, error: errorHistory } = await supabase
        .from('finances_db')
        .delete()
        .eq('category', `Meta ${category}`)
        .eq('user_id', storageUser?.id);

      // apagar todas as transações da meta
      const { status: statusTransactions, error: errorTransactions } =
        await supabase
          .from('finances_db')
          .delete()
          .eq('category', `Meta ${category}`)
          .eq('user_id', storageUser?.id);

      if (error || errorHistory || errorTransactions) {
        toast.error('Erro ao deletar meta!', { id: 'error' });
        setLoading(false);
        return;
      }

      if (
        status === 204 ||
        statusHistory === 204 ||
        statusTransactions === 204
      ) {
        handleCloseModal();
        toast.success('Meta deletada com sucesso!', { id: 'success' });
        setLoading(false);
      }

      getGoalsUser();
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao deletar meta!', { id: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function deleteGoalTransaction(id: number) {
    try {
      const { status, error } = await supabase
        .from('finances_db')
        .delete()
        .eq('id', id)
        .eq('user_id', storageUser?.id);

      if (error) {
        toast.error('Erro ao deletar meta!', { id: 'error' });
        setLoading(false);
        return;
      }

      if (status === 204) {
        handleCloseModal();
        toast.success('Meta deletada com sucesso!', { id: 'success' });
        setLoading(false);
      }

      getValuesGoals();
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao deletar meta!', { id: 'error' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getValuesGoals();

    getGoalsUser();
  }, []);

  return {
    goals,
    loading,
    deleteGoal,
    openModal,
    setOpenModal,
    handleCloseModal,
    handleOpenModal,
    detailsGoals,
    deleteGoalTransaction,
  };
}
