import { useNavigate } from 'react-router-dom';

import errorIcon from 'assets/error.svg';

export function Error() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-4 dark:bg-backgroundDark">
      <img src={errorIcon} alt="Erro 404" className="h-96 w-96" />
      <h1 className="text-sm font-normal text-title dark:text-titleDark">
        Infelizmente a página não foi encontrada!
      </h1>

      <div className="mt-10 flex w-full flex-col gap-4">
        <button
          onClick={() => {
            navigate('/');
          }}
          type="button"
          className="h-14 w-full rounded-lg bg-secondary p-4 text-white dark:bg-secondaryDark"
        >
          Voltar para página inicial
        </button>
      </div>
    </div>
  );
}
