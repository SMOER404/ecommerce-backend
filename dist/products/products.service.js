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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const product_model_1 = require("../models/product.model");
const product_variant_model_1 = require("../models/product-variant.model");
const category_model_1 = require("../categories/models/category.model");
const brand_model_1 = require("../models/brand.model");
const files_service_1 = require("../files/files.service");
let ProductsService = class ProductsService {
    constructor(productModel, productVariantModel, categoryModel, brandModel, filesService) {
        this.productModel = productModel;
        this.productVariantModel = productVariantModel;
        this.categoryModel = categoryModel;
        this.brandModel = brandModel;
        this.filesService = filesService;
    }
    async findAll(query) {
        const { page = 1, limit = 10, categoryId, brandId, minPrice, maxPrice, search } = query;
        const offset = (page - 1) * limit;
        const whereClause = {};
        if (categoryId) {
            whereClause.categoryId = categoryId;
        }
        if (brandId) {
            whereClause.brandId = brandId;
        }
        if (search) {
            whereClause.name = { [sequelize_2.Op.iLike]: `%${search}%` };
        }
        const variantWhereClause = {};
        if (minPrice !== undefined || maxPrice !== undefined) {
            variantWhereClause.price = {};
            if (minPrice !== undefined) {
                variantWhereClause.price[sequelize_2.Op.gte] = minPrice;
            }
            if (maxPrice !== undefined) {
                variantWhereClause.price[sequelize_2.Op.lte] = maxPrice;
            }
        }
        return this.productModel.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: category_model_1.Category,
                    attributes: ["id", "name"],
                },
                {
                    model: brand_model_1.Brand,
                    attributes: ["id", "name", "logoUrl"],
                },
                {
                    model: product_variant_model_1.ProductVariant,
                    where: Object.keys(variantWhereClause).length > 0 ? variantWhereClause : undefined,
                },
            ],
            limit,
            offset,
            distinct: true,
        });
    }
    async findById(id) {
        const product = await this.productModel.findByPk(id, {
            include: [
                {
                    model: category_model_1.Category,
                    attributes: ["id", "name"],
                },
                {
                    model: brand_model_1.Brand,
                    attributes: ["id", "name", "logoUrl"],
                },
                {
                    model: product_variant_model_1.ProductVariant,
                },
            ],
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    async create(createProductDto, images) {
        const { variants, ...productData } = createProductDto;
        const imageUrl = images.length > 0 ? await this.filesService.uploadFile(images[0], "products") : null;
        const product = await this.productModel.create({
            ...productData,
            image: imageUrl,
        });
        if (variants && variants.length > 0) {
            await Promise.all(variants.map((variant) => this.productVariantModel.create({
                ...variant,
                productId: product.id,
            })));
        }
        return this.findById(product.id);
    }
    async update(id, updateProductDto, images) {
        const product = await this.findById(id);
        const { variants, ...productData } = updateProductDto;
        let imageUrl = product.image;
        if (images && images.length > 0) {
            imageUrl = await this.filesService.uploadFile(images[0], "products");
        }
        await product.update({
            ...productData,
            image: imageUrl,
        });
        return this.findById(id);
    }
    async remove(id) {
        const product = await this.findById(id);
        await product.destroy();
    }
    async addVariant(productId, createVariantDto) {
        const product = await this.findById(productId);
        const variant = await this.productVariantModel.create({
            ...createVariantDto,
            productId: product.id,
        });
        return variant;
    }
    async updateVariant(variantId, updateVariantDto) {
        const variant = await this.productVariantModel.findByPk(variantId);
        if (!variant) {
            throw new common_1.NotFoundException(`Product variant with ID ${variantId} not found`);
        }
        await variant.update(updateVariantDto);
        return variant;
    }
    async removeVariant(variantId) {
        const variant = await this.productVariantModel.findByPk(variantId);
        if (!variant) {
            throw new common_1.NotFoundException(`Product variant with ID ${variantId} not found`);
        }
        await variant.destroy();
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(product_model_1.Product)),
    __param(1, (0, sequelize_1.InjectModel)(product_variant_model_1.ProductVariant)),
    __param(2, (0, sequelize_1.InjectModel)(category_model_1.Category)),
    __param(3, (0, sequelize_1.InjectModel)(brand_model_1.Brand)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, files_service_1.FilesService])
], ProductsService);
//# sourceMappingURL=products.service.js.map