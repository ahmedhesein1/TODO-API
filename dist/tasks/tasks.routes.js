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
exports.taskRouter = void 0;
const express_1 = require("express");
const tasks_controller_1 = require("./tasks.controller");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const tasks_validator_1 = require("./tasks.validator");
const validateRequest_1 = require("../middlewares/validateRequest");
exports.taskRouter = (0, express_1.Router)();
exports.taskRouter.get('/', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allTasks = yield tasks_controller_1.taskController.getAll();
    res.json(allTasks).status(200);
})));
exports.taskRouter.post('/', tasks_validator_1.createValidator, validateRequest_1.validateRequest, (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newTask = yield tasks_controller_1.taskController.createTask(req.body);
    res.json(newTask).status(201);
})));
