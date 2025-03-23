import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { UsersService } from "./users.service"
import type { UpdateUserDto } from "./dto/update-user.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../common/decorators/roles.decorator"
import { GetUser } from "../common/decorators/get-user.decorator"
import { UserRole } from "../models/user.model"
import type { User } from "../models/user.model"

@ApiTags("Пользователи")
@Controller("users")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Получение списка всех пользователей" })
  @ApiResponse({ status: 200, description: "Список пользователей успешно получен" })
  @ApiResponse({ status: 401, description: "Не авторизован" })
  @ApiResponse({ status: 403, description: "Доступ запрещен" })
  async findAll() {
    return this.usersService.findAll()
  }

  @Get("profile")
  @ApiOperation({ summary: "Получение профиля пользователя" })
  @ApiResponse({ status: 200, description: "Профиль пользователя успешно получен" })
  @ApiResponse({ status: 401, description: "Не авторизован" })
  getProfile(@GetUser() user: User) {
    return this.usersService.findById(user.id)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Получение информации о пользователе по ID" })
  @ApiResponse({ status: 200, description: "Информация о пользователе успешно получена" })
  @ApiResponse({ status: 401, description: "Не авторизован" })
  @ApiResponse({ status: 403, description: "Доступ запрещен" })
  @ApiResponse({ status: 404, description: "Пользователь не найден" })
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Put("profile")
  @ApiOperation({ summary: "Обновление профиля пользователя" })
  @ApiResponse({ status: 200, description: "Профиль пользователя успешно обновлен" })
  @ApiResponse({ status: 401, description: "Не авторизован" })
  updateProfile(@GetUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user.id, updateUserDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Удаление пользователя" })
  @ApiResponse({ status: 200, description: "Пользователь успешно удален" })
  @ApiResponse({ status: 401, description: "Не авторизован" })
  @ApiResponse({ status: 403, description: "Доступ запрещен" })
  @ApiResponse({ status: 404, description: "Пользователь не найден" })
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    return { message: 'Пользователь успешно удален' };
  }

  @Post(':id/set-admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Назначение пользователя администратором" })
  @ApiResponse({ status: 200, description: "Роль пользователя успешно обновлена на администратора" })
  @ApiResponse({ status: 401, description: "Не авторизован" })
  @ApiResponse({ status: 403, description: "Доступ запрещен" })
  @ApiResponse({ status: 404, description: "Пользователь не найден" })
  async setAdminRole(@Param('id') id: string) {
    await this.usersService.setAdminRole(id);
    return { message: 'Роль пользователя успешно обновлена на администратора' };
  }
}

