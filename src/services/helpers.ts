import usersModel from "../models/usersModel";

const validateReqBody = ({ title }: { title?: string }) => {
  if (typeof title !== "string" || title.length < 1) return null;
  return true;
};

const validatePassword = (password: string) => {
  if (password.length < 3) return null;

  return true;
};

const validateEmail = async (email: string) => {
  const emailAlreadyExists = await usersModel.getByEmail(email);
  if (emailAlreadyExists) return true;

  return null;
};

export default {
  validateReqBody,
  validatePassword,
  validateEmail
};
