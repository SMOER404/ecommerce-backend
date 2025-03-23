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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cart_service_1 = require("./cart.service");
const update_cart_item_dto_1 = require("./dto/update-cart-item.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const get_user_decorator_1 = require("../common/decorators/get-user.decorator");
const user_model_1 = require("../models/user.model");
const add_to_cart_dto_1 = require("./dto/add-to-cart.dto");
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    getCart(user) {
        return this.cartService.getCart(user.id);
    }
    addToCart(user, addToCartDto) {
        return this.cartService.addToCart(user.id, addToCartDto.productVariantId, addToCartDto.quantity);
    }
    async updateQuantity(req, id, updateCartItemDto) {
        return this.cartService.updateQuantity(req.user.id, id, updateCartItemDto.quantity);
    }
    removeFromCart(user, productId) {
        return this.cartService.removeFromCart(user.id, productId);
    }
    async clearCart(req) {
        return this.cartService.clearCart(req.user.id);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получение содержимого корзины' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Содержимое корзины успешно получено' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Не авторизован' }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Добавление товара в корзину' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Товар успешно добавлен в корзину' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Товар не найден' }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User, add_to_cart_dto_1.AddToCartDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Patch)('items/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Обновление количества товара в корзине' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Количество товара успешно обновлено' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Товар не найден в корзине' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_cart_item_dto_1.UpdateCartItemDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateQuantity", null);
__decorate([
    (0, common_1.Delete)(':productId'),
    (0, swagger_1.ApiOperation)({ summary: 'Удаление товара из корзины' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Товар успешно удален из корзины' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Не авторизован' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Товар не найден в корзине' }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User, String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "removeFromCart", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: 'Очистка корзины' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Корзина успешно очищена' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Не авторизован' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "clearCart", null);
exports.CartController = CartController = __decorate([
    (0, swagger_1.ApiTags)('Корзина'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map