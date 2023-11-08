import { Prisma } from "@prisma/client";
import { z } from "zod";

export const idParamsRequest = z.object({
  id: z.string().transform((value) => parseInt(value))
});

export type IdParamsRequest = z.infer<typeof idParamsRequest>;

export const reqUser = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  password: z
    .string()
    .min(4, "Password must be at least 6 characters long")
    .transform((value) => "*".repeat(value.length)),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const reqBody = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  password: z
    .string()
    .min(4, "Password must be at least 6 characters long")
    .transform((value) => "*".repeat(value.length)),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type ReqUser = z.infer<typeof reqUser>;

const createSubtaskSchema = z.object({
  title: z.string(),
  description: z
    .string()
    .max(20, "Description must be less than 200 characters"),
  status: z.enum(["TODO", "INPROGRESS", "FINISHED"]).default("TODO"),
  authorId: z.number()
}) satisfies z.Schema<Prisma.SubtaskUncheckedCreateInput>;

export type CreateSubtask = z.infer<typeof createSubtaskSchema>;

export const createTaskSchema = z.object({
  title: z.string().max(40, "Title must be less than 40 characters"),
  description: z
    .string()
    .max(20, "Description must be less than 200 characters")
    .optional(),
  status: z.enum(["TODO", "INPROGRESS", "FINISHED"]).default("TODO"),
  authorId: z.number(),
  subtask: createSubtaskSchema.optional()
});

export type CreateTask = z.infer<typeof createTaskSchema>;

const updateSubtaskSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z
    .string()
    .max(20, "Description must be less than 200 characters"),
  status: z.enum(["TODO", "INPROGRESS", "FINISHED"]).default("TODO"),
  authorId: z.number()
}) satisfies z.Schema<Prisma.SubtaskUncheckedCreateInput>;

export type UpdateSubtask = z.infer<typeof updateSubtaskSchema>;

export const updateTaskSchema = z.object({
  title: z.string().max(40, "Title must be less than 40 characters").optional(),
  description: z
    .string()
    .max(20, "Description must be less than 200 characters")
    .optional(),
  status: z.enum(["TODO", "INPROGRESS", "FINISHED"]).default("TODO"),
  authorId: z.number(),
  subtask: updateSubtaskSchema.optional()
});

export type UpdateTask = z.infer<typeof updateTaskSchema>;
