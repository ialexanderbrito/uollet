export function verifyLoginLastSevenDays(
  lastLoginUser: Date | undefined,
  telefone: string | undefined,
) {
  if (!lastLoginUser) return;
  if (!telefone) return;

  const lastLogin = new Date(lastLoginUser);
  const today = new Date();

  const diffTime = Math.abs(today.getTime() - lastLogin.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 7 && telefone) {
    return true;
  }

  return false;
}
