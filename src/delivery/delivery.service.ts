import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivery } from './entities/delivery.entity';
import { Repository } from 'typeorm';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private readonly adminRepo: Repository<Delivery>,
    private readonly orderService: OrdersService,
  ) {}
  async create(createDeliveryDto: CreateDeliveryDto) {
    const order = await this.orderService.findOne(createDeliveryDto.orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return this.adminRepo.save(createDeliveryDto);
  }

  findAll() {
    return this.adminRepo.find({
      relations: ['order'],
    });
  }

  findOne(id: number) {
    return this.adminRepo.findOne({ where: { id } });
  }

  update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    return this.adminRepo.update(id, updateDeliveryDto);
  }

  remove(id: number) {
    return this.adminRepo.delete(id);
  }
}
