import { UpdateProductVariantDto } from "./update-product-variant.dto";
export declare class UpdateProductDto {
    name?: string;
    description?: string;
    categoryId?: string;
    brandId?: string;
    variants?: UpdateProductVariantDto[];
}
