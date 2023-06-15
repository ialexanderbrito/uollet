import { FileArrowUp } from '@phosphor-icons/react';

import { BottomNavigator } from 'components/BottomNavigator';
import { Header } from 'components/Header';
import { Loading } from 'components/Loading';

import { useImport } from 'hooks/useImport';
import { useResume } from 'hooks/useResume';

export function Import() {
  const { loading } = useResume();
  const { handleFileUpload, downloadFileAtUrl, FILE_URL_CSV } = useImport();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex h-screen w-full flex-col items-center bg-background dark:bg-backgroundDark">
          <Header title="Importar dados" />

          <div className="flex w-full flex-col items-center justify-center gap-2 p-4">
            <div className="flex w-full items-center justify-center">
              <label
                htmlFor="dropzone-file"
                className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-backgroundCard hover:bg-background dark:border-gray-600 dark:bg-backgroundCardDark dark:hover:border-gray-500 dark:hover:bg-backgroundDark"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <FileArrowUp
                    size={64}
                    weight="light"
                    className="mb-3 dark:text-titleDark"
                  />
                  <p className="mb-2 text-center text-sm text-gray-500 dark:text-textDark">
                    <span className="font-semibold ">
                      Clique para adicionar um arquivo
                    </span>{' '}
                    ou arraste e solte
                  </p>
                  <p className="text-xs text-gray-500 dark:text-textDark">
                    Suporta apenas arquivos CSV
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".csv"
                />
              </label>
            </div>

            <div className="flex w-full flex-col items-start justify-center">
              <p className="text-center text-xs text-title dark:text-textDark">
                <span className="font-semibold ">Atenção!</span> O arquivo deve
                conter os seguintes campos:
              </p>
              <p className="text-center text-xs text-title dark:text-textDark">
                <span className="font-semibold ">title</span>,{' '}
                <span className="font-semibold ">value</span>,{' '}
                <span className="font-semibold ">category</span>,{' '}
                <span className="font-semibold ">date</span>,{' '}
                <span className="font-semibold ">type</span>
              </p>

              <p className="text-center text-xs text-title dark:text-textDark">
                <span className="font-semibold ">title</span> - Título da
                transação
              </p>
              <p className="text-center text-xs text-title dark:text-textDark">
                <span className="font-semibold ">value</span> - Valor da
                transação
              </p>
              <p className="text-center text-xs text-title dark:text-textDark">
                <span className="font-semibold ">category</span> - Categoria da
                transação
              </p>
              <p className="text-center text-xs text-title dark:text-textDark">
                <span className="font-semibold ">date</span> - Data da transação
                (YYYY-MM-DD)
              </p>
              <p className="text-center text-xs text-title dark:text-textDark">
                <span className="font-semibold ">type</span> - Tipo da transação
              </p>

              <p className="text-center text-xs text-title dark:text-textDark">
                <span className="font-semibold ">Exemplo:</span>
              </p>
              <p className="text-center text-xs text-title dark:text-textDark">
                <span className="font-semibold ">title</span>,{' '}
                <span className="font-semibold ">value</span>,{' '}
                <span className="font-semibold ">category</span>,{' '}
                <span className="font-semibold ">date</span>,{' '}
                <span className="font-semibold ">type</span>
              </p>

              <p className="text-center text-xs text-title dark:text-textDark">
                <span className="font-semibold ">Almoço</span>,{' '}
                <span className="font-semibold ">50</span>,{' '}
                <span className="font-semibold ">Alimentação</span>,{' '}
                <span className="font-semibold ">2021-10-10</span>,{' '}
                <span className="font-semibold ">outcome</span>
              </p>

              <p className="text-center text-xs text-title dark:text-textDark">
                <span className="font-semibold ">Salário</span>,{' '}
                <span className="font-semibold ">5000</span>,{' '}
                <span className="font-semibold ">Salário</span>,{' '}
                <span className="font-semibold ">2021-10-10</span>,{' '}
                <span className="font-semibold ">income</span>
              </p>
            </div>

            <button
              className="flex h-12 w-full items-center justify-center rounded-lg bg-secondary text-white dark:bg-secondaryDark"
              onClick={() => {
                downloadFileAtUrl(FILE_URL_CSV);
              }}
            >
              Baixar modelo
            </button>
          </div>

          <BottomNavigator />
        </div>
      )}
    </>
  );
}
