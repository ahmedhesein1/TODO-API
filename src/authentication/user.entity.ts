import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../enums/Role';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'varchar',
    length: 225,
  })
  name: string;
  @Column({
    type: 'varchar',
    length: 225,
    unique: true,
  })
  email: string;
  @Column({
    type: 'varchar',
    length: 225,
    select: false,
  })
  password: string;
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.user,
  })
  role: Role;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
