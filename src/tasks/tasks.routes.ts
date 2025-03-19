import { Router, Request, Response } from 'express';
import { taskController } from './tasks.controller';
import { createValidator } from './tasks.validator';
import { validateRequest } from '../middlewares/validateRequest';

export const taskRouter: Router = Router();

taskRouter
  .route('/')
  .get(taskController.getAll)
  .post(
    createValidator,
    validateRequest,
    taskController.createTask,
  );
taskRouter
  .route('/:id')
  .get(taskController.getById)
  .patch(validateRequest,
    taskController.updateTask,
  )
  .delete(taskController.deleteTask);
