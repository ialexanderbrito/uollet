import { SetStateAction, useEffect, useState } from 'react';

import { KBar } from 'components/KBarComponent';
import { MyDialog } from 'components/Modal';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

export function MainRoutes() {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<SetStateAction<any>>();

  const { signed } = useAuth();

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsActive(true);
    });
  }, []);

  const closePopup = () => setIsActive(false);

  const urlParams = new URLSearchParams(window.location.search);
  const pwa = urlParams.get('pwa');

  function installPWA() {
    closePopup();

    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome !== 'accepted') {
        toast.error(
          'Infelizmente você não aceitou a instalação do App, pressione "ctrl + F5" e tente novamente',
        );
      }
    });
  }

  if (pwa === 'true') {
    return (
      <>
        {signed ? (
          <>
            <KBar>
              <PrivateRoutes />
            </KBar>
            <MyDialog
              closeModal={closePopup}
              isOpen={isActive}
              title="Instalar PWApp"
              description="Instale o PWA para ter uma melhor experiência. Clique em instalar e depois em adicionar a tela inicial, assim você poderá acessar o PWA como se fosse um aplicativo."
              handleChangeButtonSecondary={installPWA}
              textButtonSecondary="Instalar"
              buttonSecondary
            />
          </>
        ) : (
          <>
            <PublicRoutes />
            <MyDialog
              closeModal={closePopup}
              isOpen={isActive}
              title="Instalar PWApp"
              description="Instale o PWA para ter uma melhor experiência. Clique em instalar e depois em adicionar a tela inicial, assim você poderá acessar o PWA como se fosse um aplicativo."
              handleChangeButtonSecondary={installPWA}
              textButtonSecondary="Instalar"
              buttonSecondary
            />
          </>
        )}
      </>
    );
  }

  return signed ? (
    <>
      <KBar>
        <PrivateRoutes />
      </KBar>
    </>
  ) : (
    <PublicRoutes />
  );
}
