import bcrypt, { hash } from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

export const encrypt = value => {
  if(!validPassword) return '';
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(value, salt);
  return hash;
}

export const compareHash = (value, hashed) => {
  if(!validPassword) return '';
  return bcrypt.compareSync(value, hashed);
}

export const validPassword = value => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
  if(!value.match(re)) return;
  return value
}
