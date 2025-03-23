import { PaymentsService } from "./payments.service";
import type { CreatePaymentDto } from "./dto/create-payment.dto";
import type { User } from "../models/user.model";
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createPayment(user: User, createPaymentDto: CreatePaymentDto): Promise<any>;
    getPayment(user: User, id: string): Promise<any>;
}
