import Papa from 'papaparse';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { supabase } from 'services/supabase';

export function useImport() {
  const { toast } = useToast();
  const { user } = useAuth();

  const FILE_URL_CSV = `${window.location.origin}/modelo.csv`;

  function downloadFileAtUrl(url: string) {
    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', 'modelo.csv');

    document.body.appendChild(a);
    a.click();
    a.remove();
  }

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

  return {
    handleFileUpload,
    downloadFileAtUrl,
    FILE_URL_CSV,
  };
}
