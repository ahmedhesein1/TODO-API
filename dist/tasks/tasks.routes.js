"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = require("express");
const tasks_controller_1 = require("./tasks.controller");
const tasks_validator_1 = require("./tasks.validator");
const validateRequest_1 = require("../middlewares/validateRequest");
exports.taskRouter = (0, express_1.Router)();
exports.taskRouter
    .route('/')
    .get(tasks_controller_1.taskController.getAll)
    .post(tasks_validator_1.createValidator, validateRequest_1.validateRequest, tasks_controller_1.taskController.createTask);
exports.taskRouter
    .route('/:id')
    .get(tasks_controller_1.taskController.getById)
    .patch(validateRequest_1.validateRequest, tasks_controller_1.taskController.updateTask)
    .delete(tasks_controller_1.taskController.deleteTask);
