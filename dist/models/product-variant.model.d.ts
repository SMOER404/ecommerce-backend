import { Model } from "sequelize-typescript";
import { Product } from "./product.model";
import { CartItem } from "./cart-item.model";
import { OrderItem } from "./order-item.model";
export declare class ProductVariant extends Model {
    id: string;
    productId: string;
    product: Product;
    color: string;
    size: string;
    price: number;
    stock: number;
    cartItems: CartItem[];
    orderItems: OrderItem[];
}
