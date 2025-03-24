import express, { Express } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import mysql from 'mysql2/promise';
import cors from 'cors';
import bodyParser from 'body-parser';

import { Task } from './tasks/tasks.entity';
import { User } from './authentication/user.entity';
import { globalErrorHandler } from './middlewares/globalErrorHandler';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Database Connection (TypeORM)
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT) || 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: [Task,User],
  synchronize: true,
});

// Routes
import { taskRouter } from './tasks/tasks.routes';
import { authRoutes } from './authentication/auth.routes'; 


// Ensure Database Exists
const createDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      port: Number(process.env.MYSQL_PORT) || 3306,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    });

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DB}\``,
    );
    await connection.end();
    console.log('✅ Database ensured');
  } catch (error) {
    console.error('❌ Error ensuring database:', error);
    process.exit(1);
  }
};

// Initialize Database & Start Server
const initializeDatabase = async () => {
  await createDatabase();
  console.log('✅ Database check complete');

  try {
    await AppDataSource.initialize();
    console.log('✅ Database initialized');

    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`),
    );
  } catch (error) {
    console.error(
      '❌ Error during database initialization:',
      error,
    );
    process.exit(1);
  }
};

// Routes
app.use('/tasks', taskRouter);
app.use('/auth',authRoutes);
app.use(globalErrorHandler);

// Start Application
initializeDatabase();
