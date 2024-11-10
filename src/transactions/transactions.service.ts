import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
    private readonly orderService: OrdersService,
  ) {}
  async create(createTransactionDto: CreateTransactionDto) {
    const order = await this.orderService.findOne(createTransactionDto.orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return this.transactionRepo.save(createTransactionDto);
  }

  findAll() {
    return this.transactionRepo.find({
      relations: ['order'],
    });
  }

  findOne(id: number) {
    return this.transactionRepo.findOne({ where: { id } });
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return this.transactionRepo.update(id, updateTransactionDto);
  }

  remove(id: number) {
    return this.transactionRepo.delete(id);
  }
}
