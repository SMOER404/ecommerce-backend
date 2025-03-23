import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { User, UserRole } from "../models/user.model"
import type { CreateUserDto } from "./dto/create-user.dto"
import type { UpdateUserDto } from "./dto/update-user.dto"

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll({
      attributes: { exclude: ["password", "refreshToken"] },
    })
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findByPk(id)
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return user
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ where: { email } })
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create({
      ...createUserDto,
      isActive: true,
    } as any)
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id)
    await user.update(updateUserDto)
    return user
  }

  async remove(id: string): Promise<void> {
    const user = await this.findById(id)
    await user.destroy()
  }

  async setAdminRole(id: string): Promise<User> {
    const user = await this.findById(id)
    await user.update({ role: UserRole.ADMIN })
    return user
  }
}

