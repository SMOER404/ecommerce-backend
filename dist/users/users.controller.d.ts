import { UsersService } from "./users.service";
import type { UpdateUserDto } from "./dto/update-user.dto";
import type { User } from "../models/user.model";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    getProfile(user: User): Promise<User>;
    findOne(id: string): Promise<User>;
    updateProfile(user: User, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<{
        message: string;
    }>;
    setAdminRole(id: string): Promise<{
        message: string;
    }>;
}
