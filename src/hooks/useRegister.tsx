import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { supabase } from 'services/supabase';

export function useRegister() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { storageUser } = useAuth();

  const [valor, setValor] = useState(0);

  const schema = Yup.object({
    title: Yup.string().required('Campo obrigatório'),
    category: Yup.string().required('Campo obrigatório'),
    date: Yup.string().required('Selecione uma data válida'),
    type: Yup.string()
      .required('Campo obrigatório')
      .oneOf(['income', 'outcome']),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      value: '',
      category: '',
      date: '',
      type: '',
      user_id: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (!valor) {
        toast.error('Adicione um valor!', { id: 'error' });
        return;
      }

      try {
        const { error } = await supabase.from('finances_db').insert([
          {
            title: values.title,
            value: valor,
            category: values.category,
            date: values.date,
            type: values.type,
            user_id: storageUser?.id,
          },
        ]);

        if (error) {
          toast.error('Erro ao cadastrar!', { id: 'error' });
          return;
        }

        toast.success('Cadastrado com sucesso!', { id: 'success' });

        navigate('/');
      } catch (error) {
        toast.error('Erro ao cadastrar!', { id: 'error' });
      }
    },
  });

  return { formik, valor, setValor };
}
