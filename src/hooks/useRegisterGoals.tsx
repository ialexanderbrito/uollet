import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { format } from 'date-fns';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { supabase } from 'services/supabase';

export function useRegisterGoals() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { storageUser } = useAuth();

  const schema = Yup.object({
    emoji: Yup.string()
      .required('Informe o emoji')
      .test(
        'is-emoji',
        'Informe o emoji',
        (value) => value.match(/\p{Emoji}/gu)?.length === 1,
      ),
    title: Yup.string().required('Informe o nome'),
    value: Yup.string()
      .required('Informe o valor, o valor deve ser maior que 0')
      .test(
        'is-greater-than-zero',
        'Informe o valor, o valor deve ser maior que 0',
        (value) => {
          if (!value) return false;

          const newValue = convertVirgulaToPonto(value);

          if (newValue <= 0) return false;

          return true;
        },
      ),
    description: Yup.string()
      .max(140, 'Máximo de 140 caracteres')
      .required('Informe a descrição'),
    date_initial: Yup.string().required('Informe a data inicial'),
    date_final: Yup.string()
      .required('Informe a data final')
      .test(
        'is-greater-than-date-initial',
        'A data final deve ser maior que a data inicial',
        (value) => {
          if (!value) return false;

          const dateInitial = new Date(formik.values.date_initial);
          const dateFinal = new Date(value);

          if (dateFinal <= dateInitial) return false;

          return true;
        },
      )
      .test(
        'is-greater-than-date-now',
        'A data final deve ser maior que a data atual',
        (value) => {
          if (!value) return false;

          const dateFinal = new Date(value);
          const dateNow = new Date();

          if (dateFinal <= dateNow) return false;

          return true;
        },
      ),
  });

  function verifyIfIsNumber(value: string) {
    const regex = /^[0-9]+$/;

    return regex.test(value);
  }

  function convertVirgulaToPonto(value: string) {
    const newValue = value.replace(',', '.');

    const number = Number(newValue);

    return number;
  }

  const formik = useFormik({
    initialValues: {
      emoji: '',
      title: '',
      value: '',
      description: '',
      date_initial: new Date().toISOString(),
      date_final: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (!values.value) {
        toast.error('Adicione um valor!', { id: 'error' });
        return;
      }

      try {
        if (!id) {
          const { error } = await supabase.from('goals_db').insert([
            {
              emoji: values.emoji,
              title: values.title,
              value: verifyIfIsNumber(values.value)
                ? values.value
                : convertVirgulaToPonto(values.value),
              description: values.description,
              date_initial: format(new Date(values.date_initial), 'yyyy-MM-dd'),
              date_final: format(new Date(values.date_final), 'yyyy-MM-dd'),
              user_id: storageUser?.id,
            },
          ]);

          if (error) {
            toast.error('Erro ao cadastrar!', { id: 'error' });
            return;
          }

          toast.success('Cadastrado com sucesso!', { id: 'success' });

          navigate('/goals');
        }

        if (id) {
          const { error } = await supabase
            .from('goals_db')
            .update({
              id,
              emoji: values.emoji,
              title: values.title,
              value: verifyIfIsNumber(values.value)
                ? values.value
                : convertVirgulaToPonto(values.value),
              description: values.description,
              date_initial: values.date_initial,
              date_final: values.date_final,
              user_id: storageUser?.id,
            })
            .eq('id', id)
            .eq('user_id', storageUser?.id);

          if (error) {
            toast.error('Erro ao atualizar!', { id: 'error' });
            return;
          }

          toast.success('Atualizado com sucesso!', { id: 'success' });

          navigate('/goals');
        }
      } catch (error) {
        toast.error('Erro ao cadastrar!', { id: 'error' });
      }
    },
  });

  async function updateGoals() {
    if (!id) return;

    const { data, error } = await supabase
      .from('goals_db')
      .select('*')
      .eq('id', id)
      .eq('user_id', storageUser?.id);

    if (!data) return;

    if (error) {
      toast.error('Erro ao buscar dados!', { id: 'error' });
      return;
    }

    if (data) {
      const value = data[0].value;
      const valueWithTwoDecimalCases = value.toFixed(2);

      formik.setFieldValue('emoji', data[0].emoji);
      formik.setFieldValue('title', data[0].title);
      formik.setFieldValue('value', valueWithTwoDecimalCases);
      formik.setFieldValue('description', data[0].description);
      formik.setFieldValue('date_initial', data[0].date_initial);
      formik.setFieldValue('date_final', data[0].date_final);
    }
  }

  useEffect(() => {
    if (id) {
      updateGoals();
    }
  }, [id]);

  return {
    formik,
  };
}
