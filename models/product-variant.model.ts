import { Column, Model, Table, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript"
import { Product } from "./product.model"
import { CartItem } from "./cart-item.model"
import { OrderItem } from "./order-item.model"

@Table({
  tableName: "product_variants",
  timestamps: true,
  underscored: true,
})
export class ProductVariant extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string

  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  productId: string

  @BelongsTo(() => Product)
  product: Product

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  color: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  size: string

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  stock: number

  @HasMany(() => CartItem)
  cartItems: CartItem[]

  @HasMany(() => OrderItem)
  orderItems: OrderItem[]
}

