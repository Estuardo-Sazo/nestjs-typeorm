import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateOrderLineDto {
  @IsNumber()
  @IsNotEmpty()
  readonly productId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly orderId: number;

  @IsOptional()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  readonly qty: number;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsNumber()
  @IsOptional()
  readonly cost: number;

  @IsNumber()
  @IsOptional()
  readonly subtotal: number;
}

export class UpdateOrderLineDto extends PartialType(CreateOrderLineDto) {}
