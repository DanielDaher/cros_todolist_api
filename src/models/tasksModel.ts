import { Prisma, Subtask, Task } from '@prisma/client';
import { db } from '../utils/db';

export type CreateTask = Prisma.TaskCreateInput;
export type UpdateTask = Prisma.TaskUpdateInput;

const getAll = async (authorId:number) => {
  try {
    const tasks = await db.task.findMany({ where: { id: authorId } });
    return tasks;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getById = async (id:number) => {
  try {
    const tasks = await db.task.findUnique({ where: { id } });;
    return tasks;
  } catch (error) {
    console.error(error)
  }
};
const create = async (query:CreateTask, Subtask:Subtask[], authorId:number) => {
  try {
    await db.task.create({ data: {
      ...query,
      author: { connect: { id: authorId } },
      Subtask: {
        create: { 
          ...Subtask,
          author: { connect: { id: authorId } }
         },
      }
    } });
    return 'task inserted successfully';
  } catch (error) {
    console.error(error); 
   return 'failed';
  }
};

const updateTaskById = async (query:UpdateTask, id:number, Subtask:Subtask, authorId:number) => {
  try {
    const updateInfos = db.task.update({ where: { id }, data: {
      ...query,
      Subtask: { upsert: { 
        where: { id: Subtask.id ?? 0 },
        update: { ...Subtask },
        create: { ...Subtask, authorId },
       } },
    } });
    return updateInfos;
  } catch (error) {
    return { }
  }
};

const removeTaskById = async (id:number) => {
  try {
    await db.task.delete({ where: { id } });
    return 'task deleted succesfully'; 
  } catch (error) {
    console.error(error)
    return 'failed';
  }
};

export default {
  getAll,
  getById,
  create,
  updateTaskById,
  removeTaskById,
};