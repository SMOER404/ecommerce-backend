import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript"
import { Category } from "./category.model"
import { Brand } from "./brand.model"

@Table({
  tableName: "products",
  timestamps: true,
  underscored: true,
})
export class Product extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string

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

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image: string

  @ForeignKey(() => Category)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'category_id'
  })
  categoryId: string

  @ForeignKey(() => Brand)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'brand_id'
  })
  brandId: string

  @BelongsTo(() => Category, {
    foreignKey: 'categoryId',
    targetKey: 'id'
  })
  category: Category

  @BelongsTo(() => Brand, {
    foreignKey: 'brandId',
    targetKey: 'id'
  })
  brand: Brand

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive: boolean
}

