import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { File } from '../models/file.model'
import { User } from '../models/user.model'
import { Category } from '../models/category.model'
import { Brand } from '../models/brand.model'
import { Product } from '../models/product.model'
import { ProductVariant } from '../models/product-variant.model'
import { CartItem } from '../models/cart-item.model'
import { Order } from '../models/order.model'
import { OrderItem } from '../models/order-item.model'

export const testConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'poizonmarket_user',
  password: 'poizonmarket_user',
  database: 'poizon_market',
  models: [
    File,
    User,
    Category,
    Brand,
    Product,
    ProductVariant,
    CartItem,
    Order,
    OrderItem,
  ],
  autoLoadModels: true,
  sync: { force: true },
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: true,
    underscored: true,
  }
} 