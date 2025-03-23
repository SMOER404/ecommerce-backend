"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const products_module_1 = require("./products/products.module");
const cart_module_1 = require("./cart/cart.module");
const orders_module_1 = require("./orders/orders.module");
const payments_module_1 = require("./payments/payments.module");
const files_module_1 = require("./files/files.module");
const categories_module_1 = require("./categories/categories.module");
const brands_module_1 = require("./brands/brands.module");
const user_model_1 = require("./models/user.model");
const category_model_1 = require("./models/category.model");
const brand_model_1 = require("./models/brand.model");
const product_model_1 = require("./models/product.model");
const product_variant_model_1 = require("./models/product-variant.model");
const cart_item_model_1 = require("./models/cart-item.model");
const order_model_1 = require("./models/order.model");
const order_item_model_1 = require("./models/order-item.model");
const file_model_1 = require("./models/file.model");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT || '5432'),
                username: process.env.NODE_ENV === 'test' ? 'poizonmarket_user' : (process.env.DB_USERNAME || 'postgres'),
                password: process.env.NODE_ENV === 'test' ? 'poizonmarket_user' : (process.env.DB_PASSWORD || 'postgres'),
                database: process.env.NODE_ENV === 'test' ? 'poizon_market' : (process.env.DB_NAME || 'poizon_market'),
                models: [
                    file_model_1.File,
                    user_model_1.User,
                    category_model_1.Category,
                    brand_model_1.Brand,
                    product_model_1.Product,
                    product_variant_model_1.ProductVariant,
                    cart_item_model_1.CartItem,
                    order_model_1.Order,
                    order_item_model_1.OrderItem,
                ],
                autoLoadModels: false,
                synchronize: true,
                sync: {
                    force: process.env.NODE_ENV === 'test',
                    alter: true,
                    match: /_test$/
                },
                logging: process.env.NODE_ENV !== 'production',
                define: {
                    underscored: true,
                    timestamps: true,
                    freezeTableName: true
                }
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            cart_module_1.CartModule,
            orders_module_1.OrdersModule,
            payments_module_1.PaymentsModule,
            files_module_1.FilesModule,
            categories_module_1.CategoriesModule,
            brands_module_1.BrandsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map