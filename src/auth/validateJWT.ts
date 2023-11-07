import jwt, { JwtPayload } from 'jsonwebtoken'
import usersModel from '../models/usersModel';
import { NextFunction, Response } from 'express';
import { IRequestUser } from '../types';

require('dotenv').config();

interface Decoded extends JwtPayload {
  email:string,
  password:string,
  id:number
}

const secret:string = process.env.JWT_ACCESS_SECRET as string;

const validateToken = async (req:IRequestUser, res:Response, next:NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret) as Decoded;
    const user = await usersModel.getByEmail(decoded.email);

    if (!user) {
      return res
        .status(401)
        .json({ message: 'jwt malformed' });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).json({ message: err.message });
    }
    return res.status(401).json({ message: 'Erro interno', error: 'failed' });
  }
};

export default validateToken