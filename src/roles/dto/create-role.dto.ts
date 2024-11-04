import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description:
      'The name of the role, used to define access levels or permissions for a user within the application.',
    example: 'ADMIN',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
