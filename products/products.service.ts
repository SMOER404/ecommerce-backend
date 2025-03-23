import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { Op } from "sequelize"
import { Product } from "../models/product.model"
import { ProductVariant } from "../models/product-variant.model"
import { Category } from "../categories/models/category.model"
import { Brand } from "../models/brand.model"
import type { CreateProductDto } from "./dto/create-product.dto"
import type { UpdateProductDto } from "./dto/update-product.dto"
import type { CreateProductVariantDto } from "./dto/create-product-variant.dto"
import type { UpdateProductVariantDto } from "./dto/update-product-variant.dto"
import { FilesService } from "../files/files.service"
import type { ProductQueryDto } from "./dto/product-query.dto"
import type { Express } from "express"

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
    @InjectModel(ProductVariant)
    private productVariantModel: typeof ProductVariant,
    @InjectModel(Category)
    private categoryModel: typeof Category,
    @InjectModel(Brand)
    private brandModel: typeof Brand,
    private filesService: FilesService,
  ) {}

  async findAll(query: ProductQueryDto): Promise<{ rows: Product[]; count: number }> {
    const { page = 1, limit = 10, categoryId, brandId, minPrice, maxPrice, search } = query
    const offset = (page - 1) * limit

    const whereClause: any = {}

    if (categoryId) {
      whereClause.categoryId = categoryId
    }

    if (brandId) {
      whereClause.brandId = brandId
    }

    if (search) {
      whereClause.name = { [Op.iLike]: `%${search}%` }
    }

    const variantWhereClause: any = {}

    if (minPrice !== undefined || maxPrice !== undefined) {
      variantWhereClause.price = {}

      if (minPrice !== undefined) {
        variantWhereClause.price[Op.gte] = minPrice
      }

      if (maxPrice !== undefined) {
        variantWhereClause.price[Op.lte] = maxPrice
      }
    }

    return this.productModel.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Category,
          attributes: ["id", "name"],
        },
        {
          model: Brand,
          attributes: ["id", "name", "logoUrl"],
        },
        {
          model: ProductVariant,
          where: Object.keys(variantWhereClause).length > 0 ? variantWhereClause : undefined,
        },
      ],
      limit,
      offset,
      distinct: true,
    })
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ["id", "name"],
        },
        {
          model: Brand,
          attributes: ["id", "name", "logoUrl"],
        },
        {
          model: ProductVariant,
        },
      ],
    })

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`)
    }

    return product
  }

  async create(createProductDto: CreateProductDto, images: Express.Multer.File[]): Promise<Product> {
    const { variants, ...productData } = createProductDto

    // Upload image
    const imageUrl = images.length > 0 ? await this.filesService.uploadFile(images[0], "products") : null

    // Create product
    const product = await this.productModel.create({
      ...productData,
      image: imageUrl,
    })

    // Create variants
    if (variants && variants.length > 0) {
      await Promise.all(
        variants.map((variant) =>
          this.productVariantModel.create({
            ...variant,
            productId: product.id,
          }),
        ),
      )
    }

    return this.findById(product.id)
  }

  async update(id: string, updateProductDto: UpdateProductDto, images?: Express.Multer.File[]): Promise<Product> {
    const product = await this.findById(id)

    const { variants, ...productData } = updateProductDto

    // Upload new image if provided
    let imageUrl = product.image
    if (images && images.length > 0) {
      imageUrl = await this.filesService.uploadFile(images[0], "products")
    }

    // Update product
    await product.update({
      ...productData,
      image: imageUrl,
    })

    return this.findById(id)
  }

  async remove(id: string): Promise<void> {
    const product = await this.findById(id)
    await product.destroy()
  }

  async addVariant(productId: string, createVariantDto: CreateProductVariantDto): Promise<ProductVariant> {
    const product = await this.findById(productId)

    const variant = await this.productVariantModel.create({
      ...createVariantDto,
      productId: product.id,
    })

    return variant
  }

  async updateVariant(variantId: string, updateVariantDto: UpdateProductVariantDto): Promise<ProductVariant> {
    const variant = await this.productVariantModel.findByPk(variantId)

    if (!variant) {
      throw new NotFoundException(`Product variant with ID ${variantId} not found`)
    }

    await variant.update(updateVariantDto)

    return variant
  }

  async removeVariant(variantId: string): Promise<void> {
    const variant = await this.productVariantModel.findByPk(variantId)

    if (!variant) {
      throw new NotFoundException(`Product variant with ID ${variantId} not found`)
    }

    await variant.destroy()
  }
}

