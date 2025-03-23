import { Controller, Post, Body, UseGuards, Get, Req, Res, HttpCode, HttpStatus } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { Response, Request } from "express"
import { AuthService } from "./auth.service"
import type { CreateUserDto } from "../users/dto/create-user.dto"
import type { LoginDto } from "./dto/login.dto"
import { JwtRefreshGuard } from "./guards/jwt-refresh.guard"
import { JwtAuthGuard } from "./guards/jwt-auth.guard"
import { GetUser } from "../common/decorators/get-user.decorator"
import type { User } from "../models/user.model"
import { ConfigService } from '@nestjs/config'

interface RequestWithUser extends Request {
  user: User;
}

@ApiTags("Аутентификация")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post("register")
  @ApiOperation({ summary: "Регистрация нового пользователя" })
  @ApiResponse({ status: 201, description: "Пользователь успешно зарегистрирован" })
  @ApiResponse({ status: 400, description: "Неверный запрос" })
  async register(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.register(createUserDto)

    // Устанавливаем refresh token в httpOnly cookie
    this.setRefreshTokenCookie(res, result.accessToken)

    // Возвращаем access token и данные пользователя
    return {
      accessToken: result.accessToken,
      user: result.user,
    }
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Вход пользователя" })
  @ApiResponse({ status: 200, description: "Пользователь успешно вошел в систему" })
  @ApiResponse({ status: 401, description: "Не авторизован" })
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(loginDto)

    // Устанавливаем refresh token в httpOnly cookie
    this.setRefreshTokenCookie(res, result.accessToken)

    // Возвращаем access token и данные пользователя
    return {
      accessToken: result.accessToken,
      user: result.user,
    }
  }

  @Get("refresh")
  @UseGuards(JwtRefreshGuard)
  @ApiOperation({ summary: "Обновление токена доступа" })
  @ApiResponse({ status: 200, description: "Токен успешно обновлен" })
  @ApiResponse({ status: 401, description: "Не авторизован" })
  async refreshTokens(@Req() req: RequestWithUser, @Res({ passthrough: true }) res: Response) {
    const userId = req.user.id
    const refreshToken = req.cookies.refreshToken
    const tokens = await this.authService.refreshTokens(userId, refreshToken)
    this.setRefreshTokenCookie(res, tokens.accessToken)
    return { accessToken: tokens.accessToken }
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Выход пользователя" })
  @ApiResponse({ status: 200, description: "Пользователь успешно вышел из системы" })
  @ApiResponse({ status: 401, description: "Не авторизован" })
  async logout(@GetUser() user: User, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(user.id)

    // Удаляем refresh token cookie
    res.clearCookie("refreshToken")

    return { message: "Успешный выход из системы" }
  }

  private setRefreshTokenCookie(res: Response, token: string) {
    res.cookie("refreshToken", token, {
      httpOnly: true,
      secure: this.configService.get("NODE_ENV") === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
  }
}

