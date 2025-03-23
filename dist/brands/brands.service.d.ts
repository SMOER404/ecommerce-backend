import { Brand } from '../models/brand.model';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PaginationParams, PaginatedResponse } from '../common/types/base.types';
export declare class BrandsService {
    private brandModel;
    constructor(brandModel: typeof Brand);
    create(createBrandDto: CreateBrandDto): Promise<Brand>;
    findAll(params?: PaginationParams): Promise<PaginatedResponse<Brand>>;
    findOne(id: string): Promise<Brand>;
    update(id: string, updateBrandDto: UpdateBrandDto): Promise<Brand>;
    remove(id: string): Promise<void>;
}
