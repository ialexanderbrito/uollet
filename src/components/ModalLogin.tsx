import { Fragment } from 'react';

import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Dialog, Transition } from '@headlessui/react';
import { Eye, EyeClosed } from '@phosphor-icons/react';
import { Ring } from '@uiball/loaders';

import { useTheme } from 'contexts/Theme';

import { useLogin } from 'hooks/useLogin';

interface MyDialogProps {
  closeModal: () => void;
  isOpen: boolean;
}

export function ModalLogin({ closeModal, isOpen }: MyDialogProps) {
  const { theme } = useTheme();
  const {
    passwordType,
    togglePassword,
    formikLogin,
    formikRegister,
    selectSubmit,
    emailInput,
    handleCloseModal,
    register,
    forgetPassword,
    setForgetPassword,
    setRegister,
    loading,
    setCaptchaToken,
    captchaRef,
    captchaToken,
    onLoadCaptcha,
    magicLink,
    setMagicLink,
  } = useLogin();

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => handleCloseModal(closeModal)}
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-background p-6 text-left align-middle shadow-xl transition-all dark:bg-backgroundDark">
                  <h3 className="text-lg font-medium leading-6 text-title dark:text-titleDark">
                    {register && 'Faça sua conta agora'}
                    {forgetPassword && 'Restaure sua senha'}
                    {!register && !forgetPassword && 'Faça seu login'}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-text dark:text-textDark">
                      {register && 'Crie sua conta para controlar seus gastos'}
                      {forgetPassword &&
                        'Digite seu email para receber um link de restauração'}
                      {!register &&
                        !forgetPassword &&
                        'Faça seu login para controlar seus gastos'}
                    </p>
                  </div>

                  <form onSubmit={(e) => selectSubmit(e)()}>
                    <div className="mt-4 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="email"
                          className="h-14 w-full rounded-lg bg-white p-4 text-title outline-none dark:bg-backgroundCardDark dark:text-titleDark"
                          placeholder="Email"
                          {...emailInput()}
                        />
                      </div>

                      {!forgetPassword && !magicLink && (
                        <div className="flex items-center gap-2">
                          <input
                            type={passwordType}
                            className="h-14 w-full rounded-lg bg-white p-4 text-title outline-none dark:bg-backgroundCardDark dark:text-titleDark"
                            placeholder="Senha"
                            {...(register
                              ? formikRegister.getFieldProps('password')
                              : formikLogin.getFieldProps('password'))}
                          />

                          <button
                            type="button"
                            className="h-14 w-14 rounded-lg bg-white p-4 text-title outline-none dark:bg-backgroundCardDark dark:text-titleDark"
                            onClick={togglePassword}
                          >
                            {passwordType === 'password' ? (
                              <EyeClosed
                                size={20}
                                className="text-title dark:text-titleDark"
                              />
                            ) : (
                              <Eye
                                size={20}
                                className="text-title dark:text-titleDark"
                              />
                            )}
                          </button>
                        </div>
                      )}

                      {register && (
                        <div className="flex items-center gap-2">
                          <input
                            type={passwordType}
                            className={`h-14 w-full rounded-lg bg-white p-4 text-title outline-none dark:bg-backgroundCardDark dark:text-titleDark`}
                            placeholder="Confirme sua senha"
                            {...formikRegister.getFieldProps('confirmPassword')}
                          />
                        </div>
                      )}
                    </div>

                    {!magicLink && (
                      <div
                        className="mt-4 flex items-center justify-center"
                        onClick={() => setMagicLink(true)}
                      >
                        <p className="cursor-pointer text-xs font-bold text-text underline hover:text-secondary dark:text-textDark hover:dark:text-secondaryDark">
                          Entrar com link mágico
                        </p>
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-center">
                      <HCaptcha
                        ref={captchaRef}
                        sitekey={import.meta.env.VITE_HCAPTCHA_SITEKEY}
                        onVerify={(token) => setCaptchaToken(token)}
                        onLoad={onLoadCaptcha}
                        theme={theme === 'dark' ? 'dark' : 'light'}
                        onExpire={() => setCaptchaToken('')}
                        onChalExpired={() => setCaptchaToken('')}
                      />
                    </div>

                    {forgetPassword && (
                      <div className="mt-4 flex justify-between">
                        <button
                          type="button"
                          className="h-14 w-32 rounded-lg border-[1.5px] border-solid border-secondary p-4 text-sm  text-secondary dark:border-secondaryDark dark:text-secondaryDark"
                          onClick={() => {
                            setForgetPassword(false);
                          }}
                        >
                          Voltar
                        </button>

                        <button
                          type="submit"
                          className="flex h-14 w-32 items-center justify-center rounded-lg bg-secondary p-4 text-center text-sm text-white disabled:cursor-not-allowed disabled:opacity-25 dark:bg-secondaryDark"
                          disabled={!captchaToken}
                        >
                          {loading ? (
                            <Ring size={20} color="#fff" />
                          ) : (
                            'Enviar email'
                          )}
                        </button>
                      </div>
                    )}

                    {magicLink && (
                      <div className="mt-4 flex justify-between">
                        <button
                          type="button"
                          className="h-14 w-32 rounded-lg border-[1.5px] border-solid border-secondary p-4 text-sm  text-secondary dark:border-secondaryDark dark:text-secondaryDark"
                          onClick={() => {
                            setMagicLink(false);
                          }}
                        >
                          Voltar
                        </button>

                        <button
                          type="submit"
                          className="flex h-14 w-32 items-center justify-center rounded-lg bg-secondary p-4 text-center text-sm text-white disabled:cursor-not-allowed disabled:opacity-25 dark:bg-secondaryDark"
                          disabled={!captchaToken}
                        >
                          {loading ? (
                            <Ring size={20} color="#fff" />
                          ) : (
                            'Enviar email'
                          )}
                        </button>
                      </div>
                    )}

                    {register && (
                      <div className="mt-4 flex justify-between">
                        <button
                          type="button"
                          className="h-14 w-32 rounded-lg border-[1.5px] border-solid border-secondary p-4 text-sm  text-secondary dark:border-secondaryDark dark:text-secondaryDark"
                          onClick={() => {
                            setRegister(false);
                          }}
                        >
                          Voltar
                        </button>

                        <button
                          type="submit"
                          className="flex h-14 w-32 items-center justify-center rounded-lg bg-secondary p-4 text-center text-sm text-white disabled:cursor-not-allowed disabled:opacity-25 dark:bg-secondaryDark"
                          disabled={!captchaToken}
                        >
                          {loading ? (
                            <Ring size={20} color="#fff" />
                          ) : (
                            'Cadastrar'
                          )}
                        </button>
                      </div>
                    )}

                    {!register && !forgetPassword && !magicLink && (
                      <div className="mt-4 flex justify-between">
                        <div className="flex flex-col items-start justify-center">
                          <p
                            className="cursor-pointer text-xs text-text hover:text-secondary dark:text-textDark hover:dark:text-secondaryDark"
                            onClick={() => setForgetPassword(true)}
                          >
                            Esqueci minha senha
                          </p>

                          <p
                            className="cursor-pointer text-xs text-text hover:text-secondary dark:text-textDark hover:dark:text-secondaryDark"
                            onClick={() => setRegister(true)}
                          >
                            Não tem uma conta? Cadastre-se
                          </p>
                        </div>

                        <button
                          type="submit"
                          className="flex h-14 w-32 items-center justify-center rounded-lg bg-secondary p-4 text-center text-sm text-white disabled:cursor-not-allowed disabled:opacity-25 dark:bg-secondaryDark"
                          disabled={!captchaToken}
                        >
                          {loading ? <Ring size={20} color="#fff" /> : 'Entrar'}
                        </button>
                      </div>
                    )}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
