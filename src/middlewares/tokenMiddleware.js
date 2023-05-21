import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

export default async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ status: 'error', error: 'Token not provided' });

  const [, token] = authorization.split(' ');

  try {
    jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (error) {
    console.log(error,31231312)
    return res.status(401).json({ status: 'error', error: 'Invalid token' });
  }
};
