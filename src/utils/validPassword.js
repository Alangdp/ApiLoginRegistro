import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const salt = bcrypt.genSaltSync(10);

export const encrypt = value => {
  const encrypted = bcrypt.hashSync(value, 10);
  if(validPassword(value)) return encrypted;
  return ''
}

export const validPassword = value => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
  if(!value.match(re)) return;
  return value
}
