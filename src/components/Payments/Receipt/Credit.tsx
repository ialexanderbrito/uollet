import { CheckCircle } from '@phosphor-icons/react';
import { format } from 'date-fns';
import { PaymentsProps } from 'interfaces/PaymentsProps';

interface CCProps {
  paymentOrder: PaymentsProps | undefined;
}

export function CC({ paymentOrder }: CCProps) {
  return (
    <>
      <div
        className="relative mt-2 w-full rounded-md bg-background-card px-4 py-4 dark:bg-background-card-dark sm:px-6 lg:px-8"
        aria-modal="true"
        role="dialog"
      >
        <span className="text-sm font-bold text-title dark:text-title-dark">
          Pedido realizado com sucesso!
        </span>
        <div className="mt-4 space-y-6">
          <div className="flex flex-col items-center justify-center">
            <CheckCircle size={64} weight="fill" className="text-success" />
            <span className="mb-2 text-xl font-bold text-success dark:text-success">
              PARABÉNS! Você acaba de se tornar um membro PRO do uollet.
            </span>
          </div>
          <p className="text-sm font-bold text-title dark:text-title-dark">
            Aqui estão algumas informações sobre sua compra:
          </p>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold text-title dark:text-title-dark">
              Status: {paymentOrder?.status === 'Active' && 'Ativo'}
            </span>
            <span className="text-sm font-bold text-title dark:text-title-dark">
              Plano: {paymentOrder?.plan.name}
            </span>
            <span className="text-sm font-bold text-title dark:text-title-dark">
              Período de carência: {paymentOrder?.plan.gracePeriod} dias
            </span>
            <span className="text-sm font-bold text-title dark:text-title-dark">
              Próximo pagamento:{' '}
              {format(
                new Date(paymentOrder?.nextPayment || ''),
                'dd/MM/yyyy HH:mm',
              )}
            </span>
          </div>

          <ul className="space-y-4">
            <li className="flex items-center gap-4">
              <div>
                <dl className="mt-0.5 space-y-px text-sm text-gray-600">
                  <div>
                    <dt className="inline">
                      • Você receberá um email de confirmação assim que a
                      transação for efetivada.
                    </dt>
                  </div>
                </dl>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
