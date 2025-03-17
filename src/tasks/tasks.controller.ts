import { Task } from './tasks.entity';
import { AppDataSource } from '..';
import { instanceToPlain } from 'class-transformer';
import {
  Response,
  Request,
  NextFunction,
  response,
} from 'express';
import AppError from '../middlewares/AppError';
import asyncHandler from 'express-async-handler';
class TaskController {
  private taskRepository =
    AppDataSource.getRepository(Task);
    
  // ✅ Get All Tasks
  getAll = asyncHandler(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      const tasks = await this.taskRepository.find({
        order: { date: 'ASC' },
      });
      if (!tasks)
        return next(new AppError('No task Found', 404));
      res.status(200).json({
        success: true,
        data: instanceToPlain(tasks),
      });
    },
  );

  // ✅ Get Task by ID
  getById = asyncHandler(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      const task = await this.taskRepository.findOneBy({
        id: req.params.id,
      });
      if (!task)
        return next(new AppError('No task Found', 404));
    },
  );

  // ✅ Create a Task
  createTask = asyncHandler(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      const { title, description, priority, status, date } =
        req.body;

      const newTask = this.taskRepository.create({
        title,
        description,
        priority,
        status,
        date,
      });
      await this.taskRepository.save(newTask);
      res.status(201).json({
        success: true,
        data: instanceToPlain(newTask),
      });
    },
  );

  // ✅ Update a Task
  updateTask = asyncHandler(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      const task = await this.taskRepository.findOneBy({
        id: req.params.id,
      });
      if (!task)
        return next(new AppError('Task not Found', 404));

      const updatedTask = await this.taskRepository.update(
        req.params.id,
        req.body,
      );
      res.status(204).json({
        success: true,
        updatedTask: instanceToPlain(updatedTask),
      });
    },
  );

  // ✅ Delete a Task
  deleteTask = asyncHandler(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      const task = await this.taskRepository.findOneBy({
        id: req.params.id,
      });
      if (!task)
        return next(new AppError('Task not Found', 404));
      res.status(200).json({
        success: true,
        message: 'Task Successfully Deleted',
      });
    },
  );
}

export const taskController = new TaskController();
