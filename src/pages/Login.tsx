import { useState } from 'react';

import { google } from 'assets/icons';
import goFinancesLogo from 'assets/logo.svg';

import { ModalLogin } from 'components/ModalLogin';

import { useAuth } from 'contexts/Auth';

export function Login() {
  const { loginWithGoogle } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  function handleOpenModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="flex h-screen w-full flex-col items-center justify-evenly bg-primary dark:bg-primary-dark">
          <img src={goFinancesLogo} alt="Logo" className="h-16 w-28" />

          <h2 className="h-28 w-56 text-center text-2xl font-medium text-white dark:text-text-dark">
            Controle suas finanças de forma muito simples
          </h2>

          <p className="h-28 w-44 text-center text-sm font-normal text-white dark:text-text-dark">
            Faça seu login com uma das contas abaixo
          </p>
        </div>
        <div className="flex h-96 w-full flex-col items-center bg-background dark:bg-background-dark">
          <div className="flex h-60 w-full flex-col items-center justify-center gap-4">
            <button
              type="button"
              className="flex h-12 w-64 items-center rounded-md border border-gray-400 bg-background-card text-sm font-medium text-title dark:bg-background-card-dark dark:text-title-dark"
              onClick={loginWithGoogle}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-l-md border-[1px] border-b-0 border-solid border-gray-400 border-r-background dark:border-l-0 dark:border-t-0 dark:border-r-[#34383a]">
                <img src={google} alt="Google" className="h-5 w-5" />
              </div>
              <div className="flex h-12 w-52 items-center justify-center">
                <span>Entrar com Google</span>
              </div>
            </button>
            <div className="mx-0 my-3 flex items-center text-sm text-title before:mr-4 before:h-[1px] before:w-28 before:flex-1 before:bg-title after:ml-4 after:h-[1px] after:w-28 after:flex-1 after:bg-title dark:text-text-dark before:dark:bg-text-dark after:dark:bg-text-dark">
              ou
            </div>
            <span
              className="cursor-pointer text-sm font-medium text-title underline dark:text-title-dark"
              onClick={() => handleOpenModal()}
            >
              Entre com seu e-mail e senha
            </span>
          </div>
          <ModalLogin closeModal={handleCloseModal} isOpen={openModal} />
        </div>
      </div>
    </>
  );
}
