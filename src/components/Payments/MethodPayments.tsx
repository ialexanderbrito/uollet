import { CaretDown, Trash } from '@phosphor-icons/react';

import { iconCreditCard } from 'components/CreditCard';

import { useAddCreditCard } from 'hooks/useAddCreditCard';

interface PaymentMethodsProps {
  paymentType: string;
  setPaymentType: (type: string) => void;
  payments: {
    id: number;
    name: string;
    type: string;
    description: string;
    icon: JSX.Element;
  }[];
  cardSelected?: number;
  setCardSelected?: (id: number) => void;
  addCard?: () => void;
}

export function PaymentMethods({
  payments,
  paymentType,
  setPaymentType,
  addCard,
  cardSelected,
  setCardSelected,
}: PaymentMethodsProps) {
  const { creditCards, setOpenMenu, openMenu, handleDeleteCard } =
    useAddCreditCard();

  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm font-bold text-title dark:text-title-dark">
        Selecione uma forma de pagamento
      </span>

      <div className="flex max-w-[19.25rem] flex-col gap-2">
        {payments.map((payment) => (
          <div key={payment.id}>
            <div
              className="dark:text-textDark flex h-16 w-full cursor-pointer items-center gap-3 rounded-md bg-background-card p-3 text-title dark:bg-background-card-dark dark:text-title-dark"
              onClick={() => {
                setPaymentType(payment.type);

                if (payment.type === 'credit-card') {
                  setOpenMenu(!openMenu);
                }
              }}
            >
              <div className="round-full flex h-6 w-6 select-none items-center justify-center rounded-full border-2 border-primary dark:border-primary-dark">
                {paymentType === payment.type && (
                  <div className="h-3 w-3 select-none rounded-full bg-primary dark:bg-primary-dark" />
                )}
              </div>

              <div className="flex w-[87%] items-center justify-between">
                <div className="text-14 -mt-px flex select-none items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full">
                    {payment.icon}
                  </div>

                  <div className="round flex flex-col gap-1">
                    <span className="text-sm">{payment.name}</span>
                    <span className="text-xs">{payment.description}</span>
                  </div>

                  {payment.type === 'credit-card' && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full">
                      <CaretDown size={20} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {payment.type === 'credit-card' &&
              openMenu &&
              paymentType === payment.type && (
                <div className="absolute h-16 w-[19.25rem]">
                  <button
                    className="relative z-100 mt-0.5 flex h-16 w-full cursor-pointer items-center rounded-md bg-background-card p-3  text-text hover:bg-primary  disabled:cursor-not-allowed disabled:hover:bg-background-card dark:bg-background-card-dark dark:text-title-dark dark:hover:bg-primary-dark disabled:dark:hover:bg-background-card-dark"
                    role="menu"
                    disabled={creditCards.length >= 2}
                    onClick={addCard}
                  >
                    Adicionar cartão
                  </button>
                  {creditCards.map((card) => (
                    <div
                      key={card.id}
                      className="relative z-100 mt-0.5 flex h-16 cursor-pointer items-center rounded-md bg-background-card p-3 text-text hover:bg-primary hover:text-white dark:bg-background-card-dark dark:text-title-dark dark:hover:bg-primary-dark dark:hover:text-white"
                      role="menu"
                      onClick={() => {
                        setCardSelected && setCardSelected(card.id);
                        setOpenMenu(false);
                      }}
                    >
                      <div className="flex h-10 w-10 items-center justify-center">
                        <img
                          className="h-10 w-10"
                          src={iconCreditCard(card.cardBrand.toLowerCase())}
                        />
                      </div>

                      <div className="ml-2 flex flex-col gap-1">
                        <span className="text-sm">
                          {card.holderName.toUpperCase()}
                        </span>
                        <span className="text-xs">
                          {card.firstDigits} **** {card.lastDigits}
                        </span>
                      </div>

                      {cardSelected === card.id && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full">
                          <div className="h-3 w-3 select-none rounded-full bg-investments-primary dark:bg-investments-primary" />
                        </div>
                      )}

                      <div
                        className="absolute right-0 top-0 flex h-16 w-16 items-center justify-center rounded-r-md bg-background-card p-3 text-danger hover:bg-primary hover:text-white dark:bg-background-card-dark dark:text-title-dark dark:hover:bg-primary-dark dark:hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();

                          handleDeleteCard(card.id);
                        }}
                      >
                        <Trash size={20} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
