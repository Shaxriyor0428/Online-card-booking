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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { AdminAccessTokenGuard } from '../common/guards/access_token.guard';
import { ClientAccessTokenGuard } from '../common/guards/client.access_token.guard';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create order' })
  @ApiResponse({
    status: 201,
    description: 'Order has been created successfully',
    type: Order,
  })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @UseGuards(ClientAccessTokenGuard)
  @Get()
  @ApiOperation({ summary: 'Get all Orders' })
  @ApiResponse({
    status: 200,
    description: 'List of Clients',
    type: [Order],
  })
  findAll() {
    return this.ordersService.findAll();
  }

  @UseGuards(ClientAccessTokenGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiResponse({
    status: 200,
    description: 'Order has been recieved successfully',
    type: Order,
  })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @UseGuards(AdminAccessTokenGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update order by ID' })
  @ApiResponse({
    status: 200,
    description: 'Updated successfully',
    type: Order,
  })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @UseGuards(AdminAccessTokenGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete order by ID' })
  @ApiResponse({
    status: 200,
    description: 'Delete successfully',
  })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
