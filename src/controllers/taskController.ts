/** @format */

import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Task, TaskStatus } from "../entities/Task";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { filter } = req.query;
    const repo = AppDataSource.getRepository(Task);

    let where = {};
    if (filter === TaskStatus.COMPLETED)
      where = { status: TaskStatus.COMPLETED };
    else if (filter === TaskStatus.PENDING)
      where = { status: TaskStatus.PENDING };

    const tasks = await repo.find({ where });
    res.json(tasks);
  } catch (err) {}
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, status } = req.body;
    const repo = AppDataSource.getRepository(Task);

    const task = repo.create({
      title,
      status: Object.values(TaskStatus).includes(status)
        ? status
        : TaskStatus.PENDING,
    });
    await repo.save(task);

    res.status(201).json(task);
  } catch (err) {}
};
