import appleIcon from 'assets/apple-icon.svg';
import googleIcon from 'assets/google-icon.svg';
import goFinancesLogo from 'assets/logo.svg';

import { useAuth } from 'contexts/Auth';

export function Login() {
  const { loginWithGoogle } = useAuth();

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center flex-col">
        <div className="bg-primary flex w-full h-screen items-center justify-evenly flex-col dark:bg-primaryDark">
          <img src={goFinancesLogo} alt="Logo" className="w-28 h-16" />

          <h2 className="text-2xl text-white font-medium w-56 text-center h-28 dark:text-textDark">
            Controle suas finanças de forma muito simples
          </h2>

          <p className="text-white text-sm w-44 font-normal text-center h-28 dark:text-textDark">
            Faça seu login com uma das contas abaixo
          </p>
        </div>
        <div className="bg-secondary flex w-full h-96 items-center flex-col dark:bg-secondaryDark">
          <div className="flex flex-col gap-4 w-full h-40 items-center justify-center">
            <button
              type="button"
              className="bg-white w-64 h-12 rounded-md text-title font-medium text-sm flex items-center dark:bg-backgroundCardDark dark:text-titleDark"
              onClick={loginWithGoogle}
            >
              <div className=" w-12 h-12 flex items-center justify-center border-solid border-[1px] border-r-background rounded-l-md dark:border-r-[#34383a] dark:border-l-0 dark:border-t-0 border-b-0">
                <img src={googleIcon} alt="Google" className="w-5 h-5" />
              </div>
              <div className="w-52 h-12 flex items-center justify-center">
                <span>Entrar com Google</span>
              </div>
            </button>

            <button
              type="button"
              className="bg-white w-64 h-12 rounded-md text-title font-medium text-sm flex items-center dark:bg-backgroundCardDark dark:text-titleDark"
            >
              <div className=" w-12 h-12 flex items-center justify-center border-solid border-[1px] border-r-background rounded-l-md dark:border-r-[#34383a] dark:border-l-0 dark:border-t-0 border-b-0">
                <img src={appleIcon} alt="Google" className="w-5 h-5" />
              </div>
              <div className="w-52 h-12 flex items-center justify-center">
                <span>Entrar com Apple</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
