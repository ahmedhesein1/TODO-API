"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const user_controller_1 = require("./user.controller");
const Role_1 = require("../enums/Role");
exports.authRoutes = (0, express_1.Router)();
exports.authRoutes.get('/', auth_controller_1.authController.protect, auth_controller_1.authController.restrictTo(Role_1.Role.admin), user_controller_1.userController.getAll);
exports.authRoutes
    .route('/:id')
    .get(auth_controller_1.authController.protect, auth_controller_1.authController.restrictTo(Role_1.Role.admin), user_controller_1.userController.getUserById)
    .patch(auth_controller_1.authController.protect, auth_controller_1.authController.restrictTo(Role_1.Role.admin), user_controller_1.userController.updateUserRole);
exports.authRoutes.post('/signup', auth_controller_1.authController.signUp);
exports.authRoutes.post('/login', auth_controller_1.authController.login);
exports.authRoutes.get('/logout', auth_controller_1.authController.protect, auth_controller_1.authController.logout);
