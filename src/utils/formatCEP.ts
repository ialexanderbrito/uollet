export function formatCep(value: string) {
  const numericValue = value.replace(/\D/g, '');

  const cepWithMask = numericValue.replace(/(\d{5})(\d{0,3})/, '$1-$2');

  return cepWithMask.slice(0, 10);
}
