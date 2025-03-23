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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const cart_item_model_1 = require("../models/cart-item.model");
const product_variant_model_1 = require("../models/product-variant.model");
let CartService = class CartService {
    constructor(cartItemModel, productVariantModel) {
        this.cartItemModel = cartItemModel;
        this.productVariantModel = productVariantModel;
    }
    async getCart(userId) {
        const cartItems = await this.cartItemModel.findAll({
            where: { userId },
            include: [{
                    model: product_variant_model_1.ProductVariant,
                    attributes: ['id', 'color', 'size', 'price', 'stock'],
                }],
        });
        let subtotal = 0;
        cartItems.forEach(item => {
            subtotal += item.productVariant.price * item.quantity;
        });
        return {
            items: cartItems,
            subtotal,
        };
    }
    async getCartSummary(userId) {
        const cartItems = await this.getCart(userId);
        let subtotal = 0;
        let itemCount = 0;
        cartItems.items.forEach((item) => {
            subtotal += item.productVariant.price * item.quantity;
            itemCount += item.quantity;
        });
        const tax = subtotal * 0.08;
        const shipping = subtotal > 100 ? 0 : 10;
        const total = subtotal + tax + shipping;
        return {
            subtotal,
            tax,
            shipping,
            total,
            itemCount,
        };
    }
    async addToCart(userId, productVariantId, quantity) {
        const productVariant = await this.productVariantModel.findByPk(productVariantId);
        if (!productVariant) {
            throw new common_1.NotFoundException('Product variant not found');
        }
        if (productVariant.stock < quantity) {
            throw new common_1.BadRequestException(`Not enough stock available. Only ${productVariant.stock} items left.`);
        }
        const [cartItem] = await this.cartItemModel.findOrCreate({
            where: {
                userId,
                productVariantId,
            },
            defaults: {
                quantity,
            },
        });
        if (cartItem.quantity !== quantity) {
            cartItem.quantity = quantity;
            await cartItem.save();
        }
        return cartItem;
    }
    async updateQuantity(userId, productVariantId, quantity) {
        const cartItem = await this.cartItemModel.findOne({
            where: {
                userId,
                productVariantId,
            },
            include: [product_variant_model_1.ProductVariant],
        });
        if (!cartItem) {
            throw new common_1.NotFoundException('Item not found in cart');
        }
        if (cartItem.productVariant.stock < quantity) {
            throw new common_1.BadRequestException(`Not enough stock available. Only ${cartItem.productVariant.stock} items left.`);
        }
        cartItem.quantity = quantity;
        await cartItem.save();
        return cartItem;
    }
    async removeFromCart(userId, productVariantId) {
        const result = await this.cartItemModel.destroy({
            where: {
                userId,
                productVariantId,
            },
        });
        if (result === 0) {
            throw new common_1.NotFoundException('Item not found in cart');
        }
        return { success: true };
    }
    async clearCart(userId) {
        await this.cartItemModel.destroy({
            where: { userId },
        });
        return { success: true };
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(cart_item_model_1.CartItem)),
    __param(1, (0, sequelize_1.InjectModel)(product_variant_model_1.ProductVariant)),
    __metadata("design:paramtypes", [Object, Object])
], CartService);
//# sourceMappingURL=cart.service.js.map