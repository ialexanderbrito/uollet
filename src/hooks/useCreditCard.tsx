import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { supabase } from 'services/supabase';

import { useCrypto } from './useCrypto';

export function useCreditCard() {
  const navigate = useNavigate();
  const { cryptoNumberCreditCard } = useCrypto();
  const { toast } = useToast();
  const { storageUser } = useAuth();

  const days = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    { id: 5, name: '5' },
    { id: 6, name: '6' },
    { id: 7, name: '7' },
    { id: 8, name: '8' },
    { id: 9, name: '9' },
    { id: 10, name: '10' },
    { id: 11, name: '11' },
    { id: 12, name: '12' },
    { id: 13, name: '13' },
    { id: 14, name: '14' },
    { id: 15, name: '15' },
    { id: 16, name: '16' },
    { id: 17, name: '17' },
    { id: 18, name: '18' },
    { id: 19, name: '19' },
    { id: 20, name: '20' },
    { id: 21, name: '21' },
    { id: 22, name: '22' },
    { id: 23, name: '23' },
    { id: 24, name: '24' },
    { id: 25, name: '25' },
    { id: 26, name: '26' },
    { id: 27, name: '27' },
    { id: 28, name: '28' },
    { id: 29, name: '29' },
    { id: 30, name: '30' },
    { id: 31, name: '31' },
  ];

  const defaultsColors = [
    '#FF6900',
    '#FCB900',
    '#00D084',
    '#0693E3',
    '#ABB8C3',
    '#EB144C',
    '#F78DA7',
    '#9900EF',
    '#000000',
  ];

  const schema = Yup.object({
    cardName: Yup.string().required('Informe o nome do cartão'),
    cardNumber: Yup.string()
      .required('Informe os 6 primeiros dígitos')
      .min(6, 'Informe os 6 primeiros dígitos'),
    limit: Yup.string()
      .required('Informe o limite do cartão')
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
    dayMaturity: Yup.object().shape({
      name: Yup.string().required('Informe o dia de vencimento'),
    }),
    dayClosure: Yup.object().shape({
      name: Yup.string().required('Informe o dia de fechamento'),
    }),
  });

  function convertVirgulaToPonto(value: string) {
    const newValue = value.replace(',', '.');

    const number = Number(newValue);

    return number;
  }

  const formik = useFormik({
    initialValues: {
      cardNumber: '',
      cardName: '',
      limit: '',
      backgroundColorCreditCard: '#262d3d',
      textColorCreditCard: '#FFF',
      dayMaturity: {
        id: '',
        name: '',
      },
      dayClosure: {
        id: '',
        name: '',
      },
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (values.backgroundColorCreditCard === values.textColorCreditCard) {
        toast.error('A cor do texto não pode ser igual a cor de fundo', {
          id: 'error',
        });
        return;
      }

      try {
        const { error } = await supabase.from('credit_card_db').insert([
          {
            card_name: values.cardName,
            card_number: cryptoNumberCreditCard(values.cardNumber),
            limit: values.limit,
            user_id: storageUser?.id,
            background: values.backgroundColorCreditCard,
            color: values.textColorCreditCard,
            maturity: values.dayMaturity.name,
            closure: values.dayClosure.name,
          },
        ]);

        if (error) {
          toast.error('Erro ao cadastrar cartão', { id: 'error' });
          return;
        }

        toast.success('Cartão cadastrado com sucesso!', { id: 'success' });

        navigate('/cards');
      } catch (error) {
        toast.error('Erro ao cadastrar cartão', { id: 'error' });
      }
    },
  });

  return {
    formik,
    days,
    defaultsColors,
  };
}
