import { Router } from 'express';
import { authController } from './auth.controller';
import { userController } from './user.controller';
export const router: Router = Router();
router.get(
  '/',
  authController.protect,
  authController.restrictTo('admin'),
  userController.getAll,
);
router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getUserById,
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    userController.updateUserRole,
  );
router.post('/signup', authController.signUp);
router.post('/login', authController.login);
