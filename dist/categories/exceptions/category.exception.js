"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryListException = exports.CategoryDeleteException = exports.CategoryUpdateException = exports.CategoryCreateException = exports.CategoryNotFoundException = void 0;
const common_1 = require("@nestjs/common");
const base_exception_1 = require("../../common/exceptions/base.exception");
class CategoryNotFoundException extends base_exception_1.BaseException {
    constructor(id) {
        super(`Category with ID ${id} not found`, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.CategoryNotFoundException = CategoryNotFoundException;
class CategoryCreateException extends base_exception_1.BaseException {
    constructor(error) {
        super('Failed to create category', common_1.HttpStatus.BAD_REQUEST, error);
    }
}
exports.CategoryCreateException = CategoryCreateException;
class CategoryUpdateException extends base_exception_1.BaseException {
    constructor(error) {
        super('Failed to update category', common_1.HttpStatus.BAD_REQUEST, error);
    }
}
exports.CategoryUpdateException = CategoryUpdateException;
class CategoryDeleteException extends base_exception_1.BaseException {
    constructor(error) {
        super('Failed to delete category', common_1.HttpStatus.BAD_REQUEST, error);
    }
}
exports.CategoryDeleteException = CategoryDeleteException;
class CategoryListException extends base_exception_1.BaseException {
    constructor(error) {
        super('Failed to fetch categories', common_1.HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
}
exports.CategoryListException = CategoryListException;
//# sourceMappingURL=category.exception.js.map