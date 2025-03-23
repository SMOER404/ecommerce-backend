"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const orders_service_1 = require("./orders.service");
const orders_controller_1 = require("./orders.controller");
const order_model_1 = require("../models/order.model");
const order_item_model_1 = require("../models/order-item.model");
const cart_module_1 = require("../cart/cart.module");
const product_variant_model_1 = require("../models/product-variant.model");
const product_model_1 = require("../models/product.model");
const payments_module_1 = require("../payments/payments.module");
const cart_item_model_1 = require("../models/cart-item.model");
const sequelize_typescript_1 = require("sequelize-typescript");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([order_model_1.Order, order_item_model_1.OrderItem, product_variant_model_1.ProductVariant, product_model_1.Product, cart_item_model_1.CartItem]),
            cart_module_1.CartModule,
            payments_module_1.PaymentsModule
        ],
        providers: [
            orders_service_1.OrdersService,
            {
                provide: sequelize_typescript_1.Sequelize,
                useValue: sequelize_typescript_1.Sequelize
            }
        ],
        controllers: [orders_controller_1.OrdersController],
        exports: [orders_service_1.OrdersService],
    })
], OrdersModule);
//# sourceMappingURL=orders.module.js.map