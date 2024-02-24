import { useEffect, useState } from 'react';

import creditCardType from 'credit-card-type';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { iconCreditCard } from 'components/CreditCard';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import {
  createCustumerCreditCard,
  deleteCustumerCreditCard,
  getCustumerCreditCards,
} from 'services/payments';

interface CreditCards {
  id: number;
  cardBrand: string;
  holderName: string;
  expirationMonth: number;
  expirationYear: number;
  firstDigits: string;
  lastDigits: string;
  isDefault: boolean;
}

export function useAddCreditCard() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [creditCards, setCreditCards] = useState<CreditCards[]>([]);

  const schemaCreditCard = Yup.object({
    cardNumber: Yup.string()
      .required('Digite o número do cartão')
      .max(16, 'O número do cartão deve ter no máximo 16 dígitos')
      .min(13, 'O número do cartão deve ter no mínimo 13 dígitos')
      .test('test-number', 'Número do cartão inválido', (value) => {
        if (value) {
          const cardNumber = value.replace(/\s/g, '');
          const cardNumberArray = cardNumber.split('');
          const cardNumberArrayReverse = cardNumberArray.reverse();
          const cardNumberArrayReverseMap = cardNumberArrayReverse.map(
            (number, index) => {
              if (index % 2 === 1) {
                const numberDouble = parseInt(number) * 2;
                if (numberDouble > 9) {
                  const numberDoubleArray = numberDouble.toString().split('');
                  const numberDoubleArraySum = numberDoubleArray.reduce(
                    (acc, number) => acc + parseInt(number),
                    0,
                  );
                  return numberDoubleArraySum;
                }
                return numberDouble;
              }
              return parseInt(number);
            },
          );
          const cardNumberArrayReverseMapSum = cardNumberArrayReverseMap.reduce(
            (acc, number) => acc + number,
            0,
          );
          return cardNumberArrayReverseMapSum % 10 === 0;
        }
        return false;
      }),
    cardName: Yup.string().required('Digite o nome impresso no cartão'),
    cardValidate: Yup.string()
      .required('Digite a data de validade no formato MM/AAAA')
      .test('test-validate', 'Data de validade inválida', (value) => {
        if (value) {
          const date = value.split('/');
          const month = parseInt(date[0]);
          const year = parseInt(date[1]);
          const dateNow = new Date();
          const monthNow = dateNow.getMonth() + 1;
          const yearNow = dateNow.getFullYear();
          if (year < yearNow) {
            return false;
          }
          if (year === yearNow && month < monthNow) {
            return false;
          }
          return true;
        }
        return false;
      }),
    cardCVV: Yup.string().required('Digite o código de segurança'),
  });

  const formikCreditCard = useFormik({
    initialValues: {
      cardNumber: '',
      cardName: '',
      cardValidate: '',
      cardCVV: '',
    },
    validationSchema: schemaCreditCard,
    onSubmit: async (values) => {
      setLoading(true);
      if (!user) return;
      const newValues = {
        holderName: values.cardName,
        expirationMonth: parseInt(values.cardValidate.split('/')[0]),
        expirationYear: parseInt(values.cardValidate.split('/')[1]),
        cardNumber: values.cardNumber.replace(/\s/g, ''),
        securityCode: values.cardCVV,
      };

      try {
        await createCustumerCreditCard(
          user.user_metadata.customer_id,
          newValues,
        );

        toast.success('Cartão de crédito adicionado com sucesso', {
          id: 'toast',
        });

        getCreditCards();

        setLoading(false);
      } catch (error) {
        toast.error('Erro ao adicionar o cartão de crédito', { id: 'toast' });
      } finally {
        setLoading(false);
      }
    },
  });

  function getCreditCardTypeIcon() {
    const cardType = creditCardType(formikCreditCard.values.cardNumber)[0]
      ?.type;
    return cardType ? iconCreditCard(cardType) : null;
  }

  function getCreditCardType() {
    const cardType = creditCardType(formikCreditCard.values.cardNumber)[0]
      ?.type;
    return cardType;
  }

  function formatCardValidate(value: string) {
    const formattedValue = value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{0,4})/, '$1/$2')
      .slice(0, 7);

    return formattedValue;
  }

  function removeSpaces(value: string) {
    const formattedValue = value.replace(/\s/g, '');
    return formattedValue;
  }

  async function getCreditCards() {
    if (!user) return;
    if (!user.user_metadata.customer_id) return;

    setLoading(true);
    try {
      const { data } = await getCustumerCreditCards(
        user.user_metadata.customer_id,
      );

      setCreditCards(data);

      setLoading(false);
    } catch (error) {
      toast.error('Erro ao carregar os cartões de crédito', { id: 'toast' });
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteCard(id: number) {
    if (!user) return;
    if (!id) return;

    try {
      const { status } = await deleteCustumerCreditCard(
        user.user_metadata.customer_id,
        id,
      );

      if (status === 202 || status === 200) {
        setCreditCards(creditCards.filter((card) => card.id !== id));
      }

      toast.success('Cartão de crédito deletado com sucesso', { id: 'toast' });
    } catch (error) {
      toast.error('Erro ao deletar o cartão de crédito. Tente novamente', {
        id: 'toast',
      });
    }
  }

  useEffect(() => {
    getCreditCards();
  }, []);

  return {
    formikCreditCard,
    getCreditCardTypeIcon,
    getCreditCardType,
    formatCardValidate,
    removeSpaces,
    loading,
    setLoading,
    openMenu,
    setOpenMenu,
    creditCards,
    setCreditCards,
    handleDeleteCard,
  };
}
