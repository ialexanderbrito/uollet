export function removeMaskCPF(cpf: string) {
  return cpf.replace(/\D/g, '');
}
