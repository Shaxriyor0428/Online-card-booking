import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from '../admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { Admin } from '../admin/entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthClientController } from './auth.client.controller';
import { AuthClientService } from './auth.client.service';
import { ClientsModule } from '../clients/clients.module';
import { MailModule } from '../mail/mail.module';
import { Clients } from '../clients/entities/client.entity';
import { Otp } from '../otp/entities/otp.entity';

@Module({
  imports: [
    AdminModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([Admin, Clients, Otp]),
    ClientsModule,
    MailModule,
  ],
  controllers: [AuthController, AuthClientController],
  providers: [AuthService, AuthClientService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
