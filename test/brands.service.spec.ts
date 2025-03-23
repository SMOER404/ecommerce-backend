import { Test, TestingModule } from '@nestjs/testing';
import { BrandsService } from '../brands/brands.service';
import { Brand } from '../models/brand.model';
import { CreateBrandDto } from '../brands/dto/create-brand.dto';
import { UpdateBrandDto } from '../brands/dto/update-brand.dto';
import { PaginationParams } from '../common/types/base.types';
import { getModelToken } from '@nestjs/sequelize';

describe('BrandsService', () => {
  let service: BrandsService;
  let mockBrand: Brand;

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
    } as unknown as Brand;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandsService,
        {
          provide: getModelToken(Brand),
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

    service = module.get<BrandsService>(BrandsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a brand', async () => {
      const createBrandDto: CreateBrandDto = {
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
      const paginationParams: PaginationParams = { page: 1, limit: 10 };

      jest.spyOn(service['brandModel'], 'findAndCountAll').mockResolvedValue({
        rows: mockBrands,
        count: mockCount as any,
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
      const updateBrandDto: UpdateBrandDto = {
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