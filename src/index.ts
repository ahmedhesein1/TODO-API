import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
const app: Express = express();
dotenv.config();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
