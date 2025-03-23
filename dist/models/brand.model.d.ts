import { Model } from "sequelize-typescript";
import { Product } from "./product.model";
export declare class Brand extends Model {
    id: string;
    name: string;
    description: string;
    logo: string;
    isActive: boolean;
    products: Product[];
}
