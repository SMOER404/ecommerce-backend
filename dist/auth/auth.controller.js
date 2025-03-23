"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const jwt_refresh_guard_1 = require("./guards/jwt-refresh.guard");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const get_user_decorator_1 = require("../common/decorators/get-user.decorator");
const config_1 = require("@nestjs/config");
let AuthController = class AuthController {
    constructor(authService, configService) {
        this.authService = authService;
        this.configService = configService;
    }
    async register(createUserDto, res) {
        const result = await this.authService.register(createUserDto);
        this.setRefreshTokenCookie(res, result.accessToken);
        return {
            accessToken: result.accessToken,
            user: result.user,
        };
    }
    async login(loginDto, res) {
        const result = await this.authService.login(loginDto);
        this.setRefreshTokenCookie(res, result.accessToken);
        return {
            accessToken: result.accessToken,
            user: result.user,
        };
    }
    async refreshTokens(req, res) {
        const userId = req.user.id;
        const refreshToken = req.cookies.refreshToken;
        const tokens = await this.authService.refreshTokens(userId, refreshToken);
        this.setRefreshTokenCookie(res, tokens.accessToken);
        return { accessToken: tokens.accessToken };
    }
    async logout(user, res) {
        await this.authService.logout(user.id);
        res.clearCookie("refreshToken");
        return { message: "Успешный выход из системы" };
    }
    setRefreshTokenCookie(res, token) {
        res.cookie("refreshToken", token, {
            httpOnly: true,
            secure: this.configService.get("NODE_ENV") === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("register"),
    (0, swagger_1.ApiOperation)({ summary: "Регистрация нового пользователя" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Пользователь успешно зарегистрирован" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Неверный запрос" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("login"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: "Вход пользователя" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Пользователь успешно вошел в систему" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Не авторизован" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)("refresh"),
    (0, common_1.UseGuards)(jwt_refresh_guard_1.JwtRefreshGuard),
    (0, swagger_1.ApiOperation)({ summary: "Обновление токена доступа" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Токен успешно обновлен" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Не авторизован" }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshTokens", null);
__decorate([
    (0, common_1.Post)("logout"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: "Выход пользователя" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Пользователь успешно вышел из системы" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Не авторизован" }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)("Аутентификация"),
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        config_1.ConfigService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map