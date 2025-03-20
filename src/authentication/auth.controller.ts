import { User } from './user.entity';
import { AppDataSource } from '..';
import { instanceToPlain } from 'class-transformer';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import AppError from '../middlewares/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
interface TokenPayload extends JwtPayload {
  id: string;
  role: string;
}

declare module 'express' {
  interface Request {
    user?: User;
  }
}

class UserController {
  private userRepository =
    AppDataSource.getRepository(User);

  // Generate Token
  private generateToken(user: User): string {
    return jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' },
    );
  }

  // ✅ Sign Up User
  public signUp = asyncHandler(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password)
        return next(
          new AppError('please Provide all fields', 400),
        );

      const user = await this.userRepository.findOneBy({
        email,
      });
      if (user)
        return next(
          new AppError(
            'User already existed login please',
            404,
          ),
        );
      const hashedPassword = await bcrypt.hash(
        password,
        12,
      );

      const newUser = this.userRepository.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'user',
      });
      await this.userRepository.save(newUser);
      const token = this.generateToken(newUser);
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 3600000,
      });
      res.status(201).json({
        success: true,
        data: instanceToPlain(newUser),
        token,
      });
    },
  );

  // Login User
  public login = asyncHandler(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      const { email, password } = req.body;
      if (!email || !password)
        return next(
          new AppError('Please provide all fields', 400),
        );
      const user = await this.userRepository.findOneBy({
        email,
      });
      if (!user)
        return next(new AppError('User Not Found', 404));
      const isMatch = await bcrypt.compare(
        password,
        user.password,
      );
      if (!isMatch)
        return next(
          new AppError('Invalid credentials', 401),
        );
      const token = this.generateToken(user);
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 3600000,
      });
      res.status(200).json({
        success: true,
        data: instanceToPlain(user),
        token,
      });
    },
  );

  // ✅ Protect Middleware
  public protect = asyncHandler(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      const token = req.cookies.token;
      if (!token)
        return next(
          new AppError('You Are Not Authorized', 404),
        );
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!,
      ) as TokenPayload;
      req.params.id = decoded.id;
      const user = await this.userRepository.findOneBy({
        id: decoded.id,
      });
      if (!user)
        return next(new AppError('User Not Found', 404));
      decoded
        ? next()
        : next(new AppError('User Not Found', 404));
    },
  );

  // Restrict To middleware
  public restrictTo = (...roles: string[]) => {
    return asyncHandler(
      async (
        req: Request,
        res: Response,
        next: NextFunction,
      ) => {
        if (!req.user)
          return next(new AppError('Not Authorized', 401));
        if (!roles.includes(req.user.role))
          return next(new AppError('Admins Only', 403));
        next();
      },
    );
  };


}
export const userController = new UserController();
