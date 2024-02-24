import { useEffect } from 'react';

export function MicrosoftClarity() {
  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'microsoft-clarity-init';
    script.type = 'text/javascript';
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${import.meta.env.VITE_MICROSOFT_CLARITY_ID}`;

    const firstScript = document.getElementsByTagName('script')[0];

    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);

      return () => {
        const clarityScript = document.getElementById('microsoft-clarity-init');
        clarityScript?.parentNode?.removeChild(clarityScript);
      };
    }
  }, []);

  return null;
}
