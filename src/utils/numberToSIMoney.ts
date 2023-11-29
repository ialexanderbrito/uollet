export function numberToSIMoney(number: any) {
  const parsedNumber = parseFloat(number);

  if (isNaN(parsedNumber)) return '--';

  const money = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    notation: 'compact',
  });

  return money.format(parsedNumber);
}
