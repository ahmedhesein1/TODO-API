import express, { Express } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import mysql from 'mysql2/promise';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Task } from './tasks/tasks.entity';
import { globalErrorHandler } from './middlewares/globalErrorHandler';

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT) || 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: [Task],
  synchronize: true,
});

const createDatabase = async () => {
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
};

// Run this function before initializing TypeORM
import { taskRouter } from './tasks/tasks.routes';
app.use('/tasks', taskRouter);
app.use(globalErrorHandler);
createDatabase().then(() => {
  console.log('✅ Database check complete');
  
  AppDataSource.initialize()
  .then(() => {
      console.log(`✅ Database initialized`);
      app.listen(PORT, () => {
        console.log(`🚀 App listening on ${PORT}`);
      });
    })
    .catch((err) => {
      console.error('❌ Error during initialization', err);
    });
});