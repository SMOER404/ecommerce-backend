import { Category } from '../../models/category.model';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

export interface ICategoriesService {
  findAll(page?: number, limit?: number): Promise<{ items: Category[]; total: number }>;
  findOne(id: string): Promise<Category>;
  create(createCategoryDto: CreateCategoryDto): Promise<Category>;
  update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
  remove(id: string): Promise<Category>;
} 