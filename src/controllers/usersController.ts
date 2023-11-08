import { Request, Response } from "express";
import { ZodError } from "zod";
import { userSchema } from "../schemas/user";
import usersService from "../services/usersService";
import { errorMessages } from "../utils/zodValidationErrors";

const create = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = userSchema.parse(req.body);
    const insert = await usersService.create({ email, name, password });

    res.status(insert.statusCode).json(insert.responseMessage);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json(errorMessages(error));
    }
    return res.status(400).json("error, try again latter");
  }
};

export default {
  create
};
