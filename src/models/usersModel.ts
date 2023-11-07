import { db } from '../utils/db';

const create = async ({ email, name, password }: { email:string, name:string, password:string }) => {
  const query = {
    name,
    password,
    email
  };

  try {
    await db.user.create({ data: query });
    return 'user created successfully';
  } catch (error) {
    return 'something went wrong'
  }

};

const getByEmail = async (email:string) => {
  const userEmail = await db.user.findUnique({ where: { email } });
  return userEmail;
};

export default {
  create,
  getByEmail,
};
