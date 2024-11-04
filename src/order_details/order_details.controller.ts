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
import { OrderDetailsService } from './order_details.service';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderDetail } from './entities/order_detail.entity';
import { AuthGuard } from '../common/guards/auth.guard';
import { AdminAccessTokenGuard } from '../common/guards/access_token.guard';
@UseGuards(AuthGuard)
@ApiTags('Order details')
@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @UseGuards(AdminAccessTokenGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new order detail' })
  @ApiResponse({
    status: 201,
    description: 'The order detail has been successfully created.',
    type: OrderDetail,
  })
  create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailsService.create(createOrderDetailDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all order details' })
  @ApiResponse({
    status: 200,
    description: 'List of all order details',
    type: [OrderDetail],
  })
  findAll() {
    return this.orderDetailsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order detail by ID' })
  @ApiResponse({
    description: 'The order detail with the specified ID',
    status: 200,
    type: OrderDetail,
  })
  findOne(@Param('id') id: string) {
    return this.orderDetailsService.findOne(+id);
  }

  @UseGuards(AdminAccessTokenGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an order detail by ID' })
  @ApiResponse({
    status: 200,
    description: 'The order detail has been successfully updated.',
    type: OrderDetail,
  })
  update(
    @Param('id') id: string,
    @Body() updateOrderDetailDto: UpdateOrderDetailDto,
  ) {
    return this.orderDetailsService.update(+id, updateOrderDetailDto);
  }

  @UseGuards(AdminAccessTokenGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order detail by ID' })
  @ApiResponse({
    status: 200,
    description: 'The order detail has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.orderDetailsService.remove(+id);
  }
}
