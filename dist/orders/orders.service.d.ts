import { Sequelize } from "sequelize-typescript";
import { Order, OrderStatus } from "../models/order.model";
import { OrderItem } from "../models/order-item.model";
import { ProductVariant } from "../models/product-variant.model";
import { CartService } from "../cart/cart.service";
import { PaymentsService } from "../payments/payments.service";
import { CartItem } from "../models/cart-item.model";
export declare class OrdersService {
    private orderModel;
    private orderItemModel;
    private cartItemModel;
    private productVariantModel;
    private cartService;
    private paymentsService;
    private sequelize;
    constructor(orderModel: typeof Order, orderItemModel: typeof OrderItem, cartItemModel: typeof CartItem, productVariantModel: typeof ProductVariant, cartService: CartService, paymentsService: PaymentsService, sequelize: Sequelize);
    findAll(userId?: string): Promise<Order[]>;
    findById(id: string, userId?: string): Promise<Order>;
    create(userId: string, shippingAddress: string, paymentMethod: string): Promise<Order>;
    updateStatus(id: string, status: OrderStatus): Promise<Order>;
    cancel(id: string, userId: string): Promise<Order>;
}
