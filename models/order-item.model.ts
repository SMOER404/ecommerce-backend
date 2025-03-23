import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript"
import { Order } from "./order.model"
import { ProductVariant } from "./product-variant.model"

@Table({
  tableName: "order_items",
  timestamps: true,
  underscored: true,
})
export class OrderItem extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string

  @ForeignKey(() => Order)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  orderId: string

  @ForeignKey(() => ProductVariant)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  productVariantId: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number

  @BelongsTo(() => Order)
  order: Order

  @BelongsTo(() => ProductVariant)
  productVariant: ProductVariant
}

