import { useEffect, useState } from 'react';

import logo from 'assets/logo.svg';

import { Button } from './Button';

interface CheckConnectionProps {
  children: React.ReactNode;
}

export function CheckConnection({ children }: CheckConnectionProps) {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  useEffect(() => {
    const onlineHandler = () => setOnline(true);

    const offlineHandler = () => setOnline(false);

    window.addEventListener('online', onlineHandler);

    window.addEventListener('offline', offlineHandler);

    return () => {
      window.removeEventListener('online', onlineHandler);

      window.removeEventListener('offline', offlineHandler);
    };
  }, []);

  return (
    <>
      {online ? (
        children
      ) : (
        <div className="flex h-screen w-full flex-col items-center justify-center">
          <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background dark:bg-background-dark">
            <img src={logo} alt="Logo" />
            <h2 className="text-center text-xl font-medium text-title dark:text-title-dark">
              Algo deu errado, mas não se preocupe - vamos tentar novamente.
            </h2>
            <Button type="submit" inline>
              Tentar novamente
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
