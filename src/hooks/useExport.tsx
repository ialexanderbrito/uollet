import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

import { addDays, format } from 'date-fns';
import * as XLSX from 'xlsx';

import { formatCurrency } from 'utils/formatCurrency';

import { useAuth } from 'contexts/Auth';
import { useToast } from 'contexts/Toast';

import { supabase } from 'services/supabase';

interface ExcelDataProps {
  id: number;
  Descricao: string;
  Data: string;
  Valor: string;
  Tipo: string;
}

const LIMIT_DAYS = 90;

export function useExport() {
  const { user } = useAuth();
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

      const diff = Math.abs(range.to.getTime() - range.from.getTime());
      const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

      if (diffDays > LIMIT_DAYS) {
        toast.error('Não é possível exportar mais de 3 meses', {
          id: 'error',
        });
        return;
      }

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

  return {
    pastMonth,
    range,
    setRange,
    exportToExcel,
  };
}
