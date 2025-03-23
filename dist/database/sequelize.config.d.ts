import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
export declare const getSequelizeConfig: (configService: ConfigService) => {
    dialect: string;
    host: any;
    port: any;
    username: any;
    password: any;
    database: any;
    logging: boolean;
    models: string[];
    modelMatch: (filename: any, member: any) => boolean;
    define: {
        timestamps: boolean;
        underscored: boolean;
    };
};
export declare const initDatabase: (sequelize: Sequelize) => Promise<void>;
