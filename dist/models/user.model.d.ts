import { Model } from "sequelize-typescript";
import { CartItem } from "./cart-item.model";
import { Order } from "./order.model";
export declare enum UserRole {
    USER = "user",
    ADMIN = "admin"
}
export declare class User extends Model {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    role: UserRole;
    refreshToken: string;
    cartItems: CartItem[];
    orders: Order[];
    static hashPassword(instance: User): Promise<void>;
    comparePassword(password: string): Promise<boolean>;
}
