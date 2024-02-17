import { Jelly } from '@uiball/loaders';

import { InputError } from 'components/InputError';
import { MyDialog } from 'components/Modal';

import { useAddCreditCard } from 'hooks/useAddCreditCard';

interface AddCreditCardProps {
  isOpen: boolean;
  closeModal: () => void;
}

export function AddCreditCard({ isOpen, closeModal }: AddCreditCardProps) {
  const {
    formatCardValidate,
    formikCreditCard,
    getCreditCardType,
    getCreditCardTypeIcon,
    removeSpaces,
    loading,
  } = useAddCreditCard();

  return (
    <>
      <MyDialog
        closeModal={() => closeModal()}
        isOpen={isOpen}
        size="sm"
        title="Adicionar cartão"
        buttonPrimary
        textPrimary="Voltar"
        buttonSecondary
        textButtonSecondary={
          loading ? <Jelly size={20} color="#FFF" /> : 'Adicionar'
        }
        handleChangeButtonSecondary={() => {
          formikCreditCard.handleSubmit();
        }}
      >
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="relative w-full">
              <input
                type="text"
                className="h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark"
                placeholder="Número do cartão"
                maxLength={24}
                {...formikCreditCard.getFieldProps('cardNumber')}
                value={formikCreditCard.values.cardNumber}
                onChange={(e) => {
                  formikCreditCard.setFieldValue(
                    'cardNumber',
                    removeSpaces(e.target.value),
                  );
                }}
              />
              {formikCreditCard.values.cardNumber && (
                <div className="absolute right-4 top-8 -translate-y-1/2 transform">
                  {getCreditCardTypeIcon() && (
                    <img
                      src={getCreditCardTypeIcon() as string}
                      alt={getCreditCardType()}
                      className="h-12 w-12"
                    />
                  )}
                </div>
              )}
            </div>

            <InputError
              error={Boolean(
                formikCreditCard.errors.cardNumber &&
                  formikCreditCard.touched.cardNumber,
              )}
              message={formikCreditCard.errors.cardNumber}
            />
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="text"
              className="h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark"
              placeholder="Nome impresso no cartão"
              {...formikCreditCard.getFieldProps('cardName')}
            />
          </div>

          <div className="flex w-full flex-row gap-2">
            <div className="flex w-full flex-col gap-2">
              <input
                type="text"
                className="h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark"
                placeholder="Validade MM/AAAA"
                maxLength={7}
                {...formikCreditCard.getFieldProps('cardValidate')}
                value={formatCardValidate(formikCreditCard.values.cardValidate)}
                onChange={(e) => {
                  formikCreditCard.setFieldValue(
                    'cardValidate',
                    formatCardValidate(e.target.value),
                  );
                }}
              />
              <InputError
                error={Boolean(
                  formikCreditCard.errors.cardValidate &&
                    formikCreditCard.touched.cardValidate,
                )}
                message={formikCreditCard.errors.cardValidate}
              />
            </div>

            <div className="flex w-full flex-col gap-2">
              <input
                type="text"
                className="h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark"
                placeholder="CVV"
                maxLength={getCreditCardType() === 'american-express' ? 4 : 3}
                {...formikCreditCard.getFieldProps('cardCVV')}
              />
            </div>
          </div>
        </div>
      </MyDialog>
    </>
  );
}
