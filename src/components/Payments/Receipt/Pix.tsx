import { Copy } from '@phosphor-icons/react';
import { PaymentsProps } from 'interfaces/PaymentsProps';

import { useClipboard } from 'hooks/useClipboard';

interface PixProps {
  paymentOrder: PaymentsProps | undefined;
}

export function Pix({ paymentOrder }: PixProps) {
  const { copyToClipboard } = useClipboard();

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
          <div className="flex items-center justify-center">
            <img
              src={paymentOrder?.orders[0].payment.pix?.url || ''}
              className="h-44 w-44 rounded-md"
              alt="Pix"
            />
          </div>
          <ul className="space-y-4">
            <li className="flex items-center gap-4">
              <div>
                <dl className="mt-0.5 space-y-px text-sm text-gray-600">
                  <div>
                    <dt className="inline">
                      • Esse código tem validez por 2 horas à partir de agora.
                    </dt>
                  </div>

                  <div>
                    <dt className="inline">
                      • Se a transferência por PIX não for realizada, a compra
                      será cancelada automaticamente.
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
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="dark:bg-backgroundCardDark h-14 w-full rounded-lg bg-background p-4 text-title outline-none focus:ring-2 focus:ring-primary dark:text-title-dark focus:dark:ring-primary-dark"
          placeholder="Copia e Cola"
          value={paymentOrder?.orders[0].payment.pix?.copyPaste}
          disabled
        />

        <button
          type="button"
          className="dark:bg-backgroundCardDark h-14 w-14 rounded-lg bg-background p-4 text-title outline-none hover:bg-gray-200 hover:transition-all dark:text-title-dark dark:hover:bg-gray-700"
          onClick={() => {
            copyToClipboard(
              paymentOrder?.orders[0].payment.pix?.copyPaste || '',
            );
          }}
        >
          <Copy size={20} />
        </button>
      </div>
    </>
  );
}
