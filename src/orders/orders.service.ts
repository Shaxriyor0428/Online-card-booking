import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { ClientsService } from '../clients/clients.service';
import { DiscountsService } from '../discounts/discounts.service';
import { Card } from '../cards/entities/card.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    private readonly clientService: ClientsService,
    private readonly discountService: DiscountsService,
    @InjectRepository(Card) private readonly cardRepo: Repository<Card>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const client = await this.clientService.findOne(createOrderDto.clientId);
    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const discount = await this.discountService.findOne(
      createOrderDto.discountId,
    );
    if (!discount) {
      throw new NotFoundException('Discount not found');
    }
    return this.orderRepo.save(createOrderDto);
  }
  async findAll() {
    return this.orderRepo.find({ relations: ['delivery'] });
  }

  findOne(id: number) {
    return this.orderRepo.findOne({ where: { id }, relations: ['delivery'] });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderRepo.update(id, updateOrderDto);
  }

  remove(id: number) {
    return this.orderRepo.delete(id);
  }
}
