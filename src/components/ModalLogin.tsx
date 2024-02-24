import { Fragment } from 'react';

import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Dialog, Transition } from '@headlessui/react';
import { Eye, EyeClosed } from '@phosphor-icons/react';
import { Jelly } from '@uiball/loaders';

import { useTheme } from 'contexts/Theme';

import { useLogin } from 'hooks/useLogin';

import { Button } from './Button';

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-background p-6 text-left align-middle transition-all dark:bg-background-dark">
                  <h3 className="text-lg font-medium leading-6 text-title dark:text-title-dark">
                    {register && 'Faça sua conta agora'}
                    {forgetPassword && 'Restaure sua senha'}
                    {!register && !forgetPassword && 'Faça seu login'}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-text dark:text-text-dark">
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
                          className="h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark"
                          placeholder="Email"
                          {...emailInput()}
                        />
                      </div>

                      {!forgetPassword && !magicLink && (
                        <>
                          <div className="flex items-center gap-2">
                            <input
                              type={passwordType}
                              className="h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark"
                              placeholder="Senha"
                              {...(register
                                ? formikRegister.getFieldProps('password')
                                : formikLogin.getFieldProps('password'))}
                            />

                            <button
                              type="button"
                              className="h-14 w-14 rounded-lg bg-background-card p-4 text-title outline-none hover:bg-gray-200 hover:transition-all dark:bg-background-card-dark dark:text-title-dark dark:hover:bg-gray-700"
                              onClick={togglePassword}
                            >
                              {passwordType === 'password' ? (
                                <EyeClosed
                                  size={20}
                                  className="text-title dark:text-title-dark"
                                />
                              ) : (
                                <Eye
                                  size={20}
                                  className="text-title dark:text-title-dark"
                                />
                              )}
                            </button>
                          </div>
                          {register && (
                            <p className="ml-1 text-xs text-text dark:text-text-dark">
                              Por favor, certifique-se de inserir pelo menos 8
                              caracteres
                            </p>
                          )}
                        </>
                      )}

                      {register && (
                        <div className="flex items-center gap-2">
                          <input
                            type={passwordType}
                            className="h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark"
                            placeholder="Confirme sua senha"
                            {...formikRegister.getFieldProps('confirmPassword')}
                          />
                        </div>
                      )}
                    </div>

                    {!magicLink && !register && !forgetPassword && (
                      <div
                        className="mt-4 flex items-center justify-center"
                        onClick={() => setMagicLink(true)}
                      >
                        <p className="cursor-pointer text-xs font-bold text-text underline hover:text-primary dark:text-text-dark hover:dark:text-primary-dark">
                          Entrar com link mágico
                        </p>
                      </div>
                    )}

                    {register && (
                      <div className="mt-4 flex items-center justify-center">
                        <p className="text-xs text-text dark:text-text-dark">
                          Ao se cadastrar você concorda com os nossos{' '}
                          <a
                            href="https://www.uollet.com.br/terms"
                            target="_blank"
                            className="underline hover:text-primary dark:text-text-dark hover:dark:text-primary-dark"
                            rel="noreferrer"
                          >
                            Termos de Uso
                          </a>{' '}
                          e{' '}
                          <a
                            href="https://www.uollet.com.br/privacy"
                            target="_blank"
                            className="underline hover:text-primary dark:text-text-dark hover:dark:text-primary-dark"
                            rel="noreferrer"
                          >
                            Política de Privacidade
                          </a>
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
                        <Button
                          inline
                          variant="outline"
                          type="button"
                          onClick={() => {
                            setForgetPassword(false);
                          }}
                        >
                          Voltar
                        </Button>

                        <Button inline type="submit" disabled={!captchaToken}>
                          {loading ? (
                            <Jelly size={20} color="#fff" />
                          ) : (
                            'Enviar email'
                          )}
                        </Button>
                      </div>
                    )}

                    {magicLink && (
                      <div className="mt-4 flex justify-between">
                        <Button
                          type="button"
                          inline
                          variant="outline"
                          onClick={() => {
                            setMagicLink(false);
                          }}
                        >
                          Voltar
                        </Button>

                        <Button type="submit" inline disabled={!captchaToken}>
                          {loading ? (
                            <Jelly size={20} color="#fff" />
                          ) : (
                            'Enviar email'
                          )}
                        </Button>
                      </div>
                    )}

                    {register && (
                      <div className="mt-4 flex justify-between">
                        <Button
                          type="button"
                          inline
                          variant="outline"
                          onClick={() => {
                            setRegister(false);
                          }}
                        >
                          Voltar
                        </Button>

                        <Button inline type="submit" disabled={!captchaToken}>
                          {loading ? (
                            <Jelly size={20} color="#fff" />
                          ) : (
                            'Cadastrar'
                          )}
                        </Button>
                      </div>
                    )}

                    {!register && !forgetPassword && !magicLink && (
                      <div className="mt-4 flex justify-between">
                        <div className="flex flex-col items-start justify-center">
                          <p
                            className="cursor-pointer text-xs text-text hover:text-primary dark:text-text-dark hover:dark:text-primary-dark"
                            onClick={() => setForgetPassword(true)}
                          >
                            Esqueci minha senha
                          </p>

                          <p
                            className="cursor-pointer text-xs text-text hover:text-primary dark:text-text-dark hover:dark:text-primary-dark"
                            onClick={() => setRegister(true)}
                          >
                            Não tem uma conta? Cadastre-se
                          </p>
                        </div>

                        <Button type="submit" inline disabled={!captchaToken}>
                          {loading ? (
                            <Jelly size={20} color="#fff" />
                          ) : (
                            'Entrar'
                          )}
                        </Button>
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
