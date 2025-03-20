"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const user_controller_1 = require("./user.controller");
exports.router = (0, express_1.Router)();
exports.router.get('/', auth_controller_1.authController.protect, auth_controller_1.authController.restrictTo('admin'), user_controller_1.userController.getAll);
exports.router
    .route('/:id')
    .get(auth_controller_1.authController.protect, auth_controller_1.authController.restrictTo('admin'), user_controller_1.userController.getUserById)
    .patch(auth_controller_1.authController.protect, auth_controller_1.authController.restrictTo('admin'), user_controller_1.userController.updateUserRole);
exports.router.post('/signup', auth_controller_1.authController.signUp);
exports.router.post('/login', auth_controller_1.authController.login);
