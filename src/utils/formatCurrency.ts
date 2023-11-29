export function formatCurrency(value: number, currency = 'BRL'): string {
  const language = currency === 'BRL' ? 'pt-BR' : 'en-US';

  const formatter = new Intl.NumberFormat(language, {
    style: 'currency',
    currency,
  }).format(value);

  return formatter;
}
