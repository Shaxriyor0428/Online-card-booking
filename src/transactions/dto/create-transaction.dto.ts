import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';
import { TransactionStatus } from '../../common/types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Amount of the transaction',
    example: 100.0,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Status of the transaction',
    enum: TransactionStatus,
    example: TransactionStatus.PENDING,
  })
  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @ApiProperty({
    description: 'Payment date of the transaction in format YYYY-MM-DD HH:mm',
    example: '2024-10-31 10:00',
  })
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/, {
    message: 'payment_date must be in the format YYYY-MM-DD HH:mm',
  })
  payment_date: string;

  @ApiProperty({
    description: 'Order ID associated with the transaction',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  orderId: number;
}
