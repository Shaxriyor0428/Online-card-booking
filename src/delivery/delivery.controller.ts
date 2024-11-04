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
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Delivery } from './entities/delivery.entity';
import { AuthGuard } from '../common/guards/auth.guard';

@UseGuards(AuthGuard)
@ApiTags('Delivery')
@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  @ApiOperation({ summary: 'Create delivery' })
  @ApiResponse({
    status: 201,
    description: 'Created successfully',
    type: Delivery,
  })
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveryService.create(createDeliveryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of deliveries' })
  @ApiResponse({
    status: 200,
    description: 'List of deliveries',
    type: [Delivery],
  })
  findAll() {
    return this.deliveryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get delivery by ID' })
  @ApiResponse({
    status: 200,
    description: 'Delivery retrived by Id retrived successfully',
    type: Delivery,
  })
  findOne(@Param('id') id: string) {
    return this.deliveryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update delivery' })
  @ApiResponse({
    status: 200,
    description: 'Delivery updated successfully',
    type: Delivery,
  })
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    return this.deliveryService.update(+id, updateDeliveryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete delivery' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Delivery removed successfully',
  })
  remove(@Param('id') id: string) {
    return this.deliveryService.remove(+id);
  }
}
