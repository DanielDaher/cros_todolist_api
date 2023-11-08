import { Response } from "express";

import { ZodError } from "zod";
import {
  createTaskSchema,
  idParamsRequest,
  reqUser,
  updateTaskSchema
} from "../schemas/tasks";
import tasksService from "../services/tasksService";
import { IRequestUser } from "../types";
import { errorMessages } from "../utils/zodValidationErrors";

const getAll = async (req: IRequestUser, res: Response) => {
  try {
    const { id: authorId } = reqUser.parse(req.user);
    const tasks = await tasksService.getAll(authorId);

    res.status(tasks.statusCode).json(tasks.responseMessage);
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      return res.status(400).json(errorMessages(error));
    }
    res.status(400).json({ message: "error, try again latter" });
  }
};

const getById = async (req: IRequestUser, res: Response) => {
  try {
    const { id } = idParamsRequest.parse(req.params);
    const task = await tasksService.getById(id);

    res.status(task.statusCode).json(task.responseMessage);
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      return res.status(400).json(errorMessages(error));
    }
    res.status(400).json({ message: "error, try again latter" });
  }
};

const create = async (req: IRequestUser, res: Response) => {
  try {
    const user = reqUser.parse(req.user);
    const createTaskData = createTaskSchema.parse({
      ...req.body,
      body: req.body,
      authorId: user.id,
      subtask: req.body.subtask && {
        ...req.body.subtask,
        authorId: user.id
      }
    });
    const insert = await tasksService.create(createTaskData, user.id);

    res.status(insert.statusCode).json(insert.responseMessage);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json(errorMessages(error));
    }
    return res.status(400).json("error, try again latter");
  }
};

const updateTaskById = async (req: IRequestUser, res: Response) => {
  try {
    const { id } = idParamsRequest.parse(req.params);
    const user = reqUser.parse(req.user);
    const updateTaskData = updateTaskSchema.parse({
      ...req.body,
      authorId: user.id,
      subtask: req.body.subtask && {
        ...req.body.subtask,
        authorId: user.id,
        id: req.body.subtask.id
      }
    });
    const { title, description, status, subtask } = updateTaskData;
    const updateInfos = await tasksService.updateTaskById(
      { title, description, status },
      id,
      user.id,
      subtask
    );

    res.status(updateInfos.statusCode).json(updateInfos.responseMessage);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json(errorMessages(error));
    }
    return res.status(400).json("error, try again latter");
  }
};

const removeTaskById = async (req: IRequestUser, res: Response) => {
  try {
    const { id } = idParamsRequest.parse(req.params);
    const removeTask = await tasksService.removeTaskById(id);

    res.status(removeTask.statusCode).json(removeTask.responseMessage);
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      return res.status(400).json(errorMessages(error));
    }
    res.status(400).json({ message: "error, try again latter" });
  }
};

const removeAllSubtasksById = async (req: IRequestUser, res: Response) => {
  try {
    const { id } = idParamsRequest.parse(req.params);
    const removeTask = await tasksService.removeAllSubtasksById(id);

    res.status(removeTask.statusCode).json(removeTask.responseMessage);
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      return res.status(400).json(errorMessages(error));
    }
    res.status(400).json({ message: "error, try again latter" });
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
