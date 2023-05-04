import { useNavigate } from 'react-router-dom';

import { CaretLeft } from '@phosphor-icons/react';
import { ptBR } from 'date-fns/locale';

import { BottomNavigator } from 'components/BottomNavigator';
import { Loading } from 'components/Loading';

import { DayPicker } from 'utils/day-picker';

import { useExport } from 'hooks/useExport';
import { useResume } from 'hooks/useResume';

export function Export() {
  const { loading } = useResume();
  const { pastMonth, range, setRange, exportToExcel } = useExport();
  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex h-screen w-full flex-col items-center bg-background dark:bg-backgroundDark">
          <div className="flex h-24 w-full flex-row bg-primary dark:bg-primaryDark">
            <div className="flex w-1/4 items-center justify-center">
              <CaretLeft
                size={20}
                weight="light"
                className="cursor-pointer text-white"
                onClick={() => navigate(-1)}
              />
            </div>
            <div className="flex w-2/4 items-center justify-center">
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
