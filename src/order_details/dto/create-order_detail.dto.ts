import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { OrderDetailsStatusEnum } from '../../common/types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDetailDto {
  @ApiProperty({
    description: 'Unique discount Id associated with order details',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  discountId: number;

  @ApiProperty({
    description: 'Unique order Id associated with order details',
    example: 1,
  })
  @IsNumber()
  orderId: number;

  @ApiProperty({
    description: 'Unique card Id associated with order details',
    example: 1,
  })
  @IsNumber()
  cardId: number;

  @ApiProperty({
    description: 'Unique client Id associated with order details',
    example: 1,
  })
  @IsNumber()
  clientId: number;

  @ApiProperty({
    description: 'Quantity of the items in the order details',
    example: 2,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'Price per item in the order details',
    example: 50.75,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description:
      'Total price for the order details, calculated as quantity * price',
    example: 101.5,
  })
  @IsNumber()
  total_price: number;

  @ApiProperty({
    description: 'Status of the order detail',
    enum: OrderDetailsStatusEnum,
    example: OrderDetailsStatusEnum.PENDING,
  })
  @IsEnum(OrderDetailsStatusEnum)
  status: OrderDetailsStatusEnum;
}
