import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { CartItem } from "../models/cart-item.model"
import { ProductVariant } from "../models/product-variant.model"
import type { AddToCartDto } from "./dto/add-to-cart.dto"
import type { UpdateCartItemDto } from "./dto/update-cart-item.dto"

@Injectable()
export class CartService {
  constructor(
    @InjectModel(CartItem)
    private cartItemModel: typeof CartItem,
    @InjectModel(ProductVariant)
    private productVariantModel: typeof ProductVariant,
  ) {}

  async getCart(userId: string) {
    const cartItems = await this.cartItemModel.findAll({
      where: { userId },
      include: [{
        model: ProductVariant,
        attributes: ['id', 'color', 'size', 'price', 'stock'],
      }],
    });

    let subtotal = 0;
    cartItems.forEach(item => {
      subtotal += item.productVariant.price * item.quantity;
    });

    return {
      items: cartItems,
      subtotal,
    };
  }

  async getCartSummary(userId: string): Promise<any> {
    const cartItems = await this.getCart(userId)

    let subtotal = 0
    let itemCount = 0

    cartItems.items.forEach((item) => {
      subtotal += item.productVariant.price * item.quantity
      itemCount += item.quantity
    })

    const tax = subtotal * 0.08 // 8% tax
    const shipping = subtotal > 100 ? 0 : 10 // Free shipping over $100
    const total = subtotal + tax + shipping

    return {
      subtotal,
      tax,
      shipping,
      total,
      itemCount,
    }
  }

  async addToCart(userId: string, productVariantId: string, quantity: number) {
    const productVariant = await this.productVariantModel.findByPk(productVariantId);
    if (!productVariant) {
      throw new NotFoundException('Product variant not found');
    }

    if (productVariant.stock < quantity) {
      throw new BadRequestException(`Not enough stock available. Only ${productVariant.stock} items left.`);
    }

    const [cartItem] = await this.cartItemModel.findOrCreate({
      where: {
        userId,
        productVariantId,
      },
      defaults: {
        quantity,
      },
    });

    if (cartItem.quantity !== quantity) {
      cartItem.quantity = quantity;
      await cartItem.save();
    }

    return cartItem;
  }

  async updateQuantity(userId: string, productVariantId: string, quantity: number) {
    const cartItem = await this.cartItemModel.findOne({
      where: {
        userId,
        productVariantId,
      },
      include: [ProductVariant],
    });

    if (!cartItem) {
      throw new NotFoundException('Item not found in cart');
    }

    if (cartItem.productVariant.stock < quantity) {
      throw new BadRequestException(`Not enough stock available. Only ${cartItem.productVariant.stock} items left.`);
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    return cartItem;
  }

  async removeFromCart(userId: string, productVariantId: string) {
    const result = await this.cartItemModel.destroy({
      where: {
        userId,
        productVariantId,
      },
    });

    if (result === 0) {
      throw new NotFoundException('Item not found in cart');
    }

    return { success: true };
  }

  async clearCart(userId: string) {
    await this.cartItemModel.destroy({
      where: { userId },
    });
    return { success: true };
  }
}

