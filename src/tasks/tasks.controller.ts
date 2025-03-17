import { Task } from './tasks.entity';
import { AppDataSource } from '..';
import { instanceToPlain } from 'class-transformer';
export class TaskController {
  constructor(
    private taskRepository = AppDataSource.getRepository(
      Task,
    ),
  ) {}
  public async getAll(): Promise<Task[]> {
      let tasks: Task[] = await this.taskRepository.find();
      tasks = instanceToPlain(tasks) as Task[];
      return tasks;
  }
  public async createTask(taskData:{}): Promise<Task>{
    let newTask= this.taskRepository.create(taskData);
    await this.taskRepository.save(newTask);
    return instanceToPlain(newTask) as Task;
  }
}
