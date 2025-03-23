"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const express_rate_limit_1 = require("express-rate-limit");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        credentials: true,
    });
    app.use((0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: 100
    }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.useGlobalFilters(new http_exception_filter_1.GlobalExceptionFilter());
    app.use(cookieParser());
    const config = new swagger_1.DocumentBuilder()
        .setTitle("POIZON MARKET API")
        .setDescription("Документация API для платформы электронной коммерции")
        .setVersion("1.0")
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api/docs", app, document, {
        customSiteTitle: "POIZON MARKET API Documentation",
        customCss: '.swagger-ui .topbar { display: none }',
        swaggerOptions: {
            language: 'ru',
            docExpansion: 'none',
            filter: true,
            showRequestHeaders: true,
            showCommonExtensions: true,
            showExtensions: true,
            showMutatedRequest: true,
            syntaxHighlight: {
                theme: 'monokai'
            },
        }
    });
    app.setGlobalPrefix("api");
    await app.listen(process.env.PORT || 3001);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map