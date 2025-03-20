import { Router } from 'express';
import { authController } from './auth.controller';
import { userController } from './user.controller';
import { Role } from '../enums/Role';
export const authRoutes: Router = Router();
authRoutes.get(
  '/',
  authController.protect,
  authController.restrictTo(Role.admin),
  userController.getAll,
);
authRoutes
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo(Role.admin),
    userController.getUserById,
  )
  .patch(
    authController.protect,
    authController.restrictTo(Role.admin),
    userController.updateUserRole,
  );
authRoutes.post('/signup', authController.signUp);
authRoutes.post('/login', authController.login);
authRoutes.get(
  '/logout',
  authController.protect,
  authController.logout,
);
