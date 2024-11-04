import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { OrderDetailsController } from './order_details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order_detail.entity';
import { ClientsModule } from '../clients/clients.module';
import { OrdersModule } from '../orders/orders.module';
import { DiscountsModule } from '../discounts/discounts.module';
import { CardsModule } from '../cards/cards.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetail]),
    ClientsModule,
    OrdersModule,
    DiscountsModule,
    CardsModule,
    JwtModule,
  ],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
})
export class OrderDetailsModule {}
