"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const app = (0, express_1.default)();
dotenv_1.default.config();
// Database connection
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    synchronize: true,
});
const PORT = process.env.PORT;
exports.AppDataSource.initialize()
    .then(() => {
    console.log(`Database initialized`);
    app.listen(PORT, () => {
        console.log(`App listening on ${PORT}`);
    });
})
    .catch((err) => {
    console.error('Error during initialization', err);
});
