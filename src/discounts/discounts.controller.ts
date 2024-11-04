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
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Discount } from './entities/discount.entity';
import { AdminAccessTokenGuard } from '../common/guards/access_token.guard';

@UseGuards(AdminAccessTokenGuard)
@ApiTags('Discounts')
@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new Discount' })
  @ApiResponse({
    status: 201,
    description: 'Discount has been successfully created',
    type: Discount,
  })
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountsService.create(createDiscountDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of Discounts' })
  @ApiResponse({
    status: 200,
    description: 'List of Discounts',
    type: [Discount],
  })
  findAll() {
    return this.discountsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Discount by Id' })
  @ApiResponse({
    status: 200,
    description: 'Discount has been received successfully',
    type: Discount,
  })
  findOne(@Param('id') id: string) {
    return this.discountsService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update discount by ID' })
  @ApiResponse({
    status: 200,
    description: 'Updated successfully',
    type: Discount,
  })
  update(
    @Param('id') id: string,
    @Body() updateDiscountDto: UpdateDiscountDto,
  ) {
    return this.discountsService.update(+id, updateDiscountDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete discount by ID' })
  @ApiResponse({
    status: 200,
    description: 'Delete successfully',
    type: Discount,
  })
  remove(@Param('id') id: string) {
    return this.discountsService.remove(+id);
  }
}
