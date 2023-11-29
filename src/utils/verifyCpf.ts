export function isValidCPF(cpf: string): boolean {
  if (typeof cpf !== 'string') return false;

  const cleanedCPF = cpf.replace(/[\s.-]*/gim, '');

  if (
    !cleanedCPF ||
    cleanedCPF.length !== 11 ||
    cleanedCPF === '00000000000' ||
    cleanedCPF === '11111111111' ||
    cleanedCPF === '22222222222' ||
    cleanedCPF === '33333333333' ||
    cleanedCPF === '44444444444' ||
    cleanedCPF === '55555555555' ||
    cleanedCPF === '66666666666' ||
    cleanedCPF === '77777777777' ||
    cleanedCPF === '88888888888' ||
    cleanedCPF === '99999999999'
  ) {
    return false;
  }

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cleanedCPF.substring(i - 1, i), 10) * (11 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cleanedCPF.substring(9, 10), 10)) {
    return false;
  }

  soma = 0;

  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cleanedCPF.substring(i - 1, i), 10) * (12 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cleanedCPF.substring(10, 11), 10)) {
    return false;
  }

  return true;
}
