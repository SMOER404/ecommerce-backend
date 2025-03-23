import { ProductsService } from "./products.service";
import type { CreateProductDto } from "./dto/create-product.dto";
import type { UpdateProductDto } from "./dto/update-product.dto";
import type { CreateProductVariantDto } from "./dto/create-product-variant.dto";
import type { UpdateProductVariantDto } from "./dto/update-product-variant.dto";
import type { ProductQueryDto } from "./dto/product-query.dto";
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(query: ProductQueryDto): Promise<{
        data: import("../models/product.model").Product[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<import("../models/product.model").Product>;
    create(createProductDto: CreateProductDto, images: Express.Multer.File[]): Promise<import("../models/product.model").Product>;
    update(id: string, updateProductDto: UpdateProductDto, images: Express.Multer.File[]): Promise<import("../models/product.model").Product>;
    remove(id: string): Promise<{
        message: string;
    }>;
    addVariant(id: string, createVariantDto: CreateProductVariantDto): Promise<import("../models/product-variant.model").ProductVariant>;
    updateVariant(id: string, updateVariantDto: UpdateProductVariantDto): Promise<import("../models/product-variant.model").ProductVariant>;
    removeVariant(id: string): Promise<{
        message: string;
    }>;
}
