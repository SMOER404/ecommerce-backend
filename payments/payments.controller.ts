import { Controller, Post, Body, UseGuards, Get, Param } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { PaymentsService } from "./payments.service"
import type { CreatePaymentDto } from "./dto/create-payment.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { GetUser } from "../common/decorators/get-user.decorator"
import type { User } from "../models/user.model"

@ApiTags("Платежи")
@Controller("payments")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: "Создание платежа" })
  @ApiResponse({ status: 201, description: "Платеж успешно создан" })
  @ApiResponse({ status: 401, description: "Не авторизован" })
  @ApiResponse({ status: 400, description: "Неверный запрос" })
  createPayment(@GetUser() user: User, @Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.createPayment(createPaymentDto)
  }

  @Get(":id")
  @ApiOperation({ summary: "Получение информации о платеже" })
  @ApiResponse({ status: 200, description: "Информация о платеже успешно получена" })
  @ApiResponse({ status: 401, description: "Не авторизован" })
  @ApiResponse({ status: 404, description: "Платеж не найден" })
  getPayment(@GetUser() user: User, @Param("id") id: string) {
    return this.paymentsService.getPayment(id)
  }
}

