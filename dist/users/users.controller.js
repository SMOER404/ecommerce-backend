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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const get_user_decorator_1 = require("../common/decorators/get-user.decorator");
const user_model_1 = require("../models/user.model");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findAll() {
        return this.usersService.findAll();
    }
    getProfile(user) {
        return this.usersService.findById(user.id);
    }
    async findOne(id) {
        return this.usersService.findById(id);
    }
    updateProfile(user, updateUserDto) {
        return this.usersService.update(user.id, updateUserDto);
    }
    async remove(id) {
        await this.usersService.remove(id);
        return { message: 'Пользователь успешно удален' };
    }
    async setAdminRole(id) {
        await this.usersService.setAdminRole(id);
        return { message: 'Роль пользователя успешно обновлена на администратора' };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_model_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Получение списка всех пользователей" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Список пользователей успешно получен" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Не авторизован" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Доступ запрещен" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("profile"),
    (0, swagger_1.ApiOperation)({ summary: "Получение профиля пользователя" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Профиль пользователя успешно получен" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Не авторизован" }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_model_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Получение информации о пользователе по ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Информация о пользователе успешно получена" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Не авторизован" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Доступ запрещен" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Пользователь не найден" }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)("profile"),
    (0, swagger_1.ApiOperation)({ summary: "Обновление профиля пользователя" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Профиль пользователя успешно обновлен" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Не авторизован" }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_model_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Удаление пользователя" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Пользователь успешно удален" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Не авторизован" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Доступ запрещен" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Пользователь не найден" }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/set-admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_model_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Назначение пользователя администратором" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Роль пользователя успешно обновлена на администратора" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Не авторизован" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Доступ запрещен" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Пользователь не найден" }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "setAdminRole", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)("Пользователи"),
    (0, common_1.Controller)("users"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map