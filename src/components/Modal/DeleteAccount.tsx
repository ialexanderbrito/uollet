import { UserProps } from 'interfaces/AuthProps';

import { MyDialog } from '.';

interface DeleteAccountProps {
  openModalDeleteAccount: boolean;
  setOpenModalDeleteAccount: (value: boolean) => void;
  user: UserProps | null;
  deleteUser: (id: string) => void;
}

export function DeleteAccount({
  openModalDeleteAccount,
  setOpenModalDeleteAccount,
  user,
  deleteUser,
}: DeleteAccountProps) {
  return (
    <MyDialog
      isOpen={openModalDeleteAccount}
      closeModal={() => setOpenModalDeleteAccount(false)}
      title="Deletar Conta"
      buttonPrimary
      deleteAccount={() => {
        if (!user) return;
        deleteUser(user.id);
      }}
      terms
    >
      <p className="gap-2 text-sm text-text dark:text-text-dark">
        Você pode excluir sua conta na uollet a qualquer momento. Porém, se
        mudar de ideia ou excluir acidentalmente, não será possível recuperar
        seus dados.
        <br />
        <br />
        Ao excluir a conta você perderá acesso a todos os seus dados, incluindo
        informações de pagamento e histórico de movimentações.
        <br />
        <br />
        Essa ação não pausa o recebimento de emails da uollet, para cancelar sua
        inscrição em nossa lista entre em contato pelo oi@uollet.com.br.
        <br />
        <br />
        Agora, se você deseja apenas dar uma pausa, não é necessário excluir sua
        conta, basta não acessar a plataforma por um tempo.
      </p>
    </MyDialog>
  );
}
