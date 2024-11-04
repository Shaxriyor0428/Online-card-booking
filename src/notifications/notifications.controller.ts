import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Notification } from './entities/notification.entity';
import { AdminAccessTokenGuard } from '../common/guards/access_token.guard';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseGuards(AdminAccessTokenGuard)
  @Post()
  @ApiOperation({ summary: 'Create notification' })
  @ApiResponse({
    status: 201,
    description: 'Notification creasted successfully',
    type: Notification,
  })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All notifications' })
  @ApiResponse({
    status: 200,
    description: 'List of notifcations',
    type: [Notification],
  })
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get notification by ID' })
  @ApiResponse({
    status: 201,
    description: 'Notification by Id has been recieved succesfully',
    type: Notification,
  })
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(+id);
  }

  @UseGuards(AdminAccessTokenGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update notification by ID' })
  @ApiResponse({
    status: 200,
    description: 'Updated successfully',
    type: Notification,
  })
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }

  @UseGuards(AdminAccessTokenGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete notification by ID' })
  @ApiResponse({
    status: 200,
    description: 'Delete successfully',
    type: Notification,
  })
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(+id);
  }
}
