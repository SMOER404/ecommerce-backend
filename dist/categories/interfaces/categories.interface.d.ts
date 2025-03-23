import { Category } from '../models/category.model';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
export interface ICategoriesService {
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findAll(page?: number, limit?: number): Promise<{
        items: Category[];
        total: number;
    }>;
    findOne(id: string): Promise<Category>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    remove(id: string): Promise<void>;
}
