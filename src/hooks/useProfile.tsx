import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { supabase } from 'services/supabase';

export function useProfile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, setUser, logOut } = useAuth();

  const [loadingImage, setLoadingImage] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [loading, setLoading] = useState(false);

  function togglePassword() {
    if (passwordType === 'password') {
      setPasswordType('text');
    } else {
      setPasswordType('password');
    }
  }

  const formikUpdateUser = useFormik({
    initialValues: {
      name: user?.user_metadata.name,
      email: user?.email,
      phone: user?.user_metadata.phone || '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      setLoading(true);
      if (values.password !== values.confirmPassword) {
        toast.error('As senhas não coincidem', { id: 'updateUser' });
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.updateUser({
        data: {
          name: values.name,
          full_name: values.name,
          phone: values.phone,
        },
        email: values.email,
        password: values.password || undefined,
      });

      if (!data) return;

      if (error) {
        toast.error('Erro ao atualizar dados, tente novamente', {
          id: 'updateUser',
        });
        setLoading(false);
        return;
      }

      setUser(data.user);

      toast.success('Dados atualizados com sucesso', { id: 'updateUser' });
      setLoading(false);

      navigate('/profile');
    },
  });

  async function deleteUser(id: string) {
    try {
      const { error: errorImage } = await supabase.storage
        .from('avatars')
        .remove([`${id}`]);

      const { error: errorDeleteRows } = await supabase
        .from('finances_db')
        .delete()
        .match({ user_id: id });

      const { error } = await supabase.auth.admin.deleteUser(id);

      if (errorImage) {
        toast.error('Erro ao deletar imagem do usuário', { id: 'error' });
        return;
      }

      if (errorDeleteRows) {
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
      return;
    }

    setLoadingImage(true);
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
  }

  return {
    passwordType,
    togglePassword,
    formikUpdateUser,
    deleteUser,
    loadingImage,
    loading,
    handleUpload,
  };
}
