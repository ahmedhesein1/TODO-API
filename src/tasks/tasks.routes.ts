import express, {
  Router,
  Request,
  Response,
} from 'express';
import { TaskController } from './tasks.controller';
import asyncHandler from 'express-async-handler';
import {createValidator} from './tasks.validator';
import { Next } from 'mysql2/typings/mysql/lib/parsers/typeCast';

export const taskRouter: Router = Router();

taskRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const taskController = new TaskController();
    const allTasks = await taskController.getAll();
    res.json(allTasks).status(200);
  }),
);
taskRouter.post('/',createValidator, asyncHandler(async (req:Request, res:Response,next:Next)=>{
  const taskController = new TaskController();
  const newTask = await taskController.createTask(req.body);
  res.json(newTask).status(201);
}))