import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { DeliveryStatus } from '../../common/types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeliveryDto {
  @ApiProperty({
    description: "Delivery date in 'YYYY-MM-DD' format",
    example: '2022-02-03',
  })
  @IsDateString()
  delivery_date: string;

  @ApiProperty({
    description: "Delivery time in 'HH:MM' format",
    example: '14:30',
  })
  @IsString()
  delivery_time: string;

  @ApiProperty({
    description: 'Delivery address',
    example: '1234 Elm Street, Springfield',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Current delivery status',
    enum: DeliveryStatus,
    example: DeliveryStatus.NEW,
  })
  @IsEnum(DeliveryStatus)
  status: DeliveryStatus;

  @ApiProperty({
    description: 'Price for the delivery service',
    example: 15,
  })
  @IsNumber()
  delivery_price: number;

  @ApiProperty({
    description: 'Associated order ID',
    example: 1,
  })
  @IsNumber()
  orderId: number;
}
