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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const order_model_1 = require("../models/order.model");
const order_item_model_1 = require("../models/order-item.model");
const product_variant_model_1 = require("../models/product-variant.model");
const cart_service_1 = require("../cart/cart.service");
const payments_service_1 = require("../payments/payments.service");
const cart_item_model_1 = require("../models/cart-item.model");
let OrdersService = class OrdersService {
    constructor(orderModel, orderItemModel, cartItemModel, productVariantModel, cartService, paymentsService, sequelize) {
        this.orderModel = orderModel;
        this.orderItemModel = orderItemModel;
        this.cartItemModel = cartItemModel;
        this.productVariantModel = productVariantModel;
        this.cartService = cartService;
        this.paymentsService = paymentsService;
        this.sequelize = sequelize;
    }
    async findAll(userId) {
        const where = userId ? { userId } : {};
        return this.orderModel.findAll({
            where,
            include: [
                {
                    model: order_item_model_1.OrderItem,
                    include: [
                        {
                            model: product_variant_model_1.ProductVariant,
                            attributes: ["id", "color", "size", "price", "stock"],
                        },
                    ],
                },
            ],
            order: [["createdAt", "DESC"]],
        });
    }
    async findById(id, userId) {
        const where = { id };
        if (userId) {
            where.userId = userId;
        }
        const order = await this.orderModel.findOne({
            where,
            include: [
                {
                    model: order_item_model_1.OrderItem,
                    include: [
                        {
                            model: product_variant_model_1.ProductVariant,
                            attributes: ["id", "color", "size", "price", "stock"],
                        },
                    ],
                },
            ],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }
    async create(userId, shippingAddress, paymentMethod) {
        const cartItems = await this.cartItemModel.findAll({
            where: { userId },
            include: [product_variant_model_1.ProductVariant],
        });
        if (cartItems.length === 0) {
            throw new common_1.BadRequestException('Cart is empty');
        }
        let totalAmount = 0;
        cartItems.forEach(item => {
            totalAmount += item.productVariant.price * item.quantity;
        });
        const order = await this.orderModel.create({
            userId,
            totalAmount,
            status: order_model_1.OrderStatus.PENDING,
            shippingAddress,
            paymentMethod,
        });
        for (const cartItem of cartItems) {
            await this.orderItemModel.create({
                orderId: order.id,
                productVariantId: cartItem.productVariantId,
                quantity: cartItem.quantity,
                price: cartItem.productVariant.price,
            });
            await cartItem.productVariant.update({
                stock: cartItem.productVariant.stock - cartItem.quantity,
            });
        }
        await this.cartItemModel.destroy({
            where: { userId },
        });
        return order;
    }
    async updateStatus(id, status) {
        const order = await this.findById(id);
        await order.update({ status });
        return this.findById(id);
    }
    async cancel(id, userId) {
        const order = await this.findById(id, userId);
        if (order.status !== order_model_1.OrderStatus.PENDING) {
            throw new common_1.BadRequestException("Only pending orders can be cancelled");
        }
        for (const item of order.items) {
            const productVariant = await this.productVariantModel.findByPk(item.productVariantId);
            if (productVariant) {
                await productVariant.update({
                    stock: productVariant.stock + item.quantity,
                });
            }
        }
        await order.update({
            status: order_model_1.OrderStatus.CANCELLED,
        });
        return order;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(order_model_1.Order)),
    __param(1, (0, sequelize_1.InjectModel)(order_item_model_1.OrderItem)),
    __param(2, (0, sequelize_1.InjectModel)(cart_item_model_1.CartItem)),
    __param(3, (0, sequelize_1.InjectModel)(product_variant_model_1.ProductVariant)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, cart_service_1.CartService,
        payments_service_1.PaymentsService,
        sequelize_typescript_1.Sequelize])
], OrdersService);
//# sourceMappingURL=orders.service.js.map