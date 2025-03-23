import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../../common/exceptions/base.exception';

export class CategoryNotFoundException extends BaseException {
  constructor(id: string) {
    super(`Category with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

export class CategoryCreateException extends BaseException {
  constructor(error: any) {
    super('Failed to create category', HttpStatus.BAD_REQUEST, error);
  }
}

export class CategoryUpdateException extends BaseException {
  constructor(error: any) {
    super('Failed to update category', HttpStatus.BAD_REQUEST, error);
  }
}

export class CategoryDeleteException extends BaseException {
  constructor(error: any) {
    super('Failed to delete category', HttpStatus.BAD_REQUEST, error);
  }
}

export class CategoryListException extends BaseException {
  constructor(error: any) {
    super('Failed to fetch categories', HttpStatus.INTERNAL_SERVER_ERROR, error);
  }
} 