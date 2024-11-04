import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { OrderStatusEnum } from '../../common/types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Unique client ID associated with the order',
    example: 1,
  })
  @IsNumber()
  clientId: number;

  @ApiProperty({
    description: 'Unique client ID associated with the order',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  discountId?: number;

  @ApiProperty({
    description: 'Card price',
    example: 155.3,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Current order status',
    enum: OrderStatusEnum,
    example: OrderStatusEnum.NEW,
  })
  @IsEnum(OrderStatusEnum)
  status: OrderStatusEnum;

  @ApiProperty({
    description: 'Order date',
    example: '2024-02-02',
  })
  @IsDateString()
  @IsNotEmpty()
  order_date: string;
}
