import { useNavigate } from 'react-router-dom';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { supabase } from 'services/supabase';

export function useProfile() {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  const { toast } = useToast();

  async function deleteUser(id: string) {
    try {
      const { error } = await supabase.auth.admin.deleteUser(id);

      const { error: errorDeleteRows } = await supabase
        .from('finances_db')
        .delete()
        .match({ user_id: id });

      if (error) {
        toast.error('Erro ao deletar usuário', { id: 'error' });
      }

      if (errorDeleteRows) {
        toast.error('Erro ao deletar registros do usuário', { id: 'error' });
      }

      toast.success('Usuário deletado com sucesso', { id: 'success' });
      logOut();
      navigate('/');
    } catch (error) {
      toast.error('Erro ao deletar usuário', { id: 'error' });
    }
  }

  return {
    deleteUser,
  };
}
