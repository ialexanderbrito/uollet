import { useNavigate } from 'react-router-dom';

import errorIcon from 'assets/error.svg';

export function Error() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-background p-4 dark:bg-backgroundDark">
      <img src={errorIcon} alt="Erro 404" className="w-96 h-96" />
      <h1 className="font-normal text-sm text-title dark:text-titleDark">
        Infelizmente a página não foi encontrada!
      </h1>

      <div className="flex flex-col gap-4 w-full mt-10">
        <button
          onClick={() => {
            navigate('/');
          }}
          type="button"
          className="bg-secondary text-white rounded-lg p-4 w-full h-14 dark:bg-secondaryDark"
        >
          Voltar para página inicial
        </button>
      </div>
    </div>
  );
}
