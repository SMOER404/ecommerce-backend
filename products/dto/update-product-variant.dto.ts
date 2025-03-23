import { IsString, IsNumber, Min, IsInt, IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class UpdateProductVariantDto {
  @ApiProperty({ example: "Black", required: false })
  @IsString()
  @IsOptional()
  color?: string

  @ApiProperty({ example: "US 9", required: false })
  @IsString()
  @IsOptional()
  size?: string

  @ApiProperty({ example: 129.99, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number

  @ApiProperty({ example: 10, required: false })
  @IsInt()
  @Min(0)
  @IsOptional()
  stock?: number
}

