import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BanksService } from './banks.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Banks } from './entities/bank.entity';
import { IsCreatorGuard } from '../common/guards/is_creator.guard';
import { Public } from '../common/decorators/is-public.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
@UseGuards(IsCreatorGuard)
@ApiTags('Banks')
@Controller('banks')
export class BanksController {
  constructor(private readonly banksService: BanksService) {}

  @Post()
  @ApiOperation({ summary: 'Create new Bank' })
  @ApiResponse({
    status: 201,
    description: 'The bank type has been successfully created',
    type: Banks,
  })
  create(@Body() createBankDto: CreateBankDto) {
    return this.banksService.create(createBankDto);
  }

  @Public()
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get list of Banks' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved list of all banks',
    type: [Banks],
  })
  findAll() {
    return this.banksService.findAll();
  }
  @Public()
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get bank by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the bank',
    type: Banks,
  })
  findOne(@Param('id') id: string) {
    return this.banksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Bank by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the bank',
  })
  update(@Param('id') id: string, @Body() updateBankDto: UpdateBankDto) {
    return this.banksService.update(+id, updateBankDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Bank by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the bank',
  })
  remove(@Param('id') id: string) {
    return this.banksService.remove(+id);
  }
}
