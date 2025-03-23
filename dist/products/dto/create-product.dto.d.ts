import { CreateProductVariantDto } from "./create-product-variant.dto";
export declare class CreateProductDto {
    name: string;
    description?: string;
    categoryId: string;
    brandId: string;
    variants?: CreateProductVariantDto[];
}
