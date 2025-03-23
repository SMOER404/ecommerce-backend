import { Column, Model, Table, DataType, HasMany, BeforeCreate, BeforeUpdate } from "sequelize-typescript"
import * as bcrypt from "bcrypt"
import { CartItem } from "./cart-item.model"
import { Order } from "./order.model"

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

@Table({
  tableName: "users",
  timestamps: true,
  underscored: true,
})
export class User extends Model {
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
  email: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive: boolean

  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    defaultValue: UserRole.USER,
  })
  role: UserRole

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  refreshToken: string

  @HasMany(() => CartItem)
  cartItems: CartItem[]

  @HasMany(() => Order)
  orders: Order[]

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    if (instance.changed("password")) {
      instance.password = await bcrypt.hash(instance.password, 10)
    }
  }

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
  }
}

