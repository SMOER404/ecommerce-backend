"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConfig = void 0;
const file_model_1 = require("../models/file.model");
const user_model_1 = require("../models/user.model");
const category_model_1 = require("../models/category.model");
const brand_model_1 = require("../models/brand.model");
const product_model_1 = require("../models/product.model");
const product_variant_model_1 = require("../models/product-variant.model");
const cart_item_model_1 = require("../models/cart-item.model");
const order_model_1 = require("../models/order.model");
const order_item_model_1 = require("../models/order-item.model");
exports.testConfig = {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'poizonmarket_user',
    password: 'poizonmarket_user',
    database: 'poizon_market',
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
    autoLoadModels: true,
    sync: { force: true },
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    define: {
        timestamps: true,
        underscored: true,
    }
};
//# sourceMappingURL=test.config.js.map