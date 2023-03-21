import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

import { addDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import * as XLSX from 'xlsx';

import { BottomNavigator } from 'components/BottomNavigator';
import { Loading } from 'components/Loading';

import { DayPicker } from 'utils/day-picker';
import { formatCurrency } from 'utils/formatCurrency';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { useResume } from 'hooks/useResume';

import { supabase } from 'services/supabase';

interface ExcelDataProps {
  id: number;
  Descricao: string;
  Data: string;
  Valor: string;
  Tipo: string;
}

export function Export() {
  const { user } = useAuth();
  const { loading } = useResume();
  const { toast } = useToast();

  const pastMonth = new Date();
  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(pastMonth, 4),
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const [dataExport, setDataExport] = useState<ExcelDataProps[]>([]);

  function exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `Gastos_do_mes_${format(new Date(), 'MM_yyyy')}.xlsx`);
  }

  useEffect(() => {
    async function buscarDadosParaExcel() {
      if (!range?.from) return;
      if (!range?.to) return;

      try {
        const dataInicial = format(new Date(range.from), 'yyyy-MM-dd') || '';
        const dataFinal = format(new Date(range.to), 'yyyy-MM-dd') || '';

        const { data, error } = await supabase
          .from('finances_db')
          .select('*')
          .eq('user_id', user?.id)
          .gte('date', dataInicial)
          .lte('date', dataFinal);

        if (error) {
          toast.error('Erro ao buscar dados para exportar', { id: 'error' });
        }

        if (!data) return;

        const newValues = data
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .map((finance) => ({
            id: Number(finance.id),
            Descricao: finance.title,
            Data: format(new Date(finance.date), 'dd/MM/yyyy'),
            Valor: formatCurrency(finance.value),
            Tipo: finance.type,
          }));

        setDataExport(newValues);
      } catch (error) {
        toast.error('Erro ao buscar dados para exportar', { id: 'error' });
      }
    }

    buscarDadosParaExcel();
  }, [range]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex h-screen w-full flex-col items-center bg-background dark:bg-backgroundDark">
          <div className="flex h-24 w-full flex-row bg-primary">
            <div className="flex w-full items-center justify-center">
              <p className="text-lg font-normal text-white">Exportar dados</p>
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-2 p-4">
            <div className="mb-4 flex w-full flex-col items-center justify-center">
              <p className="text-center text-lg text-title dark:text-textDark">
                Selecione o período que deseja exportar
              </p>
            </div>

            <div className="mb-4 flex w-full justify-around">
              <DayPicker
                locale={ptBR}
                mode="range"
                defaultMonth={pastMonth}
                selected={range}
                onSelect={setRange}
              />
            </div>

            <button
              className="flex h-12 w-full items-center justify-center rounded-lg bg-secondary text-white dark:bg-secondaryDark"
              onClick={() => {
                exportToExcel();
              }}
            >
              Exportar dados
            </button>
          </div>

          <BottomNavigator />
        </div>
      )}
    </>
  );
}
