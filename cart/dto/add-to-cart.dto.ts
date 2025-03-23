import { IsUUID, IsInt, Min } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class AddToCartDto {
  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000" })
  @IsUUID()
  productVariantId: string

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  quantity: number
}

