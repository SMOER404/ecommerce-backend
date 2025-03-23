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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const products_service_1 = require("./products.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const user_model_1 = require("../models/user.model");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async findAll(query) {
        const { rows, count } = await this.productsService.findAll(query);
        return {
            data: rows,
            meta: {
                total: count,
                page: query.page || 1,
                limit: query.limit || 10,
                totalPages: Math.ceil(count / (query.limit || 10)),
            },
        };
    }
    async findOne(id) {
        return this.productsService.findById(id);
    }
    async create(createProductDto, images) {
        return this.productsService.create(createProductDto, images);
    }
    async update(id, updateProductDto, images) {
        return this.productsService.update(id, updateProductDto, images);
    }
    async remove(id) {
        await this.productsService.remove(id);
        return { message: 'Товар успешно удален' };
    }
    async addVariant(id, createVariantDto) {
        return this.productsService.addVariant(id, createVariantDto);
    }
    async updateVariant(id, updateVariantDto) {
        return this.productsService.updateVariant(id, updateVariantDto);
    }
    async removeVariant(id) {
        await this.productsService.removeVariant(id);
        return { message: 'Вариант товара успешно удален' };
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Получение списка товаров" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Список товаров успешно получен" }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получение информации о товаре' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Информация о товаре успешно получена' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Товар не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_model_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Создание нового товара" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Товар успешно создан" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Не авторизован" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Доступ запрещен" }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("images", 10)),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Array]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_model_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Обновление информации о товаре" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Товар успешно обновлен" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Не авторизован" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Доступ запрещен" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Товар не найден" }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("images", 10)),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Array]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_model_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Удаление товара' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Товар успешно удален' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Доступ запрещен' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Товар не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(":id/variants"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_model_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Добавление варианта товара" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Вариант товара успешно добавлен" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Не авторизован" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Доступ запрещен" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Товар не найден" }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "addVariant", null);
__decorate([
    (0, common_1.Put)("variants/:id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_model_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Обновление варианта товара" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Вариант товара успешно обновлен" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Не авторизован" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Доступ запрещен" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Товар или вариант не найден" }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateVariant", null);
__decorate([
    (0, common_1.Delete)('variants/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_model_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Удаление варианта товара' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Вариант товара успешно удален' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Доступ запрещен' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Товар или вариант не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "removeVariant", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)("Товары"),
    (0, common_1.Controller)("products"),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map