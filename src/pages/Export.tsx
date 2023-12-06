import { ptBR } from 'date-fns/locale';

import { BottomNavigator } from 'components/BottomNavigator';
import { Button } from 'components/Button';
import { Header } from 'components/Header';
import { Loading } from 'components/Loading';

import { DayPicker } from 'utils/day-picker';

import { useExport } from 'hooks/useExport';
import { useResume } from 'hooks/useResume';

export function Export() {
  const { loading } = useResume();
  const { pastMonth, range, setRange, exportToExcel } = useExport();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen w-full flex-col items-center bg-background dark:bg-background-dark">
      <Header title="Exportar dados" />

      <div className="flex w-full flex-col items-center justify-center gap-2 p-4">
        <div className="mb-4 flex w-full flex-col items-center justify-center">
          <p className="text-center text-lg text-title dark:text-text-dark">
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

        <Button
          type="button"
          onClick={() => {
            exportToExcel();
          }}
        >
          Exportar dados
        </Button>
      </div>

      <BottomNavigator />
    </div>
  );
}
