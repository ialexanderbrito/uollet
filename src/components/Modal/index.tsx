import { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import { cn } from 'utils/cn';

import { useToast } from 'contexts/Toast';

import { useModal } from './useModal';

interface MyDialogProps {
  children?: React.ReactNode;
  closeModal: () => void;
  isOpen: boolean;
  title: string;
  description?: string;
  email?: string;
  name?: boolean;
  about?: boolean;
  buttonPrimary?: boolean;
  buttonSecondary?: boolean;
  textButtonSecondary?: string;
  handleChangeButtonSecondary?: () => void;
  terms?: boolean;
  deleteAccount?: () => void | Promise<void>;
  isInvestiment?: boolean;
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl';
}

export function MyDialog({
  closeModal,
  isOpen,
  title,
  description,
  children,
  email,
  name,
  about,
  buttonPrimary,
  buttonSecondary,
  textButtonSecondary,
  handleChangeButtonSecondary,
  terms,
  deleteAccount,
  isInvestiment,
  size,
}: MyDialogProps) {
  const { toast } = useToast();
  const {
    username,
    setUsername,
    handleSubmitName,
    confirmTerms,
    setConfirmTerms,
  } = useModal();

  function deleteAccountVerify() {
    if (!deleteAccount) return;

    if (terms && confirmTerms.action && confirmTerms.data) {
      deleteAccount();
    } else {
      toast.error('Você precisa confirmar todos os checkboxs para continuar.', {
        id: 'error',
      });
    }
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={name ? () => {} : closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black opacity-5" />
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
                <Dialog.Panel
                  className={cn(
                    'w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle transition-all dark:bg-backgroundCardDark',
                    about && 'max-w-xs',
                    size === 'xs' && 'max-w-xs',
                    size === 'sm' && 'max-w-sm',
                    size === 'md' && 'max-w-md',
                    size === 'lg' && 'max-w-lg',
                    size === 'xl' && 'max-w-xl',
                    size === '2xl' && 'max-w-2xl',
                    size === '3xl' && 'max-w-3xl',
                    size === '4xl' && 'max-w-4xl',
                    size === '5xl' && 'max-w-5xl',
                    size === '6xl' && 'max-w-6xl',
                  )}
                >
                  <h3
                    className={`text-lg font-medium leading-6 text-title dark:text-titleDark ${
                      about && 'text-center'
                    }`}
                  >
                    {title}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-text dark:text-textDark">
                      {description}
                      {email && (
                        <a href="mailto:eu@ialexanderbrito.dev">
                          <span className="text-sm text-text underline dark:text-textDark">
                            {email}
                          </span>
                        </a>
                      )}
                    </p>
                  </div>

                  {children}

                  {name && (
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="text"
                        className={cn(
                          'h-14 w-full rounded-lg bg-background p-4 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-backgroundCardDark dark:text-titleDark dark:focus:ring-primaryDark',
                          username.length <= 2 &&
                            'border-[1.5px] border-red-500',
                        )}
                        placeholder="Digite seu nome"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        maxLength={50}
                      />
                    </div>
                  )}

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

                  <div className="mt-4 flex justify-end">
                    {name && (
                      <button
                        type="button"
                        className="h-14 w-32 rounded-lg bg-secondary p-4 text-sm text-white dark:bg-secondaryDark"
                        onClick={() => {
                          handleSubmitName();
                          closeModal();
                        }}
                      >
                        Salvar
                      </button>
                    )}
                  </div>

                  <div className="mt-4 flex justify-around">
                    {buttonPrimary && (
                      <button
                        type="submit"
                        className="h-14 w-32 rounded-lg border-[1.5px] border-solid border-secondary p-4 text-sm text-secondary dark:border-secondaryDark dark:text-secondaryDark"
                        onClick={closeModal}
                      >
                        Fechar
                      </button>
                    )}

                    {buttonSecondary && (
                      <button
                        type="submit"
                        className={cn(
                          'h-14 w-32 rounded-lg bg-secondary p-4 text-sm text-white dark:bg-secondaryDark',
                          isInvestiment && 'bg-primaryDark dark:bg-primary',
                        )}
                        onClick={handleChangeButtonSecondary}
                      >
                        {textButtonSecondary}
                      </button>
                    )}

                    {deleteAccount && (
                      <button
                        type="submit"
                        className="h-14 w-32 rounded-lg bg-secondary p-4 text-sm text-white dark:bg-secondaryDark"
                        onClick={deleteAccountVerify}
                      >
                        Excluir
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
