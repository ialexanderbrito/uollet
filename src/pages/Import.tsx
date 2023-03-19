import { FileArrowUp } from '@phosphor-icons/react';
import Papa from 'papaparse';

import { BottomNavigator } from 'components/BottomNavigator';
import { Loading } from 'components/Loading';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { useResume } from 'hooks/useResume';

import { supabase } from 'services/supabase';

export function Import() {
  const { toast } = useToast();
  const { loading } = useResume();
  const { user } = useAuth();

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: async function (results: any) {
        const rowsArray: string[][] = [];
        const valuesArray: any[][] = [];

        results.data.forEach((row: Record<string, any>) => {
          rowsArray.push(Object.keys(row));
          valuesArray.push(Object.values(row));
        });

        const valuesInsert = results.data.map((data: Record<string, any>) => ({
          title: data.title,
          value: data.value,
          category: data.category,
          date: data.date,
          type: data.type,
          user_id: user?.id,
        }));

        const valuesInsertVoid = results.data.map(
          (data: Record<string, any>) => ({
            title: data.title,
            value: data.value,
            category: data.category,
            date: data.date,
            type: data.type,
          }),
        );

        if (
          valuesInsertVoid.some(
            (value: Record<string, any>) =>
              !value.title ||
              !value.value ||
              !value.category ||
              !value.date ||
              !value.type,
          )
        ) {
          toast.error('Erro ao importar dados!', { id: 'toast' });
          return;
        }

        try {
          toast.loading('Importando dados...', { id: 'toast' });
          const { error } = await supabase
            .from('finances_db')
            .insert(valuesInsert);

          if (error) {
            toast.error('Erro ao importar dados!', { id: 'toast' });
            return;
          }

          toast.success('Dados importados com sucesso!', { id: 'toast' });
        } catch (error) {
          toast.error('Erro ao importar dados!', { id: 'toast' });
        }
      },
    });
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex w-full flex-col items-center bg-background h-screen dark:bg-backgroundDark">
          <div className="bg-primary flex w-full h-24 flex-row">
            <div className="flex w-full items-center justify-center">
              <p className="text-white font-normal text-lg">Importar dados</p>
            </div>
          </div>

          <div className="flex w-full items-center justify-center flex-col gap-2 p-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-backgroundCard dark:hover:bg-bray-800 dark:bg-backgroundCardDark hover:bg-background dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-backgroundDark"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FileArrowUp
                    size={64}
                    weight="light"
                    className="dark:text-titleDark mb-3"
                  />
                  <p className="mb-2 text-sm text-gray-500 dark:text-textDark text-center">
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

            <div className="flex flex-col items-start justify-center w-full">
              <p className="text-xs text-title dark:text-textDark text-center">
                <span className="font-semibold ">Atenção!</span> O arquivo deve
                conter os seguintes campos:
              </p>
              <p className="text-xs text-title dark:text-textDark text-center">
                <span className="font-semibold ">title</span>,{' '}
                <span className="font-semibold ">value</span>,{' '}
                <span className="font-semibold ">category</span>,{' '}
                <span className="font-semibold ">date</span>,{' '}
                <span className="font-semibold ">type</span>
              </p>

              <p className="text-xs text-title dark:text-textDark text-center">
                <span className="font-semibold ">title</span> - Título da
                transação
              </p>
              <p className="text-xs text-title dark:text-textDark text-center">
                <span className="font-semibold ">value</span> - Valor da
                transação
              </p>
              <p className="text-xs text-title dark:text-textDark text-center">
                <span className="font-semibold ">category</span> - Categoria da
                transação
              </p>
              <p className="text-xs text-title dark:text-textDark text-center">
                <span className="font-semibold ">date</span> - Data da transação
                (YYYY-MM-DD)
              </p>
              <p className="text-xs text-title dark:text-textDark text-center">
                <span className="font-semibold ">type</span> - Tipo da transação
              </p>

              <p className="text-xs text-title dark:text-textDark text-center">
                <span className="font-semibold ">Exemplo:</span>
              </p>
              <p className="text-xs text-title dark:text-textDark text-center">
                <span className="font-semibold ">title</span>,{' '}
                <span className="font-semibold ">value</span>,{' '}
                <span className="font-semibold ">category</span>,{' '}
                <span className="font-semibold ">date</span>,{' '}
                <span className="font-semibold ">type</span>
              </p>

              <p className="text-xs text-title dark:text-textDark text-center">
                <span className="font-semibold ">Almoço</span>,{' '}
                <span className="font-semibold ">50</span>,{' '}
                <span className="font-semibold ">Alimentação</span>,{' '}
                <span className="font-semibold ">2021-10-10</span>,{' '}
                <span className="font-semibold ">outcome</span>
              </p>

              <p className="text-xs text-title dark:text-textDark text-center">
                <span className="font-semibold ">Salário</span>,{' '}
                <span className="font-semibold ">5000</span>,{' '}
                <span className="font-semibold ">Salário</span>,{' '}
                <span className="font-semibold ">2021-10-10</span>,{' '}
                <span className="font-semibold ">income</span>
              </p>
            </div>

            <a
              href="src/assets/modelo.csv"
              className="flex items-center justify-center w-full h-12 bg-secondary dark:bg-secondaryDark rounded-lg text-white"
              download
            >
              Baixar modelo
            </a>
          </div>

          <BottomNavigator />
        </div>
      )}
    </>
  );
}
