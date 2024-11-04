import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({
    description: 'Verification key',
    example: 'fdskjjsofdnjk615fds',
  })
  @IsString()
  verification_key: string;

  @ApiProperty({
    description: 'Otp code',
    example: '1025',
  })
  @IsString()
  otp: string;

  @ApiProperty({
    description: 'Client Email',
    example: 'bobur@gmail.com',
  })
  @IsEmail()
  email: string;
}
