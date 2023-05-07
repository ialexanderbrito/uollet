import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { supabase } from 'services/supabase';

export function useResetPassword() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logOut } = useAuth();
  const [passwordType, setPasswordType] = useState('password');

  function togglePassword() {
    if (passwordType === 'password') {
      setPasswordType('text');
    } else {
      setPasswordType('password');
    }
  }

  const formikResetPassword = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      if (values.password !== values.confirmPassword) {
        toast.error('As senhas não coincidem', { id: 'error' });
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (error?.status === 422) {
        toast.error('A senha deve ter pelo menos 8 caracteres', {
          id: 'error',
        });
        return;
      }

      if (error) {
        toast.error(error.message, { id: 'error' });
        return;
      }

      toast.success('Senha alterada com sucesso', { id: 'success' });
      logOut();

      navigate('/');
    },
  });
  return {
    formikResetPassword,
    passwordType,
    togglePassword,
  };
}
