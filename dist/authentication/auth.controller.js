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
exports.authController = void 0;
const user_entity_1 = require("./user.entity");
const __1 = require("..");
const class_transformer_1 = require("class-transformer");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const AppError_1 = __importDefault(require("../middlewares/AppError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class AuthController {
    constructor() {
        this.userRepository = __1.AppDataSource.getRepository(user_entity_1.User);
        // ✅ Sign Up User
        this.signUp = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, role } = req.body;
            if (!name || !email || !password)
                return next(new AppError_1.default('please Provide all fields', 400));
            const user = yield this.userRepository.findOneBy({
                email,
            });
            if (user)
                return next(new AppError_1.default('User already existed login please', 404));
            const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
            const newUser = this.userRepository.create({
                name,
                email,
                password: hashedPassword,
                role: role || 'user',
            });
            yield this.userRepository.save(newUser);
            const token = this.generateToken(newUser);
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 3600000,
            });
            res.status(201).json({
                success: true,
                data: (0, class_transformer_1.instanceToPlain)(newUser),
                token,
            });
        }));
        // Login User
        this.login = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password)
                return next(new AppError_1.default('Please provide all fields', 400));
            const user = yield this.userRepository.findOneBy({
                email,
            });
            if (!user)
                return next(new AppError_1.default('User Not Found', 404));
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch)
                return next(new AppError_1.default('Invalid credentials', 401));
            const token = this.generateToken(user);
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 3600000,
            });
            res.status(200).json({
                success: true,
                data: (0, class_transformer_1.instanceToPlain)(user),
                token,
            });
        }));
        // ✅ Protect Middleware
        this.protect = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = req.cookies.token;
            if (!token)
                return next(new AppError_1.default('You Are Not Authorized', 404));
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.params.id = decoded.id;
            const user = yield this.userRepository.findOneBy({
                id: decoded.id,
            });
            if (!user)
                return next(new AppError_1.default('User Not Found', 404));
            decoded
                ? next()
                : next(new AppError_1.default('User Not Found', 404));
        }));
        // Restrict To middleware
        this.restrictTo = (...roles) => {
            return (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                if (!req.user)
                    return next(new AppError_1.default('Not Authorized', 401));
                if (!roles.includes(req.user.role))
                    return next(new AppError_1.default('Admins Only', 403));
                next();
            }));
        };
        this.logout = (0, express_async_handler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.clearCookie('token');
            res
                .status(200)
                .json({
                success: true,
                message: 'Logged Out successfully',
            });
        }));
    }
    // Generate Token
    generateToken(user) {
        return jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    }
}
exports.authController = new AuthController();
