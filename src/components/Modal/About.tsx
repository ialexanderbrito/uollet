import logo from 'assets/favicon.svg';

import { useDetectDevice } from 'hooks/useDetectDevice';

export function About() {
  const { browser, isDesktop, isMobile, isTablet, os } = useDetectDevice();
  return (
    <>
      <img
        src={logo}
        alt="Logo"
        className="mx-auto mb-2 h-16 w-16 rounded-md"
      />

      <div className="mt-2 flex flex-col items-center justify-center gap-2 ">
        <p className="text-sm text-text dark:text-textDark">
          Versão {import.meta.env.PACKAGE_VERSION}
        </p>
        <p className="text-sm text-text dark:text-textDark">
          Plataforma: {isMobile && 'Mobile'}
          {isTablet && 'Tablet'}
          {isDesktop && 'Desktop'}
        </p>

        <p className="text-sm text-text dark:text-textDark">
          Navegador: {browser}
        </p>

        <p className="text-sm text-text dark:text-textDark">
          Sistema Operacional: {os}
        </p>
      </div>
    </>
  );
}
