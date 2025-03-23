import { IsString, IsUUID, IsArray, IsOptional, ValidateNested } from "class-validator"
import { Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"
import { UpdateProductVariantDto } from "./update-product-variant.dto"

export class UpdateProductDto {
  @ApiProperty({ example: "Premium Sneakers", required: false })
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({ example: "High-quality sneakers with advanced cushioning", required: false })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000", required: false })
  @IsUUID()
  @IsOptional()
  categoryId?: string

  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000", required: false })
  @IsUUID()
  @IsOptional()
  brandId?: string

  @ApiProperty({ type: [UpdateProductVariantDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductVariantDto)
  @IsOptional()
  variants?: UpdateProductVariantDto[]
}

