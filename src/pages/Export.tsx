import { ptBR } from 'date-fns/locale';

import { BottomNavigator } from 'components/BottomNavigator';
import { Header } from 'components/Header';
import { Loading } from 'components/Loading';

import { DayPicker } from 'utils/day-picker';

import { useExport } from 'hooks/useExport';
import { useResume } from 'hooks/useResume';

export function Export() {
  const { loading } = useResume();
  const { pastMonth, range, setRange, exportToExcel } = useExport();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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

            <button
              className="flex h-14 w-full items-center justify-center rounded-lg bg-primary text-white dark:bg-primary-dark"
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
