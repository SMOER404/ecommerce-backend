import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { CartService } from "./cart.service"
import { CartController } from "./cart.controller"
import { CartItem } from "../models/cart-item.model"
import { ProductVariant } from "../models/product-variant.model"
import { Product } from "../models/product.model"

@Module({
  imports: [SequelizeModule.forFeature([CartItem, ProductVariant, Product])],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}

