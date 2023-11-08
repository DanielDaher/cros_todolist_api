import jwt, { SignOptions } from "jsonwebtoken";
import usersModel from "../models/usersModel";
import { User } from "@prisma/client";
import { IRequestUser } from "../types";
import { Response } from "express";
import loginSchema from "../schemas/login";
import { errorMessages } from "../utils/zodValidationErrors";
import { ZodError } from "zod";

require("dotenv").config();

const secret: string = process.env.JWT_ACCESS_SECRET as string;

const validateInputFields = (email: string, password: string) => {
  if (!email || !password) return true;
  return false;
};

const validateLogin = (user: User, password: string) => {
  if (!user || user.password !== password) return true;
  return false;
};

export const makeSignature = async (req: IRequestUser, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    if (validateInputFields(email, password)) {
      return res.status(401).json({ message: "All fields must be filled" });
    }

    const user = (await usersModel.getByEmail(email)) as User;

    if (validateLogin(user, password)) {
      return res.status(401).json({ message: "Incorrect login or password" });
    }

    const jwtConfig: SignOptions = {
      expiresIn: "7d",
      algorithm: "HS256"
    };

    const token = jwt.sign(
      { id: user!.id, password: user!.password, email: user!.email },
      secret,
      jwtConfig
    );

    return res.status(200).json({ token });
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json(errorMessages(err));
    }
    if (err instanceof Error) {
      return res
        .status(500)
        .json({ message: "Erro interno", error: err.message });
    }
    return res.status(500).json({ message: "Erro interno", error: "failed" });
  }
};
