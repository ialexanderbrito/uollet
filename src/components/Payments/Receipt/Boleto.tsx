import { PaymentsProps } from 'interfaces/PaymentsProps';

interface BoletoProps {
  paymentOrder: PaymentsProps | undefined;
}

export function Boleto({ paymentOrder }: BoletoProps) {
  return (
    <>
      <div
        className="relative mt-2 w-full rounded-md bg-background px-4 py-4 dark:bg-background-dark sm:px-6 lg:px-8"
        aria-modal="true"
        role="dialog"
      >
        <span className="text-sm font-bold text-title dark:text-title-dark">
          Pedido realizado com sucesso! |{' '}
          <span className="text-sm font-bold">
            #{paymentOrder?.orders[0].number}
          </span>
        </span>
        <div className="mt-4 space-y-6">
          <div className="flex flex-col items-center justify-center">
            <span className="mb-2 text-sm font-bold text-title dark:text-title-dark">
              Acesse o link abaixo para gerar o boleto:
            </span>
            <a
              href={paymentOrder?.orders[0].payment.boletoUrl || ''}
              target="_blank"
              rel="noreferrer"
              className="flex h-14 w-full items-center justify-center rounded-lg bg-primary p-4 text-center text-sm text-white disabled:cursor-not-allowed disabled:opacity-25 dark:bg-primary-dark"
            >
              Gerar Boleto
            </a>
          </div>
          <ul className="space-y-4">
            <li className="flex items-center gap-4">
              <div>
                <dl className="mt-0.5 space-y-px text-sm text-gray-600">
                  <div>
                    <dt className="inline">
                      • Esse código tem validade de 2 dias úteis.
                    </dt>
                  </div>

                  <div>
                    <dt className="inline">
                      • Se a transferência não for realizada, a compra será
                      cancelada automaticamente.
                    </dt>
                  </div>

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
