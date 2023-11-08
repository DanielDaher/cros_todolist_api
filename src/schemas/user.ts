import { Prisma } from "@prisma/client";
import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(4)
    .max(20, "Name must be between 4 and 20 characters")
    .transform((data) => data.toLowerCase()),
  email: z
    .string()
    .email("Must be a valid email")
    .transform((data) => data.toLowerCase()),
  password: z.string().min(4, "Password must be at least 4 characters")
}) satisfies z.Schema<Prisma.UserUncheckedCreateInput>;
