import { KBar } from 'components/KBarComponent';

import { useAuth } from 'contexts/Auth';

import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

export function MainRoutes() {
  const { signed } = useAuth();

  if (window.location.host.split('.')[0] === 'app') {
    return (
      <>
        <KBar>
          <PrivateRoutes />
        </KBar>
      </>
    );
  }

  return signed ? (
    <>
      <KBar>
        <PrivateRoutes />
      </KBar>
    </>
  ) : (
    <PublicRoutes />
  );
}
