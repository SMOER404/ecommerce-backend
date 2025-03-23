import { Controller, Post, Delete, UseInterceptors, UploadedFile, Param, UseGuards, BadRequestException } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiConsumes, ApiBody, ApiBearerAuth } from "@nestjs/swagger"
import { FilesService } from "./files.service"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../common/decorators/roles.decorator"
import { UserRole } from "../models/user.model"
import { Express } from "express"

@ApiTags("Файлы")
@ApiBearerAuth()
@Controller("files")
@UseGuards(JwtAuthGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Загрузка файла' })
  @ApiResponse({ status: 201, description: 'Файл успешно загружен' })
  @ApiResponse({ status: 400, description: 'Неверный тип файла' })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    
    const fileUrl = await this.filesService.uploadFile(file);
    
    return { url: fileUrl };
  }

  @Delete(':url')
  @ApiOperation({ summary: 'Удаление файла' })
  @ApiResponse({ status: 200, description: 'Файл успешно удален' })
  @ApiResponse({ status: 404, description: 'Файл не найден' })
  @ApiParam({ name: 'url', description: 'URL файла для удаления' })
  deleteFile(@Param('url') url: string) {
    return this.filesService.deleteFile(url);
  }
}

