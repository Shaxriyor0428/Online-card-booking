import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDiscountDto {
  @ApiProperty({
    description: 'Description about the discount',
    example: '10% off on all items',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Discount percentage to be applied',
    example: 10,
  })
  @IsNumber()
  discount_percentage: number;

  @ApiProperty({
    description: 'Expiration date of the discount',
    example: '2024-12-31',
  })
  @IsDateString()
  expire_date: string;

  @ApiProperty({
    description: 'Indicates if the discount is currently active',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
