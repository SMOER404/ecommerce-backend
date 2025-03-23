import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './models/category.model';

@ApiTags('Категории')
@Controller('categories')
@UsePipes(new ValidationPipe({ transform: true }))
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Создание новой категории' })
  @ApiResponse({ status: 201, description: 'Категория успешно создана' })
  @ApiResponse({ status: 400, description: 'Неверный запрос' })
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение списка категорий' })
  @ApiResponse({ status: 200, description: 'Список категорий успешно получен' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<{ items: Category[]; total: number }> {
    return this.categoriesService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение информации о категории' })
  @ApiResponse({ status: 200, description: 'Информация о категории успешно получена' })
  @ApiResponse({ status: 404, description: 'Категория не найдена' })
  @ApiParam({ name: 'id', description: 'ID категории' })
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновление информации о категории' })
  @ApiResponse({ status: 200, description: 'Категория успешно обновлена' })
  @ApiResponse({ status: 404, description: 'Категория не найдена' })
  @ApiParam({ name: 'id', description: 'ID категории' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Некорректные данные' })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление категории' })
  @ApiResponse({ status: 200, description: 'Категория успешно удалена' })
  @ApiResponse({ status: 404, description: 'Категория не найдена' })
  @ApiParam({ name: 'id', description: 'ID категории' })
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriesService.remove(id);
  }
} 