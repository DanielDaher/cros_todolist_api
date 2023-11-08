import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .email("Must be a valid email")
    .transform((data) => data.toLowerCase()),
  password: z.string().min(4, "Password must be at least 4 characters")
});

export default loginSchema;
