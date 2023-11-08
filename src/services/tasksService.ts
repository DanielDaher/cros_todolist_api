import tasksModel, { UpdateTask } from "../models/tasksModel";
import { CreateTask } from "../schemas/tasks";
import helpers from "./helpers";

const getAll = async (authorId: number) => {
  const tasks = await tasksModel.getAll(authorId);
  if (tasks.length < 1)
    return { statusCode: 200, responseMessage: "this user has no tasks yet!" };

  return { statusCode: 200, responseMessage: tasks };
};

const getById = async (id: number) => {
  const task = await tasksModel.getById(id);
  if (!task) return { statusCode: 404, responseMessage: "task not found!" };

  return { statusCode: 200, responseMessage: task };
};

const create = async (query: CreateTask, authorId: number) => {
  const responseMessage = `Invalid info. The fields 'title' and 'status' are required on this body requisition`;
  const validReqBody = helpers.validateReqBody(query);

  if (!validReqBody) return { statusCode: 400, responseMessage };

  const insert = await tasksModel.create(query, authorId);

  const statusCode = insert === "failed" ? 400 : 201;

  return { responseMessage: insert, statusCode };
};

const updateTaskById = async (
  query: UpdateTask,
  id: number,
  authorId: number,
  subtasks?: any
) => {
  const findTask = await tasksModel.getById(id);

  if (!findTask) return { statusCode: 404, responseMessage: "task not found!" };

  const updateInfos = await tasksModel.updateTaskById(
    query,
    id,
    subtasks,
    authorId
  );

  return { responseMessage: updateInfos, statusCode: 200 };
};

const removeTaskById = async (id: number) => {
  const responseMessage = `invalid id, task not found!`;
  let statusCode = 404;
  const findTask = await tasksModel.getById(id);

  if (!findTask) return { statusCode, responseMessage };

  const removeTask = await tasksModel.removeTaskById(id);

  statusCode = removeTask === "failed" ? 400 : 200;

  return { responseMessage: removeTask, statusCode };
};

const removeAllSubtasksById = async (id: number) => {
  const responseMessage = `invalid id, task not found!`;
  let statusCode = 404;
  const findTask = await tasksModel.getById(id);

  if (!findTask) return { statusCode, responseMessage };

  const removeTask = await tasksModel.removeAllSubtasksById(id);

  statusCode = removeTask === "failed" ? 400 : 200;

  return { responseMessage: removeTask, statusCode };
};

export default {
  getAll,
  getById,
  create,
  updateTaskById,
  removeTaskById,
  removeAllSubtasksById
};
