import { Category } from './models/category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategoriesService } from './interfaces/categories.interface';
export declare class CategoriesService implements ICategoriesService {
    private categoryModel;
    private readonly logger;
    constructor(categoryModel: typeof Category);
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findAll(page?: number, limit?: number): Promise<{
        items: Category[];
        total: number;
    }>;
    findOne(id: string): Promise<Category>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    remove(id: string): Promise<void>;
}
