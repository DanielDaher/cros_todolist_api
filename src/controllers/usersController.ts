
import { Request, Response } from 'express';
import usersService from '../services/usersService';

const create = async (req:Request, res: Response) => {
  try {
    const { email, name, password } = req.body;
    const insert = await usersService.create({ email, name, password });
  
    res.status(insert.statusCode).json(insert.responseMessage);
  } catch (error) {
    console.error(error);
    res.status(400).json('error, try again latter');
  }
};

export default {
  create,
};