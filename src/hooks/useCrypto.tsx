import { compare, genSalt, hash } from 'bcryptjs';
import * as CryptoJS from 'crypto-js';

export function useCrypto() {
  const SALT_RANDOMS = 8;

  async function hashPassword(password: string) {
    const saltGenerated = await genSalt(SALT_RANDOMS);

    return await hash(password, saltGenerated);
  }

  async function verifyPassword(password: string, hash: string) {
    return await compare(password, hash);
  }

  function cryptoNumberCreditCard(number: string) {
    const key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_CRYPTO_KEY || '');
    const iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_CRYPTO_IV || '');

    const encrypted = CryptoJS.AES.encrypt(number, key, {
      keySize: 128 / 8,
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();
  }

  function decryptNumberCreditCard(number: string) {
    const key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_CRYPTO_KEY || '');
    const iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_CRYPTO_IV || '');

    const decrypted = CryptoJS.AES.decrypt(number, key, {
      keySize: 128 / 8,
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  return {
    hashPassword,
    verifyPassword,
    cryptoNumberCreditCard,
    decryptNumberCreditCard,
  };
}
