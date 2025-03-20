"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpValidation = void 0;
const express_validator_1 = require("express-validator");
const Role_1 = require("../enums/Role");
exports.signUpValidation = [
    (0, express_validator_1.body)('name')
        .trim()
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),
    (0, express_validator_1.body)('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    (0, express_validator_1.body)('role')
        .optional()
        .isIn(Object.values(Role_1.Role))
        .withMessage(`Role must be one of: ${Object.values(Role_1.Role).join(', ')}`),
];
