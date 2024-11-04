import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateCardDto {
  @ApiProperty({
    description: 'The limit amount for the card',
    example: 5000,
  })
  @IsNumber()
  limit: number;

  @ApiProperty({
    description: 'Fees associated with the card',
    example: "Yillik: 50000 so'm; ATM: 2000 so'm/operatsiya; Tranzaksiya: 0,5%",
  })
  @IsString()
  fees: string;

  @ApiProperty({
    description: 'Indicates if the card is an online card (true/false)',
    example: true,
  })
  @IsBoolean()
  is_online_card: boolean;

  @ApiProperty({
    description: 'The expiration date of the card in YYYY-MM-DD format',
    example: '2025-12-31',
  })
  @IsDateString()
  expiration_date: string;

  @ApiProperty({
    description: 'The date the card was issued in YYYY-MM-DD format',
    example: '2022-01-01',
  })
  @IsDateString()
  issued_date: string;

  @IsEnum({ USD: 'USD', UZS: 'UZS' })
  @ApiProperty({
    description: 'The currency of the card',
    example: 'USD',
  })
  @IsString()
  @IsNotEmpty()
  currency: string;

  @ApiProperty({
    description: 'Unique Bank ID associated with this card',
    example: 1,
  })
  @IsNumber()
  bankId: number;

  @ApiProperty({
    description: 'Unique card type ID associated with this card',
    example: 1,
  })
  @IsNumber()
  card_typeId: number;
}
