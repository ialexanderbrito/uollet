import {
  Crown,
  TrashSimple,
  Warning,
  CreditCard as CreditCardIcon,
} from '@phosphor-icons/react';
import creditCardType from 'credit-card-type';
import { format } from 'date-fns';

import { Alert } from 'components/Alert';
import { Button } from 'components/Button';
import { iconCreditCard } from 'components/CreditCard';
import { Loading } from 'components/Loading';

import { cn } from 'utils';

import { useAuth } from 'contexts/Auth';

import { useAddCreditCard } from 'hooks/useAddCreditCard';
import { useProfile } from 'hooks/useProfile';

interface DataSubscriptionProps {
  setOpenModalCancelPlan: (value: boolean) => void;
  setIsOpenAddCreditCard: (value: boolean) => void;
  setOpenModalChangePlan: (value: boolean) => void;
}

export function DataSubscription({
  setOpenModalCancelPlan,
  setIsOpenAddCreditCard,
  setOpenModalChangePlan,
}: DataSubscriptionProps) {
  const { user, plan, loading } = useAuth();
  const {
    creditCards,
    handleDeleteCard,
    loading: loadindCreditCard,
  } = useAddCreditCard();
  const { orders, loading: loadingOrders } = useProfile();

  function paymentMethod(method: string) {
    switch (method) {
      case 'Credit':
        return 'Cartão de crédito';
      case 'Boleto':
        return 'Boleto';
      case 'Pix':
        return 'Pix';
      default:
        return 'Cartão de crédito';
    }
  }

  if (loading || loadindCreditCard || loadingOrders) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-row items-center gap-2 text-xl font-semibold text-title dark:text-title-dark">
        <span className="flex flex-row items-center gap-2">
          <Crown size={20} className="text-title dark:text-title-dark" />
          Assinatura e cartões
        </span>
      </div>

      {creditCards.length > 0 && user?.app_metadata && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2 text-base font-semibold text-title dark:text-title-dark">
            <span className="flex flex-row items-center gap-2">
              Meus cartões
            </span>
          </div>

          <div className="flex w-full flex-col gap-2 rounded-md bg-background-card p-2 text-title dark:bg-background-card-dark dark:text-title-dark">
            <ul className="flex flex-col gap-2">
              {creditCards.map((card) => (
                <div key={card.id} className="flex flex-col gap-2">
                  <div className="flex w-full items-center">
                    <div className="flex w-full flex-row items-center gap-2">
                      <img
                        src={iconCreditCard(
                          creditCardType(card.firstDigits)[0]?.type,
                        )}
                        alt="Bandeira do cartão"
                        className="mt-1 h-8 w-8 object-cover"
                      />

                      <p className="font-semibold text-title dark:text-title-dark">
                        {card.holderName}
                      </p>
                    </div>
                    <div className="flex flex-grow">
                      <button
                        type="button"
                        className="dark:text-danger-dark h-8 w-8 rounded-full text-danger hover:bg-danger hover:bg-opacity-10 hover:transition-all"
                        onClick={() => {
                          handleDeleteCard(card.id);
                        }}
                      >
                        <TrashSimple size={20} />
                      </button>
                    </div>
                  </div>

                  <p className="text-start font-semibold text-title dark:text-title-dark">
                    Número: {card.firstDigits} **** **** {card.lastDigits}
                  </p>
                  <p className="font-semibold text-title dark:text-title-dark">
                    Validade: {card.expirationMonth}/{card.expirationYear}
                  </p>

                  {creditCards.indexOf(card) !== creditCards.length - 1 && (
                    <div className="border-t border-gray-200 dark:border-gray-700" />
                  )}
                </div>
              ))}
            </ul>

            {creditCards.length > 0 && creditCards.length < 3 && (
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-2">
                  <Button
                    type="button"
                    variant="primary"
                    className="flex flex-row items-center gap-2"
                    onClick={() => setIsOpenAddCreditCard(true)}
                  >
                    <CreditCardIcon size={20} />
                    Adicionar cartão
                  </Button>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="mt-1 flex self-start">
                <Warning
                  size={20}
                  className="text-title dark:text-title-dark"
                />
              </div>
              <span className="text-sm font-normal text-gray-400 dark:text-gray-500">
                Não armazenamos seus dados de cartão; eles ficam seguros com a{' '}
                <a
                  className="text-primary hover:underline hover:transition-all"
                  href="https://primefy.io/br/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Primefy
                </a>
              </span>
            </div>
          </div>
        </div>
      )}

      {creditCards.length === 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2 text-base font-semibold text-title dark:text-title-dark">
            <span className="flex flex-row items-center gap-2">
              Meus cartões
            </span>
          </div>

          <div className="flex w-full flex-col gap-2 rounded-md bg-background-card p-4 font-normal text-title dark:bg-background-card-dark dark:text-title-dark">
            <div className="flex flex-col gap-2">
              <span className="text-title dark:text-title-dark">
                Não há cartões cadastrados
              </span>
            </div>

            <Button
              type="button"
              variant="primary"
              onClick={() => setIsOpenAddCreditCard(true)}
            >
              Adicionar cartão
            </Button>
          </div>
        </div>
      )}

      {!user?.user_metadata.subscription_id && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2 text-base font-semibold text-title dark:text-title-dark">
            <span className="flex flex-row items-center gap-2">Assinatura</span>
          </div>

          <div className="flex w-full flex-col gap-2 rounded-md bg-background-card p-4 font-normal text-title dark:bg-background-card-dark dark:text-title-dark">
            <div className="flex flex-col gap-2">
              <span className="text-title dark:text-title-dark">
                Você ainda não tem uma assinatura ativa.
              </span>
            </div>

            <Button
              type="button"
              variant="primary"
              onClick={() => setOpenModalChangePlan(true)}
            >
              Escolher plano
            </Button>
          </div>
        </div>
      )}

      {user?.user_metadata.subscription_id && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2 text-base font-semibold text-title dark:text-title-dark">
            <span className="flex flex-row items-center gap-2">Assinatura</span>
          </div>

          <div className="flex w-full flex-col gap-2 rounded-md bg-background-card p-4 font-normal text-title dark:bg-background-card-dark dark:text-title-dark">
            <div className="flex flex-col gap-2">
              <span className="text-title dark:text-title-dark">
                Seu plano: {plan?.plan.name}
              </span>
              <span className="text-title dark:text-title-dark">
                Próxima renovação:{' '}
                {format(
                  new Date(plan?.nextPayment || new Date()),
                  'dd/MM/yyyy',
                )}
              </span>
              <span className="flex flex-row items-center gap-1 text-title dark:text-title-dark">
                Status: {plan?.status === 'Active' ? 'Ativo' : 'Inativo'}
                <div
                  className={cn(
                    'h-2 w-2 rounded-full bg-danger',
                    plan?.status === 'Active' ? 'bg-success' : 'bg-danger',
                  )}
                />
              </span>
            </div>

            <Button
              type="button"
              variant="primary"
              onClick={() => setOpenModalChangePlan(true)}
            >
              Alterar plano
            </Button>

            <Button
              type="button"
              variant="outline"
              className="dark:border-danger-dark dark:text-danger-dark border border-danger text-danger"
              onClick={() => setOpenModalCancelPlan(true)}
            >
              Cancelar assinatura
            </Button>
          </div>
        </div>
      )}

      {user?.user_metadata.subscription_id && (
        <>
          <Alert
            disabledOnClick
            alertName="history"
            title="Compras anteriores a 31/12/2023"
            description="não são exibidas no histórico. Caso precise de ajuda, entre em contato com o suporte."
            variant="info"
          />
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2 text-base font-semibold text-title dark:text-title-dark">
              <span className="flex flex-row items-center gap-2">
                Histórico de pagamentos
              </span>
            </div>

            {orders.length > 0 ? (
              <>
                <div className="flex flex-col gap-2 overflow-x-auto rounded-md bg-background-card p-4 font-normal text-title dark:bg-background-card-dark dark:text-title-dark">
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="text-left text-title dark:text-title-dark">
                        <th className="px-4 py-2">Nº do Pedido</th>
                        <th className="px-4 py-2">Data</th>
                        <th className="px-4 py-2">Valor</th>
                        <th className="px-4 py-2">Forma de Pagamento</th>
                        <th className="px-4 py-2">Descrição</th>
                        <th className="px-4 py-2">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {orders.map((order) => (
                        <tr
                          key={order.id}
                          className="text-title dark:bg-background-card-dark dark:text-title-dark"
                        >
                          <td className="border-t px-4 py-2 text-sm">
                            # {order?.number}
                          </td>
                          <td className="border-t px-4 py-2 text-sm">
                            {format(
                              new Date(order?.createdOn || new Date()),
                              'dd/MM/yyyy',
                            )}
                          </td>
                          <td className="border-t px-4 py-2 text-sm">
                            {order?.amount.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </td>
                          <td className="border-t px-4 py-2 text-sm">
                            {paymentMethod(order?.payment.type)}
                          </td>
                          <td className="border-t px-4 py-2 text-sm">
                            {order?.description}
                          </td>
                          <td className="border-t px-4 py-2 text-sm">
                            {order?.payment.status === 'Succeded' ? (
                              <span className="flex w-20 items-center justify-center gap-1 rounded-md bg-success text-center font-bold text-white">
                                Sucesso
                              </span>
                            ) : (
                              <span className="flex w-20 items-center justify-center gap-1 rounded-md bg-[#fb8200] text-center font-bold text-white">
                                Pendente
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <p className="text-sm font-normal text-gray-400 dark:text-gray-500">
                Não há registro de pagamentos na sua conta.
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
}
