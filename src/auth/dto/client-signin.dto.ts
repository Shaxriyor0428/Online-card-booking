import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class ClientSigInDto {
  @ApiProperty({
    description: 'Client email',
    example: 'bobur@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
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
}
