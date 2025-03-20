import { body, validationResult } from 'express-validator';
import { Role } from '../enums/Role';
export const signUpValidation = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage(
      'Password must be at least 6 characters long',
    ),
  body('role')
    .optional()
    .isIn(Object.values(Role))
    .withMessage(
      `Role must be one of: ${Object.values(Role).join(', ')}`,
    ),
];
