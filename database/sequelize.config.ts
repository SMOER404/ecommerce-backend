import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';

export const getSequelizeConfig = (configService: ConfigService) => ({
  dialect: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  logging: configService.get('NODE_ENV') === 'development',
  models: [__dirname + '/../**/*.model.ts'],
  modelMatch: (filename, member) => {
    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
  },
  define: {
    timestamps: true,
    underscored: true,
  },
});

export const initDatabase = async (sequelize: Sequelize) => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await sequelize.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}; 