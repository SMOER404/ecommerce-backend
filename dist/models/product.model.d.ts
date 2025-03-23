import { Model } from "sequelize-typescript";
import { Category } from "./category.model";
import { Brand } from "./brand.model";
export declare class Product extends Model {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: string;
    brandId: string;
    category: Category;
    brand: Brand;
    isActive: boolean;
}
