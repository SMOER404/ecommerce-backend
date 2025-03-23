import { Model } from "sequelize-typescript";
import { User } from "./user.model";
import { OrderItem } from "./order-item.model";
export declare enum OrderStatus {
    PENDING = "pending",
    PROCESSING = "processing",
    SHIPPED = "shipped",
    DELIVERED = "delivered",
    CANCELLED = "cancelled"
}
export declare class Order extends Model {
    id: string;
    userId: string;
    totalAmount: number;
    status: OrderStatus;
    shippingAddress: string;
    paymentMethod: string;
    user: User;
    items: OrderItem[];
}
