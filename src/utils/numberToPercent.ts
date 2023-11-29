export const numberToPercent = (number: number): string => {
  const percent = new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    maximumSignificantDigits: 2,
  });

  return percent.format(number / 100);
};
