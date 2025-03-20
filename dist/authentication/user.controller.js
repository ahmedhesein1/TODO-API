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
exports.userController = void 0;
const user_entity_1 = require("./user.entity");
const __1 = require("..");
const class_transformer_1 = require("class-transformer");
const Role_1 = require("../enums/Role");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const AppError_1 = __importDefault(require("../middlewares/AppError"));
class UserController {
    constructor() {
        this.userRepository = __1.AppDataSource.getRepository(user_entity_1.User);
        // ✅ Get All Users
        this.getAll = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.find({
                order: {
                    createdAt: 'ASC',
                },
            });
            if (!users)
                return next(new AppError_1.default('No user Found', 404));
            res.status(200).json({
                success: true,
                data: (0, class_transformer_1.instanceToPlain)(users),
            });
        }));
        // ✅ Get User by ID
        this.getUserById = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const user = yield this.userRepository.findOneBy({
                id: userId,
            });
            if (!user)
                return next(new AppError_1.default('No user Found', 404));
            res.status(200).json({
                success: true,
                data: (0, class_transformer_1.instanceToPlain)(user),
            });
        }));
        // ✅ Update User Role By Admin Only
        this.updateUserRole = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const { role } = req.body;
            if (req.user &&
                req.user.id === userId &&
                role !== Role_1.Role.admin)
                return next(new AppError_1.default('Cannot Change Your admin role', 403));
            const user = yield this.userRepository.findOneBy({
                id: userId,
            });
            if (!user)
                return next(new AppError_1.default('User Not Found', 404));
            user.role = role;
            const updatedUser = yield this.userRepository.save(user);
            res.status(200).json({
                success: true,
                message: 'User Role Updated Successfully',
                data: (0, class_transformer_1.instanceToPlain)(updatedUser),
            });
        }));
    }
}
exports.userController = new UserController();
