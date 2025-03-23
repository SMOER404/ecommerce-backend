import { Model, ModelStatic } from 'sequelize-typescript';
import { FindOptions, CreateOptions, UpdateOptions, DestroyOptions } from 'sequelize';
import { PaginationParams, PaginatedResponse } from '../types/base.types';

interface ModelWithMethods<T extends Model> extends ModelStatic<T> {
  findAndCountAll(options?: FindOptions): Promise<{ rows: T[]; count: number }>;
  findByPk(id: string | number): Promise<T | null>;
  create(data: Partial<T>, options?: CreateOptions): Promise<T>;
  update(data: Partial<T>, options: UpdateOptions & { where: any; returning: boolean }): Promise<[T, boolean]>;
  destroy(options: DestroyOptions): Promise<number>;
  findOne(options: FindOptions): Promise<T | null>;
  count(options?: FindOptions): Promise<number>;
}

export abstract class BaseService<T extends Model> {
  constructor(protected readonly model: ModelWithMethods<T>) {}

  async findAll(params?: PaginationParams): Promise<PaginatedResponse<T>> {
    const { page = 1, limit = 10, ...options } = params || {};
    const offset = (page - 1) * limit;

    const { rows: items, count: total } = await this.model.findAndCountAll({
      ...options,
      offset,
      limit,
    });

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string | number): Promise<T | null> {
    return this.model.findByPk(id);
  }

  async create(data: Partial<T>, options?: CreateOptions): Promise<T> {
    return this.model.create(data, options);
  }

  async update(id: string | number, data: Partial<T>, options?: UpdateOptions): Promise<T | null> {
    const [updated] = await this.model.update(data, {
      ...options,
      where: { id },
      returning: true,
    });
    return updated;
  }

  async delete(id: string | number, options?: DestroyOptions): Promise<boolean> {
    const deleted = await this.model.destroy({
      ...options,
      where: { id },
    });
    return deleted > 0;
  }

  async findOne(options: FindOptions): Promise<T | null> {
    return this.model.findOne(options);
  }

  async count(options?: FindOptions): Promise<number> {
    return this.model.count(options);
  }
} 