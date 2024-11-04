import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRegionDto {
  @ApiProperty({
    description: 'Region name',
    example: 'Toshkent',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Description for region',
    example: 'Toshkent is a very beautiful and large city in Uzbekistan',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(300)
  description: string;
}
