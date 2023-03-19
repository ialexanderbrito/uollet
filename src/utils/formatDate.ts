export function formatDate(date: Date) {
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

  return formatter;
}
