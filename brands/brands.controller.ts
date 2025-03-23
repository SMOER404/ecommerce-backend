import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from '../models/brand.model';
import { PaginationParams } from '../common/types/base.types';

@ApiTags('Бренды')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Создание нового бренда',
    description: 'Создает новый бренд в системе. Требует уникальное название.'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Бренд успешно создан',
    type: Brand
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Неверный запрос. Проверьте корректность данных.' 
  })
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Получение списка брендов',
    description: 'Возвращает список всех активных брендов с пагинацией'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Список брендов успешно получен',
    type: [Brand]
  })
  @ApiQuery({ 
    name: 'page', 
    required: false, 
    type: Number,
    description: 'Номер страницы (начиная с 1)'
  })
  @ApiQuery({ 
    name: 'limit', 
    required: false, 
    type: Number,
    description: 'Количество брендов на странице'
  })
  findAll(@Query() params: PaginationParams) {
    return this.brandsService.findAll(params);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Получение информации о бренде',
    description: 'Возвращает подробную информацию о бренде по его ID'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Информация о бренде успешно получена',
    type: Brand
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Бренд не найден' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Уникальный идентификатор бренда',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Обновление информации о бренде',
    description: 'Обновляет информацию о существующем бренде'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Бренд успешно обновлен',
    type: Brand
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Бренд не найден' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Неверный запрос. Проверьте корректность данных.' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Уникальный идентификатор бренда',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(id, updateBrandDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Удаление бренда',
    description: 'Удаляет бренд из системы. Это действие нельзя отменить.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Бренд успешно удален' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Бренд не найден' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Уникальный идентификатор бренда',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  remove(@Param('id') id: string) {
    return this.brandsService.remove(id);
  }
} 