import { Strategy } from "passport-jwt";
import type { Request } from "express";
import { ConfigService } from "@nestjs/config";
declare const JwtRefreshStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(req: Request, payload: any): Promise<any>;
}
export {};
