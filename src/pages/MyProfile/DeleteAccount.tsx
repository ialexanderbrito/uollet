import { Skull } from '@phosphor-icons/react';

import { Button } from 'components/Button';

interface DeleteAccountInfoProps {
  setOpenModalDeleteAccount: (value: boolean) => void;
}

export function DeleteAccountInfo({
  setOpenModalDeleteAccount,
}: DeleteAccountInfoProps) {
  return (
    <>
      <div className="border-t border-gray-200 dark:border-gray-700" />
      <div className="flex flex-col gap-2">
        <span className="flex flex-row items-center gap-2 text-lg text-title dark:text-title-dark">
          <Skull size={20} className="text-title dark:text-title-dark" />
          Excluir conta
        </span>

        <span className="mt-2 text-sm font-normal text-gray-400 dark:text-gray-500">
          Se você excluir sua conta, todos os dados relacionados a você serão
          deletados e não será possível recuperá-los.
          <br />
          <span className="text-xs">
            <strong>Atenção:</strong> essa ação é irreversível. E será feita de
            forma automática e imediata.
          </span>
        </span>
        <div className="flex w-full flex-col justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            inline
            className="dark:border-danger-dark dark:text-danger-dark mt-2 w-full border border-danger text-danger"
            onClick={() => {
              setOpenModalDeleteAccount(true);
            }}
          >
            Excluir minha conta
          </Button>
        </div>
      </div>
    </>
  );
}
