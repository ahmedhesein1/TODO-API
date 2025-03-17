import { body, ValidationChain } from 'express-validator';
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';
export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('The task Title is empty')
    .trim()
    .isString()
    .withMessage('The task Title must be string'),
  body('date')
    .not()
    .isEmpty()
    .withMessage('The task date is empty')
    .isString()
    .withMessage('The date valid format is string'),
  body('description')
    .trim()
    .isString()
    .withMessage('The description must be a string'),
  body('priority')
    .trim()
    .isIn([Priority.normal, Priority.high, Priority.low])
    .withMessage('Priority must be normal,high or low'),
  body('status')
    .trim()
    .isIn([
      Status.completed,
      Status.inProgress,
      Status.todo,
    ])
    .withMessage(
      'Status must be completed,inProgress or todo',
    ),
];

