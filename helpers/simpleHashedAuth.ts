import { pbkdf2 } from "crypto";

const iterations = 100000; // Replace iterations, make random? 

export const hashPassword = (password: string, saveHashData: (hash: string, salt: string) => void) => {
  const salt = crypto.getRandomValues(new Uint8Array(128)).toString();
  pbkdf2(password, salt, iterations, 64, 'sha512', (err, deriverKey) => {saveHashData(deriverKey.toString(), salt)});
}

export const isPasswordCorrect = (savedSalt: string, passwordAttempt: string, checkPassword: (hash: string) => void) => {
  pbkdf2(passwordAttempt, savedSalt, iterations, 64, 'sha512', (err, deriverKey) => {checkPassword(deriverKey.toString())});
}