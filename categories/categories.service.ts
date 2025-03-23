import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategoriesService } from './interfaces/categories.interface';
import {
  CategoryNotFoundException,
  CategoryCreateException,
  CategoryUpdateException,
  CategoryDeleteException,
  CategoryListException,
} from './exceptions/category.exception';

const MAX_PAGE_SIZE = 100;
const DEFAULT_PAGE_SIZE = 10;

@Injectable()
export class CategoriesService implements ICategoriesService {
  private readonly logger = new Logger(CategoriesService.name);

  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    this.logger.log('Creating new category');
    try {
      const category = await this.categoryModel.create({
        ...createCategoryDto,
        isActive: true,
      });
      this.logger.log(`Category created with ID ${category.id}`);
      return category;
    } catch (error) {
      this.logger.error(`Failed to create category: ${error.message}`);
      throw new CategoryCreateException(error);
    }
  }

  async findAll(page = 1, limit = DEFAULT_PAGE_SIZE): Promise<{ items: Category[]; total: number }> {
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
    } catch (error) {
      this.logger.error(`Failed to fetch categories: ${error.message}`);
      throw new CategoryListException(error);
    }
  }

  async findOne(id: string): Promise<Category> {
    this.logger.log(`Fetching category with ID ${id}`);
    const category = await this.categoryModel.findOne({
      where: { id, isActive: true },
    });
    if (!category) {
      this.logger.warn(`Category with ID ${id} not found`);
      throw new CategoryNotFoundException(id);
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    this.logger.log(`Updating category with ID ${id}`);
    const category = await this.findOne(id);
    try {
      await category.update(updateCategoryDto);
      this.logger.log(`Category with ID ${id} updated successfully`);
      return category;
    } catch (error) {
      this.logger.error(`Failed to update category: ${error.message}`);
      throw new CategoryUpdateException(error);
    }
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing category with ID ${id}`);
    const category = await this.findOne(id);
    try {
      await category.update({ isActive: false });
      this.logger.log(`Category with ID ${id} removed successfully`);
    } catch (error) {
      this.logger.error(`Failed to remove category: ${error.message}`);
      throw new CategoryDeleteException(error);
    }
  }
} 