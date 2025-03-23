import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript"
import { User } from "./user.model"
import { ProductVariant } from "./product-variant.model"

@Table({
  tableName: "cart_items",
  timestamps: true,
  underscored: true,
})
export class CartItem extends Model {
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

  @ForeignKey(() => ProductVariant)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  productVariantId: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  quantity: number

  @BelongsTo(() => User)
  user: User

  @BelongsTo(() => ProductVariant)
  productVariant: ProductVariant
}

