import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardTypeDto {
  @ApiProperty({
    description: 'Name of the card type (e.g., VISA, MasterCard, HUMO)',
    example: 'VISA',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Detailed description of the card type',
    example: 'A globally accepted credit card type',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
