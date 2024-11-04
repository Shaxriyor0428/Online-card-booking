import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    description: 'Unique region ID associated with the Client',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  regionId: number;

  @ApiProperty({
    description: 'Client first name',
    example: 'Bobur',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  first_name: string;

  @ApiProperty({
    description: 'Client last name',
    example: 'Shokirov',
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  last_name: string;

  @ApiProperty({
    description: 'Client phone number',
    example: '+998931631621',
  })
  @IsString()
  @IsPhoneNumber('UZ')
  phone_number: string;

  @ApiProperty({
    description: 'Client email',
    example: 'bobur@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Client address',
    example: 'Toshkent',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Client password',
    example: 'Bobur1234!',
    minLength: 6,
    maxLength: 14,
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message:
        'Password must include at least one lowercase letter, one uppercase letter, one number, and one symbol. example: Uzbeki$ston1',
    },
  )
  password: string;

  @ApiProperty({
    description:
      'Confirmation of the client password. Must match with the "password" field.',
    example: 'Bobur1234!',
    minLength: 6,
    maxLength: 14,
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message:
        'Confirm Password must include at least one lowercase letter, one uppercase letter, one number, and one symbol. example: Uzbeki$ston1',
    },
  )
  confirm_password: string;

  @ApiProperty({
    description: 'Client photo',
    example: 'clients/photo.jpg',
  })
  @IsString()
  @IsNotEmpty()
  photo: string;

  @ApiProperty({
    description: 'Clinet birth date',
    example: '2002-02-02',
  })
  @IsDateString()
  @IsString()
  birth_date: string;
}
