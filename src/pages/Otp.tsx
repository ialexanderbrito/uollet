import AuthCode from 'react-auth-code-input';
import { useLocation } from 'react-router-dom';

import { BottomNavigator } from 'components/BottomNavigator';
import { Header } from 'components/Header';

import { useAuth } from 'contexts/Auth';

import { useOtp } from 'hooks/useOtp';

export function Otp() {
  const location = useLocation();
  const { hasOtp } = useAuth();
  const {
    handleChangeOtp,
    savePasswordOtp,
    deleteOtp,
    timeOut,
    verifyButton,
    pageLocation,
  } = useOtp();

  return (
    <div className="flex h-screen w-full flex-col items-center bg-background dark:bg-backgroundDark">
      <Header
        title="Senha de acesso"
        showIcon={pageLocation(location.pathname)}
      />

      <div className="flex w-full flex-col items-center justify-center gap-2 p-4">
        <div className="mb-4 flex w-full flex-col items-center justify-center">
          <p className="text-center text-lg text-title dark:text-textDark">
            Digite a senha de acesso
          </p>
        </div>

        <div className="mb-4 flex w-full justify-around">
          <AuthCode
            onChange={handleChangeOtp}
            allowedCharacters="numeric"
            length={4}
            isPassword
            inputClassName="mr-2 ml-2 h-12 w-12 rounded-md border border-background bg-backgroundCard text-center text-2xl focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-backgroundDark dark:bg-backgroundCardDark dark:text-textDark"
            disabled={timeOut > 0}
          />
        </div>

        <button
          className="flex h-12 w-full items-center justify-center rounded-lg bg-secondary text-white dark:bg-secondaryDark"
          onClick={() => {
            savePasswordOtp();
          }}
          disabled={timeOut > 0}
        >
          {timeOut > 0 ? (
            <p className="text-center text-lg text-title dark:text-textDark">
              Aguarde {timeOut}s
            </p>
          ) : (
            <>{verifyButton()}</>
          )}
        </button>

        {hasOtp && pageLocation(location.pathname) && (
          <button
            className="h-14 w-full rounded-lg bg-danger p-4 text-white dark:bg-danger"
            onClick={() => {
              deleteOtp();
            }}
          >
            Remover senha de acesso
          </button>
        )}
      </div>

      {!pageLocation(location.pathname) ? null : <BottomNavigator />}
    </div>
  );
}
