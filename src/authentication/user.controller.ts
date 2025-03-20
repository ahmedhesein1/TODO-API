import { User } from './user.entity';
import { AppDataSource } from '..';
import { instanceToPlain } from 'class-transformer';
import { Request, Response, NextFunction } from 'express';
import { Role } from '../enums/Role';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import AppError from '../middlewares/AppError';
class UserController {
  private userRepository =
    AppDataSource.getRepository(User);

  // ✅ Get All Users
  public getAll = asyncHandler(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      const users = await this.userRepository.find({
        order: {
          createdAt: 'ASC',
        },
      });
      if (!users)
        return next(new AppError('No user Found', 404));
      res.status(200).json({
        success: true,
        data: instanceToPlain(users),
      });
    },
  );

  // ✅ Get User by ID
  public getUserById = asyncHandler(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      const userId = req.params.id;
      const user = await this.userRepository.findOneBy({
        id: userId,
      });
      if (!user)
        return next(new AppError('No user Found', 404));
      res.status(200).json({
        success: true,
        data: instanceToPlain(user),
      });
    },
  );

  // ✅ Update User Role By Admin Only
  public updateUserRole = asyncHandler(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      const userId = req.params.id;
      const { role } = req.body;
      if (
        req.user &&
        req.user.id === userId &&
        role !== Role.admin
      )
        return next(
          new AppError(
            'Cannot Change Your admin role',
            403,
          ),
        );
        const user = await this.userRepository.findOneBy({
        id: userId,
      });
      if(!user) return next(new AppError('User Not Found',404));
      user.role = role as Role;
      const updatedUser = await this.userRepository.save(user);
      res.status(200).json({
        success :true,
        message:'User Role Updated Successfully',
        data: instanceToPlain(updatedUser),
      })
    },
  );
}
export const userController = new UserController();
