import { CartItem } from "../models/cart-item.model";
import { ProductVariant } from "../models/product-variant.model";
export declare class CartService {
    private cartItemModel;
    private productVariantModel;
    constructor(cartItemModel: typeof CartItem, productVariantModel: typeof ProductVariant);
    getCart(userId: string): Promise<{
        items: CartItem[];
        subtotal: number;
    }>;
    getCartSummary(userId: string): Promise<any>;
    addToCart(userId: string, productVariantId: string, quantity: number): Promise<CartItem>;
    updateQuantity(userId: string, productVariantId: string, quantity: number): Promise<CartItem>;
    removeFromCart(userId: string, productVariantId: string): Promise<{
        success: boolean;
    }>;
    clearCart(userId: string): Promise<{
        success: boolean;
    }>;
}
