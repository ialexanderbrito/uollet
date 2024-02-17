import { Barcode, CreditCard } from '@phosphor-icons/react';
import { pix } from 'assets/icons';

import { formatCep, formatCurrency } from 'utils';

interface FormikProps {
  values: {
    cep: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    complement: string;
  };
}

interface CheckoutProps {
  formik: FormikProps;
  setSteps: (step: number) => void;
  selectedPlan: number | undefined;
  paymentType: string;
  plans: {
    id: number;
    storeId: number;
    name: string;
    description: string;
    frequency: number;
    productCategory: number;
    products: any[];
    maxCharges: number;
    chargeDaysBefore: number;
    paymentTypes: number[];
    amount: number;
    currency: number;
    gracePeriod: number;
    status: number;
    tax?: string;
    isVisible: number;
  }[];
  payments: {
    id: number;
    name: string;
    type: string;
    description: string;
    icon: JSX.Element;
  }[];
}

export function Checkout({
  setSteps,
  formik,
  selectedPlan,
  paymentType,
  plans,
  payments,
}: CheckoutProps) {
  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative w-full rounded-md bg-background-card px-4 py-4 dark:bg-background-card-dark sm:px-6 lg:px-8"
        aria-modal="true"
        role="dialog"
      >
        <span className="text-sm font-bold text-title dark:text-title-dark">
          Confirme seu pedido
        </span>
        <div className="mt-4 space-y-6">
          <ul className="space-y-4">
            <li className="flex items-center gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {plans.find((plan) => plan.id === selectedPlan)?.name}
                </h3>

                <dl className="mt-0.5 space-y-px text-sm text-gray-600">
                  <div>
                    <dt className="inline">Preço: </dt>
                    <dd className="inline">
                      {formatCurrency(
                        plans.find((plan) => plan.id === selectedPlan)
                          ?.amount || 0,
                      )}
                    </dd>
                  </div>

                  <div>
                    <dt className="inline">Tipo: </dt>
                    <dd className="inline">Mensal</dd>
                  </div>
                </dl>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="relative w-full rounded-md bg-background-card px-4 py-4 dark:bg-background-card-dark sm:px-6 lg:px-8"
        aria-modal="true"
        role="dialog"
      >
        <span className="text-sm font-bold text-title dark:text-title-dark">
          Forma de pagamento |{' '}
          <b
            className="cursor-pointer text-primary underline dark:text-primary-dark"
            onClick={() => setSteps(3)}
          >
            ALTERAR
          </b>
        </span>
        <div className="mt-4 space-y-6">
          <ul className="space-y-4">
            <li className="flex items-center gap-4">
              {paymentType === 'pix' && (
                <img src={pix} alt="Pix" className="h-6 w-6" />
              )}

              {paymentType === 'boleto' && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full">
                  <Barcode size={24} />
                </div>
              )}

              {paymentType === 'credit-card' && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full">
                  <CreditCard size={24} />
                </div>
              )}

              <div>
                <h3 className="text-sm text-gray-900">
                  {
                    payments.find((payment) => payment.type === paymentType)
                      ?.name
                  }
                </h3>

                <dl className="mt-0.5 space-y-px text-xs text-gray-600">
                  <div>
                    <dd className="inline">
                      {
                        payments.find((payment) => payment.type === paymentType)
                          ?.description
                      }
                    </dd>
                  </div>
                </dl>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="relative w-full rounded-md bg-background-card px-4 py-4 dark:bg-background-card-dark sm:px-6 lg:px-8"
        aria-modal="true"
        role="dialog"
      >
        <span className="text-sm font-bold text-title dark:text-title-dark">
          Dados de cobrança |{' '}
          <b
            className="cursor-pointer text-primary underline dark:text-primary-dark"
            onClick={() => setSteps(1)}
          >
            ALTERAR
          </b>
        </span>
        <div className="mt-4 space-y-6">
          <ul className="space-y-4">
            <li className="flex items-center gap-4">
              <div>
                <h3 className="text-sm text-gray-900">
                  Rua: {formik.values.street}, {formik.values.number} -{' '}
                  {formik.values.complement}
                </h3>
                <h3 className="text-sm text-gray-900">
                  Cidade: {formik.values.city}
                </h3>
                <h3 className="text-sm text-gray-900">
                  Bairro: {formik.values.neighborhood}
                </h3>
                <h3 className="text-sm text-gray-900">
                  CEP: {formatCep(formik.values.cep)}
                </h3>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative w-full rounded-md bg-background-card px-4 py-4 text-end dark:bg-background-card-dark sm:px-6 lg:px-8">
        <span className="text-sm font-bold text-title dark:text-title-dark">
          Total:{' '}
          {formatCurrency(
            plans.find((plan) => plan.id === selectedPlan)?.amount || 0,
          )}
        </span>
      </div>
    </div>
  );
}
