import { useEffect } from 'react';

import { clarity, version } from 'clarity-js';

import { useAuth } from 'contexts/Auth';

export function MicrosoftClarity() {
  const { user } = useAuth();
  console.log('Microsoft Clarity version:', version);

  useEffect(() => {
    clarity.consent();

    if (user) {
      clarity.set('user_id', user.id);
      clarity.set('user_email', user.email);
      clarity.set('user_name', user.user_metadata.full_name);

      clarity.start({
        projectId: import.meta.env.VITE_MICROSOFT_CLARITY_ID,
        track: true,
        content: true,
        upload: 'https://m.clarity.ms/collect',
      });
    }
    return () => {
      clarity.stop();
    };
  }, []);

  return null;
}
