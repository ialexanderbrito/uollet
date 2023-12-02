import { Plus, X } from '@phosphor-icons/react';
import amexCardIcon from 'assets/cc/amex.svg';
import dinersClubCardIcon from 'assets/cc/diners.svg';
import discoverCardIcon from 'assets/cc/discover.svg';
import eloCardIcon from 'assets/cc/elo.svg';
import hipercardCardIcon from 'assets/cc/hipercard.svg';
import jcbCardIcon from 'assets/cc/jcb.svg';
import maestroCardIcon from 'assets/cc/maestro.svg';
import masterCardIcon from 'assets/cc/mastercard.svg';
import defaultCardIcon from 'assets/cc/sim.svg';
import unionpayCardIcon from 'assets/cc/unionpay.svg';
import visaCardIcon from 'assets/cc/visa.svg';
import creditCardType from 'credit-card-type';

import { cn } from 'utils/cn';

interface CreditCardProps {
  creditNumber: string;
  cardName?: string;
  limit?: string | number;
  isDeletable?: boolean;
  onDelete?: () => void;
  bgColor?: string;
  textColor?: string;
  create?: boolean;
  onCreate?: () => void;
  maturity?: number;
  closure?: number;
  visible?: boolean;
  className?: string;
}

function iconCreditCard(creditCardType: string) {
  switch (creditCardType) {
    case 'visa':
      return visaCardIcon;
    case 'mastercard':
      return masterCardIcon;
    case 'american-express':
      return amexCardIcon;
    case 'diners-club':
      return dinersClubCardIcon;
    case 'discover':
      return discoverCardIcon;
    case 'jcb':
      return jcbCardIcon;
    case 'unionpay':
      return unionpayCardIcon;
    case 'maestro':
      return maestroCardIcon;
    case 'elo':
      return eloCardIcon;
    case 'hipercard':
      return hipercardCardIcon;
    default:
      return defaultCardIcon;
  }
}

export function CreditCard({
  creditNumber,
  cardName,
  bgColor = '#262d3d',
  textColor = '#fff',
  limit,
  isDeletable,
  onDelete,
  create,
  onCreate,
  maturity,
  closure,
  visible = true,
  className,
}: CreditCardProps) {
  let maturityDate = `${maturity}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`;

  const closureDate = `${closure}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`;

  function verifyMaturityDateLessClosureDate() {
    if (maturityDate < closureDate) {
      maturityDate = `${maturity}/${
        new Date().getMonth() + 2
      }/${new Date().getFullYear()}`;

      return maturityDate;
    }

    return maturityDate;
  }

  return (
    <>
      <div className="flex flex-row items-center justify-center">
        {isDeletable && (
          <div className="absolute z-10 -mt-52 ml-80 flex sm:ml-96">
            <button
              onClick={onDelete}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-danger text-white"
            >
              <X size={20} />
            </button>
          </div>
        )}

        <div
          className={cn(
            'relative m-auto h-56 w-72 min-w-[340px] transform snap-center rounded-xl text-white shadow-2xl transition-transform sm:w-96',
            create ? 'border-2 border-dashed border-white' : 'border-none',
            className,
          )}
          style={{
            backgroundColor: create ? '#262d3d' : bgColor,
            color: textColor,
          }}
        >
          <div
            className={cn(
              'absolute top-8 w-full px-8',
              create ? 'blur-sm' : '',
            )}
          >
            <div className="flex justify-between">
              <div className="">
                <p className="font-light">Nome</p>
                <p className="font-medium tracking-widest">{cardName}</p>
              </div>
              <img
                className="h-14 w-14"
                src={iconCreditCard(creditCardType(creditNumber)[0]?.type)}
              />
            </div>
            <div className="pt-1">
              <p
                className="tracking-more-wider font-medium"
                style={{ color: textColor }}
              >
                {creditNumber || '**** **'}** **** ****
              </p>
            </div>
            <div className="pt-6">
              <div className="flex justify-between">
                <div className="">
                  <p
                    className="text-xs font-light"
                    style={{ color: textColor }}
                  >
                    Limite atual
                  </p>
                  <p
                    className={cn(
                      'text-sm font-bold tracking-wider',
                      visible && 'select-none blur-md',
                    )}
                    style={{ color: textColor }}
                  >
                    {limit}
                  </p>
                </div>

                <div className="">
                  <p
                    className="text-xs font-light"
                    style={{ color: textColor }}
                  >
                    Fechamento
                  </p>
                  <p
                    className="tracking-more-wider text-sm font-bold"
                    style={{ color: textColor }}
                  >
                    {closureDate}
                  </p>
                </div>

                <div className="">
                  <p
                    className="text-xs font-light"
                    style={{ color: textColor }}
                  >
                    Vencimento
                  </p>
                  <p
                    className="text-sm font-bold tracking-wider"
                    style={{ color: textColor }}
                  >
                    {verifyMaturityDateLessClosureDate()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {create && (
          <>
            <div
              className="absolute z-10 flex w-72 cursor-pointer flex-col items-center justify-center"
              onClick={onCreate}
            >
              <button
                className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white
                transition-all hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary
                "
              >
                <Plus size={24} />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
