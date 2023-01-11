import {
  IsDate,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  readonly customerId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;

  @IsDate()
  @IsEmpty()
  @IsOptional()
  readonly dateEnd: Date;

  /* @IsNumber()
  @IsEmpty()
  readonly product: number;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  readonly qty: number;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  readonly cost: number;

  @IsNumber()
  @IsNotEmpty()
  readonly subtotal: number; */
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
