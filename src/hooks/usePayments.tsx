import { useEffect, useState } from 'react';

import { Jelly } from '@uiball/loaders';
import { format, addDays } from 'date-fns';
import { useFormik } from 'formik';
import { PaymentsProps } from 'interfaces/PaymentsProps';
import * as Yup from 'yup';

import {
  formatCellPhone,
  isValidCPF,
  removeMaskCEP,
  removeMaskCPF,
  stateNameToId,
} from 'utils';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { api } from 'services/api';
import {
  createCustomer,
  getPlansList,
  subscribePlan,
  updateCustomer,
} from 'services/payments';
import { supabase } from 'services/supabase';

export interface PlanProps {
  id: number;
  storeId: number;
  name: string;
  description: string;
  frequency: number;
  productCategory: number;
  products: any[];
  maxCharges: number;
  chargeDaysBefore: number;
  paymentTypes: number[];
  amount: number;
  currency: number;
  gracePeriod: number;
  status: number;
  tax?: string;
  isVisible: number;
}

export function usePayments() {
  const { toast } = useToast();
  const { user, checkUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [disabledStreet, setDisabledStreet] = useState(true);
  const [disabledCpf, setDisabledCpf] = useState(true);
  const [steps, setSteps] = useState(1);
  const [isEditPersonalData, setIsEditPersonalData] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);
  const [paymentType, setPaymentType] = useState('credit-card');
  const [plans, setPlans] = useState<PlanProps[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<number>();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [cardSelected, setCardSelected] = useState<number | undefined>(0);

  const [paymentOrder, setPaymentOrder] = useState<PaymentsProps>();

  const schema = Yup.object({
    cep: Yup.string()
      .required('CEP é obrigatório')
      .max(9, 'CEP inválido máximo de 9 caracteres'),
    street: Yup.string().required('Rua é obrigatório'),
    number: Yup.string().required('Número é obrigatório'),
    neighborhood: Yup.string().required('Bairro é obrigatório'),
    city: Yup.string().required('Cidade é obrigatório'),
    state: Yup.string()
      .required('Estado é obrigatório')
      .max(2, 'Estado inválido'),
    complement: Yup.string().max(100, 'Máximo de 100 caracteres'),
  });

  const formik = useFormik({
    initialValues: {
      cep: '',
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      complement: '',
    },
    validationSchema: schema,
    onSubmit: () => {
      setSteps(2);
    },
  });

  async function searchCEP(cep: string) {
    setLoading(true);
    const cepWithoutMask = cep.replace(/\D/g, '');

    try {
      const { data } = await api.get(`cep/${cepWithoutMask}`);

      if (data.street === '' || data.neighborhood === '') {
        setDisabledStreet(false);
      } else {
        setDisabledStreet(true);
      }

      formik.setFieldValue('street', data.street);
      formik.setFieldValue('neighborhood', data.neighborhood);
      formik.setFieldValue('state', data.state);
      formik.setFieldValue('city', data.city);

      return data;
    } catch (error) {
      toast.error('CEP inválido', { id: 'toast' });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  const schemaPersonalData = Yup.object({
    firstName: Yup.string().required('Nome é obrigatório'),
    lastName: Yup.string().required('Sobrenome é obrigatório'),
    cpf: Yup.string()
      .required('CPF é obrigatório')
      .max(14, 'CPF inválido máximo de 14 caracteres')
      .test('cpf', 'CPF inválido', (value) => isValidCPF(value)),
    dateOfBirth: Yup.string()
      .required('Data de Nascimento é obrigatório')
      .test(
        'age',
        'Você deve ter mais de 18 anos',
        (value) =>
          new Date().getFullYear() - new Date(value).getFullYear() >= 18,
      ),

    cellphone: Yup.string()
      .required('Celular é obrigatório')
      .max(15, 'Celular inválido máximo de 15 caracteres'),
  });

  const formikPersonalData = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      cpf: '',
      dateOfBirth: '',
      cellphone: '',
    },
    validationSchema: schemaPersonalData,
    onSubmit: async (values) => {
      setLoading(true);

      if (!user) return;

      const birthdate = format(new Date(values.dateOfBirth), 'yyyy-MM-dd');
      const birthdateWithDays = addDays(new Date(birthdate), 2);

      const newValues = {
        firstName: values.firstName,
        surname: values.lastName,
        identificationNumber: removeMaskCPF(values.cpf),
        birthdate: format(birthdateWithDays, 'yyyy-MM-dd'),
        email: user.email,
        phone: formatCellPhone(values.cellphone),
        address: {
          street: formik.values.street,
          number: formik.values.number,
          zipcode: removeMaskCEP(formik.values.cep),
          reference: formik.values.complement,
          district: formik.values.neighborhood,
          city: formik.values.city,
          state: stateNameToId(formik.values.state),
          country: 0,
        },
      };

      try {
        let data;

        if (user.user_metadata.identification_number) {
          const { data: updateResult } = await updateCustomer(
            newValues,
            user.user_metadata.customer_id,
          );
          data = updateResult;
        } else {
          const { data: createResult } = await createCustomer(newValues);
          data = createResult;
        }

        if (data) {
          const { data: dataUser } = await supabase.auth.updateUser({
            data: {
              identification_number: data.cpf,
              phone: data.phone,
              address: data.address,
              birthdate: format(new Date(data.birthdate), 'yyyy-MM-dd'),
              customer_id: data.id,
              last_name: values.lastName,
            },
          });

          if (!dataUser.user) {
            toast.error('Erro ao atualizar dados do usuário', { id: 'toast' });
          }

          toast.success('Dados atualizados com sucesso', { id: 'toast' });

          checkUser();

          setSteps(3);
        }
      } catch (error) {
        toast.error('Erro ao atualizar dados', { id: 'toast' });
      } finally {
        setLoading(false);
      }
    },
  });

  function buttonSteps() {
    if ((steps === 2 || steps === 5) && loading) {
      return (
        <div>
          <Jelly color="#fff" size={20} />
        </div>
      );
    }

    if (steps === 1) {
      return 'Próximo';
    }

    if (steps === 5) {
      return 'Finalizar';
    }

    return 'Próximo';
  }

  function buttonStepsPrevious() {
    if (steps === 1) {
      return 'Cancelar';
    }

    if (steps === 6) {
      return 'Fechar';
    }

    return 'Voltar';
  }

  async function getAddressUser() {
    if (!user?.user_metadata.address) {
      return;
    }

    let zipCode = user?.user_metadata.address.zipCode;

    if (zipCode?.length === 8) {
      formik.setFieldValue('cep', zipCode);
    }

    if (zipCode?.length === 9) {
      zipCode = zipCode.replace(/\D/g, '');
    }

    const addressValues = {
      cep: zipCode,
      street: user?.user_metadata.address.street,
      number: user?.user_metadata.address.number,
      neighborhood: user?.user_metadata.address.district,
      city: user?.user_metadata.address.city,
      complement: user?.user_metadata.address.reference,
    };

    formik.setValues({
      ...formik.values,
      ...addressValues,
    });

    if (!user?.user_metadata.address.state && !formik.values.state) {
      const { data } = await searchCEP(zipCode);

      if (data) {
        setIsEditAddress(true);
        formik.setValues({
          ...formik.values,
          ...addressValues,
          street: data.street,
          neighborhood: data.neighborhood,
          state: data.state,
          city: data.city,
        });
      }
    }

    setCompletedSteps([...completedSteps, 1]);
  }

  async function getPersonalDataUser() {
    if (!user) return;
    if (!user.user_metadata.identification_number) {
      setDisabledCpf(false);
    }

    formikPersonalData.setValues({
      ...formikPersonalData.values,
      cpf: user.user_metadata.identification_number || '',
      dateOfBirth: user.user_metadata.birthdate
        ? format(new Date(user.user_metadata.birthdate), 'yyyy-MM-dd')
        : '',
      firstName: user.user_metadata.name,
      lastName: user.user_metadata.last_name,
      cellphone: user.user_metadata.phone,
    });
    setCompletedSteps([...completedSteps, 2]);
  }

  useEffect(() => {
    if (steps === 1) {
      getAddressUser();
    }

    if (steps === 2) {
      getPersonalDataUser();
    }
  }, [steps]);

  function isDataChangedAddress() {
    const userAddress = user?.user_metadata.address;

    const formikAddress = {
      cep: formik.values.cep,
      street: formik.values.street,
      number: formik.values.number,
      neighborhood: formik.values.neighborhood,
      city: formik.values.city,
      complement: formik.values.complement,
    };

    const isAddressChanged =
      userAddress?.zipCode === removeMaskCEP(formikAddress.cep) &&
      userAddress?.street === formikAddress.street &&
      userAddress?.number === formikAddress.number &&
      userAddress?.district === formikAddress.neighborhood &&
      userAddress?.city === formikAddress.city &&
      userAddress?.reference === formikAddress.complement;

    return isAddressChanged;
  }

  function isDataChangedPersonalData() {
    if (!user) return false;

    const dateOfBirth = addDays(
      new Date(formikPersonalData.values.dateOfBirth),
      2,
    );
    const formatedDateOfBirth = format(dateOfBirth, 'yyyy-MM-dd');

    const isPersonalDataChanged =
      user.user_metadata.identification_number ===
        removeMaskCPF(formikPersonalData.values.cpf) &&
      user.user_metadata.name === formikPersonalData.values.firstName &&
      user.user_metadata.last_name === formikPersonalData.values.lastName &&
      user.user_metadata.birthdate === formatedDateOfBirth &&
      user.user_metadata.phone ===
        formatCellPhone(formikPersonalData.values.cellphone);

    return isPersonalDataChanged;
  }

  async function nextStep() {
    if (!user) return;
    if (!user.user_metadata) return;

    if (steps === 1) {
      if (isDataChangedAddress()) {
        setSteps(2);
      } else {
        formik.handleSubmit();
        setSteps(2);
      }
    }

    if (steps === 2) {
      if (isDataChangedPersonalData() && isDataChangedAddress()) {
        setSteps(3);
      } else {
        formik.handleSubmit();
        formikPersonalData.handleSubmit();
      }
    }

    if (steps === 3) {
      if (!selectedPlan) {
        toast.error('Selecione um plano', { id: 'toast' });
        return;
      }

      setSteps(4);
    }

    if (steps === 4) {
      if (paymentType === 'credit-card') {
        if (!cardSelected) {
          toast.error('Selecione um cartão de crédito', { id: 'toast' });
          return;
        }
      }

      setSteps(5);
    }

    if (steps === 4) {
      setSteps(5);
    }

    if (steps === 5) {
      setLoading(true);
      try {
        if (paymentType === 'credit-card') {
          if (!user.user_metadata.customer_id) {
            toast.error('Erro ao realizar plano', { id: 'toast' });
            return;
          }

          const { data } = await subscribePlan(
            Number(selectedPlan),
            user.user_metadata.customer_id,
            'credit',
            cardSelected,
          );

          if (!data) {
            toast.error('Erro ao realizar plano', { id: 'toast' });
            return;
          }

          setPaymentOrder(data);

          toast.success(
            'Plano realizado com sucesso, efetue o pagamento e aguarde a confirmação',
            { id: 'toast' },
          );
          setSteps(6);
          return;
        } else {
          const { data } = await subscribePlan(
            Number(selectedPlan),
            user.user_metadata.customer_id,
            paymentType,
          );

          if (!data) {
            toast.error('Erro ao realizar plano', { id: 'toast' });
            return;
          }

          setPaymentOrder(data);

          toast.success(
            'Plano realizado com sucesso, efetue o pagamento e aguarde a confirmação',
            { id: 'toast' },
          );
          setSteps(6);
          return;
        }
      } catch (error) {
        toast.error('Erro ao realizar plano', { id: 'toast' });
      } finally {
        setLoading(false);
      }
    }

    if (steps === 6) {
      console.log('finalizar');
    }

    setCompletedSteps((prevCompletedSteps) => {
      if (!prevCompletedSteps.includes(steps)) {
        return [...prevCompletedSteps, steps];
      }
      return prevCompletedSteps;
    });
  }

  async function previousStep() {
    if (steps === 1) {
      return;
    }

    if (steps === 6) {
      return;
    }

    setSteps(steps - 1);

    setCompletedSteps((prevCompletedSteps) => {
      if (prevCompletedSteps.includes(steps)) {
        return prevCompletedSteps.filter((cs) => cs !== steps);
      }
      return prevCompletedSteps;
    });
  }

  async function getPlans() {
    setLoading(true);
    try {
      const { data } = await getPlansList();

      setPlans(data.plans);
    } catch (error) {
      toast.error('Erro ao buscar planos', { id: 'toast' });
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (steps === 3 && !plans.length) {
      getPlans();
    }
  }, [steps]);

  return {
    loading,
    disabledStreet,
    formik,
    searchCEP,
    steps,
    setSteps,
    nextStep,
    formikPersonalData,
    buttonSteps,
    disabledCpf,
    setIsEditPersonalData,
    setIsEditAddress,
    isEditPersonalData,
    isEditAddress,
    paymentType,
    setPaymentType,
    plans,
    setPlans,
    selectedPlan,
    setSelectedPlan,
    completedSteps,
    previousStep,
    paymentOrder,
    buttonStepsPrevious,
    cardSelected,
    setCardSelected,
  };
}
