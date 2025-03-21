"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const AppError_1 = __importDefault(require("./AppError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong';
    let stack;
    if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        stack = err.stack;
    }
    res.status(statusCode).json({
        success: false,
        message,
        stack
    });
};
exports.globalErrorHandler = globalErrorHandler;
