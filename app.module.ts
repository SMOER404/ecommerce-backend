import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { ProductsModule } from './products/products.module'
import { CartModule } from './cart/cart.module'
import { OrdersModule } from './orders/orders.module'
import { PaymentsModule } from './payments/payments.module'
import { FilesModule } from './files/files.module'
import { CategoriesModule } from './categories/categories.module'
import { BrandsModule } from './brands/brands.module'
import { User } from './models/user.model'
import { Category } from './models/category.model'
import { Brand } from './models/brand.model'
import { Product } from './models/product.model'
import { ProductVariant } from './models/product-variant.model'
import { CartItem } from './models/cart-item.model'
import { Order } from './models/order.model'
import { OrderItem } from './models/order-item.model'
import { File } from './models/file.model'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.NODE_ENV === 'test' ? 'poizonmarket_user' : (process.env.DB_USERNAME || 'postgres'),
      password: process.env.NODE_ENV === 'test' ? 'poizonmarket_user' : (process.env.DB_PASSWORD || 'postgres'),
      database: process.env.NODE_ENV === 'test' ? 'poizon_market' : (process.env.DB_NAME || 'poizon_market'),
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
      autoLoadModels: false,
      synchronize: true,
      sync: { 
        force: process.env.NODE_ENV === 'test',
        alter: true,
        match: /_test$/
      },
      logging: process.env.NODE_ENV !== 'production',
      define: {
        underscored: true,
        timestamps: true,
        freezeTableName: true
      }
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    CartModule,
    OrdersModule,
    PaymentsModule,
    FilesModule,
    CategoriesModule,
    BrandsModule,
  ],
})
export class AppModule {}

