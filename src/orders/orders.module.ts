import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DiscountsModule } from '../discounts/discounts.module';
import { ClientsModule } from '../clients/clients.module';
import { Card } from '../cards/entities/card.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Card]),
    DiscountsModule,
    ClientsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
