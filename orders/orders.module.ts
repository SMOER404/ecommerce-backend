import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { OrdersService } from "./orders.service"
import { OrdersController } from "./orders.controller"
import { Order } from "../models/order.model"
import { OrderItem } from "../models/order-item.model"
import { CartModule } from "../cart/cart.module"
import { ProductVariant } from "../models/product-variant.model"
import { Product } from "../models/product.model"
import { PaymentsModule } from "../payments/payments.module"
import { CartItem } from "../models/cart-item.model"
import { Sequelize } from "sequelize-typescript"

@Module({
  imports: [
    SequelizeModule.forFeature([Order, OrderItem, ProductVariant, Product, CartItem]), 
    CartModule, 
    PaymentsModule
  ],
  providers: [
    OrdersService,
    {
      provide: Sequelize,
      useValue: Sequelize
    }
  ],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}

