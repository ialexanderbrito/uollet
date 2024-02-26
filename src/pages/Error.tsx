import { useNavigate } from 'react-router-dom';

import { errorIllustration } from 'assets/illustrations';

import { Button } from 'components/Button';

interface ErrorProps {
  title?: string;
  description?: string;
  buttonText?: string;
  link?: string;
}

export function Error({
  title = 'Infelizmente a página não foi encontrada!',
  description,
  buttonText = 'Voltar para página inicial',
  link = '/',
}: ErrorProps) {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-4 dark:bg-background-dark">
      <img src={errorIllustration} alt="Erro 404" className="h-96 w-96" />
      <h1 className="text-sm font-normal text-title dark:text-title-dark">
        {title}
      </h1>
      <p className="text-body dark:text-body-dark text-xs">{description}</p>

      <div className="mt-10 flex w-full flex-col gap-4">
        <Button
          type="button"
          onClick={() => {
            navigate(link);
          }}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
