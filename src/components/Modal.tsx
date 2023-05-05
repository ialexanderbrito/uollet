import { Fragment, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import { useToast } from 'contexts/Toast';

interface MyDialogProps {
  closeModal: () => void;
  isOpen: boolean;
  title: string;
  description?: string;
  deleteTransaction?: () => void;
  terms?: boolean;
  support?: boolean;
}

export function MyDialog({
  closeModal,
  isOpen,
  title,
  description,
  deleteTransaction,
  terms,
  support,
}: MyDialogProps) {
  const { toast } = useToast();
  const [confirmTerms, setConfirmTerms] = useState({
    action: false,
    data: false,
  });

  function copyToClipboard() {
    navigator.clipboard.writeText('eu@ialexanderbrito.dev');
    toast.success('Email copiado com sucesso!', {
      id: 'success',
    });
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-backgroundCardDark">
                  <h3 className="text-lg font-medium leading-6 text-title dark:text-titleDark">
                    {title}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-text dark:text-textDark">
                      {description}
                    </p>
                  </div>

                  {terms && (
                    <div className="mt-4 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded-md border-[1.5px] border-solid border-secondary accent-secondary dark:border-secondaryDark dark:accent-secondaryDark"
                          onChange={() =>
                            setConfirmTerms({
                              ...confirmTerms,
                              action: !confirmTerms.action,
                            })
                          }
                        />
                        <p className="text-sm text-text dark:text-textDark">
                          Eu entendo que essa ação não pode ser desfeita.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded-md border-[1.5px] border-solid border-secondary accent-secondary dark:border-secondaryDark dark:accent-secondaryDark"
                          onChange={() =>
                            setConfirmTerms({
                              ...confirmTerms,
                              data: !confirmTerms.data,
                            })
                          }
                        />
                        <p className="text-sm text-text dark:text-textDark">
                          Eu entendo que todos os meus dados serão perdidos.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex justify-around">
                    <button
                      type="submit"
                      className="h-14 w-32 rounded-lg border-[1.5px] border-solid border-secondary p-4 text-sm  text-secondary dark:border-secondaryDark dark:text-secondaryDark"
                      onClick={closeModal}
                    >
                      Fechar
                    </button>

                    {deleteTransaction && (
                      <button
                        type="submit"
                        className="h-14 w-32 rounded-lg bg-secondary p-4 text-sm text-white dark:bg-secondaryDark"
                        onClick={
                          terms && confirmTerms.action && confirmTerms.data
                            ? deleteTransaction
                            : () =>
                                toast.error(
                                  'Você precisa confirmar todos os checkboxs para continuar.',
                                  {
                                    id: 'error',
                                  },
                                )
                        }
                      >
                        Excluir
                      </button>
                    )}

                    {support && (
                      <button
                        type="button"
                        className="h-14 w-32 rounded-lg bg-secondary p-4 text-sm text-white dark:bg-secondaryDark"
                        onClick={() => {
                          copyToClipboard();
                        }}
                      >
                        Copiar email
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
