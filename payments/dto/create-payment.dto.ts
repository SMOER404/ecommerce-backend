import { IsUUID, IsNumber, Min, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreatePaymentDto {
  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000" })
  @IsUUID()
  orderId: string

  @ApiProperty({ example: 100.5 })
  @IsNumber()
  @Min(0)
  amount: number

  @ApiProperty({ example: "Payment for order #123" })
  @IsString()
  description: string
}

