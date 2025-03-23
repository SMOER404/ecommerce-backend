import { Product } from "../models/product.model";
import { ProductVariant } from "../models/product-variant.model";
import { Category } from "../categories/models/category.model";
import { Brand } from "../models/brand.model";
import type { CreateProductDto } from "./dto/create-product.dto";
import type { UpdateProductDto } from "./dto/update-product.dto";
import type { CreateProductVariantDto } from "./dto/create-product-variant.dto";
import type { UpdateProductVariantDto } from "./dto/update-product-variant.dto";
import { FilesService } from "../files/files.service";
import type { ProductQueryDto } from "./dto/product-query.dto";
export declare class ProductsService {
    private productModel;
    private productVariantModel;
    private categoryModel;
    private brandModel;
    private filesService;
    constructor(productModel: typeof Product, productVariantModel: typeof ProductVariant, categoryModel: typeof Category, brandModel: typeof Brand, filesService: FilesService);
    findAll(query: ProductQueryDto): Promise<{
        rows: Product[];
        count: number;
    }>;
    findById(id: string): Promise<Product>;
    create(createProductDto: CreateProductDto, images: Express.Multer.File[]): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto, images?: Express.Multer.File[]): Promise<Product>;
    remove(id: string): Promise<void>;
    addVariant(productId: string, createVariantDto: CreateProductVariantDto): Promise<ProductVariant>;
    updateVariant(variantId: string, updateVariantDto: UpdateProductVariantDto): Promise<ProductVariant>;
    removeVariant(variantId: string): Promise<void>;
}
