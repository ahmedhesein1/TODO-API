import {
  Router,
  Request,
  Response,
} from 'express';
import { taskController } from './tasks.controller';
import asyncHandler from 'express-async-handler';
import { createValidator } from './tasks.validator';
import { Next } from 'mysql2/typings/mysql/lib/parsers/typeCast';
import { validateRequest } from '../middlewares/validateRequest';

export const taskRouter: Router = Router();

taskRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const allTasks = await taskController.getAll();
    res.json(allTasks).status(200);
  }),
);
taskRouter.post(
  '/',
  createValidator,validateRequest,
  asyncHandler(
    async (req: Request, res: Response, next: Next) => {
      const newTask = await taskController.createTask(
        req.body,
      );
      res.json(newTask).status(201);
    },
  ),
);
