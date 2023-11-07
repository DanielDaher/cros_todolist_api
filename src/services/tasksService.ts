import tasksModel, { CreateTask, UpdateTask } from "../models/tasksModel";
import helpers from "./helpers";


const getAll = async (author:number) => {
  const tasks = await tasksModel.getAll(author);
  if (tasks.length < 1) return { statusCode: 200, responseMessage: 'this user has no tasks yet!' };

  return { statusCode: 200, responseMessage: tasks };
};

const getById = async (id:string) => {
  const task = await tasksModel.getById(parseInt(id));
  if (!task) return { statusCode: 404, responseMessage: 'task not found!' };

  return { statusCode: 200, responseMessage: task };
};

const create = async (query:CreateTask) => {
  const responseMessage = `Invalid info. The fields 'title' and 'status' are required on this body requisition`;
  const validReqBody = helpers.validateReqBody(query);

  if (!validReqBody) return { statusCode: 400, responseMessage };

  const insert = await tasksModel.create(query);

  const statusCode = insert === 'failed' ? 400 : 201;

  return { responseMessage: insert, statusCode };
};

const updateTaskById = async (query:UpdateTask, id:string) => {
  // const responseMessage = `Invalid info. The fields 'task' and 'status' are required on this body requisition`;
  // const validReqBody = helpers.validateReqBody(query);
  const findTask = await tasksModel.getById(parseInt(id));

  if (!findTask) return { statusCode: 404, responseMessage: 'task not found!' };
  // if (!validReqBody) return { statusCode: 400, responseMessage };

  const updateInfos = await tasksModel.updateTaskById(query, parseInt(id));

  return { responseMessage: updateInfos, statusCode: 200 };
};

const removeTaskById = async (id:string) => {
  const responseMessage = `invalid id, task not found!`;
  let statusCode = 404;
  const findTask = await tasksModel.getById(parseInt(id));

  if (!findTask) return { statusCode, responseMessage };

  const removeTask = await tasksModel.removeTaskById(parseInt(id));

  statusCode = removeTask === 'failed' ? 400 : 200;

  return { responseMessage: removeTask, statusCode };
};

export default {
  getAll,
  getById,
  create,
  updateTaskById,
  removeTaskById,
};