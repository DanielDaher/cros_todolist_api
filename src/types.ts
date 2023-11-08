import { User } from "@prisma/client";
import { Request } from "express";

export interface IRequestUser extends Request{
  user: User
}