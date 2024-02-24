import { useToast } from 'contexts/Toast';

export function useClipboard() {
  const { toast } = useToast();

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    toast.success('Copiado para a área de transferência', { id: 'copy' });
  }

  return { copyToClipboard };
}
