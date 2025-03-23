"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const brands_service_1 = require("../brands/brands.service");
const brand_model_1 = require("../models/brand.model");
const sequelize_1 = require("@nestjs/sequelize");
describe('BrandsService', () => {
    let service;
    let mockBrand;
    beforeEach(async () => {
        mockBrand = {
            id: '1',
            name: 'Test Brand',
            description: 'Test Description',
            logo: 'test-logo.png',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            update: jest.fn(),
        };
        const module = await testing_1.Test.createTestingModule({
            providers: [
                brands_service_1.BrandsService,
                {
                    provide: (0, sequelize_1.getModelToken)(brand_model_1.Brand),
                    useValue: {
                        findAll: jest.fn(),
                        findByPk: jest.fn(),
                        create: jest.fn(),
                        update: jest.fn(),
                        destroy: jest.fn(),
                        findOne: jest.fn(),
                        count: jest.fn(),
                        findAndCountAll: jest.fn(),
                    },
                },
            ],
        }).compile();
        service = module.get(brands_service_1.BrandsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        it('should create a brand', async () => {
            const createBrandDto = {
                name: 'Test Brand',
                description: 'Test Description',
                logo: 'test-logo.png',
            };
            jest.spyOn(service['brandModel'], 'create').mockResolvedValue(mockBrand);
            const result = await service.create(createBrandDto);
            expect(result).toEqual(mockBrand);
            expect(service['brandModel'].create).toHaveBeenCalledWith(createBrandDto);
        });
    });
    describe('findAll', () => {
        it('should return all brands with pagination', async () => {
            const mockBrands = [mockBrand];
            const mockCount = 1;
            const paginationParams = { page: 1, limit: 10 };
            jest.spyOn(service['brandModel'], 'findAndCountAll').mockResolvedValue({
                rows: mockBrands,
                count: mockCount,
            });
            const result = await service.findAll(paginationParams);
            expect(result).toEqual({
                items: mockBrands,
                total: mockCount,
                page: 1,
                limit: 10,
                totalPages: 1,
            });
            expect(service['brandModel'].findAndCountAll).toHaveBeenCalledWith({
                where: { isActive: true },
                offset: 0,
                limit: 10,
                order: [['createdAt', 'DESC']],
            });
        });
    });
    describe('findOne', () => {
        it('should return a brand by id', async () => {
            jest.spyOn(service['brandModel'], 'findByPk').mockResolvedValue(mockBrand);
            const result = await service.findOne('1');
            expect(result).toEqual(mockBrand);
            expect(service['brandModel'].findByPk).toHaveBeenCalledWith('1');
        });
    });
    describe('update', () => {
        it('should update a brand', async () => {
            const updateBrandDto = {
                name: 'Updated Brand',
            };
            jest.spyOn(service['brandModel'], 'findByPk').mockResolvedValue(mockBrand);
            jest.spyOn(mockBrand, 'update').mockResolvedValue(mockBrand);
            const result = await service.update('1', updateBrandDto);
            expect(result).toEqual(mockBrand);
            expect(service['brandModel'].findByPk).toHaveBeenCalledWith('1');
            expect(mockBrand.update).toHaveBeenCalledWith(updateBrandDto);
        });
    });
    describe('remove', () => {
        it('should remove a brand', async () => {
            jest.spyOn(service['brandModel'], 'findByPk').mockResolvedValue(mockBrand);
            jest.spyOn(mockBrand, 'update').mockResolvedValue(mockBrand);
            await service.remove('1');
            expect(service['brandModel'].findByPk).toHaveBeenCalledWith('1');
            expect(mockBrand.update).toHaveBeenCalledWith({ isActive: false });
        });
    });
});
//# sourceMappingURL=brands.service.spec.js.map