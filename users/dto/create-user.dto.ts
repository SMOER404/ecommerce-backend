import { IsEmail, IsString, MinLength, IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
  @ApiProperty({ example: "john.doe@example.com" })
  @IsEmail()
  email: string

  @ApiProperty({ example: "password123" })
  @IsString()
  @MinLength(6)
  password: string

  @ApiProperty({ example: "John" })
  @IsString()
  firstName: string

  @ApiProperty({ example: "Doe" })
  @IsString()
  lastName: string

  @ApiProperty({ example: "user", required: false })
  @IsString()
  @IsOptional()
  role?: string
}

