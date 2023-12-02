import AuthCode from 'react-auth-code-input';

import { useAuth } from 'contexts/Auth';

import { useOtp } from 'hooks/useOtp';

import { MyDialog } from './Modal';

interface EnrollOtpProps {
  openModalOtp: boolean;
  setOpenModalOtp: (open: boolean) => void;
}

export function EnrollOtp({ openModalOtp, setOpenModalOtp }: EnrollOtpProps) {
  const { hasOtp } = useAuth();
  const { deleteOtp, handleChangeOtp, savePasswordOtp } = useOtp();
  return (
    <>
      <MyDialog
        isOpen={openModalOtp}
        closeModal={() => setOpenModalOtp(false)}
        title="PIN de acesso rápido"
        description="Para ativar a senha de acesso rápido basta digitar o código de 4 dígitos abaixo."
        buttonSecondary
        buttonPrimary
        textButtonSecondary={hasOtp ? 'Apagar' : 'Adicionar'}
        handleChangeButtonSecondary={() => {
          if (hasOtp) {
            deleteOtp();
            setOpenModalOtp(false);
          } else {
            savePasswordOtp();
            setOpenModalOtp(false);
          }
        }}
      >
        <div className="mt-4 flex w-full flex-col items-center justify-center gap-2">
          <div className="mb-4 flex w-full flex-col items-center justify-center">
            <p className="text-center text-lg text-title dark:text-text-dark">
              Digite a senha de acesso
            </p>
          </div>

          <div className="flex w-full justify-around">
            <AuthCode
              onChange={handleChangeOtp}
              allowedCharacters="numeric"
              length={4}
              isPassword
              inputClassName="mr-2 ml-2 h-12 w-12 rounded-md border border-background-card bg-background-card text-center text-2xl focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-background-card-dark dark:bg-background-card-dark dark:text-text-dark"
              disabled={hasOtp}
            />
          </div>
        </div>
      </MyDialog>
    </>
  );
}
