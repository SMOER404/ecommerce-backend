import { IsInt, Min } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class UpdateCartItemDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  quantity: number
}

