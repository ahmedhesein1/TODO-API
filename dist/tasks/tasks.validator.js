"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidator = void 0;
const express_validator_1 = require("express-validator");
const Priority_1 = require("../enums/Priority");
const Status_1 = require("../enums/Status");
exports.createValidator = [
    (0, express_validator_1.body)('title')
        .not()
        .isEmpty()
        .withMessage('The task Title is empty')
        .trim()
        .isString()
        .withMessage('The task Title must be string'),
    (0, express_validator_1.body)('date')
        .not()
        .isEmpty()
        .withMessage('The task date is empty')
        .isString()
        .withMessage('The date valid format is string'),
    (0, express_validator_1.body)('description')
        .trim()
        .isString()
        .withMessage('The description must be a string'),
    (0, express_validator_1.body)('priority')
        .trim()
        .isIn([Priority_1.Priority.normal, Priority_1.Priority.high, Priority_1.Priority.low])
        .withMessage('Priority must be normal,high or low'),
    (0, express_validator_1.body)('status')
        .trim()
        .isIn([
        Status_1.Status.completed,
        Status_1.Status.inProgress,
        Status_1.Status.todo,
    ])
        .withMessage('Status must be completed,inProgress or todo'),
];
