import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Brand } from '../models/brand.model';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PaginationParams, PaginatedResponse } from '../common/types/base.types';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand) private brandModel: typeof Brand
  ) {}

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    return this.brandModel.create(createBrandDto as any);
  }

  async findAll(params?: PaginationParams): Promise<PaginatedResponse<Brand>> {
    const { page = 1, limit = 10 } = params || {};
    const offset = (page - 1) * limit;
    
    const { rows: items, count: total } = await this.brandModel.findAndCountAll({
      where: { isActive: true },
      offset,
      limit,
      order: [['createdAt', 'DESC']]
    });

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  async findOne(id: string): Promise<Brand> {
    return this.brandModel.findByPk(id);
  }

  async update(id: string, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    const brand = await this.brandModel.findByPk(id);
    if (brand) {
      await brand.update(updateBrandDto as any);
    }
    return brand;
  }

  async remove(id: string): Promise<void> {
    const brand = await this.brandModel.findByPk(id);
    if (brand) {
      await brand.update({ isActive: false });
    }
  }
} 