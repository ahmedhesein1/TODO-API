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
exports.taskController = void 0;
const tasks_entity_1 = require("./tasks.entity");
const __1 = require("..");
const class_transformer_1 = require("class-transformer");
const AppError_1 = __importDefault(require("../middlewares/AppError"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
class TaskController {
    constructor() {
        this.taskRepository = __1.AppDataSource.getRepository(tasks_entity_1.Task);
        // ✅ Get All Tasks
        this.getAll = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const tasks = yield this.taskRepository.find({
                order: { date: 'ASC' },
            });
            if (!tasks)
                return next(new AppError_1.default('No task Found', 404));
            res.status(200).json({
                success: true,
                data: (0, class_transformer_1.instanceToPlain)(tasks),
            });
        }));
        // ✅ Get Task by ID
        this.getById = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskRepository.findOneBy({
                id: req.params.id,
            });
            if (!task) {
                return next(new AppError_1.default('No task Found', 404));
            }
            res.status(200).json({
                success: true,
                data: (0, class_transformer_1.instanceToPlain)(task),
            });
        }));
        // ✅ Create a Task
        this.createTask = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { title, description, priority, status, date } = req.body;
            const newTask = this.taskRepository.create({
                title,
                description,
                priority,
                status,
                date,
            });
            yield this.taskRepository.save(newTask);
            res.status(201).json({
                success: true,
                data: (0, class_transformer_1.instanceToPlain)(newTask),
            });
        }));
        // ✅ Update a Task
        this.updateTask = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const taskRepository = __1.AppDataSource.getRepository(tasks_entity_1.Task);
            const { id } = req.params;
            const updates = req.body; // Contains only fields to update
            // Find existing task
            const task = yield taskRepository.findOneBy({ id });
            if (!task) {
                return next(new AppError_1.default('Task not found', 404));
            }
            // Merge updates dynamically
            Object.assign(task, updates);
            // Save updated task
            const updatedTask = yield taskRepository.save(task);
            res.status(200).json({
                success: true,
                data: (0, class_transformer_1.instanceToPlain)(updatedTask),
            });
        }));
        // ✅ Delete a Task
        this.deleteTask = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskRepository.findOneBy({
                id: req.params.id,
            });
            if (!task)
                return next(new AppError_1.default('Task not Found', 404));
            yield this.taskRepository.delete(req.params.id);
            res.status(200).json({
                success: true,
                message: 'Task Successfully Deleted',
            });
        }));
    }
}
exports.taskController = new TaskController();
