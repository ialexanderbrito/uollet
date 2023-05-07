import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { supabase } from 'services/supabase';

export function useLogin() {
  const navigate = useNavigate();

  const { setUser } = useAuth();
  const { toast } = useToast();

  const [register, setRegister] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState('password');

  function togglePassword() {
    if (passwordType === 'password') {
      setPasswordType('text');
    } else {
      setPasswordType('password');
    }
  }

  const formikLogin = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      setLoading(true);

      const { email, password } = values;

      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!data) return;

      if (error) {
        toast.error('Erro ao fazer login, tente novamente!', { id: 'error' });
        setLoading(false);
        return;
      }

      setUser(data.user);

      setLoading(false);

      toast.success('Login feito com sucesso!', { id: 'success' });
      handleCloseModal();

      navigate('/');
    },
  });

  const formikRegister = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      setLoading(true);
      const { email, password, confirmPassword } = values;

      if (password !== confirmPassword) {
        toast.error('As senhas não são iguais!', { id: 'error' });
        return;
      }

      const { error, data } = await supabase.auth.signUp({
        email,
        password,
      });

      if (!data) return;

      if (error?.status === 422) {
        toast.error('A senha precisa ter pelo menos 8 caracteres', {
          id: 'error',
        });
        setLoading(false);
        return;
      }

      if (error) {
        toast.error('Erro ao fazer cadastro, tente novamente!', {
          id: 'error',
        });
        setLoading(false);

        return;
      }

      setUser(data.user);

      setLoading(false);

      toast.success('Cadastro feito com sucesso!', { id: 'success' });
      handleCloseModal();

      navigate('/');
    },
  });

  const formikForgetPassword = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (values) => {
      setLoading(true);
      const { email } = values;

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${import.meta.env.VITE_URL}/reset-password`,
      });

      if (error?.status === 422) {
        toast.error('A recuperação de senha requer um e-mail', {
          id: 'error',
        });
        return;
      }

      if (error?.status === 429) {
        toast.error(
          'Por motivos de segurança, você só pode solicitar isso uma vez a cada 60 segundos',
          {
            id: 'error',
          },
        );
        setLoading(false);

        return;
      }

      if (error) {
        toast.error('Erro ao resetar senha, tente novamente!', {
          id: 'error',
        });
        setLoading(false);

        return;
      }

      setLoading(false);

      toast.success(
        'Email enviado com sucesso! Verifique sua caixa de entrada ou SPAM',
        { id: 'success' },
      );
      handleCloseModal();
    },
  });

  function selectSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (register) {
      return formikRegister.handleSubmit;
    }

    if (forgetPassword) {
      return formikForgetPassword.handleSubmit;
    }

    return formikLogin.handleSubmit;
  }

  function emailInput() {
    if (register) {
      return formikRegister.getFieldProps('email');
    }

    if (forgetPassword) {
      return formikForgetPassword.getFieldProps('email');
    }

    return formikLogin.getFieldProps('email');
  }

  function handleCloseModal(closeModal?: () => void) {
    if (closeModal) {
      closeModal();
    }
    setRegister(false);
    setForgetPassword(false);
    formikLogin.resetForm();
    formikRegister.resetForm();
    formikForgetPassword.resetForm();
  }

  return {
    passwordType,
    togglePassword,
    formikLogin,
    formikRegister,
    formikForgetPassword,
    selectSubmit,
    emailInput,
    handleCloseModal,
    register,
    forgetPassword,
    setForgetPassword,
    setRegister,
    loading,
  };
}
