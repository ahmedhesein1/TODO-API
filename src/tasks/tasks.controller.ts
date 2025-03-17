import { Task } from './tasks.entity';
import { AppDataSource } from '..';
import { instanceToPlain } from 'class-transformer';
import { Response, Request } from 'express';
class TaskController {
  constructor(
    private taskRepository = AppDataSource.getRepository(
      Task,
    ),
  ) {}
  public async getAll(req:Request,res:Response):Promise<Response> {
    let tasks: Task[] = await this.taskRepository.find();
    return instanceToPlain(tasks) as Task[];
  }
  public async createTask(taskData: {}): Promise<Task> {
    let newTask = this.taskRepository.create(taskData);
    await this.taskRepository.save(newTask);
    return instanceToPlain(newTask) as Task;
  }
}

export const taskController = new TaskController();
