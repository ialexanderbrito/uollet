import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { supabase } from 'services/supabase';

export function useRegister() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { storageUser } = useAuth();

  function verifyIfIsNumber(value: string) {
    const regex = /^[0-9]+$/;

    return regex.test(value);
  }

  function convertVirgulaToPonto(value: string) {
    const newValue = value.replace(',', '.');

    const number = Number(newValue);

    return number;
  }

  const schema = Yup.object({
    title: Yup.string().required('Campo obrigatório'),
    category: Yup.object().shape({
      name: Yup.string().required('Campo obrigatório'),
    }),
    date: Yup.string().required('Selecione uma data válida'),
    type: Yup.string()
      .required('Campo obrigatório')
      .oneOf(['income', 'outcome']),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      value: '',
      category: {
        name: '',
        icon: '',
      },
      date: '',
      type: '',
      user_id: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (!values.value) {
        toast.error('Adicione um valor!', { id: 'error' });
        return;
      }

      try {
        if (!id) {
          const { error } = await supabase.from('finances_db').insert([
            {
              title: values.title,
              value: verifyIfIsNumber(values.value)
                ? values.value
                : convertVirgulaToPonto(values.value),
              category: values.category.name,
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
        }

        if (id) {
          const { error } = await supabase
            .from('finances_db')
            .update({
              id,
              title: values.title,
              value: verifyIfIsNumber(values.value)
                ? values.value
                : convertVirgulaToPonto(values.value),
              category: values.category.name,
              date: values.date,
              type: values.type,
              user_id: storageUser?.id,
            })
            .eq('id', id)
            .eq('user_id', storageUser?.id);

          if (error) {
            toast.error('Erro ao atualizar!', { id: 'error' });
            return;
          }

          toast.success('Atualizado com sucesso!', { id: 'success' });

          navigate('/');
        }
      } catch (error) {
        toast.error('Erro ao cadastrar!', { id: 'error' });
      }
    },
  });

  async function updateFinance() {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from('finances_db')
        .select('*')
        .eq('id', id)
        .eq('user_id', storageUser?.id);

      if (error) {
        toast.error('Erro ao buscar dados!', { id: 'error' });
        return;
      }

      if (data) {
        formik.setFieldValue('title', data[0].title);
        formik.setFieldValue('category', data[0].category);
        formik.setFieldValue('date', data[0].date);
        formik.setFieldValue('type', data[0].type);
        formik.setFieldValue('value', data[0].value);
      }
    } catch (error) {
      toast.error('Erro ao buscar dados!', { id: 'error' });
    }
  }

  useEffect(() => {
    if (id) {
      updateFinance();
    }
  }, [id]);

  return { formik };
}
