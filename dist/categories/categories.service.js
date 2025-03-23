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
var CategoriesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const category_model_1 = require("./models/category.model");
const category_exception_1 = require("./exceptions/category.exception");
const MAX_PAGE_SIZE = 100;
const DEFAULT_PAGE_SIZE = 10;
let CategoriesService = CategoriesService_1 = class CategoriesService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
        this.logger = new common_1.Logger(CategoriesService_1.name);
    }
    async create(createCategoryDto) {
        this.logger.log('Creating new category');
        try {
            const category = await this.categoryModel.create({
                ...createCategoryDto,
                isActive: true,
            });
            this.logger.log(`Category created with ID ${category.id}`);
            return category;
        }
        catch (error) {
            this.logger.error(`Failed to create category: ${error.message}`);
            throw new category_exception_1.CategoryCreateException(error);
        }
    }
    async findAll(page = 1, limit = DEFAULT_PAGE_SIZE) {
        this.logger.log(`Fetching categories with page ${page} and limit ${limit}`);
        try {
            const safeLimit = Math.min(limit, MAX_PAGE_SIZE);
            const offset = (page - 1) * safeLimit;
            const { rows: items, count: total } = await this.categoryModel.findAndCountAll({
                where: { isActive: true },
                limit: safeLimit,
                offset,
                order: [['createdAt', 'DESC']],
            });
            this.logger.log(`Found ${total} categories`);
            return { items, total };
        }
        catch (error) {
            this.logger.error(`Failed to fetch categories: ${error.message}`);
            throw new category_exception_1.CategoryListException(error);
        }
    }
    async findOne(id) {
        this.logger.log(`Fetching category with ID ${id}`);
        const category = await this.categoryModel.findOne({
            where: { id, isActive: true },
        });
        if (!category) {
            this.logger.warn(`Category with ID ${id} not found`);
            throw new category_exception_1.CategoryNotFoundException(id);
        }
        return category;
    }
    async update(id, updateCategoryDto) {
        this.logger.log(`Updating category with ID ${id}`);
        const category = await this.findOne(id);
        try {
            await category.update(updateCategoryDto);
            this.logger.log(`Category with ID ${id} updated successfully`);
            return category;
        }
        catch (error) {
            this.logger.error(`Failed to update category: ${error.message}`);
            throw new category_exception_1.CategoryUpdateException(error);
        }
    }
    async remove(id) {
        this.logger.log(`Removing category with ID ${id}`);
        const category = await this.findOne(id);
        try {
            await category.update({ isActive: false });
            this.logger.log(`Category with ID ${id} removed successfully`);
        }
        catch (error) {
            this.logger.error(`Failed to remove category: ${error.message}`);
            throw new category_exception_1.CategoryDeleteException(error);
        }
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = CategoriesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(category_model_1.Category)),
    __metadata("design:paramtypes", [Object])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map