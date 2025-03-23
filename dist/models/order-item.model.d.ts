import { Model } from "sequelize-typescript";
import { Order } from "./order.model";
import { ProductVariant } from "./product-variant.model";
export declare class OrderItem extends Model {
    id: string;
    orderId: string;
    productVariantId: string;
    quantity: number;
    price: number;
    order: Order;
    productVariant: ProductVariant;
}
