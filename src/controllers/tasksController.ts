import { Request, Response } from "express";

import tasksService from '../services/tasksService';
import { IRequestUser } from "../types";



const getAll = async (req:IRequestUser, res:Response) => {
  try {
    console.log(req)
    const { id: authorId } = req.user;
    const tasks = await tasksService.getAll(authorId);

    res.status(tasks.statusCode).json(tasks.responseMessage);

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'error, try again latter' });
  }
};

const getById = async (req:IRequestUser, res:Response) => {
  try {
    const { id } = req.params;
    const task = await tasksService.getById(id);

    res.status(task.statusCode).json(task.responseMessage);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'error, try again latter' });
  }
};

const create = async (req:IRequestUser, res:Response) => {
  try {
    const { id: authorId } = req.user;
    const { title, description, status } = req.body;
    const insert = await tasksService.create({ title, description, status, authorId });
  
    res.status(insert.statusCode).json(insert.responseMessage);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'error, try again latter' });
  }
};

const updateTaskById = async (req:IRequestUser, res:Response) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const updateInfos = await tasksService.updateTaskById({ title, description, status }, id);

    res.status(updateInfos.statusCode).json(updateInfos.responseMessage);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'error, try again latter' });
  }
};

const removeTaskById = async (req:IRequestUser, res:Response) => {
  try {
    const { id } = req.params;
    const removeTask = await tasksService.removeTaskById(id);

    res.status(removeTask.statusCode).json(removeTask.responseMessage);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'error, try again latter' });
  }
};

export default {
  getAll,
  getById,
  create,
  updateTaskById,
  removeTaskById,
};