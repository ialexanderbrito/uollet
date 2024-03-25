import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import { OrdersProp } from 'interfaces/OrdersProps';
import * as Yup from 'yup';

import { removeMaskCEP } from 'utils';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { api } from 'services/api';
import { getOrdersList } from 'services/payments';
import { supabase } from 'services/supabase';

export function useProfile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, setUser, logOut } = useAuth();

  const [loadingImage, setLoadingImage] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [loading, setLoading] = useState(false);
  const [hasSuccessImage, setHasSuccessImage] = useState(false);
  const [disabledStreet, setDisabledStreet] = useState(true);
  const [orders, setOrders] = useState<OrdersProp[]>([]);

  function togglePassword() {
    if (passwordType === 'password') {
      setPasswordType('text');
    } else {
      setPasswordType('password');
    }
  }

  const schemaUpdateUser = Yup.object({
    zipCode: Yup.string().required('CEP obrigatório'),
  });

  const formikUpdateUser = useFormik({
    initialValues: {
      name: user?.user_metadata.name,
      email: user?.email,
      phone: user?.user_metadata.phone || '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async () => { },
  });

  const formikAddress = useFormik({
    initialValues: {
      city: user?.user_metadata.address?.city || '',
      district: user?.user_metadata.address?.district || '',
      number: user?.user_metadata.address?.number || '',
      reference: user?.user_metadata.address?.reference || '',
      state: user?.user_metadata.address?.state || '',
      street: user?.user_metadata.address?.street || '',
      zipCode: user?.user_metadata.address?.zipCode || '',
    },
    validationSchema: schemaUpdateUser,
    onSubmit: async () => { },
  });

  async function updateUser() {
    setLoading(true);

    if (!user) return;

    if (
      formikUpdateUser.values.password !==
      formikUpdateUser.values.confirmPassword
    ) {
      toast.error('As senhas não coincidem', { id: 'updateUser' });
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.updateUser({
      email: formikUpdateUser.values.email,
      password: formikUpdateUser.values.password || undefined,
      data: {
        name: formikUpdateUser.values.name,
        full_name: formikUpdateUser.values.name,
        phone: formikUpdateUser.values.phone,
      },
    });

    if (error) {
      toast.error('Erro ao atualizar dados, tente novamente', {
        id: 'updateUser',
      });
      setLoading(false);
      return;
    }

    if (!data) return;

    setUser(data.user);

    toast.success('Dados atualizados com sucesso', { id: 'updateUser' });
    setLoading(false);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function updateUserAddress() {
    setLoading(true);

    if (!user) return;
    const { data, error } = await supabase.auth.updateUser({
      email: formikUpdateUser.values.email,
      password: formikUpdateUser.values.password || undefined,
      data: {
        name: formikUpdateUser.values.name,
        full_name: formikUpdateUser.values.name,
        phone: formikUpdateUser.values.phone,
        address: {
          street: formikAddress.values.street,
          number: formikAddress.values.number,
          reference: formikAddress.values.reference,
          district: formikAddress.values.district,
          city: formikAddress.values.city,
          state: formikAddress.values.state,
          zipCode: formikAddress.values.zipCode,
        },
      },
    });

    if (error) {
      toast.error('Erro ao atualizar dados, tente novamente', {
        id: 'updateUser',
      });
      setLoading(false);
      return;
    }

    if (!data) return;

    setUser(data.user);

    toast.success('Dados atualizados com sucesso', { id: 'updateUser' });
    setLoading(false);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function deleteUser(id: string) {
    try {
      const { error: errorImage } = await supabase.storage
        .from('avatars')
        .remove([`${id}`]);

      const { error: errorDeleteRows } = await supabase
        .from('finances_db')
        .delete()
        .match({ user_id: id });

      const { error: errorDeleteRowsCreditCard } = await supabase
        .from('credit_card_db')
        .delete()
        .match({ user_id: id });

      const { error: errorDeleteRowsRecurrency } = await supabase
        .from('finances_recurrency_db')
        .delete()
        .match({ user_id: id });

      const { error } = await supabase.auth.admin.deleteUser(id);

      if (errorImage) {
        toast.error('Erro ao deletar imagem do usuário', { id: 'error' });
        return;
      }

      if (
        errorDeleteRows ||
        errorDeleteRowsCreditCard ||
        errorDeleteRowsRecurrency
      ) {
        toast.error('Erro ao deletar registros do usuário', { id: 'error' });
        return;
      }

      if (error) {
        toast.error('Erro ao deletar usuário', { id: 'error' });
        return;
      }

      toast.success('Usuário deletado com sucesso', { id: 'success' });
      logOut();
      navigate('/');
    } catch (error) {
      toast.error('Erro ao deletar usuário', { id: 'error' });
    }
  }

  async function handleUpload(file: File) {
    if (user?.user_metadata.avatar_url || user?.user_metadata.picture) {
      setLoadingImage(true);
      toast.loading('Enviando imagem...', { id: 'image' });
      const { error } = await supabase.storage
        .from('avatars')
        .update(`${user?.id}`, file, {
          cacheControl: '1',
        });

      if (error) {
        toast.error('Erro ao enviar imagem, tente novamente', { id: 'image' });
        setLoadingImage(false);
        return;
      }

      const { data: dataImage } = supabase.storage
        .from('avatars')
        .getPublicUrl(`${user?.id}`, {
          download: true,
        });

      const { data: updateUser } = await supabase.auth.updateUser({
        data: {
          picture: dataImage?.publicUrl,
          avatar_url: dataImage?.publicUrl,
        },
      });

      setUser(updateUser.user);

      toast.success('Imagem enviada com sucesso', { id: 'image' });
      setLoadingImage(false);
      setHasSuccessImage(true);
      return;
    }

    setLoadingImage(true);
    setHasSuccessImage(false);
    toast.loading('Enviando imagem...', { id: 'image' });
    const { error } = await supabase.storage
      .from('avatars')
      .upload(`${user?.id}`, file, {
        cacheControl: '1',
      });

    if (error) {
      toast.error('Erro ao enviar imagem, tente novamente', { id: 'image' });
      setLoadingImage(false);
      return;
    }

    const { data: dataImage } = supabase.storage
      .from('avatars')
      .getPublicUrl(`${user?.id}`);

    const { data: updateUser } = await supabase.auth.updateUser({
      data: {
        picture: dataImage?.publicUrl,
        avatar_url: dataImage?.publicUrl,
      },
    });

    setUser(updateUser.user);

    toast.success('Imagem enviada com sucesso', { id: 'image' });

    setLoadingImage(false);
    setHasSuccessImage(true);
  }

  async function handleChangeCEP(cep: string) {
    const cepwithoutMask = removeMaskCEP(cep);

    if (cep && cep.length === 9) {
      try {
        const { data } = await api.get(`cep/${cepwithoutMask}`);

        if (data.street === '' || data.neighborhood === '') {
          setDisabledStreet(false);
        } else {
          setDisabledStreet(true);
        }

        formikAddress.setFieldValue('street', data.street);
        formikAddress.setFieldValue('district', data.neighborhood);
        formikAddress.setFieldValue('state', data.state);
        formikAddress.setFieldValue('city', data.city);
      } catch (error) {
        toast.error('Erro ao buscar CEP, tente novamente', { id: 'error' });
      }
    }
  }

  async function getOrdersListUser() {
    if (!user?.user_metadata.identification_number) return;

    setLoading(true);
    try {
      const { data } = await getOrdersList(
        user?.user_metadata.identification_number,
      );

      if (!data) {
        setOrders([]);
        setLoading(false);
        return;
      }

      setOrders(data);
    } catch (error) {
      toast.error('Erro ao buscar pedidos, tente novamente', { id: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function linkProviderGoogle() {
    if (!user) return;

    try {
      const { error } = await supabase.auth.linkIdentity({
        provider: 'google',
      });

      if (error) {
        toast.error('Não foi possível vincular sua conta do Google', {
          id: 'linkProviderGoogle',
        });
      }
    } catch (error) {
      toast.error('Não foi possível vincular sua conta do Google', {
        id: 'linkProviderGoogle',
      });
    }
  }

  async function unlinkProviderGoogle() {
    if (!user) return;

    try {
      const { data: dataIdentities } = await supabase.auth.getUserIdentities();

      const googleIdentity = dataIdentities?.identities.find(
        (identity) => identity.provider === 'google',
      );

      if (!googleIdentity) return;

      const { data, error } =
        await supabase.auth.unlinkIdentity(googleIdentity);

      if (error) {
        toast.error('Não foi possível desvincular sua conta do Google', {
          id: 'unlinkProviderGoogle',
        });
        return;
      }

      if (data) {
        toast.success('Conta do Google desvinculada com sucesso', {
          id: 'unlinkProviderGoogle',
        });

        supabase.auth.refreshSession();

        setTimeout(() => {
          navigate(0);
        }, 1000);
      }
    } catch (error) {
      toast.error('Não foi possível desvincular sua conta do Google', {
        id: 'unlinkProviderGoogle',
      });
    }
  }

  useEffect(() => {
    getOrdersListUser();
  }, []);

  return {
    passwordType,
    togglePassword,
    formikUpdateUser,
    deleteUser,
    loadingImage,
    loading,
    handleUpload,
    hasSuccessImage,
    setHasSuccessImage,
    formikAddress,
    handleChangeCEP,
    disabledStreet,
    orders,
    updateUserAddress,
    updateUser,
    linkProviderGoogle,
    unlinkProviderGoogle,
  };
}
