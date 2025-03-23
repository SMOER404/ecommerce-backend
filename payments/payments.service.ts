import { Injectable, BadRequestException } from "@nestjs/common"
import { HttpService } from "@nestjs/axios"
import { ConfigService } from "@nestjs/config"
import { firstValueFrom } from "rxjs"
import { CreatePaymentDto } from "./dto/create-payment.dto"

@Injectable()
export class PaymentsService {
  private readonly apiUrl = "https://api.yookassa.ru/v3"
  private readonly shopId: string
  private readonly secretKey: string

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.shopId = this.configService.get("YOOKASSA_SHOP_ID")
    this.secretKey = this.configService.get("YOOKASSA_SECRET_KEY")

    if (!this.shopId || !this.secretKey) {
      console.warn("YooKassa credentials not found. Payment functionality will be limited.")
    }
  }

  async getPaymentMethods() {
    // In a real app, this would be fetched from YooKassa API
    return [
      { id: "bank_card", name: "Bank Card" },
      { id: "yoo_money", name: "YooMoney" },
      { id: "sberbank", name: "SberPay" },
      { id: "qiwi", name: "QIWI Wallet" },
    ]
  }

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const { orderId, amount, description } = createPaymentDto

    if (!this.shopId || !this.secretKey) {
      // For development without YooKassa credentials
      console.log("Creating mock payment for order:", orderId)
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
      }
    }

    try {
      const auth = Buffer.from(`${this.shopId}:${this.secretKey}`).toString("base64")

      const response = await firstValueFrom(
        this.httpService.post(
          `${this.apiUrl}/payments`,
          {
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
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Idempotence-Key": `order_${orderId}_${Date.now()}`,
              Authorization: `Basic ${auth}`,
            },
          },
        ),
      )

      return response.data
    } catch (error) {
      console.error("YooKassa payment creation error:", error.response?.data || error.message)
      throw new BadRequestException("Failed to create payment")
    }
  }

  async getPayment(paymentId: string) {
    if (!this.shopId || !this.secretKey) {
      // For development without YooKassa credentials
      return {
        id: paymentId,
        status: "succeeded",
        amount: {
          value: "100.00",
          currency: "RUB",
        },
      }
    }

    try {
      const auth = Buffer.from(`${this.shopId}:${this.secretKey}`).toString("base64")

      const response = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/payments/${paymentId}`, {
          headers: {
            Authorization: `Basic ${auth}`,
          },
        }),
      )

      return response.data
    } catch (error) {
      console.error("YooKassa payment fetch error:", error.response?.data || error.message)
      throw new BadRequestException("Failed to fetch payment")
    }
  }

  async cancelPayment(paymentId: string) {
    if (!this.shopId || !this.secretKey) {
      // For development without YooKassa credentials
      console.log("Cancelling mock payment:", paymentId)
      return {
        id: paymentId,
        status: "canceled",
      }
    }

    try {
      const auth = Buffer.from(`${this.shopId}:${this.secretKey}`).toString("base64")

      const response = await firstValueFrom(
        this.httpService.post(
          `${this.apiUrl}/payments/${paymentId}/cancel`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              "Idempotence-Key": `cancel_${paymentId}_${Date.now()}`,
              Authorization: `Basic ${auth}`,
            },
          },
        ),
      )

      return response.data
    } catch (error) {
      console.error("YooKassa payment cancellation error:", error.response?.data || error.message)
      throw new BadRequestException("Failed to cancel payment")
    }
  }

  async handleWebhook(payload: any) {
    // Validate webhook signature (in a real app)
    // Process payment status update
    console.log("Received YooKassa webhook:", payload)

    // Update order status based on payment status
    // This would typically call the OrdersService to update the order

    return { received: true }
  }
}

