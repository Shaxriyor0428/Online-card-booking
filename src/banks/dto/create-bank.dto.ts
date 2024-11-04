import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateBankDto {
  @ApiProperty({
    description: 'The location or city of the bank',
    example: 'Samarqand',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    description: "Bank's phone number in Uzbekistan format",
    example: '+998901234567',
  })
  @IsString()
  @IsPhoneNumber('UZ')
  phone: string;

  @ApiProperty({
    description: "Bank's official website",
    example: 'https://www.bankname.uz',
  })
  @IsString()
  @IsNotEmpty()
  website: string;

  @ApiProperty({
    description: 'Short description or overview of the bank',
    example: 'Leading bank providing a variety of financial services.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
