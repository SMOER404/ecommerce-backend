import { IsEmail, IsString, MinLength, IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class UpdateUserDto {
  @ApiProperty({ example: "user@example.com", required: false })
  @IsEmail()
  @IsOptional()
  email?: string

  @ApiProperty({ example: "password123", required: false })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string

  @ApiProperty({ example: "John Doe", required: false })
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  refreshToken?: string
}

