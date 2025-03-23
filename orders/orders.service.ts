import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { Sequelize } from "sequelize-typescript"
import { Order, OrderStatus } from "../models/order.model"
import { OrderItem } from "../models/order-item.model"
import { ProductVariant } from "../models/product-variant.model"
import { CartService } from "../cart/cart.service"
import type { CreateOrderDto } from "./dto/create-order.dto"
import type { UpdateOrderStatusDto } from "./dto/update-order-status.dto"
import { PaymentsService } from "../payments/payments.service"
import { CartItem } from "../models/cart-item.model"

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
    @InjectModel(OrderItem)
    private orderItemModel: typeof OrderItem,
    @InjectModel(CartItem)
    private cartItemModel: typeof CartItem,
    @InjectModel(ProductVariant)
    private productVariantModel: typeof ProductVariant,
    private cartService: CartService,
    private paymentsService: PaymentsService,
    private sequelize: Sequelize,
  ) {}

  async findAll(userId?: string): Promise<Order[]> {
    const where = userId ? { userId } : {}

    return this.orderModel.findAll({
      where,
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: ProductVariant,
              attributes: ["id", "color", "size", "price", "stock"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    })
  }

  async findById(id: string, userId?: string): Promise<Order> {
    const where: any = { id }

    if (userId) {
      where.userId = userId
    }

    const order = await this.orderModel.findOne({
      where,
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: ProductVariant,
              attributes: ["id", "color", "size", "price", "stock"],
            },
          ],
        },
      ],
    })

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`)
    }

    return order
  }

  async create(userId: string, shippingAddress: string, paymentMethod: string): Promise<Order> {
    const cartItems = await this.cartItemModel.findAll({
      where: { userId },
      include: [ProductVariant],
    })

    if (cartItems.length === 0) {
      throw new BadRequestException('Cart is empty')
    }

    let totalAmount = 0
    cartItems.forEach(item => {
      totalAmount += item.productVariant.price * item.quantity
    })

    const order = await this.orderModel.create({
      userId,
      totalAmount,
      status: OrderStatus.PENDING,
      shippingAddress,
      paymentMethod,
    })

    for (const cartItem of cartItems) {
      await this.orderItemModel.create({
        orderId: order.id,
        productVariantId: cartItem.productVariantId,
        quantity: cartItem.quantity,
        price: cartItem.productVariant.price,
      })

      // Update product variant stock
      await cartItem.productVariant.update({
        stock: cartItem.productVariant.stock - cartItem.quantity,
      })
    }

    // Clear cart
    await this.cartItemModel.destroy({
      where: { userId },
    })

    return order
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await this.findById(id)
    await order.update({ status })
    return this.findById(id)
  }

  async cancel(id: string, userId: string): Promise<Order> {
    const order = await this.findById(id, userId)

    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException("Only pending orders can be cancelled")
    }

    // Restore product variant stock
    for (const item of order.items) {
      const productVariant = await this.productVariantModel.findByPk(item.productVariantId)
      if (productVariant) {
        await productVariant.update({
          stock: productVariant.stock + item.quantity,
        })
      }
    }

    await order.update({
      status: OrderStatus.CANCELLED,
    })

    return order
  }
}

