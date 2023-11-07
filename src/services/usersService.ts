import usersModel from '../models/usersModel';
import helpers from './helpers';

const create = async ({ email, name, password }:{ email:string, name:string, password:string }) => {
  const emailAlreadyInUse = await helpers.validateEmail(email);

  if (emailAlreadyInUse) return { statusCode: 400, responseMessage: 'This user is not available' };

  const insert = await usersModel.create({ email, name, password });

  return { responseMessage: insert, statusCode: 201 };
};

export default {
  create,
};