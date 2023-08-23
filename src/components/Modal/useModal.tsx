import { useEffect, useState } from 'react';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { supabase } from 'services/supabase';

export function useModal() {
  const { user, setUser } = useAuth();
  const { toast } = useToast();

  const [username, setUsername] = useState('');
  const [confirmTerms, setConfirmTerms] = useState({
    action: false,
    data: false,
  });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedYear, setSelectedYear] = useState(
    sessionStorage.getItem('@finance:selectedYear')
      ? Number(sessionStorage.getItem('@finance:selectedYear'))
      : new Date().getFullYear(),
  );
  const [openModalName, setOpenModalName] = useState(false);
  function handleCloseModalName() {
    setOpenModalName(false);
  }

  useEffect(() => {
    sessionStorage.setItem('@finance:selectedYear', String(selectedYear));
  }, [selectedYear]);

  function handleOpenModalName() {
    setOpenModalName(true);
  }

  function handleChangeYear(step: number) {
    setSelectedYear((prevState) => prevState + step);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText('eu@ialexanderbrito.dev');
    toast.success('Email copiado com sucesso!', {
      id: 'success',
    });
  }

  async function handleSubmitName() {
    if (username.length <= 2) {
      toast.error('Nome deve ter mais de 2 caracteres', {
        id: 'error',
      });
      return;
    }

    const { data } = await supabase.auth.updateUser({
      data: {
        name: username,
        full_name: username,
        email: user?.email,
      },
    });

    if (!data.user) return;

    setUser(data.user);
  }

  useEffect(() => {
    if (!user) return;

    if (!user.user_metadata.name || !user.user_metadata.full_name) {
      handleOpenModalName();
    }
  }, []);

  return {
    confirmTerms,
    setConfirmTerms,
    username,
    setUsername,
    selectedCategory,
    setSelectedCategory,
    copyToClipboard,
    handleSubmitName,
    selectedYear,
    setSelectedYear,
    handleChangeYear,
    openModalName,
    handleCloseModalName,
    handleOpenModalName,
  };
}
