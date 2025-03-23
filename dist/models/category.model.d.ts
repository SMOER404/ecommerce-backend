import { Model } from "sequelize-typescript";
import { Product } from "./product.model";
export declare class Category extends Model {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    products: Product[];
}
