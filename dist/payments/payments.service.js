"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let PaymentsService = class PaymentsService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.apiUrl = "https://api.yookassa.ru/v3";
        this.shopId = this.configService.get("YOOKASSA_SHOP_ID");
        this.secretKey = this.configService.get("YOOKASSA_SECRET_KEY");
        if (!this.shopId || !this.secretKey) {
            console.warn("YooKassa credentials not found. Payment functionality will be limited.");
        }
    }
    async getPaymentMethods() {
        return [
            { id: "bank_card", name: "Bank Card" },
            { id: "yoo_money", name: "YooMoney" },
            { id: "sberbank", name: "SberPay" },
            { id: "qiwi", name: "QIWI Wallet" },
        ];
    }
    async createPayment(createPaymentDto) {
        const { orderId, amount, description } = createPaymentDto;
        if (!this.shopId || !this.secretKey) {
            console.log("Creating mock payment for order:", orderId);
            return {
                id: `mock_payment_${Date.now()}`,
                status: "pending",
                amount: {
                    value: amount.toFixed(2),
                    currency: "RUB",
                },
                confirmation: {
                    type: "redirect",
                    confirmation_url: "https://example.com/payment-success",
                },
            };
        }
        try {
            const auth = Buffer.from(`${this.shopId}:${this.secretKey}`).toString("base64");
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.apiUrl}/payments`, {
                amount: {
                    value: amount.toFixed(2),
                    currency: "RUB",
                },
                capture: true,
                confirmation: {
                    type: "redirect",
                    return_url: `${this.configService.get("FRONTEND_URL")}/orders/${orderId}/success`,
                },
                description,
                metadata: {
                    orderId,
                },
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Idempotence-Key": `order_${orderId}_${Date.now()}`,
                    Authorization: `Basic ${auth}`,
                },
            }));
            return response.data;
        }
        catch (error) {
            console.error("YooKassa payment creation error:", error.response?.data || error.message);
            throw new common_1.BadRequestException("Failed to create payment");
        }
    }
    async getPayment(paymentId) {
        if (!this.shopId || !this.secretKey) {
            return {
                id: paymentId,
                status: "succeeded",
                amount: {
                    value: "100.00",
                    currency: "RUB",
                },
            };
        }
        try {
            const auth = Buffer.from(`${this.shopId}:${this.secretKey}`).toString("base64");
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.apiUrl}/payments/${paymentId}`, {
                headers: {
                    Authorization: `Basic ${auth}`,
                },
            }));
            return response.data;
        }
        catch (error) {
            console.error("YooKassa payment fetch error:", error.response?.data || error.message);
            throw new common_1.BadRequestException("Failed to fetch payment");
        }
    }
    async cancelPayment(paymentId) {
        if (!this.shopId || !this.secretKey) {
            console.log("Cancelling mock payment:", paymentId);
            return {
                id: paymentId,
                status: "canceled",
            };
        }
        try {
            const auth = Buffer.from(`${this.shopId}:${this.secretKey}`).toString("base64");
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.apiUrl}/payments/${paymentId}/cancel`, {}, {
                headers: {
                    "Content-Type": "application/json",
                    "Idempotence-Key": `cancel_${paymentId}_${Date.now()}`,
                    Authorization: `Basic ${auth}`,
                },
            }));
            return response.data;
        }
        catch (error) {
            console.error("YooKassa payment cancellation error:", error.response?.data || error.message);
            throw new common_1.BadRequestException("Failed to cancel payment");
        }
    }
    async handleWebhook(payload) {
        console.log("Received YooKassa webhook:", payload);
        return { received: true };
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map