import { useAuth } from 'contexts/Auth';

import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

export function MainRoutes() {
  const { signed } = useAuth();
  return signed ? <PrivateRoutes /> : <PublicRoutes />;
}
