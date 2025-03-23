import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { CreatePaymentDto } from "./dto/create-payment.dto";
export declare class PaymentsService {
    private httpService;
    private configService;
    private readonly apiUrl;
    private readonly shopId;
    private readonly secretKey;
    constructor(httpService: HttpService, configService: ConfigService);
    getPaymentMethods(): Promise<{
        id: string;
        name: string;
    }[]>;
    createPayment(createPaymentDto: CreatePaymentDto): Promise<any>;
    getPayment(paymentId: string): Promise<any>;
    cancelPayment(paymentId: string): Promise<any>;
    handleWebhook(payload: any): Promise<{
        received: boolean;
    }>;
}
