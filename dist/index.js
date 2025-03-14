"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const promise_1 = __importDefault(require("mysql2/promise"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const tasks_entity_1 = require("./tasks/tasks.entity");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// ✅ Define AppDataSource at the top level (don't put `export` inside a function)
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number(process.env.MYSQL_PORT) || 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: [tasks_entity_1.Task],
    synchronize: true,
});
const createDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield promise_1.default.createConnection({
        host: process.env.MYSQL_HOST || 'localhost',
        port: Number(process.env.MYSQL_PORT) || 3306,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
    });
    yield connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DB}\``);
    yield connection.end();
    console.log('✅ Database ensured');
});
// Run this function before initializing TypeORM
createDatabase().then(() => {
    console.log('✅ Database check complete');
    exports.AppDataSource.initialize()
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
