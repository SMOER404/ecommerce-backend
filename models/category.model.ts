import { Column, Model, Table, DataType, HasMany } from "sequelize-typescript"
import { Product } from "./product.model"

@Table({
  tableName: "categories",
  timestamps: true,
  underscored: true
})
export class Category extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  description: string

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  isActive: boolean

  @HasMany(() => Product, {
    foreignKey: 'categoryId'
  })
  products: Product[]
}

