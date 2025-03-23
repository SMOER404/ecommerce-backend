import { NestFactory } from "@nestjs/core"
import { AppModule } from "../app.module"
import { getModelToken } from "@nestjs/sequelize"
import { User, UserRole } from "../models/user.model"
import { Category } from "../models/category.model"
import { Brand } from "../models/brand.model"
import { Product } from "../models/product.model"
import { ProductVariant } from "../models/product-variant.model"
import * as bcrypt from "bcrypt"

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule)

  try {
    console.log("Starting database seeding...")

    // Get model repositories
    const userModel = app.get(getModelToken(User))
    const categoryModel = app.get(getModelToken(Category))
    const brandModel = app.get(getModelToken(Brand))
    const productModel = app.get(getModelToken(Product))
    const productVariantModel = app.get(getModelToken(ProductVariant))

    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 10)
    await userModel.create({
      email: "admin@example.com",
      password: adminPassword,
      name: "Admin User",
      role: UserRole.ADMIN,
    })

    console.log("Admin user created")

    // Create regular user
    const userPassword = await bcrypt.hash("user123", 10)
    await userModel.create({
      email: "user@example.com",
      password: userPassword,
      name: "Regular User",
      role: UserRole.USER,
    })

    console.log("Regular user created")

    // Create categories
    const categories = await categoryModel.bulkCreate([
      { name: "Shoes" },
      { name: "Clothing" },
      { name: "Accessories" },
    ])

    console.log("Categories created")

    // Create brands
    const brands = await brandModel.bulkCreate([
      {
        name: "BrandX",
        description: "Premium athletic wear and footwear",
        logoUrl: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "BrandY",
        description: "Stylish casual clothing and accessories",
        logoUrl: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "BrandZ",
        description: "Luxury fashion items and accessories",
        logoUrl: "/placeholder.svg?height=100&width=100",
      },
    ])

    console.log("Brands created")

    // Create products with variants
    const shoesCategory = categories[0]
    const clothingCategory = categories[1]
    const accessoriesCategory = categories[2]

    const brandX = brands[0]
    const brandY = brands[1]
    const brandZ = brands[2]

    // Product 1: Premium Sneakers
    const product1 = await productModel.create({
      name: "Premium Sneakers X3",
      description:
        "Experience ultimate comfort and style with our Premium Sneakers X3. Featuring advanced cushioning technology and breathable materials for all-day wear.",
      images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
      categoryId: shoesCategory.id,
      brandId: brandX.id,
    })

    await productVariantModel.bulkCreate([
      { productId: product1.id, color: "Black", size: "US 8", price: 129.99, stock: 10 },
      { productId: product1.id, color: "Black", size: "US 9", price: 129.99, stock: 15 },
      { productId: product1.id, color: "White", size: "US 8", price: 129.99, stock: 8 },
      { productId: product1.id, color: "White", size: "US 9", price: 129.99, stock: 12 },
    ])

    // Product 2: Designer Hoodie
    const product2 = await productModel.create({
      name: "Designer Hoodie",
      description:
        "Stay warm and stylish with our Designer Hoodie. Made from premium cotton blend with a modern fit and unique design elements.",
      images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
      categoryId: clothingCategory.id,
      brandId: brandY.id,
    })

    await productVariantModel.bulkCreate([
      { productId: product2.id, color: "Gray", size: "S", price: 89.99, stock: 20 },
      { productId: product2.id, color: "Gray", size: "M", price: 89.99, stock: 25 },
      { productId: product2.id, color: "Gray", size: "L", price: 89.99, stock: 15 },
      { productId: product2.id, color: "Black", size: "M", price: 89.99, stock: 18 },
      { productId: product2.id, color: "Black", size: "L", price: 89.99, stock: 12 },
    ])

    // Product 3: Luxury Watch
    const product3 = await productModel.create({
      name: "Luxury Watch",
      description:
        "Elevate your style with our Luxury Watch. Featuring precision movement, sapphire crystal, and water resistance up to 50 meters.",
      images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
      categoryId: accessoriesCategory.id,
      brandId: brandZ.id,
    })

    await productVariantModel.bulkCreate([
      { productId: product3.id, color: "Silver", size: "One Size", price: 299.99, stock: 5 },
      { productId: product3.id, color: "Gold", size: "One Size", price: 349.99, stock: 3 },
    ])

    // Product 4: Urban Backpack
    const product4 = await productModel.create({
      name: "Urban Backpack",
      description:
        "The perfect companion for city life. Our Urban Backpack features multiple compartments, water-resistant material, and ergonomic design for all-day comfort.",
      images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
      categoryId: accessoriesCategory.id,
      brandId: brandX.id,
    })

    await productVariantModel.bulkCreate([
      { productId: product4.id, color: "Black", size: "One Size", price: 79.99, stock: 25 },
      { productId: product4.id, color: "Navy", size: "One Size", price: 79.99, stock: 15 },
    ])

    console.log("Products and variants created")

    console.log("Database seeding completed successfully")
  } catch (error) {
    console.error("Error during database seeding:", error)
  } finally {
    await app.close()
  }
}

bootstrap()

