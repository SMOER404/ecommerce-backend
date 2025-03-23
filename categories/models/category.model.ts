import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Product } from '../../models/product.model';

@Table({
  tableName: 'categories',
  timestamps: true,
  underscored: true,
})
export class Category extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive: boolean;

  @HasMany(() => Product)
  products: Product[];
} 