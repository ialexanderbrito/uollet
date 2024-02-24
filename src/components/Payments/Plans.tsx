import {
  Coffee,
  Lightning,
  RocketLaunch,
  SketchLogo,
} from '@phosphor-icons/react';

import { cn, formatCurrency } from 'utils';

interface PlanProps {
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
}

interface PlansProps {
  plans: PlanProps[];
  setSelectedPlan: (id: number) => void;
  selectedPlan: number;
}

export function Plans({ plans, setSelectedPlan, selectedPlan }: PlansProps) {
  return (
    <div className="flex flex-col gap-2">
      {plans
        .sort((a, b) => a.amount - b.amount)
        .filter((plan) => plan.isVisible === 1)
        .map((plan) => (
          <div
            key={plan.id}
            className={cn(
              'flex w-full cursor-pointer items-center gap-3 rounded-md bg-background-card p-3 text-title dark:bg-background-card-dark dark:text-text-dark',
              selectedPlan === plan.id &&
                'border border-primary dark:border-primary-dark',
            )}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <div className="round-full flex h-6 w-6 select-none items-center justify-center rounded-full border-2 border-primary dark:border-primary-dark">
              {selectedPlan === plan.id && (
                <div className="h-3 w-3 select-none rounded-full bg-primary dark:bg-primary-dark" />
              )}
            </div>
            <div className="flex w-[87%] items-center justify-between">
              <div className="text-14 -mt-px flex select-none items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full">
                  {plan.name === `Plano sem Ad's` && <Coffee size={20} />}
                  {plan.name === 'Plano Básico' && <Lightning size={20} />}
                  {plan.name === 'Plano Pro' && <RocketLaunch size={20} />}
                  {plan.name === 'Plano Unlimited' && <SketchLogo size={20} />}
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-sm">
                    {plan.name} | <b>{formatCurrency(plan.amount)}/mensal</b>
                  </span>
                  <span className="text-xs">
                    {plan.description}{' '}
                    <b>*{plan.gracePeriod} dias de teste para novos usuários</b>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
