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
exports.BrandsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const brands_service_1 = require("./brands.service");
const create_brand_dto_1 = require("./dto/create-brand.dto");
const update_brand_dto_1 = require("./dto/update-brand.dto");
const brand_model_1 = require("../models/brand.model");
let BrandsController = class BrandsController {
    constructor(brandsService) {
        this.brandsService = brandsService;
    }
    create(createBrandDto) {
        return this.brandsService.create(createBrandDto);
    }
    findAll(params) {
        return this.brandsService.findAll(params);
    }
    findOne(id) {
        return this.brandsService.findOne(id);
    }
    update(id, updateBrandDto) {
        return this.brandsService.update(id, updateBrandDto);
    }
    remove(id) {
        return this.brandsService.remove(id);
    }
};
exports.BrandsController = BrandsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Создание нового бренда',
        description: 'Создает новый бренд в системе. Требует уникальное название.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Бренд успешно создан',
        type: brand_model_1.Brand
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Неверный запрос. Проверьте корректность данных.'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_brand_dto_1.CreateBrandDto]),
    __metadata("design:returntype", void 0)
], BrandsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получение списка брендов',
        description: 'Возвращает список всех активных брендов с пагинацией'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Список брендов успешно получен',
        type: [brand_model_1.Brand]
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Номер страницы (начиная с 1)'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Количество брендов на странице'
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BrandsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получение информации о бренде',
        description: 'Возвращает подробную информацию о бренде по его ID'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Информация о бренде успешно получена',
        type: brand_model_1.Brand
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Бренд не найден'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Уникальный идентификатор бренда',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BrandsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Обновление информации о бренде',
        description: 'Обновляет информацию о существующем бренде'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Бренд успешно обновлен',
        type: brand_model_1.Brand
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Бренд не найден'
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Неверный запрос. Проверьте корректность данных.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Уникальный идентификатор бренда',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_brand_dto_1.UpdateBrandDto]),
    __metadata("design:returntype", void 0)
], BrandsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Удаление бренда',
        description: 'Удаляет бренд из системы. Это действие нельзя отменить.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Бренд успешно удален'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Бренд не найден'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Уникальный идентификатор бренда',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BrandsController.prototype, "remove", null);
exports.BrandsController = BrandsController = __decorate([
    (0, swagger_1.ApiTags)('Бренды'),
    (0, common_1.Controller)('brands'),
    __metadata("design:paramtypes", [brands_service_1.BrandsService])
], BrandsController);
//# sourceMappingURL=brands.controller.js.map