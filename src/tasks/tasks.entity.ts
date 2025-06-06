import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'varchar',
    length: 225,
  })
  title: string;
  @Column({
    type: 'varchar',
    length: 255,
  })
  date: string;
  @Column({
    type: 'varchar',
    length: 255,
  })
  description: string;
  @Column({
    type: 'enum',
    enum: Priority,
    default: Priority.normal,
  })
  priority: Priority;
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.todo,
  })
  status: Status;
}
