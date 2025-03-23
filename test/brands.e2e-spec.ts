import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { Brand } from '../models/brand.model';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { testConfig } from '../config/test.config';
import { AuthService } from '../auth/auth.service';
import { CreateBrandDto } from '../brands/dto/create-brand.dto';

describe('BrandsController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let testBrand: Brand;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot(testConfig),
        AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Создаем тестовый бренд напрямую через модель
    testBrand = await Brand.create({
      name: 'Initial Test Brand',
      description: 'Test Description',
      isActive: true
    });

    // Получаем токен авторизации
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'admin123',
      });

    authToken = loginResponse.body.accessToken;
  }, 30000);

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  describe('/brands (POST)', () => {
    it('should create a new brand', async () => {
      const response = await request(app.getHttpServer())
        .post('/brands')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Test Brand',
          description: 'Test Description',
          logo: 'test-logo.png',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Test Brand');

      testBrand = response.body;
    });
  });

  describe('/brands (GET)', () => {
    it('should return all brands', async () => {
      const response = await request(app.getHttpServer())
        .get('/brands')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('items');
      expect(response.body).toHaveProperty('total');
      expect(Array.isArray(response.body.items)).toBe(true);
    });
  });

  describe('/brands/:id (GET)', () => {
    it('should return brand by id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/brands/${testBrand.id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', testBrand.id);
      expect(response.body.name).toBe(testBrand.name);
    });
  });

  describe('/brands/:id (PATCH)', () => {
    it('should update brand', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/brands/${testBrand.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Updated Brand',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', testBrand.id);
      expect(response.body.name).toBe('Updated Brand');
    });
  });

  describe('/brands/:id (DELETE)', () => {
    it('should delete brand', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/brands/${testBrand.id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);

      // Проверяем, что бренд помечен как неактивный
      const brandResponse = await request(app.getHttpServer())
        .get(`/brands/${testBrand.id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(brandResponse.body.isActive).toBe(false);
    });
  });
}); 