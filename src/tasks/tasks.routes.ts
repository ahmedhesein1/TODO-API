import express, {
  Router,
  Request,
  Response,
} from 'express';
export const taskRouter: Router = Router();

taskRouter.get('/', (req: Request, res: Response) => {
  res.send('Express + typescript server');
});
