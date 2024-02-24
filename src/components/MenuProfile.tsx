import { Link, useLocation } from 'react-router-dom';

import { Crown, Key, SquaresFour, User } from '@phosphor-icons/react';
import { useFeatureFlag } from 'configcat-react';

import { cn } from 'utils';

import { useAuth } from 'contexts/Auth';

import { Loading } from './Loading';

export function MenuProfile() {
  const { loading: loadindConfigCat, value: showPaymentsFeature } =
    useFeatureFlag('page_payments', false);

  const { user } = useAuth();

  const location = useLocation();

  const hasAccess = location.pathname.includes('access');
  const hasPersonal = location.pathname.includes('personal');
  const hasSubscription = location.pathname.includes('subscription');
  const hasHome =
    location.pathname.includes('profile') &&
    !hasAccess &&
    !hasPersonal &&
    !hasSubscription;

  if (loadindConfigCat) {
    return <Loading />;
  }

  return (
    <aside className="grid grid-flow-col overflow-hidden border-b-2 border-gray-200 p-0 dark:border-gray-700">
      <Link
        className={cn(
          'flex flex-row items-center justify-center gap-2 p-4 text-lg text-title dark:text-title-dark',
          hasHome && 'border-b-2 border-primary',
        )}
        to={`/profile/${user?.id}`}
      >
        <SquaresFour
          size={24}
          className={cn(
            'text-title dark:text-title-dark',
            hasHome && 'text-primary',
          )}
        />
        <p className="hidden flex-row items-center gap-2 md:flex">
          Visão geral
        </p>
      </Link>
      <Link
        className={cn(
          'flex flex-row items-center justify-center gap-2 p-4 text-lg text-title dark:text-title-dark',
          hasAccess && 'border-b-2 border-primary',
        )}
        to={`/profile/${user?.id}/access`}
      >
        <Key
          size={24}
          className={cn(
            'text-title dark:text-title-dark',
            hasAccess && 'text-primary',
          )}
        />
        <p className="hidden flex-row items-center gap-2 md:flex">
          Dados de acesso
        </p>
      </Link>
      <Link
        className={cn(
          'flex flex-row items-center justify-center gap-2 p-4 text-lg text-title dark:text-title-dark',
          hasPersonal && 'border-b-2 border-primary',
        )}
        to={`/profile/${user?.id}/personal`}
      >
        <User
          size={24}
          className={cn(
            'text-title dark:text-title-dark',
            hasPersonal && 'text-primary',
          )}
        />
        <p className="hidden flex-row items-center gap-2 md:flex">
          Dados pessoais
        </p>
      </Link>
      {showPaymentsFeature && (
        <Link
          className={cn(
            'flex flex-row items-center justify-center gap-2 p-4 text-lg text-title dark:text-title-dark',
            hasSubscription && 'border-b-2 border-primary',
          )}
          to={`/profile/${user?.id}/subscriptions`}
        >
          <Crown
            size={24}
            className={cn(
              'text-title dark:text-title-dark',
              hasSubscription && 'text-primary',
            )}
          />
          <p className="hidden flex-row items-center gap-2 md:flex">
            Assinaturas e cartões
          </p>
        </Link>
      )}
    </aside>
  );
}
