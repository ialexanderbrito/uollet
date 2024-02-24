export function removeMaskCEP(cep: string) {
  return cep.replace(/\D/g, '');
}
