import { CartService } from './cart.service';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { Request } from 'express';
import { User } from "../models/user.model";
import { AddToCartDto } from "./dto/add-to-cart.dto";
interface RequestWithUser extends Request {
    user: {
        id: string;
    };
}
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(user: User): Promise<{
        items: import("../models/cart-item.model").CartItem[];
        subtotal: number;
    }>;
    addToCart(user: User, addToCartDto: AddToCartDto): Promise<import("../models/cart-item.model").CartItem>;
    updateQuantity(req: RequestWithUser, id: string, updateCartItemDto: UpdateCartItemDto): Promise<import("../models/cart-item.model").CartItem>;
    removeFromCart(user: User, productId: string): Promise<{
        success: boolean;
    }>;
    clearCart(req: RequestWithUser): Promise<{
        success: boolean;
    }>;
}
export {};
