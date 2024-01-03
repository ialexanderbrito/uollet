import { useEffect } from 'react';

import { Copy } from '@phosphor-icons/react';

import { useToast } from 'contexts/Toast';

import { useMFA } from 'hooks/useMFA';

import { Alert } from './Alert';
import { InputError } from './InputError';
import { MyDialog } from './Modal';

interface EnrollMFAProps {
  openModalMFA: boolean;
  setOpenModalMFA: (open: boolean) => void;
}

export function EnrollMFA({ openModalMFA, setOpenModalMFA }: EnrollMFAProps) {
  const { toast } = useToast();
  const {
    qr,
    secret,
    verifyCode,
    setVerifyCode,
    error,
    verifyMFA,
    verifyMFAEnabled,
    unenrollMFA,
    enrollMFA,
  } = useMFA();

  useEffect(() => {
    if (openModalMFA === true) {
      enrollMFA();
    }
  }, [openModalMFA]);

  return (
    <>
      <MyDialog
        isOpen={openModalMFA}
        closeModal={() => setOpenModalMFA(false)}
        title="Autenticação de dois fatores"
        description="Para ativar a autenticação de dois fatores, você precisa escanear o QR code abaixo com o aplicativo Google Authenticator ou Authy."
        buttonSecondary
        buttonPrimary
        textButtonSecondary={verifyMFAEnabled() ? 'Desativar' : 'Verificar'}
        handleChangeButtonSecondary={() => {
          if (verifyMFAEnabled()) {
            unenrollMFA();
            setOpenModalMFA(false);
          } else {
            verifyMFA();
          }
        }}
      >
        <div className="mt-4 flex flex-col items-center justify-center gap-2">
          {verifyMFAEnabled() ? (
            <div className="flex w-full flex-col items-center justify-center">
              <p className="text-left text-lg text-title dark:text-text-dark">
                Autenticação de dois fatores já está ativada, caso queira
                desativar, clique no botão abaixo.
              </p>
            </div>
          ) : (
            <>
              <Alert
                alertName="mfa"
                description="Pode acontecer de não conseguir de primeira, caso isso aconteça, tente novamente."
                title="Atenção!"
                variant="warning"
                className="mt-4"
              />
              <img src={qr} className="mb-2 rounded-lg bg-white" />
              <div className="flex w-full items-center gap-2">
                <input
                  type="text"
                  className="h-14 w-full rounded-lg bg-background-card p-4 text-sm text-title outline-none dark:bg-background-card-dark dark:text-title-dark"
                  value={secret}
                  disabled
                />

                <button
                  type="button"
                  className="h-14 w-14 rounded-lg bg-background-card p-4 text-title outline-none dark:bg-background-card-dark dark:text-title-dark"
                  onClick={() => {
                    navigator.clipboard.writeText(secret);
                    toast.success('Código copiado');
                  }}
                >
                  <Copy size={20} className="text-title dark:text-title-dark" />
                </button>
              </div>
              <div className="mt-2 flex w-full flex-col items-center justify-center">
                <input
                  type="text"
                  className={`h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none dark:bg-background-card-dark dark:text-title-dark ${
                    error ? 'border-[1.5px] border-danger' : ''
                  }`}
                  placeholder="Digite o código de verificação"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value.trim())}
                />
                {error && (
                  <InputError className="mt-1" error={true} message={error} />
                )}
              </div>
            </>
          )}
        </div>
      </MyDialog>
    </>
  );
}
