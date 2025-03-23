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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const orders_service_1 = require("./orders.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_status_dto_1 = require("./dto/update-order-status.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async create(req, createOrderDto) {
        return this.ordersService.create(req.user.id, createOrderDto.shippingAddress, createOrderDto.paymentMethod);
    }
    async findAll(req) {
        return this.ordersService.findAll(req.user.id);
    }
    async findOne(req, id) {
        return this.ordersService.findById(id, req.user.id);
    }
    async updateStatus(req, id, updateOrderStatusDto) {
        return this.ordersService.updateStatus(id, updateOrderStatusDto.status);
    }
    async cancel(req, id) {
        return this.ordersService.cancel(id, req.user.id);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Создание нового заказа' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Заказ успешно создан' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверный запрос' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получение списка заказов пользователя' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список заказов успешно получен' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Не авторизован' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получение информации о заказе' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Информация о заказе успешно получена' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Заказ не найден' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Обновление статуса заказа' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Статус заказа успешно обновлен' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Доступ запрещен' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Заказ не найден' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_order_status_dto_1.UpdateOrderStatusDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Post)(':id/cancel'),
    (0, swagger_1.ApiOperation)({ summary: 'Отмена заказа' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Заказ успешно отменен' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Заказ не найден' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "cancel", null);
exports.OrdersController = OrdersController = __decorate([
    (0, swagger_1.ApiTags)('Заказы'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map