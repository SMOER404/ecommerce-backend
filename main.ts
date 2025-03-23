import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { AppModule } from "./app.module"
import * as cookieParser from "cookie-parser"
import { GlobalExceptionFilter } from "./common/filters/http-exception.filter"
import rateLimit from "express-rate-limit"
import { NestExpressApplication } from "@nestjs/platform-express"

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // Настройка CORS для разрешения запросов с клиента
  app.enableCors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })

  // Настройка rate limiting
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 минут
      max: 100 // максимум 100 запросов с одного IP
    })
  )

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  // Global exception filter
  app.useGlobalFilters(new GlobalExceptionFilter())

  // Cookie parser
  app.use(cookieParser())

  // Swagger API documentation
  const config = new DocumentBuilder()
    .setTitle("POIZON MARKET API")
    .setDescription("Документация API для платформы электронной коммерции")
    .setVersion("1.0")
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api/docs", app, document, {
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
  })

  // Global prefix для всех API-эндпоинтов
  app.setGlobalPrefix("api")

  await app.listen(process.env.PORT || 3001)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()

