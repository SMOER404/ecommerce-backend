import { Model } from "sequelize-typescript";
import { User } from "./user.model";
import { ProductVariant } from "./product-variant.model";
export declare class CartItem extends Model {
    id: string;
    userId: string;
    productVariantId: string;
    quantity: number;
    user: User;
    productVariant: ProductVariant;
}
