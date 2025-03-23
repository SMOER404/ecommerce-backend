import { Injectable, BadRequestException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import * as fs from "fs"
import * as path from "path"
import { v4 as uuidv4 } from "uuid"
import { Express } from "express"

@Injectable()
export class FilesService {
  constructor(private configService: ConfigService) {
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "uploads")
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }
  }

  async uploadFile(file: Express.Multer.File, folder = "common"): Promise<string> {
    if (!file) {
      throw new BadRequestException("File is required")
    }

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException("Only image files are allowed")
    }

    // Create folder if it doesn't exist
    const folderPath = path.join(process.cwd(), "uploads", folder)
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true })
    }

    // Generate unique filename
    const fileExtension = path.extname(file.originalname)
    const fileName = `${uuidv4()}${fileExtension}`
    const filePath = path.join(folderPath, fileName)

    // Write file
    fs.writeFileSync(filePath, file.buffer)

    // Return file URL
    const baseUrl = this.configService.get("BASE_URL") || `http://localhost:${this.configService.get("PORT") || 3001}`
    return `${baseUrl}/uploads/${folder}/${fileName}`
  }

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      const baseUrl = this.configService.get("BASE_URL") || `http://localhost:${this.configService.get("PORT") || 3001}`
      const filePath = fileUrl.replace(`${baseUrl}/uploads/`, "")
      const fullPath = path.join(process.cwd(), "uploads", filePath)

      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath)
      }
    } catch (error) {
      console.error("Error deleting file:", error)
    }
  }
}

