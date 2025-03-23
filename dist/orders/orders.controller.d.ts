import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { Request } from 'express';
interface RequestWithUser extends Request {
    user: {
        id: string;
    };
}
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(req: RequestWithUser, createOrderDto: CreateOrderDto): Promise<import("../models/order.model").Order>;
    findAll(req: RequestWithUser): Promise<import("../models/order.model").Order[]>;
    findOne(req: RequestWithUser, id: string): Promise<import("../models/order.model").Order>;
    updateStatus(req: RequestWithUser, id: string, updateOrderStatusDto: UpdateOrderStatusDto): Promise<import("../models/order.model").Order>;
    cancel(req: RequestWithUser, id: string): Promise<import("../models/order.model").Order>;
}
export {};
