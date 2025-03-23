import { IsString, IsNumber, Min, IsInt } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateProductVariantDto {
  @ApiProperty({ example: "Black" })
  @IsString()
  color: string

  @ApiProperty({ example: "US 9" })
  @IsString()
  size: string

  @ApiProperty({ example: 129.99 })
  @IsNumber()
  @Min(0)
  price: number

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(0)
  stock: number
}

