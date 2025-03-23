"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const fs = require("fs");
const path = require("path");
const uuid_1 = require("uuid");
let FilesService = class FilesService {
    constructor(configService) {
        this.configService = configService;
        const uploadsDir = path.join(process.cwd(), "uploads");
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }
    }
    async uploadFile(file, folder = "common") {
        if (!file) {
            throw new common_1.BadRequestException("File is required");
        }
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException("Only image files are allowed");
        }
        const folderPath = path.join(process.cwd(), "uploads", folder);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        const fileExtension = path.extname(file.originalname);
        const fileName = `${(0, uuid_1.v4)()}${fileExtension}`;
        const filePath = path.join(folderPath, fileName);
        fs.writeFileSync(filePath, file.buffer);
        const baseUrl = this.configService.get("BASE_URL") || `http://localhost:${this.configService.get("PORT") || 3001}`;
        return `${baseUrl}/uploads/${folder}/${fileName}`;
    }
    async deleteFile(fileUrl) {
        try {
            const baseUrl = this.configService.get("BASE_URL") || `http://localhost:${this.configService.get("PORT") || 3001}`;
            const filePath = fileUrl.replace(`${baseUrl}/uploads/`, "");
            const fullPath = path.join(process.cwd(), "uploads", filePath);
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            }
        }
        catch (error) {
            console.error("Error deleting file:", error);
        }
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FilesService);
//# sourceMappingURL=files.service.js.map