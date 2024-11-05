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
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Transaction } from './entities/transaction.entity';
import { AdminAccessTokenGuard } from '../common/guards/access_token.guard';
import { Public } from '../common/decorators/is-public.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
@UseGuards(AdminAccessTokenGuard)
@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create transaction' })
  @ApiResponse({
    status: 201,
    description: 'Created transaction',
    type: Transaction,
  })
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Public()
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get list of Transactions' })
  @ApiResponse({
    status: 200,
    description: 'List of Transactions',
    type: [Transaction],
  })
  findAll() {
    return this.transactionsService.findAll();
  }

  @Public()
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get Transaction by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrived transaction by ID',
    type: Transaction,
  })
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update transaction by ID' })
  @ApiResponse({
    status: 200,
    description: 'Updated successfully',
    type: Transaction,
  })
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete transaction by ID' })
  @ApiResponse({
    status: 200,
    description: 'Deleted successfully',
    type: Transaction,
  })
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
