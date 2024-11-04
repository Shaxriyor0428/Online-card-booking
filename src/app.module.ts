import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { RegionsModule } from './regions/regions.module';
import { ClientsModule } from './clients/clients.module';
import { BanksModule } from './banks/banks.module';
import { CardTypesModule } from './card_types/card_types.module';
import { CardsModule } from './cards/cards.module';
import { DeliveryModule } from './delivery/delivery.module';
import { OrdersModule } from './orders/orders.module';
import { DiscountsModule } from './discounts/discounts.module';
import { OrderDetailsModule } from './order_details/order_details.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TransactionsModule } from './transactions/transactions.module';
import { OtpModule } from './otp/otp.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: +process.env.PG_PORT,
      username: process.env.PG_USER,
      password: process.env.PG_PASS,
      database: process.env.PG_DB,
      synchronize: true,
      entities: [join(__dirname, '**/*.entity.{ts,js}')],
      logging: true,
      autoLoadEntities: true,
    }),
    AdminModule,
    RolesModule,
    AuthModule,
    RegionsModule,
    ClientsModule,
    BanksModule,
    CardTypesModule,
    CardsModule,
    DeliveryModule,
    OrdersModule,
    DiscountsModule,
    OrderDetailsModule,
    NotificationsModule,
    TransactionsModule,
    OtpModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
