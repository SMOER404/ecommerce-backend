import { Response, Request } from "express";
import { AuthService } from "./auth.service";
import type { CreateUserDto } from "../users/dto/create-user.dto";
import type { LoginDto } from "./dto/login.dto";
import type { User } from "../models/user.model";
import { ConfigService } from '@nestjs/config';
interface RequestWithUser extends Request {
    user: User;
}
export declare class AuthController {
    private readonly authService;
    private readonly configService;
    constructor(authService: AuthService, configService: ConfigService);
    register(createUserDto: CreateUserDto, res: Response): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: import("../models/user.model").UserRole;
        };
    }>;
    login(loginDto: LoginDto, res: Response): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: import("../models/user.model").UserRole;
        };
    }>;
    refreshTokens(req: RequestWithUser, res: Response): Promise<{
        accessToken: string;
    }>;
    logout(user: User, res: Response): Promise<{
        message: string;
    }>;
    private setRefreshTokenCookie;
}
export {};
