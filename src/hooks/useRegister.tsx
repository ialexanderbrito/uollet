import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { goals } from 'assets';
import { format } from 'date-fns';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { category } from 'utils/category';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { supabase } from 'services/supabase';

export function useRegister() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const [isRecurring, setIsRecurring] = useState(false);
  const [openModalRecurringRevenue, setOpenModalRecurringRevenue] =
    useState(false);
  const [categories, setCategories] = useState(category);
  const [goalsList, setGoalsList] = useState(category);
  const [isGoal, setIsGoal] = useState(false);

  const schema = Yup.object({
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
    category: Yup.object().shape({
      name: Yup.string().required('Selecione uma categoria'),
    }),
    date: Yup.string().required('Selecione uma data válida'),
    type: Yup.string()
      .required('Selecione uma opção de entrada ou saída')
      .oneOf(['income', 'outcome']),
  });

  function handleSwitch() {
    setIsRecurring(!isRecurring);

    if (formik.values.recurrency) {
      setOpenModalRecurringRevenue(false);
      setIsRecurring(false);
    }

    if (!isRecurring) {
      setOpenModalRecurringRevenue(!openModalRecurringRevenue);
    }

    if (isRecurring) {
      formik.setFieldValue('recurrency', '');
    }
  }

  function closeBottomSheet() {
    setOpenModalRecurringRevenue(false);

    if (!formik.values.recurrency || !formik.values.parcel) {
      setIsRecurring(false);
    }
  }

  function verifyIfIsNumber(value: string) {
    const regex = /^[0-9]+$/;

    return regex.test(value);
  }

  function convertVirgulaToPonto(value: string) {
    if (typeof value !== 'string') {
      return value;
    }

    const newValue = value.replace(',', '.');

    const number = Number(newValue);

    return number;
  }

  function parcelPurchaseValue(valor: number, parcelas: number) {
    const valorParcela = valor / parcelas;

    return valorParcela;
  }

  function payInParcel(value: number, parcel: number) {
    if (!parcel) {
      return;
    }

    const parcelas = parcel;
    const valor = value;

    const valorParcela = parcelPurchaseValue(Number(valor), Number(parcelas));

    const arrayParcelas = [];

    for (let i = 0; i < parcelas; i++) {
      const data = new Date(formik.values.date);
      data.setMonth(data.getMonth() + i);

      const novaData = data.toISOString().split('T')[0];

      arrayParcelas.push({
        title: `${formik.values.title} ${i + 1}/${parcelas}`,
        value: valorParcela,
        category: formik.values.category.name,
        date: format(new Date(novaData), 'yyyy-MM-dd'),
        type: formik.values.type,
        user_id: user?.id,
      });
    }

    return arrayParcelas;
  }

  function isCategoryCreditCard(category: string): boolean {
    if (!category) return false;

    const categoryExists = categories.some((item) => item.name === category);

    const isCreditCard = category.startsWith('Cartão');

    return categoryExists && isCreditCard;
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      value: '',
      category: {
        name: '',
        icon: '',
      },
      date: new Date().toISOString(),
      type: '',
      user_id: '',
      recurrency: '',
      parcel: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (!values.value) {
        toast.error('Adicione um valor!', { id: 'error' });
        return;
      }

      if (Number(values.parcel) >= 24) {
        toast.error('Parcelamento máximo de 24x!', { id: 'error' });
        return;
      }

      try {
        if (!id) {
          if (values.parcel) {
            const arrayParcelas = payInParcel(
              Number(values.value),
              Number(values.parcel),
            );

            const { error: errorParcelas } = await supabase
              .from('finances_db')
              .insert(arrayParcelas);

            if (errorParcelas) {
              toast.error('Erro ao cadastrar!', { id: 'error' });
              return;
            }

            toast.success('Cadastrado com sucesso!', { id: 'success' });

            if (values.category.name.startsWith('Cartão')) {
              navigate('/cards');
              return;
            }

            navigate('/');
          }

          const { error } = await supabase.from('finances_db').insert([
            {
              title: values.title,
              value: verifyIfIsNumber(values.value)
                ? values.value
                : convertVirgulaToPonto(values.value),
              category: values.category.name,
              date: format(new Date(values.date), 'yyyy-MM-dd'),
              type: values.type,
              user_id: user?.id,
            },
          ]);

          if (values.recurrency) {
            const { error: errorRecurrency } = await supabase
              .from('finances_recurrency_db')
              .insert([
                {
                  title: values.title,
                  recurrency: values.recurrency,
                  user_id: user?.id,
                  value: verifyIfIsNumber(values.value)
                    ? values.value
                    : convertVirgulaToPonto(values.value),
                  category: values.category.name,
                  date: format(new Date(values.date), 'yyyy-MM-dd'),
                  type: values.type,
                },
              ]);

            if (errorRecurrency) {
              toast.error('Erro ao cadastrar!', { id: 'error' });
              return;
            }
          }

          if (error) {
            toast.error('Erro ao cadastrar!', { id: 'error' });
            return;
          }

          toast.success('Cadastrado com sucesso!', { id: 'success' });

          if (values.category.name.startsWith('Cartão')) {
            navigate('/cards');
            return;
          }

          if (values.category.name.startsWith('Meta')) {
            navigate('/goals');
            sessionStorage.removeItem('@uollet:goal');
            return;
          }

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
              user_id: user?.id,
            })
            .eq('id', id)
            .eq('user_id', user?.id);

          if (values.recurrency) {
            const { error: errorRecurrency } = await supabase
              .from('finances_recurrency_db')
              .update([
                {
                  id,
                  recurrency: values.recurrency,
                  title: values.title,
                  user_id: user?.id,
                  value: verifyIfIsNumber(values.value)
                    ? values.value
                    : convertVirgulaToPonto(values.value),
                  category: values.category.name,
                  date: values.date,
                  type: values.type,
                },
              ])
              .eq('id', id)
              .eq('user_id', user?.id);

            if (errorRecurrency) {
              toast.error('Erro ao atualizar!', { id: 'error' });
              return;
            }
          }

          if (error) {
            toast.error('Erro ao atualizar!', { id: 'error' });
            return;
          }

          toast.success('Atualizado com sucesso!', { id: 'success' });

          if (values.category.name.startsWith('Cartão')) {
            navigate('/cards');
            return;
          }

          if (values.category.name.startsWith('Meta')) {
            navigate('/goals');
            return;
          }

          navigate('/');
        }
      } catch (error) {
        toast.error('Erro ao cadastrar!', { id: 'error' });
      }
    },
  });

  async function getCreditCards() {
    const { data } = await supabase
      .from('credit_card_db')
      .select('*')
      .eq('user_id', user?.id);

    if (!data) return;

    const newCategories = data.map((item) => ({
      name: `Cartão ${item.card_name}`,
      icon: 'CreditCard',
      category: 'credit_card',
    }));

    const allCategories = [...categories, ...newCategories];

    const orderCategories = allCategories.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;

      return 0;
    });

    const uniqueCategories = orderCategories.filter(
      (item, index) =>
        orderCategories.findIndex((item2) => item.name === item2.name) ===
        index,
    );

    const newUniqueCategories = uniqueCategories.filter(
      (item) => item.name !== 'Meta' && item.name !== 'Cartão',
    );

    setCategories(newUniqueCategories);
  }

  async function getGoals() {
    const { data } = await supabase
      .from('goals_db')
      .select('*')
      .eq('user_id', user?.id);

    if (!data) return;

    const newCategories = data.map((item) => ({
      name: `Meta ${item.title}`,
      icon: goals,
      category: 'goal',
    }));

    const allCategories = [...newCategories];

    const orderCategories = allCategories.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;

      return 0;
    });

    const uniqueCategories = orderCategories.filter(
      (item, index) =>
        orderCategories.findIndex((item2) => item.name === item2.name) ===
        index,
    );

    setGoalsList(uniqueCategories);
  }

  async function updateFinance() {
    if (!id) return;
    const { data, error } = await supabase
      .from('finances_db')
      .select('*')
      .eq('id', id)
      .eq('user_id', user?.id);

    if (!data) return;

    const { data: recurrencyData } = await supabase
      .from('finances_recurrency_db')
      .select('*')
      .eq('title', data[0].title)
      .eq('user_id', user?.id);

    if (!recurrencyData) return;

    if (error) {
      toast.error('Erro ao buscar dados!', { id: 'error' });
      return;
    }

    if (data && recurrencyData) {
      const newCategory = {
        name: data[0].category,
        icon: '',
      };

      formik.setFieldValue('title', data[0].title);
      formik.setFieldValue('category', newCategory);
      formik.setFieldValue('date', data[0].date);
      formik.setFieldValue('type', data[0].type);

      const value = data[0].value;
      const valueWithTwoDecimalCases = value.toFixed(2);

      formik.setFieldValue('value', valueWithTwoDecimalCases);

      if (recurrencyData[0].recurrency) {
        setIsRecurring(true);
      }

      formik.setFieldValue('recurrency', recurrencyData[0].recurrency);
    }
  }

  useEffect(() => {
    if (id) {
      updateFinance();
    }
  }, [id]);

  useEffect(() => {
    getCreditCards();
  }, []);

  useEffect(() => {
    if (isGoal === true) {
      getGoals();
    }
  }, [isGoal]);

  return {
    formik,
    isRecurring,
    setIsRecurring,
    handleSwitch,
    openModalRecurringRevenue,
    setOpenModalRecurringRevenue,
    categories,
    isCategoryCreditCard,
    isGoal,
    setIsGoal,
    goalsList,
    closeBottomSheet,
  };
}
