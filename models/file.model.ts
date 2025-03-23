import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript'

@Table({
  tableName: 'files',
  timestamps: true,
})
export class File extends Model {
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
  filename: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  originalname: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  mimetype: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  size: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  path: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  url: string

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date
} 