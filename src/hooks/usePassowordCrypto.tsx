import { compare, genSalt, hash } from 'bcryptjs';

export function usePasswordCrypto() {
  const SALT_RANDOMS = 8;

  async function hashPassword(password: string) {
    const saltGenerated = await genSalt(SALT_RANDOMS);

    return await hash(password, saltGenerated);
  }

  async function verifyPassword(password: string, hash: string) {
    return await compare(password, hash);
  }

  return {
    hashPassword,
    verifyPassword,
  };
}
