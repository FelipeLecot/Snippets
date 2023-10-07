import { pbkdf2 } from "crypto";

export const hashPassword = (password: string, saveHashData: (hash: string, salt: string) => void) => {
  const salt = crypto.getRandomValues(new Uint8Array(128)).toString();
  pbkdf2(password, salt, 10000, 64, 'sha512', (err, deriverKey) => {saveHashData(deriverKey.toString(), salt)});
}

export const isPasswordCorrect = (savedSalt: string, passwordAttempt: string, checkPassword: (hash: string) => void) => {
  pbkdf2(passwordAttempt, savedSalt, 10000, 64, 'sha512', (err, deriverKey) => {checkPassword(deriverKey.toString())});
}