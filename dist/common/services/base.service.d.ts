import { Model, ModelStatic } from 'sequelize-typescript';
import { FindOptions, CreateOptions, UpdateOptions, DestroyOptions } from 'sequelize';
import { PaginationParams, PaginatedResponse } from '../types/base.types';
interface ModelWithMethods<T extends Model> extends ModelStatic<T> {
    findAndCountAll(options?: FindOptions): Promise<{
        rows: T[];
        count: number;
    }>;
    findByPk(id: string | number): Promise<T | null>;
    create(data: Partial<T>, options?: CreateOptions): Promise<T>;
    update(data: Partial<T>, options: UpdateOptions & {
        where: any;
        returning: boolean;
    }): Promise<[T, boolean]>;
    destroy(options: DestroyOptions): Promise<number>;
    findOne(options: FindOptions): Promise<T | null>;
    count(options?: FindOptions): Promise<number>;
}
export declare abstract class BaseService<T extends Model> {
    protected readonly model: ModelWithMethods<T>;
    constructor(model: ModelWithMethods<T>);
    findAll(params?: PaginationParams): Promise<PaginatedResponse<T>>;
    findById(id: string | number): Promise<T | null>;
    create(data: Partial<T>, options?: CreateOptions): Promise<T>;
    update(id: string | number, data: Partial<T>, options?: UpdateOptions): Promise<T | null>;
    delete(id: string | number, options?: DestroyOptions): Promise<boolean>;
    findOne(options: FindOptions): Promise<T | null>;
    count(options?: FindOptions): Promise<number>;
}
export {};
