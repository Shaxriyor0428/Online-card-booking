import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    description: 'Admin full name',
    example: 'Salimov Karim',
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    description: 'Admin email address',
    example: 'admin@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Admin phone number in Uzbekistan format',
    example: '+998901234567',
  })
  @IsPhoneNumber('UZ')
  phone_number: string;

  @ApiProperty({
    description: 'Password for admin account',
    example: 'Strong12',
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 4,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  password: string;

  @ApiProperty({
    description: 'Optional hashed refresh token for session management',
    required: false,
  })
  @IsOptional()
  @IsString()
  hashed_refresh_token: string;

  @ApiProperty({
    description: 'Role name of the role assigned to the admin',
    example: 'ADMIN',
  })
  @IsString()
  role: string;
}
