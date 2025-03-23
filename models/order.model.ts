import { Column, Model, Table, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript"
import { User } from "./user.model"
import { OrderItem } from "./order-item.model"

export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

@Table({
  tableName: "orders",
  timestamps: true,
  underscored: true,
})
export class Order extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  totalAmount: number

  @Column({
    type: DataType.ENUM(...Object.values(OrderStatus)),
    defaultValue: OrderStatus.PENDING,
  })
  status: OrderStatus

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  shippingAddress: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  paymentMethod: string

  @BelongsTo(() => User)
  user: User

  @HasMany(() => OrderItem)
  items: OrderItem[]
}

