import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { supabase } from 'services/supabase';

import { useCrypto } from './useCrypto';

export function useOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { setUser, hasOtp, user } = useAuth();
  const { hashPassword, verifyPassword } = useCrypto();

  const [otp, setOtp] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [timeOut, setTimeOut] = useState(0);

  async function handleChangeOtp(otp: string) {
    if (!user) return;

    setOtp(otp);

    if (otp.length === 4 && !pageLocation(location.pathname)) {
      const verify = await verifyPassword(otp, user.user_metadata.otp);

      if (verify === true) {
        sessionStorage.setItem('@uollet:hasOtp', 'true');

        window.location.reload();
      } else {
        toast.error('Senha de acesso incorreta', {
          id: 'error',
        });

        setAttempt(attempt + 1);

        if (attempt === 1) {
          toast.error(
            'Cuidado você só tem mais 1 tentativa, depois disso você será bloqueado por 30s',
            {
              id: 'error',
            },
          );
        }

        if (attempt === 2) {
          toast.error('Você errou a senha de acesso 3 vezes. Aguarde 30s', {
            id: 'error',
          });

          sessionStorage.setItem('@uollet:timeOut', '30');

          setTimeOut(30);
          setAttempt(0);
        }
      }
    }
  }

  function pageLocation(page: string) {
    if (page === '/otp') {
      return true;
    }

    return false;
  }

  async function handleEnterOtp() {
    if (!user) return;

    if (otp.length !== 4) {
      toast.error('Digite o PIN corretamente com 4 dígitos', {
        id: 'error',
      });
      return;
    }
    if (!pageLocation(location.pathname)) {
      const verify = await verifyPassword(otp, user.user_metadata.otp);

      if (verify === true) {
        sessionStorage.setItem('@uollet:hasOtp', 'true');

        window.location.reload();
      } else {
        toast.error('Senha de acesso incorreta', {
          id: 'error',
        });

        setAttempt(attempt + 1);

        if (attempt === 1) {
          toast.error(
            'Cuidado você só tem mais 1 tentativa, depois disso você será bloqueado por 30s',
            {
              id: 'error',
            },
          );
        }

        if (attempt === 2) {
          toast.error('Você errou a senha de acesso 3 vezes. Aguarde 30s', {
            id: 'error',
          });

          sessionStorage.setItem('@uollet:timeOut', '30');

          setTimeOut(30);
          setAttempt(0);
        }
      }
    }
  }

  async function savePasswordOtp() {
    if (!user) return;

    if (hasOtp) {
      const verify = await verifyPassword(otp, user.user_metadata.otp);

      sessionStorage.setItem('@uollet:hasOtp', 'true');
      if (verify === true) {
        toast.error('A senha de acesso não pode ser igual a anterior', {
          id: 'error',
        });
        return;
      }
    }

    if (pageLocation('/otp')) {
      const hash = await hashPassword(otp);

      const { data } = await supabase.auth.updateUser({
        data: {
          otp: hash,
        },
      });

      if (!data.user) return;

      setUser(data.user);

      toast.success('Senha de acesso salva com sucesso', {
        id: 'success',
      });

      navigate('/profile');
    }
  }

  async function deleteOtp() {
    const { data } = await supabase.auth.updateUser({
      data: {
        otp: null,
      },
    });

    if (!data.user) return;

    setUser(data.user);

    sessionStorage.setItem('@uollet:hasOtp', 'false');

    toast.success('Senha de acesso apagada com sucesso', {
      id: 'success',
    });

    navigate('/profile');
  }

  function verifyButton() {
    if (!user) return;

    if (pageLocation(location.pathname) && !user.user_metadata.otp) {
      return 'Salvar';
    }

    if (!pageLocation(location.pathname)) {
      return 'Entrar';
    }

    if (pageLocation(location.pathname) && user.user_metadata.otp) {
      return 'Atualizar';
    }
  }

  useEffect(() => {
    const storedTimeOut = sessionStorage.getItem('@uollet:timeOut');

    if (storedTimeOut) {
      const parsedTimeOut = parseInt(storedTimeOut, 10);

      if (!isNaN(parsedTimeOut)) {
        setTimeOut(parsedTimeOut);
      }
    }
  }, []);

  useEffect(() => {
    if (timeOut > 0) {
      const timeoutId = setTimeout(() => {
        setTimeOut(timeOut - 1);
        sessionStorage.setItem('@uollet:timeOut', timeOut.toString());
      }, 1000);

      return () => clearTimeout(timeoutId);
    } else if (timeOut === 0) {
      sessionStorage.removeItem('@uollet:timeOut');
    }
  }, [timeOut]);

  return {
    pageLocation,
    handleChangeOtp,
    savePasswordOtp,
    deleteOtp,
    verifyButton,
    timeOut,
    handleEnterOtp,
  };
}
