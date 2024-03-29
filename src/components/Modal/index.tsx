import { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { X } from '@phosphor-icons/react';

import { Button } from 'components/Button';
import { InputError } from 'components/InputError';

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
  textPrimary?: string;
  buttonSecondary?: boolean;
  textButtonSecondary?: React.ReactNode;
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
  className?: string;
  closeButton?: boolean;
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
  textPrimary = 'Fechar',
  buttonSecondary,
  textButtonSecondary,
  handleChangeButtonSecondary,
  terms,
  deleteAccount,
  isInvestiment,
  size,
  className,
  closeButton,
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
          className={cn('relative z-10', className)}
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
                    'w-full max-w-md transform overflow-hidden rounded-md border bg-background p-6 text-left align-middle transition-all dark:border-background-card-dark dark:bg-background-dark',
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
                  <div className="flex justify-between">
                    <h3
                      className={`text-lg font-medium leading-6 text-title dark:text-title-dark ${
                        about && 'text-center'
                      }`}
                    >
                      {title}
                    </h3>
                    {closeButton && (
                      <X
                        className="h-6 w-6 cursor-pointer text-primary hover:text-primary-dark dark:text-white dark:hover:text-white"
                        onClick={closeModal}
                      />
                    )}
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-text dark:text-text-dark">
                      {description}
                      {email && (
                        <a href="mailto:oi@uollet.com">
                          <span className="text-sm text-text underline dark:text-text-dark">
                            {email}
                          </span>
                        </a>
                      )}
                    </p>
                  </div>
                  {children}
                  {name && (
                    <div className="mt-2 flex flex-col items-center gap-2">
                      <input
                        type="text"
                        className={cn(
                          'h-14 w-full rounded-lg bg-background p-4 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-background-dark dark:text-title-dark dark:focus:ring-primary-dark',
                          username.length <= 2 &&
                            'border-[1.5px] border-danger',
                        )}
                        placeholder="Digite seu nome"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        maxLength={50}
                      />
                      <InputError
                        error={username.length <= 2}
                        message="O nome precisa ter pelo menos 3 caracteres"
                        className="mt-0.5"
                      />
                    </div>
                  )}
                  {terms && (
                    <div className="mt-4 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded-md border-[1.5px] border-solid border-primary accent-primary dark:border-primary-dark dark:accent-primary-dark"
                          onChange={() =>
                            setConfirmTerms({
                              ...confirmTerms,
                              action: !confirmTerms.action,
                            })
                          }
                        />
                        <p className="text-sm text-text dark:text-text-dark">
                          Eu entendo que essa ação não pode ser desfeita.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded-md border-[1.5px] border-solid border-primary accent-primary dark:border-primary-dark dark:accent-primary-dark"
                          onChange={() =>
                            setConfirmTerms({
                              ...confirmTerms,
                              data: !confirmTerms.data,
                            })
                          }
                        />
                        <p className="text-sm text-text dark:text-text-dark">
                          Eu entendo que todos os meus dados serão perdidos.
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="mt-4 flex justify-end">
                    {name && (
                      <Button
                        type="button"
                        inline
                        disabled={username.length <= 2}
                        onClick={() => {
                          handleSubmitName();
                          closeModal();
                        }}
                      >
                        Salvar
                      </Button>
                    )}
                  </div>
                  <div className="mt-4 flex justify-around">
                    {buttonPrimary && (
                      <Button
                        inline
                        variant="outline"
                        isInvestiment={isInvestiment}
                        type="button"
                        onClick={closeModal}
                      >
                        {textPrimary}
                      </Button>
                    )}

                    {buttonSecondary && (
                      <Button
                        inline
                        type="button"
                        isInvestiment={isInvestiment}
                        onClick={handleChangeButtonSecondary}
                      >
                        {textButtonSecondary}
                      </Button>
                    )}

                    {deleteAccount && (
                      <Button
                        type="button"
                        inline
                        onClick={deleteAccountVerify}
                      >
                        Excluir
                      </Button>
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
