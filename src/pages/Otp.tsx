import AuthCode from 'react-auth-code-input';
import { useLocation } from 'react-router-dom';

import { Alert } from 'components/Alert';
import { Header } from 'components/Header';

import { useMFA } from 'hooks/useMFA';
import { useOtp } from 'hooks/useOtp';

interface OtpProps {
  isOtp?: boolean;
  isMFA?: boolean;
}

export function Otp({ isOtp, isMFA }: OtpProps) {
  const location = useLocation();
  const { handleChangeMFA, savePasswordMFA, pageLocationMFA } = useMFA();
  const { handleChangeOtp, savePasswordOtp } = useOtp();

  return (
    <div className="flex h-screen w-full flex-col items-center bg-background dark:bg-backgroundDark">
      <Header
        title="Senha de acesso"
        showIcon={pageLocationMFA(location.pathname)}
      />

      {isMFA && (
        <>
          <div className="flex w-full flex-col items-center justify-center gap-2 p-4">
            <Alert
              title="Atenção"
              description="Por ser um recurso em fase beta, o MFA pode apresentar instabilidades. Então tente algumas vezes caso não consiga acessar. Caso não consiga, desative o MFA e entre em contato com o suporte"
              variant="info"
              alertName="mfaHome"
              className="mb-4"
            />
            <div className="mb-4 flex w-full flex-col items-center justify-center">
              <p className="text-center text-lg text-title dark:text-textDark">
                Digite o código de 2 fatores para acessar o aplicativo
              </p>
            </div>

            <div className="mb-4 flex w-full justify-around">
              <AuthCode
                onChange={handleChangeMFA}
                allowedCharacters="numeric"
                length={6}
                inputClassName="mr-2 ml-2 h-12 w-12 rounded-md border border-background bg-backgroundCard text-center text-2xl focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-backgroundDark dark:bg-backgroundCardDark dark:text-textDark"
              />
            </div>

            <button
              className="flex h-12 w-full items-center justify-center rounded-lg bg-secondary text-white dark:bg-secondaryDark"
              onClick={() => {
                savePasswordMFA();
              }}
            >
              Entrar
            </button>
          </div>
        </>
      )}

      {isOtp && (
        <div className="flex w-full flex-col items-center justify-center gap-2 p-4">
          <div className="mb-4 flex w-full flex-col items-center justify-center">
            <p className="text-center text-lg text-title dark:text-textDark">
              Digite seu PIN para acessar o aplicativo
            </p>
          </div>

          <div className="mb-4 flex w-full justify-around">
            <AuthCode
              onChange={handleChangeOtp}
              allowedCharacters="numeric"
              length={4}
              isPassword
              inputClassName="mr-2 ml-2 h-12 w-12 rounded-md border border-background bg-backgroundCard text-center text-2xl focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-backgroundDark dark:bg-backgroundCardDark dark:text-textDark"
            />
          </div>

          <button
            className="flex h-12 w-full items-center justify-center rounded-lg bg-secondary text-white dark:bg-secondaryDark"
            onClick={() => {
              savePasswordOtp();
            }}
          >
            Entrar
          </button>
        </div>
      )}
    </div>
  );
}
