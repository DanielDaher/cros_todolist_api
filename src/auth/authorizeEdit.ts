import { IRequestUser } from "../types";
import { NextFunction, Response } from "express";
import { db } from "../utils/db";

async function authorizeEdit(
  req: IRequestUser,
  res: Response,
  next: NextFunction
) {
  const taskId = req.params.id;
  const userId = req.user.id;

  try {
    const task = await db.task.findUnique({
      where: { id: parseInt(taskId) },
      select: { authorId: true }
    });

    if (!task) {
      return res.status(404).json({ error: "task not found" });
    }

    if (task.authorId !== userId) {
      return res.status(403).json({ error: "Permission denied" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export default authorizeEdit;
