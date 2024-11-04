import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order_detail.entity';
import { Repository } from 'typeorm';
import { DiscountsService } from '../discounts/discounts.service';
import { OrdersService } from '../orders/orders.service';
import { CardsService } from '../cards/cards.service';
import { ClientsService } from '../clients/clients.service';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail)
    private orderDetailsRepo: Repository<OrderDetail>,
    private readonly discountService: DiscountsService,
    private readonly orderService: OrdersService,
    private readonly cardService: CardsService,
    private readonly clientService: ClientsService,
  ) {}
  async create(createOrderDetailDto: CreateOrderDetailDto) {
    if (createOrderDetailDto.discountId) {
      const discount = await this.discountService.findOne(
        createOrderDetailDto.discountId,
      );
      if (!discount) {
        throw new NotFoundException('Discount not found');
      }
    }

    const order = await this.orderService.findOne(createOrderDetailDto.orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const card = await this.cardService.findOne(createOrderDetailDto.cardId);
    if (!card) {
      throw new NotFoundException('Card not found');
    }

    const client = await this.clientService.findOne(
      createOrderDetailDto.clientId,
    );
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return this.orderDetailsRepo.save(createOrderDetailDto);
  }

  findAll() {
    return this.orderDetailsRepo.find();
  }

  findOne(id: number) {
    return this.orderDetailsRepo.findOne({ where: { id } });
  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return this.orderDetailsRepo.update(id, updateOrderDetailDto);
  }

  remove(id: number) {
    return this.orderDetailsRepo.delete(id);
  }
}
