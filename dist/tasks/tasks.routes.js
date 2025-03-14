"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = require("express");
exports.taskRouter = (0, express_1.Router)();
exports.taskRouter.get('/', (req, res) => {
    res.send('Express + typescript server');
});
