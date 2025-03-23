import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config"
import { UsersService } from "../users/users.service"
import type { CreateUserDto } from "../users/dto/create-user.dto"
import type { LoginDto } from "./dto/login.dto"
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email)
    if (user && (await user.comparePassword(password))) {
      const { password, refreshToken, ...result } = user.toJSON()
      return result
    }
    return null
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto

    // Find user
    const user = await this.usersService.findByEmail(email)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    // Generate token
    const payload = { email: user.email, sub: user.id, role: user.role }
    const accessToken = this.jwtService.sign(payload)

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    }
  }

  async register(createUserDto: CreateUserDto) {
    const { email, password, firstName, lastName } = createUserDto

    // Check if user exists
    const existingUser = await this.usersService.findByEmail(email)
    if (existingUser) {
      throw new UnauthorizedException('User already exists')
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await this.usersService.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: 'user',
    })

    // Generate token
    const payload = { email: user.email, sub: user.id, role: user.role }
    const accessToken = this.jwtService.sign(payload)

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    }
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId)
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException("Access denied")
    }

    const refreshTokenMatches = await this.verifyRefreshToken(refreshToken, user.refreshToken)
    if (!refreshTokenMatches) {
      throw new UnauthorizedException("Access denied")
    }

    const tokens = await this.getTokens(user.id, user.email, user.role)
    await this.updateRefreshToken(user.id, tokens.refreshToken)

    return tokens
  }

  async logout(userId: string) {
    await this.usersService.update(userId, { refreshToken: null })
    return { message: "Logged out successfully" }
  }

  async getTokens(userId: string, email: string, role: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: this.configService.get("JWT_SECRET"),
          expiresIn: "15m",
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: this.configService.get("JWT_REFRESH_SECRET"),
          expiresIn: "7d",
        },
      ),
    ])

    return {
      accessToken,
      refreshToken,
    }
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    await this.usersService.update(userId, {
      refreshToken,
    })
  }

  async verifyRefreshToken(refreshToken: string, hashedRefreshToken: string): Promise<boolean> {
    return refreshToken === hashedRefreshToken
  }
}

