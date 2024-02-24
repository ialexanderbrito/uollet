import { useEffect } from 'react';
import { clarity } from 'react-microsoft-clarity';

import { useAuth } from 'contexts/Auth';

export function MicrosoftClarity() {
  const { user } = useAuth();

  useEffect(() => {
    clarity.consent();

    if (user) {
      clarity.identify('user_id', { user_id: user.id });
      clarity.identify('user_email', { user_email: user.email });
      clarity.identify('user_name', {
        user_name: user.user_metadata.full_name,
      });

      clarity.setTag('user_id', user.id);
      clarity.setTag('user_email', user.email);
      clarity.setTag('user_name', user.user_metadata.full_name);

      clarity.init(import.meta.env.VITE_MICROSOFT_CLARITY_ID);
    }
  }, []);

  return null;
}
