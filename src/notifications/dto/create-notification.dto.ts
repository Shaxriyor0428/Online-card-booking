import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { NotificationTypes } from '../../common/types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'Unique user ID associated with the notification',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  clientId: number;

  @ApiProperty({
    description: 'Message content for the notification',
    example: 'Your order has been shipped!',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Flag to indicate if the notification has been read',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  is_read: boolean;

  @ApiProperty({
    description: 'Type of notification',
    example: NotificationTypes.ALERT,
  })
  @IsEnum(NotificationTypes)
  type: NotificationTypes;

  @ApiProperty({
    description: 'Timestamp when the message was sent',
    example: '2024:02:02 10:02',
  })
  @IsNotEmpty()
  @Matches(/^\d{4}:\d{2}:\d{2} \d{2}:\d{2}$/, {
    message: 'message_sent_time must be in the format YYYY:MM:DD HH:MM',
  })
  message_sent_time: string;
}
