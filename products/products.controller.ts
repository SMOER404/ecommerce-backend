import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from "@nestjs/swagger"
import { FilesInterceptor } from "@nestjs/platform-express"
import { ProductsService } from "./products.service"
import type { CreateProductDto } from "./dto/create-product.dto"
import type { UpdateProductDto } from "./dto/update-product.dto"
import type { CreateProductVariantDto } from "./dto/create-product-variant.dto"
import type { UpdateProductVariantDto } from "./dto/update-product-variant.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../common/decorators/roles.decorator"
import { UserRole } from "../models/user.model"
import type { ProductQueryDto } from "./dto/product-query.dto"
import type { Express } from "express"

@ApiTags("Товары")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: "Получение списка товаров" })
  @ApiResponse({ status: 200, description: "Список товаров успешно получен" })
  async findAll(@Query() query: ProductQueryDto) {
    const { rows, count } = await this.productsService.findAll(query);
    return {
      data: rows,
      meta: {
        total: count,
        page: query.page || 1,
        limit: query.limit || 10,
        totalPages: Math.ceil(count / (query.limit || 10)),
      },
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение информации о товаре' })
  @ApiResponse({ status: 200, description: 'Информация о товаре успешно получена' })
  @ApiResponse({ status: 404, description: 'Товар не найден' })
  async findOne(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Создание нового товара" })
  @ApiResponse({ status: 201, description: "Товар успешно создан" })
  @ApiResponse({ status: 401, description: "Не авторизован" })
  @ApiResponse({ status: 403, description: "Доступ запрещен" })
  @UseInterceptors(FilesInterceptor("images", 10))
  @ApiConsumes("multipart/form-data")
  async create(@Body() createProductDto: CreateProductDto, @UploadedFiles() images: Express.Multer.File[]) {
    return this.productsService.create(createProductDto, images)
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Обновление информации о товаре" })
  @ApiResponse({ status: 200, description: "Товар успешно обновлен" })
  @ApiResponse({ status: 401, description: "Не авторизован" })
  @ApiResponse({ status: 403, description: "Доступ запрещен" })
  @ApiResponse({ status: 404, description: "Товар не найден" })
  @UseInterceptors(FilesInterceptor("images", 10))
  @ApiConsumes("multipart/form-data")
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.productsService.update(id, updateProductDto, images)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удаление товара' })
  @ApiResponse({ status: 200, description: 'Товар успешно удален' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен' })
  @ApiResponse({ status: 404, description: 'Товар не найден' })
  async remove(@Param('id') id: string) {
    await this.productsService.remove(id);
    return { message: 'Товар успешно удален' };
  }

  @Post(":id/variants")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Добавление варианта товара" })
  @ApiResponse({ status: 201, description: "Вариант товара успешно добавлен" })
  @ApiResponse({ status: 401, description: "Не авторизован" })
  @ApiResponse({ status: 403, description: "Доступ запрещен" })
  @ApiResponse({ status: 404, description: "Товар не найден" })
  async addVariant(@Param('id') id: string, @Body() createVariantDto: CreateProductVariantDto) {
    return this.productsService.addVariant(id, createVariantDto)
  }

  @Put("variants/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Обновление варианта товара" })
  @ApiResponse({ status: 200, description: "Вариант товара успешно обновлен" })
  @ApiResponse({ status: 401, description: "Не авторизован" })
  @ApiResponse({ status: 403, description: "Доступ запрещен" })
  @ApiResponse({ status: 404, description: "Товар или вариант не найден" })
  async updateVariant(@Param('id') id: string, @Body() updateVariantDto: UpdateProductVariantDto) {
    return this.productsService.updateVariant(id, updateVariantDto)
  }

  @Delete('variants/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удаление варианта товара' })
  @ApiResponse({ status: 200, description: 'Вариант товара успешно удален' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен' })
  @ApiResponse({ status: 404, description: 'Товар или вариант не найден' })
  async removeVariant(@Param('id') id: string) {
    await this.productsService.removeVariant(id);
    return { message: 'Вариант товара успешно удален' };
  }
}

