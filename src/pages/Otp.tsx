import { useState } from 'react';
import OTPInput from 'react-otp-input';
import { useLocation, useNavigate } from 'react-router-dom';

import { BottomNavigator } from 'components/BottomNavigator';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { usePasswordCrypto } from 'hooks/usePassowordCrypto';

import { supabase } from 'services/supabase';

export function Otp() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, hasOtp, user } = useAuth();
  const [otp, setOtp] = useState('');
  const { hashPassword, verifyPassword } = usePasswordCrypto();

  function handleChangeOtp(otp: string) {
    setOtp(otp);
  }

  function pageLocation(page: string) {
    if (page === '/otp') {
      return true;
    }

    return false;
  }

  async function savePasswordOtp() {
    if (!user) return;

    if (hasOtp) {
      const verify = await verifyPassword(otp, user.user_metadata.otp);

      sessionStorage.setItem('@finance:hasOtp', 'true');

      if (verify === true) {
        window.location.reload();
      }
    }

    if (pageLocation(location.pathname)) {
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

    sessionStorage.setItem('@finance:hasOtp', 'false');

    toast.success('Senha de acesso apagada com sucesso', {
      id: 'success',
    });

    navigate('/profile');
  }

  return (
    <div className="flex h-screen w-full flex-col items-center bg-background dark:bg-backgroundDark">
      <div className="flex h-24 w-full flex-row bg-primary dark:bg-primaryDark">
        <div className="flex w-full items-center justify-center">
          <p className="text-lg font-normal text-white">Senha de acesso</p>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-2 p-4">
        <div className="mb-4 flex w-full flex-col items-center justify-center">
          <p className="text-center text-lg text-title dark:text-textDark">
            Digite a senha de acesso
          </p>
        </div>

        <div className="mb-4 flex w-full justify-around">
          <OTPInput
            renderInput={(props) => (
              <input
                {...props}
                style={{}}
                type="password"
                className="mr-2 ml-2 h-12 w-12 rounded-md border border-background bg-backgroundCard text-center text-2xl focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-backgroundDark dark:bg-backgroundCardDark dark:text-textDark"
              />
            )}
            value={otp}
            onChange={handleChangeOtp}
            numInputs={4}
            inputType="number"
          />
        </div>

        <button
          className="flex h-12 w-full items-center justify-center rounded-lg bg-secondary text-white dark:bg-secondaryDark"
          onClick={() => {
            savePasswordOtp();
          }}
        >
          {pageLocation(location.pathname) ? 'Salvar' : 'Entrar'}
        </button>

        {hasOtp && pageLocation(location.pathname) && (
          <button
            className="h-14 w-full rounded-lg bg-danger p-4 text-white dark:bg-danger"
            onClick={() => {
              deleteOtp();
            }}
          >
            Apagar
          </button>
        )}
      </div>

      {!pageLocation(location.pathname) ? null : <BottomNavigator />}
    </div>
  );
}
