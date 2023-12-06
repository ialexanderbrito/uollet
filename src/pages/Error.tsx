import { useNavigate } from 'react-router-dom';

import errorIcon from 'assets/error.svg';

import { Button } from 'components/Button';

export function Error() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-4 dark:bg-background-dark">
      <img src={errorIcon} alt="Erro 404" className="h-96 w-96" />
      <h1 className="text-sm font-normal text-title dark:text-title-dark">
        Infelizmente a página não foi encontrada!
      </h1>

      <div className="mt-10 flex w-full flex-col gap-4">
        <Button
          type="button"
          onClick={() => {
            navigate('/');
          }}
        >
          Voltar para página inicial
        </Button>
      </div>
    </div>
  );
}
