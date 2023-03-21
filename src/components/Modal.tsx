import { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';

interface MyDialogProps {
  closeModal: () => void;
  isOpen: boolean;
  title: string;
  description?: string;
  deleteTransaction?: () => void;
}

export function MyDialog({
  closeModal,
  isOpen,
  title,
  description,
  deleteTransaction,
}: MyDialogProps) {
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

                  <div className="mt-4 flex justify-around">
                    <button
                      type="submit"
                      className="h-14 w-32 rounded-lg border-[1.5px] border-solid border-secondary p-4 text-secondary dark:border-secondaryDark dark:text-secondaryDark"
                      onClick={closeModal}
                    >
                      Cancelar
                    </button>

                    <button
                      type="submit"
                      className="h-14 w-32 rounded-lg bg-secondary p-4 text-white dark:bg-secondaryDark"
                      onClick={deleteTransaction}
                    >
                      Enviar
                    </button>
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
