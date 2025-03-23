"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
const app_module_1 = require("../app.module");
const brand_model_1 = require("../models/brand.model");
const sequelize_1 = require("@nestjs/sequelize");
const test_config_1 = require("../config/test.config");
describe('BrandsController (e2e)', () => {
    let app;
    let authToken;
    let testBrand;
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [
                sequelize_1.SequelizeModule.forRoot(test_config_1.testConfig),
                app_module_1.AppModule
            ],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
        testBrand = await brand_model_1.Brand.create({
            name: 'Initial Test Brand',
            description: 'Test Description',
            isActive: true
        });
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
            const brandResponse = await request(app.getHttpServer())
                .get(`/brands/${testBrand.id}`)
                .set('Authorization', `Bearer ${authToken}`);
            expect(brandResponse.body.isActive).toBe(false);
        });
    });
});
//# sourceMappingURL=brands.e2e-spec.js.map