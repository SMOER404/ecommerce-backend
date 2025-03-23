import { BaseException } from '../../common/exceptions/base.exception';
export declare class CategoryNotFoundException extends BaseException {
    constructor(id: string);
}
export declare class CategoryCreateException extends BaseException {
    constructor(error: any);
}
export declare class CategoryUpdateException extends BaseException {
    constructor(error: any);
}
export declare class CategoryDeleteException extends BaseException {
    constructor(error: any);
}
export declare class CategoryListException extends BaseException {
    constructor(error: any);
}
