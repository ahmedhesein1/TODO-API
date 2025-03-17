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
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = void 0;
const tasks_entity_1 = require("./tasks.entity");
const __1 = require("..");
const class_transformer_1 = require("class-transformer");
class TaskController {
    constructor(taskRepository = __1.AppDataSource.getRepository(tasks_entity_1.Task)) {
        this.taskRepository = taskRepository;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let tasks = yield this.taskRepository.find();
            tasks = (0, class_transformer_1.instanceToPlain)(tasks);
            return tasks;
        });
    }
    createTask(taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            let newTask = this.taskRepository.create(taskData);
            yield this.taskRepository.save(newTask);
            return (0, class_transformer_1.instanceToPlain)(newTask);
        });
    }
}
exports.taskController = new TaskController();
