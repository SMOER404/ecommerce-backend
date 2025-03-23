import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { GetUser } from "../common/decorators/get-user.decorator";
import { User } from "../models/user.model";
import { AddToCartDto } from "./dto/add-to-cart.dto";

interface RequestWithUser extends Request {
  user: {
    id: string;
  };
}

@ApiTags('Корзина')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Получение содержимого корзины' })
  @ApiResponse({ status: 200, description: 'Содержимое корзины успешно получено' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  getCart(@GetUser() user: User) {
    return this.cartService.getCart(user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Добавление товара в корзину' })
  @ApiResponse({ status: 201, description: 'Товар успешно добавлен в корзину' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 404, description: 'Товар не найден' })
  addToCart(@GetUser() user: User, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(user.id, addToCartDto.productVariantId, addToCartDto.quantity);
  }

  @Patch('items/:id')
  @ApiOperation({ summary: 'Обновление количества товара в корзине' })
  @ApiResponse({ status: 200, description: 'Количество товара успешно обновлено' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 404, description: 'Товар не найден в корзине' })
  async updateQuantity(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateQuantity(
      req.user.id,
      id,
      updateCartItemDto.quantity,
    );
  }

  @Delete(':productId')
  @ApiOperation({ summary: 'Удаление товара из корзины' })
  @ApiResponse({ status: 200, description: 'Товар успешно удален из корзины' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 404, description: 'Товар не найден в корзине' })
  removeFromCart(@GetUser() user: User, @Param('productId') productId: string) {
    return this.cartService.removeFromCart(user.id, productId);
  }

  @Delete()
  @ApiOperation({ summary: 'Очистка корзины' })
  @ApiResponse({ status: 200, description: 'Корзина успешно очищена' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  async clearCart(@Req() req: RequestWithUser) {
    return this.cartService.clearCart(req.user.id);
  }
}

