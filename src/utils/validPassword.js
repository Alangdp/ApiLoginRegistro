import bcrypt, { hash } from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/

export const encrypt = value => {
  const validPassword = validatePassword(value)
  console.log(validPassword)
  if (validPassword === undefined) return '';
  if (!validPassword) throw new Error('Invalid Password');
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(value, salt);
  return hash;
}

export const compareHash = (value, hashed) => {
  if(!validatePassword) return '';
  return bcrypt.compareSync(value, hashed);
}

export const validatePassword = value => {
  console.log(value, 'valid')
  if (value === undefined || value === null || value === '') return undefined;
  if (value.match(re) !== null) return true;
  return false
}

export const genToken = (passLength = 6) => {
  const date = new Date();
  var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ!@#$%^&*()+?><:{}[]";
  var passwordLength = passLength;
  var password = "";

  for (var i = 0; i < passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return `${password}.${date.getMilliseconds()}`
}


