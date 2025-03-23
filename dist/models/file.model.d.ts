import { Model } from 'sequelize-typescript';
export declare class File extends Model {
    id: string;
    filename: string;
    originalname: string;
    mimetype: string;
    size: number;
    path: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
}
