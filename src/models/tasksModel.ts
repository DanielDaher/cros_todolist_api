import { Prisma, Subtask } from "@prisma/client";
import { CreateTask } from "../schemas/tasks";
import { db } from "../utils/db";

export type UpdateTask = Prisma.TaskUpdateInput;

const getAll = async (authorId: number) => {
  try {
    const tasks = await db.task.findMany({
      where: { authorId },
      include: { subtask: true }
    });
    return tasks;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getById = async (id: number) => {
  try {
    const tasks = await db.task.findUnique({
      where: { id },
      include: { subtask: true }
    });
    return tasks;
  } catch (error) {
    console.error(error);
    return [];
  }
};
const create = async (query: CreateTask, authorId: number) => {
  try {
    if (query.subtask) {
      await db.task.create({
        data: {
          ...query,
          subtask: {
            create: { ...query.subtask, authorId }
          }
        }
      });

      return "task inserted successfully";
    }
    await db.task.create({
      data: {
        ...query
      } as Prisma.TaskUncheckedCreateInput
    });
    return "task inserted successfully";
  } catch (error) {
    console.error(error);
    return "failed";
  }
};

const updateTaskById = async (
  query: UpdateTask,
  id: number,
  subtask: Subtask,
  authorId: number
) => {
  try {
    const updateInfos = db.task.update({
      where: { id },
      include: { subtask: true },
      data: {
        ...query,
        subtask: {
          upsert: {
            where: { id: subtask.id ?? 0 },
            update: { ...subtask },
            create: { ...subtask, authorId }
          }
        }
      }
    });
    return updateInfos;
  } catch (error) {
    return "failed";
  }
};

const removeTaskById = async (id: number) => {
  try {
    await db.task.delete({ where: { id } });
    return "task deleted successfully";
  } catch (error) {
    console.error(error);
    return "failed";
  }
};

const removeAllSubtasksById = async (taskId: number) => {
  try {
    await db.subtask.deleteMany({ where: { taskId } });
    return "task deleted successfully";
  } catch (error) {
    console.error(error);
    return "failed";
  }
};

export default {
  getAll,
  getById,
  create,
  updateTaskById,
  removeTaskById,
  removeAllSubtasksById
};
