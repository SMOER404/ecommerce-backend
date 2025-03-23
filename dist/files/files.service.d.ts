import { ConfigService } from "@nestjs/config";
export declare class FilesService {
    private configService;
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File, folder?: string): Promise<string>;
    deleteFile(fileUrl: string): Promise<void>;
}
