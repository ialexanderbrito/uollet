export const numberToLocale = (number: number): string => {
  const locale = new Intl.NumberFormat('pt-BR');

  return locale.format(number);
};
