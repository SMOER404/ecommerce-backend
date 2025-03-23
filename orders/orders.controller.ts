import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../common/decorators/roles.decorator"
import { GetUser } from "../common/decorators/get-user.decorator"
import { type User, UserRole } from "../models/user.model"
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: {
    id: string;
  };
}

@ApiTags('Заказы')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Создание нового заказа' })
  @ApiResponse({ status: 201, description: 'Заказ успешно создан' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 400, description: 'Неверный запрос' })
  async create(
    @Req() req: RequestWithUser,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.create(
      req.user.id,
      createOrderDto.shippingAddress,
      createOrderDto.paymentMethod,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Получение списка заказов пользователя' })
  @ApiResponse({ status: 200, description: 'Список заказов успешно получен' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  async findAll(@Req() req: RequestWithUser) {
    return this.ordersService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение информации о заказе' })
  @ApiResponse({ status: 200, description: 'Информация о заказе успешно получена' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 404, description: 'Заказ не найден' })
  async findOne(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.ordersService.findById(id, req.user.id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Обновление статуса заказа' })
  @ApiResponse({ status: 200, description: 'Статус заказа успешно обновлен' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен' })
  @ApiResponse({ status: 404, description: 'Заказ не найден' })
  async updateStatus(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateStatus(id, updateOrderStatusDto.status);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Отмена заказа' })
  @ApiResponse({ status: 200, description: 'Заказ успешно отменен' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 404, description: 'Заказ не найден' })
  async cancel(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.ordersService.cancel(id, req.user.id);
  }
}

